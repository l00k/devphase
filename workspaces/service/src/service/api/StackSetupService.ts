import {
    Accounts,
    ContractType,
    StackSetupMode,
    StackSetupOptions,
    StackSetupResult,
    SystemContract,
    SystemContractFileMap
} from '@/def';
import { ContractFactory, InstantiateOptions } from '@/service/api/ContractFactory';
import { DevPhase } from '@/service/api/DevPhase';
import { EventQueue } from '@/service/api/EventQueue';
import { PRuntimeApi } from '@/service/api/PRuntimeApi';
import { TxQueue } from '@/service/api/TxQueue';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Contract, ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { waitFor, WaitForOptions } from '@/utils/waitFor';
import * as PhalaSdk from '@phala/sdk';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import axios, { AxiosInstance } from 'axios';
import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import path from 'path';


type WorkerInfo = {
    workerUrl : string,
    api : AxiosInstance,
    rpc : PRuntimeApi,
    initalized : boolean,
    publicKey : string,
    ecdhPublicKey : string,
}

type ClusterInfo = {
    id : string,
    systemContract : string,
}

export class StackSetupService
{
    
    public static readonly LOGGER_SALT : string = '0x0000000000000000000000000000000000000000000000000000000000000123';
    
    protected static readonly MAP_STACK_TO_SETUP : Record<string, string> = {};
    
    protected _logger : Logger = new Logger('StackSetupService');
    
    protected _context : RuntimeContext;
    protected _api : ApiPromise;
    protected _txQueue : TxQueue;
    protected _eventQueue : EventQueue = new EventQueue();
    
    protected _accounts : Accounts = {};
    protected _suAccount : KeyringPair;
    protected _suAccountCert : PhalaSdk.CertificateData;
    protected _blockTime : number;
    protected _waitTime : number;
    
    protected _pinkSystemMetadata : ContractMetadata.Metadata;
    protected _tokenomicsMetatadata : ContractMetadata.Metadata;
    protected _sidevmopMetadata : ContractMetadata.Metadata;
    protected _logServerMetadata : ContractMetadata.Metadata;
    protected _logServerSideVmWasm : string;
    
    protected _workerInfo : WorkerInfo;
    protected _clusterInfo : ClusterInfo;
    
    protected _systemContract : Contract;
    protected _driverContracts : Record<SystemContract, Contract> = {
        ContractDeposit: null,
        SidevmOperation: null,
        PinkLogger: null,
    };
    
    protected _loggerId : string;
    
    
    public constructor (
        protected _devPhase : DevPhase
    )
    {
        this._context = this._devPhase.runtimeContext;
        
        this._accounts = this._devPhase.accounts;
        this._suAccount = this._devPhase.suAccount;
        this._blockTime = this._devPhase.runtimeContext.config.stack.blockTime;
        this._waitTime = Math.max(20_000, 4 * this._blockTime);
    }
    
    
    public async setupStack (options : StackSetupOptions) : Promise<StackSetupResult>
    {
        this._api = this._devPhase.api;
        this._txQueue = new TxQueue(this._api);
        
        this._suAccountCert = await PhalaSdk.signCertificate({
            api: this._api,
            pair: this._suAccount,
        });
        
        const setupStackVersion = StackSetupService.MAP_STACK_TO_SETUP[this._context.config.stack.version] ?? 'default';
        const setupStackMethod = 'setupStack_' + setupStackVersion;
        
        this._logger.log('Starting stack setup with', chalk.cyan(setupStackVersion), 'version');
        
        if (!this[setupStackMethod]) {
            throw new Exception(
                'Undefined setup environment procedure for this stack version',
                1668661427343
            );
        }
        
        return this[setupStackMethod](options);
    }
    
