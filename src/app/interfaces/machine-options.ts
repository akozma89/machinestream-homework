import { MachineEventsOptions } from './machine-events-options';

export interface MachineOptions {
    id: string;
    status: string;
    machine_type: string;
    longitude: number;
    latitude: number;
    last_maintenance: string;
    install_date: string;
    floor: number;
    events?: MachineEventsOptions[];
}
