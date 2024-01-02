import { NotificationLevelSettings } from '@interfaces/settings-state';
import { createAction, props } from '@ngrx/store';
import { SHOW_MAP_ITEMS } from '@constants/map.constant';

export enum SettingAction {
    UpdateSettingsAction = '[Settings] Update All Settings',
    UpdateMapView = '[Settings] Update Map View',
    UpdateNotificationLevel = '[Settings] Update Notification Level',
    UpdateNotificationFrequency = '[Settings] Update Notification Frequency',
    UpdatePageSize = '[Settings] Update Page Size',
}

export const UpdateSettingsAction = createAction(
    SettingAction.UpdateSettingsAction,
    props<{
        mapView: SHOW_MAP_ITEMS;
        notificationLevel: NotificationLevelSettings;
        notificationFrequency: number;
        tablePageSize: number;
    }>()
);

export const UpdateMapViewAction = createAction(
    SettingAction.UpdateMapView,
    props<{ mapView: SHOW_MAP_ITEMS }>()
);

export const UpdateNotificationLevelAction = createAction(
    SettingAction.UpdateNotificationLevel,
    props<{ notificationLevel: NotificationLevelSettings }>()
);

export const UpdateNotificationFrequencyAction = createAction(
    SettingAction.UpdateNotificationFrequency,
    props<{ notificationFrequency: number }>()
);

export const UpdatePageSizeAction = createAction(
    SettingAction.UpdatePageSize,
    props<{ tablePageSize: number }>()
);
