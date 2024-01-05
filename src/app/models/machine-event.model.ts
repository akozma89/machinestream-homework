import {
    MachineEventsOptions,
    MachineStatus,
} from '../interfaces/machine-events-options.interface';

export class MachineEvent {
    timestamp: string;
    status: MachineStatus;

    constructor(options: MachineEventsOptions) {
        this.timestamp = options.timestamp;
        this.status = options.status;
    }
}
