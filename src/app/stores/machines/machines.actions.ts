/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { Machine } from '../../models/machine.model';
import { MachineUpdateResponse } from '../../interfaces/machine-update-response.interface';

export enum MachineActionTypes {
    LoadMachines = '[Machine] Load Machines',
    LoadMachinesSuccess = '[Machine] Load Machines Success',
    LoadMachinesError = '[Machine] Load Machines Error',
    AddMachine = '[Machine] Add Machine',
    UpdateMachine = '[Machine] Update Machine',
    RemoveMachine = '[Machine] Remove Machine',
    SelectMachine = '[Machine] Select Machine',
}

export const LoadMachinesAction = createAction(MachineActionTypes.LoadMachines);

export const LoadMachinesSuccessAction = createAction(
    MachineActionTypes.LoadMachinesSuccess,
    props<{ machines: Machine[] }>()
);

export const LoadMachinesErrorAction = createAction(
    MachineActionTypes.LoadMachinesError,
    props<{ error: Error }>()
);

export const AddMachineAction = createAction(
    MachineActionTypes.AddMachine,
    props<{ machine: Machine }>()
);

export const UpdateMachineAction = createAction(
    MachineActionTypes.UpdateMachine,
    props<{ machineEvent: MachineUpdateResponse }>()
);

export const RemoveMachineAction = createAction(
    MachineActionTypes.RemoveMachine,
    props<{ machineId: Machine['id'] }>()
);

export const SelectMachineAction = createAction(
    MachineActionTypes.SelectMachine,
    props<{ machine: Machine }>()
);
