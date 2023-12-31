import { createSelector } from '@ngrx/store';
import { AppStore } from '../../interfaces/app-store';
import { MACHINES_STORE } from '../../interfaces/machines-state';

export const selectMachinesFeature = (state: AppStore) => state[MACHINES_STORE];

export const selectMachines = createSelector(
    selectMachinesFeature,
    (state) => state.entities
);

export const selectSelectedMachine = createSelector(
    selectMachinesFeature,
    (state) => state.selectedMachine
);

export const selectLoading = createSelector(
    selectMachinesFeature,
    (state) => state.loading
);

export const selectMachineById = (id: string) =>
    createSelector(selectMachines, (machines) => machines[id]);
