import { PlaceOptions } from '../interfaces/place-options';
import { Machine } from './machine';
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

    /*get machineState(): Observable<Machine[]> {
        return this.store.select('machines');
    }*/

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

    /*getAllMachines(): Observable<Machine[]> {
        if (this.floors.length) {
            return this.machineState.pipe(
                map((machines: Machine[]) =>
                    machines.filter(
                        (machine: Machine) =>
                            this.floors[machine.floor]?.machines.includes(
                                machine.id
                            )
                    )
                )
            );
        }

        return of([]);
    }

    getMachinesByLevel(level: number): Observable<Machine[]> {
        if (this.floors[level]?.machines.length) {
            return this.machineState.pipe(
                switchMap((machines: Machine[]) =>
                    of(
                        this.floors[level].machines.map((id: string) => {
                            return machines.find(
                                (machine: Machine) => machine.id === id
                            );
                        })
                    )
                )
            );
        }

        return of([]);
    }*/
}
