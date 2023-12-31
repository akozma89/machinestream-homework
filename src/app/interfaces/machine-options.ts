import { MachineEventsOptions, MachineStatus } from './machine-events-options';

export interface MachineOptions {
    id: string;
    status: MachineStatus;
    machine_type: string;
    longitude: number;
    latitude: number;
    last_maintenance: string;
    install_date: string;
    floor: number;
    events?: MachineEventsOptions[];
}
