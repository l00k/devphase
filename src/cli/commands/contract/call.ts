import { ContractType, RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { ContractCallType, ContractManager } from '@/service/project/ContractManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Args, Flags, ux } from '@oclif/core';
import chalk from 'chalk';


export class ContractCallCommand
    extends BaseCommand<typeof ContractCallCommand>
{
    
    public static summary : string = 'Deploy contract';
    
    public static strict : boolean = false;
    
    public static flags = {
        contract: Flags.string({
            summary: 'Contract name',
            char: 'c',
            required: true,
        }),
        type: Flags.string({
            summary: '',
            char: 't',
            default: ContractType.InkCode,
            options: Object.values(ContractType)
        }),
        id: Flags.string({
            summary: 'Contract ID',
            char: 'i',
            required: true,
        }),
        accessor: Flags.string({
            summary: 'Method type: transaction or query',
            char: 'a',
            default: ContractCallType.Query,
            options: Object.values(ContractCallType)
        }),
        method: Flags.string({
            summary: 'Contract method to call (name)',
            char: 'm',
            required: true,
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
            summary: 'Account used to call (managed account key)',
            char: 'a',
            default: 'alice'
        }),
    };
    
    public static args = {
        args: Args.string({
            description: 'Call arguments',
            multiple: true,
        })
    };
    
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const contractManager = new ContractManager(this.runtimeContext);
        
        const outcome = await contractManager.contractCall(
            this.flags.contract,
            this.flags.id,
            <any>this.flags.accessor,
            this.flags.method,
            this.argsRaw,
            {
                contractType: <any>this.flags.type,
                clusterId: this.flags.cluster,
                network: this.flags.network,
                account: this.flags.account
            }
        );
        
        if (!this.flags.json) {
            ux.debug(chalk.blue('Call result'));
            console.dir(outcome);
        }
        
        return outcome;
    }
    
}
