import { PlaceOptions } from '../interfaces/place-options';
import { Machine } from './machine';

export class Place {
    longitude: number;
    latitude: number;
    floors: PlaceOptions['floors'];

    constructor(options: PlaceOptions) {
        this.longitude = options.longitude;
        this.latitude = options.latitude;
        this.floors = options.floors || [];
    }

    addMachine(machine: Machine) {
        if (this.floors[machine.floor]) {
            this.floors[machine.floor].machines.push(machine);
        } else {
            this.floors[machine.floor] = {
                level: machine.floor,
                machines: [machine],
            };
        }
    }

    getAllMachines(): Machine[] {
        if (this.floors.length) {
            return this.floors.reduce((acc, floor) => {
                return acc.concat(floor.machines);
            }, [] as Machine[]);
        }

        return [];
    }

    getMachinesByLevel(level: number): Machine[] {
        return this.floors[level]?.machines || [];
    }
}
