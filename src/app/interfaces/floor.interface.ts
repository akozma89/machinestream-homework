import { Machine } from '../models/machine.model';

export interface Floor {
    level: number;
    machines: Machine['id'][];
}