    /**
     * Default stack setup procedure
     */
    protected async setupStack_default (options : StackSetupOptions) : Promise<StackSetupResult>
    {
        const tasks : Listr.ListrTask[] = [
            {
                title: 'Fetch worker info',
                task: async() => {
                    this._workerInfo = await this.getWorkerInfo(options.workerUrl);
                }
            },
            {
                title: 'Load system contracts',
                task: async() => {
                    this._pinkSystemMetadata = await this.loadContract('system');
                    this._tokenomicsMetatadata = await this.loadContract(SystemContractFileMap[SystemContract.ContractDeposit]);
                    this._sidevmopMetadata = await this.loadContract(SystemContractFileMap[SystemContract.SidevmOperation]);
                    this._logServerMetadata = await this.loadContract(SystemContractFileMap[SystemContract.PinkLogger]);
                    this._logServerSideVmWasm = await this.loadWasm('log_server.sidevm');
                }
            },
        ];
        
        if (options.mode >= StackSetupMode.Minimal) {
            tasks.push(
                {
                    title: 'Register worker',
                    skip: async() => {
                        if (!this._workerInfo.initalized) {
                            return false;
                        }
                        
                        const onChainInfo = await this._api.query
                            .phalaRegistry.workers(this._workerInfo.ecdhPublicKey);
                        return !onChainInfo.isEmpty;
                    },
                    task: () => this.registerWorker(),
                },
                {
                    title: 'Register gatekeeper',
                    skip: async() => {
                        const gatekeepers : string[] = <any>(
                            await this._api.query
                                .phalaRegistry.gatekeeper()
                        ).toJSON();
                        
                        return gatekeepers.includes(this._workerInfo.publicKey);
                    },
                    task: () => this.registerGatekeeper(),
                },
                {
                    title: 'Upload Pink system code',
                    skip: async() => {
                        const requiredPinkSystemCode = this._pinkSystemMetadata.source.wasm;
                        const onChainPinkSystemCode = await this._api.query.phalaPhatContracts.pinkSystemCode();
                        return onChainPinkSystemCode[1].toString() === requiredPinkSystemCode;
                    },
                    task: () => this.uploadPinkSystemCode(),
                },
            );
        }
        
        tasks.push(
            {
                title: 'Verify cluster',
                task: async() => {
                    if (options.clusterId === undefined) {
                        const clustersNum : number = <any>(
                            await this._api.query
                                .phalaPhatContracts.clusterCounter()
                        ).toJSON();
                        
                        if (clustersNum === 0) {
                            options.clusterId = null;
                        }
                        else {
                            const onChainClusterInfos : any = (
                                await this._api.query
                                    .phalaPhatContracts.clusters
                                    .entries()
                            )[0];
                            
                            const clusterId = onChainClusterInfos[0].toHuman()[0];
                            const onChainClusterInfo = onChainClusterInfos[1].unwrap();
                            
                            this._clusterInfo = {
                                id: clusterId,
                                systemContract: onChainClusterInfo.systemContract.toHex()
                            };
                        }
                    }
                }
            }
        );
        
        if (options.mode >= StackSetupMode.Minimal) {
            tasks.push(
                {
                    title: 'Create cluster',
                    skip: () => !!this._clusterInfo,
                    task: async() => {
                        this._clusterInfo = await this.createCluster();
                    }
                }
            );
        }
        
        tasks.push(
            {
                title: 'Wait for cluster to be ready',
                task: () => this.waitForClusterReady()
            },
            {
                title: 'Create system contract API',
                task: async() => {
                    this._systemContract = await this._devPhase.getSystemContract(this._clusterInfo.id);
                }
            },
        );
        
        if (options.mode >= StackSetupMode.WithDrivers) {
            tasks.push(
                {
                    title: 'Deploy tokenomic driver',
                    skip: () => this.checkDriverContract(
                        this._tokenomicsMetatadata,
                        SystemContract.ContractDeposit
                    ),
                    task: () => this.deployDriverContract(
                        this._tokenomicsMetatadata,
                        SystemContract.ContractDeposit
                    )
                },
                {
                    title: 'Deploy SideVM driver',
                    skip: () => this.checkDriverContract(
                        this._sidevmopMetadata,
                        SystemContract.SidevmOperation
                    ),
                    task: () => this.deployDriverContract(
                        this._sidevmopMetadata,
                        SystemContract.SidevmOperation
                    )
                },
            );
        }
        
        if (options.mode >= StackSetupMode.WithLogger) {
            tasks.push(
                {
                    title: 'Calculate logger server contract ID',
                    task: async() => {
                        const { id } = await this._workerInfo.rpc.calculateContractId({
                            deployer: '0x' + Buffer.from(this._suAccount.publicKey).toString('hex'),
                            clusterId: this._clusterInfo.id,
                            codeHash: this._logServerMetadata.source.hash,
                            salt: StackSetupService.LOGGER_SALT,
                        });
                        this._loggerId = id;
                    }
                },
                {
                    title: 'Prepare chain for logger server',
                    skip: async() => {
                        const result = await this._driverContracts.SidevmOperation
                            .query['sidevmOperation::canDeploy'](
                            this._suAccountCert,
                            {},
                            this._loggerId
                        );
                        
                        const output = result.output.toJSON();
                        return output?.ok;
                    },
                    task: () => this.prepareLoggerServer()
                },
                {
                    title: 'Deploy logger server',
                    skip: () => this.checkDriverContract(
                        this._logServerMetadata,
                        SystemContract.PinkLogger
                    ),
                    task: () => this.deployDriverContract(
                        this._logServerMetadata,
                        SystemContract.PinkLogger,
                        { salt: StackSetupService.LOGGER_SALT }
                    )
                }
            );
        }
        
        const listr = new Listr(tasks, {
            renderer: this._context.listrRenderer
        });
        await listr.run();
        
        return {
            clusterId: this._clusterInfo.id,
        };
    }
    
    
    public async getWorkerInfo (workerUrl : string) : Promise<WorkerInfo>
    {
        const workerInfo : WorkerInfo = {
            workerUrl,
            api: axios.create({ baseURL: workerUrl }),
            rpc: new PRuntimeApi(workerUrl),
            initalized: false,
            publicKey: null,
            ecdhPublicKey: null,
        };
        
        const response = await workerInfo.rpc.getInfo();
        
        workerInfo.initalized = response.initialized;
        
        if (!workerInfo.initalized) {
            return workerInfo;
        }
        
        workerInfo.publicKey = '0x' + response.publicKey;
        workerInfo.ecdhPublicKey = '0x' + response.ecdhPublicKey;
        
        return workerInfo;
    }
    
