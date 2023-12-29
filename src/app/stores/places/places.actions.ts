import { createAction, props } from '@ngrx/store';
import { Place } from '../../models/place';
import { Machine } from '../../models/machine';
import { MachineCoordinate } from '../../interfaces/place-state';

export enum MachineActionTypes {
    LoadMachineCoordinates = '[Place] Load Machine Coordinates',
    LoadPlaces = '[Place] Load Places',
    LoadPlacesSuccess = '[Place] Load Places Success',
    LoadPlacesError = '[Place] Load Places Error',
    AddPlace = '[Place] Add Place',
    RemovePlace = '[Place] Remove Place',
    SelectPlace = '[Place] Select Place',
}

export const LoadMachineCoordinates = createAction(
    MachineActionTypes.LoadMachineCoordinates,
    props<{ coordinates: MachineCoordinate[] }>()
);

export const LoadPlacesAction = createAction(
    MachineActionTypes.LoadPlaces,
    props<{ machines: Machine[] }>()
);

export const LoadPlacesSuccessAction = createAction(
    MachineActionTypes.LoadPlacesSuccess,
    props<{ places: Place[] }>()
);

export const LoadPlacesErrorAction = createAction(
    MachineActionTypes.LoadPlacesError,
    props<{ error: Error }>()
);

export const AddPlaceAction = createAction(
    MachineActionTypes.AddPlace,
    props<{ place: Place }>()
);

export const RemovePlaceAction = createAction(
    MachineActionTypes.RemovePlace,
    props<{ placeId: Place['id'] }>()
);

export const SelectPlaceAction = createAction(
    MachineActionTypes.SelectPlace,
    props<{ place: Place }>()
);
