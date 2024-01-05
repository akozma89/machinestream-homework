import { environment } from '@environments/environment';
import {
    SETTINGS_STORE,
    SettingsState,
} from '@interfaces/settings-state.interface';
import { createReducer, on } from '@ngrx/store';
import { SHOW_MAP_ITEMS } from '@constants/map.constant';
import {
    UpdateMapViewAction,
    UpdateNotificationFrequencyAction,
    UpdateNotificationLevelAction,
    UpdatePageSizeAction,
    UpdateSettingsAction,
} from './settings.actions';
import { StorageService } from '@services/storage.service';

export const initialState: SettingsState = StorageService.getItem(
    SETTINGS_STORE
) || {
    mapView: SHOW_MAP_ITEMS.machines,
    notificationLevel: environment.settings.notificationLevel,
    notificationFrequency: environment.settings.notificationFrequency,
    tablePageSize: environment.settings.tablePageSize,
};

export const settingsReducer = createReducer(
    StorageService.storeItem(SETTINGS_STORE, initialState),
    on(
        UpdateSettingsAction,
        (
            state,
            { mapView, notificationLevel, notificationFrequency, tablePageSize }
        ): SettingsState =>
            StorageService.storeItem(SETTINGS_STORE, {
                ...state,
                mapView,
                notificationLevel,
                notificationFrequency,
                tablePageSize,
            })
    ),
    on(
        UpdateMapViewAction,
        (state, { mapView }): SettingsState =>
            StorageService.storeItem(SETTINGS_STORE, {
                ...state,
                mapView,
            })
    ),
    on(
        UpdateNotificationLevelAction,
        (state, { notificationLevel }): SettingsState =>
            StorageService.storeItem(SETTINGS_STORE, {
                ...state,
                notificationLevel: {
                    ...state.notificationLevel,
                    ...notificationLevel,
                },
            })
    ),
    on(
        UpdateNotificationFrequencyAction,
        (state, { notificationFrequency }): SettingsState =>
            StorageService.storeItem(SETTINGS_STORE, {
                ...state,
                notificationFrequency,
            })
    ),
    on(
        UpdatePageSizeAction,
        (state, { tablePageSize }): SettingsState =>
            StorageService.storeItem(SETTINGS_STORE, {
                ...state,
                tablePageSize,
            })
    )
);