    public async registerWorker ()
    {
        // register worker
        const result = await this._txQueue.submit(
            this._api.tx.sudo.sudo(
                this._api.tx.phalaRegistry.forceRegisterWorker(
                    this._workerInfo.publicKey,
                    this._workerInfo.ecdhPublicKey,
                    null
                )
            ),
            this._suAccount,
            true
        );
        
        await this._waitFor(
            async() => {
                return (
                    await this._api.query
                        .phalaRegistry.workers(this._workerInfo.ecdhPublicKey)
                ).toJSON();
            },
            this._waitTime
        );
    }
    
    public async registerGatekeeper ()
    {
        // check gatekeeper
        const gatekeepers : string[] = <any>(
            await this._api.query
                .phalaRegistry.gatekeeper()
        ).toJSON();
        
        if (!gatekeepers.includes(this._workerInfo.publicKey)) {
            // register gatekeeper
            const result = await this._txQueue.submit(
                this._api.tx.sudo.sudo(
                    this._api.tx.phalaRegistry.registerGatekeeper(
                        this._workerInfo.publicKey
                    )
                ),
                this._suAccount,
                true
            );
        }
        
        // wait for gate keeper master key
        try {
            await this._waitFor(
                async() => {
                    return !(
                        await this._api.query
                            .phalaRegistry.gatekeeperMasterPubkey()
                    ).isEmpty;
                },
                this._waitTime
            );
        }
        catch (e) {
            throw new Exception(
                'Could not fetch GK master key',
                1663941402827
            );
        }
    }
    
