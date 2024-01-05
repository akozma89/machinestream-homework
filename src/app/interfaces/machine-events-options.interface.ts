import { SelectOption } from './select.interface';

export type MachineStatus = 'idle' | 'running' | 'errored' | 'repaired';

export type MachineStatusColor = 'gray' | 'blue' | 'red' | 'green';

export interface StatusFilterOption extends SelectOption {
    byDefault?: boolean;
}

export interface MachineEventsOptions {
    timestamp: string;
    status: MachineStatus;
}
