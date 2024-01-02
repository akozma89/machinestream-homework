export const enum MachineStatusMap {
    idle = 'idle',
    running = 'running',
    errored = 'errored',
    repaired = 'repaired',
    finished = 'finished',
}

export const MachineColorStatusMap = {
    [MachineStatusMap.idle]: 'info',
    [MachineStatusMap.running]: 'warning',
    [MachineStatusMap.errored]: 'error',
    [MachineStatusMap.repaired]: 'success',
    [MachineStatusMap.finished]: 'success',
};

export type MachineStatus = 'idle' | 'running' | 'errored' | 'repaired';

export interface MachineEventsOptions {
    timestamp: string;
    status: MachineStatus;
}
