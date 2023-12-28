import { MachineOptions } from '../interfaces/machine-options';
import { MachineEvent } from './machine-event';

export class Machine {
    id: string;
    status: string;
    machine_type: string;
    longitude: number;
    latitude: number;
    last_maintenance: string;
    install_date: string;
    floor: number;
    events: MachineEvent[];

    constructor(options: MachineOptions) {
        this.id = options.id;
        this.status = options.status;
        this.machine_type = options.machine_type;
        this.longitude = options.longitude;
        this.latitude = options.latitude;
        this.last_maintenance = options.last_maintenance;
        this.install_date = options.install_date;
        this.floor = options.floor;
        this.events = options.events || [];
    }
}
