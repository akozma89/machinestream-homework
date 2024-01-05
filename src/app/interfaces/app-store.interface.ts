import { MachinesStore } from './machines-state.interface';
import { PlacesStore } from './place-state.interface';
import { SettingsStore } from './settings-state.interface';

export interface AppStore extends MachinesStore, PlacesStore, SettingsStore {}
