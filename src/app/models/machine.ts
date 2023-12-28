import { MachineEvent } from './machine-event';

export class Machine {
    constructor(
        public id: string,
        public status: string,
        public machine_type: string,
        public longitude: number,
        public latitude: number,
        public last_maintenance: string,
        public install_date: string,
        public floor: number,
        public events: MachineEvent[]
    ) {}
}
