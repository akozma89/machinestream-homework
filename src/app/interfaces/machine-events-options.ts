export const enum MachineStatusMap {
    idle = 'idle',
    running = 'running',
    errored = 'errored',
    repaired = 'repaired',
    finished = 'finished',
}

export const MachineStatusFilters: StatusFilterOption[] = [
    { text: 'Idle', value: MachineStatusMap.idle },
    { text: 'Running', value: MachineStatusMap.running },
    { text: 'Errored', value: MachineStatusMap.errored },
    { text: 'Repaired', value: MachineStatusMap.repaired },
    { text: 'Finished', value: MachineStatusMap.finished },
];

export const MachineColorStatusMap = {
    [MachineStatusMap.idle]: 'info',
    [MachineStatusMap.running]: 'warning',
    [MachineStatusMap.errored]: 'error',
    [MachineStatusMap.repaired]: 'success',
    [MachineStatusMap.finished]: 'success',
};

export type MachineStatus = 'idle' | 'running' | 'errored' | 'repaired';

export interface StatusFilterOption {
    text: string;
    value: string;
    byDefault?: boolean;
}

export interface MachineEventsOptions {
    timestamp: string;
    status: MachineStatus;
}
