import axios from 'axios';
import * as PhalaSdk from '@phala/sdk';

export class PRuntimeApi
{
    
    public uri : string;
    public rpc : any;
    
    public constructor (endpoint)
    {
        this.uri = endpoint;
        
        const client = axios.create({
            baseURL: endpoint,
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            responseType: 'arraybuffer',
        });
        
        this.rpc = new PhalaSdk.PhactoryAPI((method, data, callback) => {
            client.post('/prpc/PhactoryAPI.' + method.name, data)
                .then((r) => callback(null, r.data))
                .catch((error) => callback(error));
        });
    }
    
    public async getInfo ()
    {
        return await this.rpc.getInfo({});
    }
    
    public async getContractInfo (contractId)
    {
        const contractIds = [ contractId ];
        const { contracts } = await this.rpc.getContractInfo({ contractIds });
        return contracts[0];
    }
    
    public async uploadSidevmCode (contract, code)
    {
        return await this.rpc.uploadSidevmCode({ contract, code });
    }
    
    public async calculateContractId (args)
    {
        return await this.rpc.calculateContractId(args);
    }
    
    public async addEndpoint (endpoint)
    {
        return await this.rpc.addEndpoint(endpoint);
    }
}
