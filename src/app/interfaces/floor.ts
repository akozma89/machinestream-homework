import { Machine } from '../models/machine';

export interface Floor {
    level: number;
    machines: Machine[];
}
