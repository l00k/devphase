import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import path from 'path';


type Release = {
    name : string,
    tag_name : string,
    assets : Array<{
        name : string,
        browser_download_url : string,
        size: number,
    }>,
}


export class StackBinaryDownloader
{
    
    protected static readonly RELEASES_URL = 'https://api.github.com/repos/Phala-Network/phala-blockchain/releases';
    protected static readonly RELEASES_CACHE_TIME = 60 * 60 * 1000;
    protected static readonly EXECUTABLES = [
        'phala-node',
        'pruntime',
        'pherry',
    ];
    
    
    protected _logger : Logger = new Logger('StackBinaryDownloader');
    
    protected _releases : Release[];
    
    
    public constructor (
        protected _context : RuntimeContext
    )
    {}
    
    
    public async uniformStackVersion (version : string) : Promise<string>
    {
        if (version === 'latest') {
            const releases = await this.getReleases();
            return releases[0].tag_name;
        }
        
        return version;
    }
    
    public async getReleases () : Promise<Release[]>
    {
        // try to load from cache
        const cachePath = path.join(
            this._context.paths.context,
            'releases.json'
        );
        
        if (fs.existsSync(cachePath)) {
            const stat = fs.statSync(cachePath);
            const outdated = (Date.now() - stat.ctimeMs) > StackBinaryDownloader.RELEASES_CACHE_TIME;
            if (!outdated) {
                const releasesCacheRaw = fs.readFileSync(cachePath, { encoding: 'utf-8' });
                this._releases = JSON.parse(releasesCacheRaw);
            }
        }
        
        if (this._releases) {
            return this._releases;
        }
        
        const { status, data } = await axios.get(
            StackBinaryDownloader.RELEASES_URL,
            { validateStatus: () => true, }
        );
        
        if (status !== 200) {
            throw new Exception(
                'Unable to fetch releases list',
                1668571559267
            );
        }
        
        // push into cache
        const releasesCacheRaw = JSON.stringify(data);
        fs.writeFileSync(cachePath, releasesCacheRaw, { encoding: 'utf-8' });
        
        return data;
    }
    
    public async findRelease (tagName : string) : Promise<Release>
    {
        const releases = await this.getReleases();
        const targetRelease = releases.find(release => release.tag_name === tagName);
        
        if (!targetRelease) {
            throw new Exception(
                `Unable to find target ${tagName} release`,
                1668572613089
            );
        }
        
        return targetRelease;
    }
    
    public async downloadIfRequired (
        execute : boolean = true
    ) : Promise<Listr>
    {
        const listr = new Listr([
            {
                title: 'Checking releases directory',
                task: () => {
                    const releaseStackPath = this._context.paths.currentStack;
                    if (!fs.existsSync(releaseStackPath)) {
                        this._logger.log('Creating stack directory');
                        fs.mkdirSync(releaseStackPath, { recursive: true });
                    }
                }
            },
            {
                title: 'Checking target release binaries',
                task: async() => {
                    const releaseStackPath = this._context.paths.currentStack;
                    
                    // find release
                    const release = await this.findRelease(this._context.config.stack.version);
                    
                    const subListrOpts = [];
                    for (const asset of release.assets) {
                        const isBinary = StackBinaryDownloader.EXECUTABLES.includes(asset.name);
                        
                        const filePath = path.join(
                            releaseStackPath,
                            asset.name
                        );
                        
                        if (fs.existsSync(filePath)) {
                            // verify current file size
                            const currentFileStat = fs.statSync(filePath);
                            
                            if (currentFileStat.size == asset.size) {
                                continue;
                            }
                        }
                        
                        const title = isBinary
                            ? chalk.greenBright(asset.name)
                            : chalk.blueBright(asset.name)
                        ;
                        
                        subListrOpts.push({
                            title,
                            task: async(ctx, task) => new Promise(async (resolve, reject) => {
                                try {
                                    const { status, data, headers } = await axios.get(
                                        asset.browser_download_url,
                                        {
                                            responseType: 'stream',
                                            headers: {
                                                'Content-Type': 'application/gzip'
                                            },
                                            validateStatus: () => true,
                                        }
                                    );
                                    
                                    if (status !== 200) {
                                        throw new Exception(
                                            'Unable to download release',
                                            1668572702020
                                        );
                                    }
                                
                                    let loaded = 0;
                                    data.on('data', (chunk) => {
                                        loaded += chunk.length;
                                        const progress = (loaded / asset.size * 100)
                                            .toFixed(1)
                                            .padStart(5, ' ')
                                        ;
                                        task.title = title + ` [${progress}%]`;
                                    })
                                
                                    data.pipe(fs.createWriteStream(filePath, { encoding: 'binary' }))
                                    
                                    data.on('done', () => {
                                        if (isBinary) {
                                            fs.chmodSync(filePath, 0o755);
                                        }
                                        
                                        resolve(true);
                                    });
                                }
                                catch (e) {
                                    // remove file
                                    fs.rmSync(filePath);
                                    
                                    reject(e);
                                }
                            }),
                        });
                    }
                    
                    if (subListrOpts.length) {
                        return new Listr([
                            {
                                title: `Downloading stack binaries ${chalk.cyan(release.name)}`,
                                task: () => new Listr(subListrOpts, { concurrent: true }),
                            }
                        ]);
                    }
                    
                    return null;
                }
            }
        ], {
            renderer: this._context.listrRenderer
        });
        
        if (execute) {
            this._logger.log('Preparing Phala stack release');
            await listr.run();
            
            return listr;
        }
        else {
            return listr;
        }
    }
    
}
