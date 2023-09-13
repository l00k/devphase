import { BaseCommand } from '@/base/BaseCommand';
import { ContractManager, RunMode } from '@devphase/service';
import { ux } from '@oclif/core';
import { table } from '@oclif/core/lib/cli-ux/styled/table';
import chalk from 'chalk';
import sortBy from 'lodash/sortBy';


export class ContractListCommand
    extends BaseCommand<typeof ContractListCommand>
{
    
    public static summary : string = 'Lists managed contracts';
    
    public static flags = {
        ...ux.table.flags(),
    };
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const contractManager = new ContractManager(this.runtimeContext);
        
        let contractDefinitions = await contractManager.loadContractsDefFromStorageFile();
        contractDefinitions = sortBy(contractDefinitions, [ 'type', 'network', 'name' ]);
        
        const contractsOutput = Object.values(contractDefinitions)
            .map(contract => ({
                name: chalk.cyan(contract.name),
                type: contract.type,
                network: contract.network,
                contractId: contract.contractId,
                clusterId: contract.clusterId,
            }));
        
        if (!this.flags.json) {
            const columns : table.Columns<any> = {
                name: {},
                type: {},
                network: {},
                contractId: {},
                clusterId: {},
            };
            const options : table.Options = {
                columns: this.flags.columns,
                sort: this.flags.sort,
                filter: this.flags.filter,
                csv: this.flags.csv,
                extended: this.flags.extended,
                'no-truncate': this.flags['no-truncate'],
                'no-header': this.flags['no-header'],
            };
            
            ux.table(contractsOutput, columns, options);
        }
        
        return contractsOutput;
    }
    
}
