import { AppStore } from '@interfaces/app-store.interface';
import { SETTINGS_STORE } from '@interfaces/settings-state.interface';
import { createSelector } from '@ngrx/store';

export const selectSettingsFeature = (state: AppStore) => state[SETTINGS_STORE];

export const selectMapView = createSelector(
    selectSettingsFeature,
    (state) => state.mapView
);

export const selectNotificationLevel = createSelector(
    selectSettingsFeature,
    (state) => state.notificationLevel
);

export const selectNotificationFrequency = createSelector(
    selectSettingsFeature,
    (state) => state.notificationFrequency
);
