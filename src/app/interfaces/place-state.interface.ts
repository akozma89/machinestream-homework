import { EntityState } from '@ngrx/entity';
import { Place } from '../models/place.model';
import { Machine } from '../models/machine.model';

export const PLACES_STORE = 'placesStore';

export interface PlacesStore {
    [PLACES_STORE]: PlacesState;
}

export interface MachineCoordinate {
    longitude: number;
    latitude: number;
    machineId: Machine['id'];
    placeId: Place['id'];
    floor: Machine['floor'];
}

export interface PlacesState extends EntityState<Place> {
    machineCoordinates: MachineCoordinate[];
    selectedPlace?: Place;
}
