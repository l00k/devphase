import { Accounts, ContractType } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Contract } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import * as Keyring from '@polkadot/keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';


export type ContractDefinition = {
    name : string,
    type : ContractType,
    network : string,
    contractId : string,
    clusterId? : string,
}


export class ContractManager
{
    
    protected _logger = new Logger(ContractManager.name);
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    ) {}
    
    public async loadContractsDefFromStorageFile () : Promise<ContractDefinition[]>
    {
        const contractsStoragePath = path.join(
            this._runtimeContext.paths.project,
            'contracts.json'
        );
        if (!fs.existsSync(contractsStoragePath)) {
            return null;
        }
        
        return JSON.parse(
            fs.readFileSync(contractsStoragePath, { encoding: 'utf-8' })
        );
    }
    
    public async loadContract<T extends Contract> (
        contractDef : ContractDefinition,
    ) : Promise<T>
    {
        const devPhase = this._runtimeContext.getDevPhase();
    
        const contractFactory = await devPhase.getFactory(
            contractDef.type,
            contractDef.name,
            { clusterId: contractDef.clusterId }
        );
        
        return contractFactory.attach(contractDef.contractId);
    }
    
    
    
}
