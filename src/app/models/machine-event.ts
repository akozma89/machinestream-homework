import { MachineEventsOptions } from '../interfaces/machine-events-options';

export class MachineEvent {
    timestamp: string;
    status: string;

    constructor(options: MachineEventsOptions) {
        this.timestamp = options.timestamp;
        this.status = options.status;
    }
}
