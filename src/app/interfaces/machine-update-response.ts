import { MachineEventsOptions } from './machine-events-options';

export interface MachineUpdateResponse extends MachineEventsOptions {
    machine_id: string;
    id: string;
}