    public async loadContract (name : string) : Promise<any>
    {
        const contractPath = path.join(
            this._context.paths.currentStack,
            `${name}.contract`
        );
        if (!fs.existsSync(contractPath)) {
            throw new Exception(
                `${name} contract not found in stacks directory`,
                1668748436052
            );
        }
        
        return JSON.parse(
            fs.readFileSync(contractPath, { encoding: 'utf-8' })
        );
    }
    
    public async loadWasm (name : string) : Promise<any>
    {
        const systemContractPath = path.join(
            this._context.paths.currentStack,
            `${name}.wasm`
        );
        if (!fs.existsSync(systemContractPath)) {
            throw new Exception(
                `${name} wasm not found in stacks directory`,
                1675500668420
            );
        }
        
        return fs.readFileSync(systemContractPath, { encoding: 'hex' });
    }
    
    public async uploadPinkSystemCode () : Promise<void>
    {
        const systemCode = this._pinkSystemMetadata.source.wasm;
        
        const result = await this._txQueue.submit(
            this._api.tx.sudo.sudo(
                this._api.tx.phalaPhatContracts.setPinkSystemCode(systemCode)
            ),
            this._suAccount,
            true
        );
        
        await this._waitFor(
            async() => {
                const code = await this._api.query.phalaPhatContracts.pinkSystemCode();
                return code[1].toString() === systemCode;
            },
            this._waitTime
        );
    }
    
    public async createCluster () : Promise<ClusterInfo>
    {
        // create cluster
        const tx = this._api.tx.sudo.sudo(
            this._api.tx.phalaPhatContracts.addCluster(
                this._accounts.alice.address,   // owner
                { Public: null },               // access rights
                [ this._workerInfo.publicKey ], // workers keys
                1e12,                           // deposit
                1,                              // gas price
                1,                              // gas per item
                1,                              // gas per byte
                this._accounts.alice.address    // treasury account
            )
        );
        
        const result = await this._txQueue.submit(
            tx,
            this._suAccount,
            true
        );
        
        const clusterCreatedEvent = result.events.find(({ event }) => {
            return event.section === 'phalaPhatContracts'
                && event.method === 'ClusterCreated';
        });
        if (!clusterCreatedEvent) {
            throw new Exception(
                'Error while creating cluster',
                1663941940784
            );
        }
        
        const eventData = clusterCreatedEvent.event.data;
        const clusterId = eventData[0].toString();
        
        // deposit funds to cluster
        await this._txQueue.submit(
            this._api.tx
                .phalaPhatContracts.transferToCluster(
                100e12,
                clusterId,
                this._suAccount.address
            ),
            this._suAccount,
            true
        );
        
        return {
            id: clusterId,
            systemContract: eventData[1].toString(),
        };
    }
    
    public async waitForClusterReady () : Promise<boolean>
    {
        return this._waitFor(
            async() => {
                // cluster exists
                const cluster = await this._api.query
                    .phalaPhatContracts.clusters(this._clusterInfo.id);
                if (cluster.isEmpty) {
                    return false;
                }
                
                // cluster key set
                const clusterKey = await this._api.query
                    .phalaRegistry.clusterKeys(this._clusterInfo.id);
                if (clusterKey.isEmpty) {
                    return false;
                }
                
                // system contract key
                const contractKey = await this._api.query
                    .phalaRegistry.contractKeys(this._clusterInfo.systemContract);
                if (contractKey.isEmpty) {
                    return false;
                }
                
                return true;
            },
            this._waitTime
        );
    }
    
