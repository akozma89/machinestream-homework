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
    UpdateMachineAction,
} from './machines.actions';
import { MachineEvent } from '../../models/machine-event';

export const adapter: EntityAdapter<Machine> = createEntityAdapter<Machine>();

export const initialState: MachinesState = adapter.getInitialState({
    selectedMachine: undefined,
    loading: true,
});

export const machinesReducer = createReducer(
    initialState,
    on(LoadMachinesAction, (state): MachinesState => state),
    on(LoadMachinesSuccessAction, (state, { machines }) =>
        adapter.addMany(machines, { ...state, loading: false })
    ),
    on(LoadMachinesErrorAction, (state, { error }) => {
        console.error(error);

        return { ...state, loading: false };
    }),
    on(AddMachineAction, (state, { machine }) =>
        adapter.addOne(machine, state)
    ),
    on(UpdateMachineAction, (state, { machineEvent }) => {
        const machine = state.entities[machineEvent.machine_id];

        if (machine) {
            const updatedMachine: Machine = {
                ...machine,
                status: machineEvent.status,
                events: [
                    ...machine.events,
                    new MachineEvent({
                        status: machineEvent.status,
                        timestamp: machineEvent.timestamp,
                    }),
                ],
            };

            return adapter.updateOne(
                {
                    id: machineEvent.machine_id,
                    changes: updatedMachine,
                },
                state
            );
        }

        return {
            ...state,
        };
    }),
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
