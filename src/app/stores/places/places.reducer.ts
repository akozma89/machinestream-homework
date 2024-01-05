import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Place } from '../../models/place.model';
import { PlacesState } from '../../interfaces/place-state.interface';
import {
    AddPlaceAction,
    LoadMachineCoordinates,
    LoadPlacesAction,
    LoadPlacesErrorAction,
    LoadPlacesSuccessAction,
    RemovePlaceAction,
    SelectPlaceAction,
} from './places.actions';

export const adapter: EntityAdapter<Place> = createEntityAdapter<Place>();

export const initialState: PlacesState = adapter.getInitialState({
    selectedPlace: undefined,
    machineCoordinates: [],
});

export const placesReducer = createReducer(
    initialState,
    on(
        LoadMachineCoordinates,
        (state, { coordinates }): PlacesState => ({
            ...state,
            machineCoordinates: coordinates,
        })
    ),
    on(LoadPlacesAction, (state): PlacesState => state),
    on(LoadPlacesSuccessAction, (state, { places }) =>
        adapter.addMany(places, state)
    ),
    on(LoadPlacesErrorAction, (state, { error }) => {
        console.error(error);

        return state;
    }),
    on(AddPlaceAction, (state, { place }) => adapter.addOne(place, state)),
    on(RemovePlaceAction, (state, { placeId }) =>
        adapter.removeOne(placeId, state)
    ),
    on(
        SelectPlaceAction,
        (state, { place }): PlacesState => ({
            ...state,
            selectedPlace: place,
        })
    )
);