    public async checkDriverContract (
        contractMetadata : ContractMetadata.Metadata,
        name : SystemContract
    ) : Promise<boolean>
    {
        const { output } = await this._systemContract.query['system::getDriver'](
            this._suAccountCert,
            {},
            name
        );
        
        if (output.isEmpty || !output.asOk) {
            return false;
        }
        
        const contractId = output?.asOk.unwrap().toHex();
        
        const contractFactory = await ContractFactory.create(
            this._devPhase,
            contractMetadata,
            {
                contractType: ContractType.InkCode,
                clusterId: this._clusterInfo.id,
            }
        );
        
        this._driverContracts[name] = await contractFactory.attach(contractId);
        
        return true;
    }
    
    public async deployDriverContract (
        contractMetadata : ContractMetadata.Metadata,
        name : SystemContract,
        instantiateOpts : InstantiateOptions = {}
    )
    {
        const contractFactory = await ContractFactory.create(
            this._devPhase,
            contractMetadata,
            {
                contractType: ContractType.InkCode,
                clusterId: this._clusterInfo.id,
            }
        );
        
        await contractFactory.deploy();
        
        // create instance
        const instantiationEst = await contractFactory.estimateInstatiationFee(
            'default',
            [],
            {
                asAccount: this._suAccount,
                ...instantiateOpts
            }
        );
        
        instantiateOpts = {
            asAccount: this._suAccount,
            gasLimit: instantiationEst.gasRequired.refTime.toNumber(),
            storageDepositLimit: instantiationEst.storageDeposit.isCharge
                ? (instantiationEst.storageDeposit.asCharge.toNumber() ?? 0)
                : 0,
            adjustStake: 10e12,
            ...instantiateOpts
        };
        instantiateOpts.gasLimit = instantiateOpts.gasLimit * 100;
        
        const instance = await contractFactory.instantiate(
            'default',
            [],
            instantiateOpts
        );
        
        this._driverContracts[name] = instance;
        
        // set driver
        const { gasRequired, storageDeposit } = await this._systemContract.query
            ['system::setDriver'](
            this._suAccountCert,
            {},
            name,
            instance.contractId
        );
        
        const options = {
            value: 0,
            gasLimit: gasRequired,
            storageDepositLimit: storageDeposit.isCharge ? storageDeposit.asCharge : null
        };
        await this._txQueue.submit(
            this._systemContract.tx['system::setDriver'](
                options,
                name,
                instance.contractId
            ),
            this._suAccount
        );
        
        // grant admin
        await this._txQueue.submit(
            this._systemContract.tx['system::grantAdmin'](
                { gasLimit: 10e12 },
                instance.contractId
            ),
            this._suAccount
        );
        
        await this._waitFor(async() => {
            const { output } = await this._systemContract.query['system::getDriver'](
                this._suAccountCert,
                {},
                name
            );
            
            return !output.isEmpty && output?.asOk.isSome && output?.asOk.unwrap().eq(instance.contractId);
        }, this._waitTime);
    }
    
    public async prepareLoggerServer () : Promise<any>
    {
        await this._txQueue.submit(
            this._driverContracts.SidevmOperation.tx.allow(
                { gasLimit: 10e12 },
                this._loggerId
            ),
            this._suAccount,
            true
        );
        
        await this._waitFor(async() => {
            const result = await this._driverContracts.SidevmOperation
                .query['sidevmOperation::canDeploy'](
                this._suAccountCert,
                {},
                this._loggerId
            );
            const output = result.output.toJSON();
            return output?.ok;
        }, this._waitTime);
        
        await this._txQueue.submit(
            this._api.tx.phalaPhatContracts.clusterUploadResource(
                this._clusterInfo.id,
                ContractType.SidevmCode,
                '0x' + this._logServerSideVmWasm
            ),
            this._suAccount,
            true
        );
    }
    
    protected async _waitFor (
        callback : () => Promise<any>,
        timeLimit : number,
        options : WaitForOptions = {}
    )
    {
        const firstTry = await callback();
        if (firstTry) {
            return firstTry;
        }
        
        const result = waitFor(
            callback,
            timeLimit,
            options
        );
        
        return result;
    }
    
}
