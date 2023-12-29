import { createReducer, on } from '@ngrx/store';
import { MachinesState } from '../../interfaces/machines-state';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Machine } from '../../models/machine';
import {
    AddMachineAction,
    LoadMachinesAction,
    LoadMachinesErrorAction,
    LoadMachinesSuccessAction,
    RemoveMachineAction,
    SelectMachineAction,
} from './machines.actions';

export const adapter: EntityAdapter<Machine> = createEntityAdapter<Machine>();

export const initialState: MachinesState = adapter.getInitialState({
    selectedMachine: undefined,
});

export const machinesReducer = createReducer(
    initialState,
    on(LoadMachinesAction, (state): MachinesState => state),
    on(LoadMachinesSuccessAction, (state, { machines }) =>
        adapter.addMany(machines, state)
    ),
    on(LoadMachinesErrorAction, (state, { error }) => {
        console.error(error);

        return state;
    }),
    on(AddMachineAction, (state, { machine }) =>
        adapter.addOne(machine, state)
    ),
    on(RemoveMachineAction, (state, { machineId }) =>
        adapter.removeOne(machineId, state)
    ),
    on(
        SelectMachineAction,
        (state, { machine }): MachinesState => ({
            ...state,
            selectedMachine: machine,
        })
    )
);
