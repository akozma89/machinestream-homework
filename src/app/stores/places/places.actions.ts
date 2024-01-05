import { createAction, props } from '@ngrx/store';
import { Place } from '../../models/place.model';
import { Machine } from '../../models/machine.model';
import { MachineCoordinate } from '../../interfaces/place-state.interface';

export enum PlaceActionTypes {
    LoadMachineCoordinates = '[Place] Load Machine Coordinates',
    LoadPlaces = '[Place] Load Places',
    LoadPlacesSuccess = '[Place] Load Places Success',
    LoadPlacesError = '[Place] Load Places Error',
    AddPlace = '[Place] Add Place',
    RemovePlace = '[Place] Remove Place',
    SelectPlace = '[Place] Select Place',
}

export const LoadMachineCoordinates = createAction(
    PlaceActionTypes.LoadMachineCoordinates,
    props<{ coordinates: MachineCoordinate[] }>()
);

export const LoadPlacesAction = createAction(
    PlaceActionTypes.LoadPlaces,
    props<{ machines: Machine[] }>()
);

export const LoadPlacesSuccessAction = createAction(
    PlaceActionTypes.LoadPlacesSuccess,
    props<{ places: Place[] }>()
);

export const LoadPlacesErrorAction = createAction(
    PlaceActionTypes.LoadPlacesError,
    props<{ error: Error }>()
);

export const AddPlaceAction = createAction(
    PlaceActionTypes.AddPlace,
    props<{ place: Place }>()
);

export const RemovePlaceAction = createAction(
    PlaceActionTypes.RemovePlace,
    props<{ placeId: Place['id'] }>()
);

export const SelectPlaceAction = createAction(
    PlaceActionTypes.SelectPlace,
    props<{ place: Place }>()
);
