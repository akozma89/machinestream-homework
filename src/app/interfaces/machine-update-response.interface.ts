import { MachineEventsOptions } from './machine-events-options.interface';

export interface MachineUpdateResponse extends MachineEventsOptions {
    machine_id: string;
    id: string;
}
