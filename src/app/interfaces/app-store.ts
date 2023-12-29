import { MachinesStore } from './machines-state';
import { PlacesStore } from './place-state';

export interface AppStore extends MachinesStore, PlacesStore {}
