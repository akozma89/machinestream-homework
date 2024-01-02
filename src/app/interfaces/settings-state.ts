import { SHOW_MAP_ITEMS } from 'app/constants/map.constant';

export const SETTINGS_STORE = 'settingsStore';

export interface SettingsStore {
    [SETTINGS_STORE]: SettingsState;
}

export interface SettingsState {
    mapView: SHOW_MAP_ITEMS;
    notificationLevel: NotificationLevelSettings;
    notificationFrequency: number;
    tablePageSize: number;
}

export interface NotificationLevelSettings {
    idle: boolean;
    running: boolean;
    errored: boolean;
    repaired: boolean;
    finished: boolean;
}
