import { MachinesStore } from './machines-state';
import { PlacesStore } from './place-state';
import { SettingsStore } from './settings-state';

export interface AppStore extends MachinesStore, PlacesStore, SettingsStore {}
