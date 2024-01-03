import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStore } from '@interfaces/app-store';
import { Store } from '@ngrx/store';
import { selectSettingsFeature } from '@stores/settings/settings.selectors';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder } from '@angular/forms';
import { SHOW_MAP_ITEMS } from '@constants/map.constant';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';
import { UpdateSettingsAction } from '@stores/settings/settings.actions';
import {
    NotificationLevelSettings,
    SettingsState,
} from '@interfaces/settings-state';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    standalone: true,
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.css'],
    imports: [
        CommonModule,
        FormsModule,
        NzFormModule,
        NzSwitchModule,
        NzSelectModule,
        NzInputNumberModule,
        NzButtonModule,
        ReactiveFormsModule,
    ],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
    form = this.formBuilder.group({
        mapView: [SHOW_MAP_ITEMS.machines],
        notificationLevel: this.formBuilder.group({
            idle: [environment.settings.notificationLevel.idle],
            running: [environment.settings.notificationLevel.running],
            errored: [environment.settings.notificationLevel.errored],
            repaired: [environment.settings.notificationLevel.repaired],
            finished: [environment.settings.notificationLevel.finished],
        }),
        notificationFrequency: [environment.settings.notificationFrequency],
        tablePageSize: [environment.settings.tablePageSize],
    });
    settings$ = this.store.select(selectSettingsFeature);
    currentSettings!: SettingsState;
    SHOW_MAP_ITEMS = SHOW_MAP_ITEMS;

    private subscriptions = new Subscription();

    constructor(
        private store: Store<AppStore>,
        private formBuilder: FormBuilder,
        private notificationService: NzNotificationService,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.settings$.subscribe((settings) => {
                this.currentSettings = settings;
                this.form.setValue({
                    mapView: this.currentSettings.mapView,
                    notificationLevel: {
                        ...this.currentSettings.notificationLevel,
                    },
                    notificationFrequency:
                        this.currentSettings.notificationFrequency / 1000,
                    tablePageSize: this.currentSettings.tablePageSize,
                });
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    submitForm(): void {
        if (this.form.valid) {
            this.store.dispatch(
                UpdateSettingsAction({
                    mapView: this.form.value.mapView as SHOW_MAP_ITEMS,
                    notificationLevel: this.form.value
                        .notificationLevel as NotificationLevelSettings,
                    notificationFrequency:
                        (this.form.value.notificationFrequency &&
                            ((this.form.value.notificationFrequency *
                                1000) as number)) ||
                        environment.settings.notificationFrequency / 1000,
                    tablePageSize:
                        this.form.value.tablePageSize ||
                        environment.settings.tablePageSize,
                })
            );
            this.notificationService.success(
                'Settings updated',
                'Settings have been updated successfully'
            );
        }
    }

    resetForm(): void {
        if (this.currentSettings) {
            this.form.setValue({
                mapView: this.currentSettings.mapView,
                notificationLevel: {
                    ...this.currentSettings.notificationLevel,
                },
                notificationFrequency:
                    this.currentSettings.notificationFrequency / 1000,
                tablePageSize: this.currentSettings.tablePageSize,
            });
        }
    }
}
