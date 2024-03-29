import { EntityState } from '@ngrx/entity';
import { Machine } from '../models/machine.model';

export const MACHINES_STORE = 'machinesStore';

export interface MachinesStore {
    [MACHINES_STORE]: MachinesState;
}

export interface MachinesState extends EntityState<Machine> {
    selectedMachine?: Machine;
    loading: boolean;
}
