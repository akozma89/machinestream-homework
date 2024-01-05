import { PlaceOptions } from '../interfaces/place-options.interface';
import { Machine } from './machine.model';
import { v4 as uuidv4 } from 'uuid';

export class Place {
    id = uuidv4();
    longitude!: number;
    latitude!: number;
    floors: PlaceOptions['floors'] = [];

    constructor(options: PlaceOptions) {
        this.longitude = options.longitude;
        this.latitude = options.latitude;
        this.floors = options.floors || [];
    }

    addMachine(machine: Machine) {
        if (this.floors && this.floors[machine.floor]) {
            this.floors[machine.floor].machines.push(machine.id);
        } else if (this.floors) {
            this.floors[machine.floor] = {
                level: machine.floor,
                machines: [machine.id],
            };
        }
    }
}
