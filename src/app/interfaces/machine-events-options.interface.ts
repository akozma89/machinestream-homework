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
