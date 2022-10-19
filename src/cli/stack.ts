import { Context } from '@/cli/Context';
import childProcess, { ChildProcess, SpawnOptions } from 'child_process';
import path from 'path';

export enum StartStackMode {
    Foreground = 'Foreground',
    Background = 'Background',
}

export type StackProcesses = {
    node: ChildProcess,
    pruntime: ChildProcess,
    pherry: ChildProcess,
}

export async function startStack (
    context : Context,
    mode : StartStackMode = StartStackMode.Background
) : Promise<StackProcesses>
{
    return {
        node: await startNode(context, mode),
        pruntime: await startPruntime(context, mode),
        pherry: await startPherry(context, mode),
    }
}

export async function startNode (
    context : Context,
    mode : StartStackMode = StartStackMode.Background
) : Promise<ChildProcess>
{
    return startComponent(context, 'node', mode);
}

export async function startPruntime (
    context : Context,
    mode : StartStackMode = StartStackMode.Background
) : Promise<ChildProcess>
{
    return startComponent(context, 'pruntime', mode);
}

export async function startPherry (
    context : Context,
    mode : StartStackMode = StartStackMode.Background
) : Promise<ChildProcess>
{
    return startComponent(context, 'pherry', mode);
}

async function startComponent (
    context : Context,
    component : string,
    mode : StartStackMode
) : Promise<ChildProcess>
{
    context.logger.log(`Starting ${component} component`);
    
    const workingDir = path.join(context.libPath, 'phala-dev-stack');
    const binPath = path.join(workingDir, 'component-starter.sh');
    
    // todo ld 2022-10-19 18:16:34 - maybe add envs from config?
    const options : SpawnOptions = {
        cwd: workingDir,
        env: process.env,
    };
    
    if (mode === StartStackMode.Foreground) {
        options.stdio = 'inherit';
    }
    
    return childProcess.spawn(
        binPath,
        [ component ],
        options
    );
}
