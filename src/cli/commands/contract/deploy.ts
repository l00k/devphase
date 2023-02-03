import { ContractType, RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { ContractManager } from '@/service/project/ContractManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Args, Flags, ux } from '@oclif/core';
import chalk from 'chalk';


export class ContractDeployCommand
    extends BaseCommand<typeof ContractDeployCommand>
{
    
    public static summary : string = 'Deploy contract';
    
    public static strict : boolean = false;
    
    public static flags = {
        contract: Flags.string({
            summary: 'Contract name',
            char: 'c',
            required: true,
        }),
        constructor: Flags.string({
            summary: 'Contract constructor to call (name)',
            char: 'o',
            required: true,
        }),
        type: Flags.string({
            summary: '',
            char: 't',
            default: ContractType.InkCode,
            options: Object.values(ContractType)
        }),
        network: Flags.string({
            summary: 'Target network to deploy (local default)',
            char: 'n',
            default: RuntimeContext.NETWORK_LOCAL,
        }),
        cluster: Flags.string({
            summary: 'Target cluster Id',
            char: 'l'
        }),
        account: Flags.string({
            summary: 'Account used to deploy (managed account key)',
            char: 'a',
            default: 'alice'
        }),
    };
    
    public static args = {
        ctorArgs: Args.string({
            description: 'Constructor arguments',
            multiple: true,
        })
    };
    
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const contractManager = new ContractManager(this.runtimeContext);
        
        const instance = await contractManager.deploy(
            this.flags.contract,
            this.flags.constructor,
            this.argsRaw,
            {
                contractType: <any>this.flags.type,
                clusterId: this.flags.cluster,
                network: this.flags.network,
                account: this.flags.account
            }
        );
        
        if (!this.flags.json) {
            ux.debug(chalk.green('Contract deployed'));
            ux.debug('Contract Id:', instance.contractId);
            ux.debug('Cluster Id: ', instance.clusterId);
        }
        
        return {
            contractId: instance.contractId,
            clusterId: instance.clusterId,
        };
    }
    
}
