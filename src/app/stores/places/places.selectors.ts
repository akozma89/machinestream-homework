import { createSelector } from '@ngrx/store';
import { AppStore } from '../../interfaces/app-store.interface';
import { PLACES_STORE } from '../../interfaces/place-state.interface';

export const selectPlacesFeature = (state: AppStore) => state[PLACES_STORE];

export const selectPlaces = createSelector(
    selectPlacesFeature,
    (state) => state.entities
);

export const selectMachineCoordinates = createSelector(
    selectPlacesFeature,
    (state) => state.machineCoordinates
);

export const selectSelectedPlace = createSelector(
    selectPlacesFeature,
    (state) => state.selectedPlace
);
