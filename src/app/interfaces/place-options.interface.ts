import { Floor } from './floor.interface';

export interface PlaceOptions {
    longitude: number;
    latitude: number;
    floors?: Floor[];
}
