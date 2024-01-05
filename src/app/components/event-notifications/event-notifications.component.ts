import { EventNotificationsService } from './../../services/event-notifications.service';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription, bufferWhen, interval } from 'rxjs';
import { AppStore } from '@interfaces/app-store.interface';
import { Store } from '@ngrx/store';
import { selectSettingsFeature } from '@stores/settings/settings.selectors';
import { NotificationLevelSettings } from '@interfaces/settings-state.interface';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { MachineUpdateResponse } from '@interfaces/machine-update-response.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { environment } from '@environments/environment';
import { MACHINE_COLORS_STATUS_MAP } from '@constants/machine.constant';

@Component({
    standalone: true,
    selector: 'app-event-notifications',
    templateUrl: './event-notifications.component.html',
    styleUrls: ['./event-notifications.component.css'],
    imports: [
        NzGridModule,
        NzNotificationModule,
        NzTagModule,
        NzIconModule,
        RouterLink,
    ],
})
export class EventNotificationsComponent implements OnInit, OnDestroy {
    @ViewChild(TemplateRef, { static: false })
    template?: TemplateRef<ElementRef>;

    notification$ = this.eventNotificationsService.notifications$;
    settings: {
        notificationLevel: NotificationLevelSettings;
        notificationFrequency: number;
    } = {
        notificationLevel: {
            ...environment.settings.notificationLevel,
        },
        notificationFrequency: environment.settings.notificationFrequency,
    };

    private subscriptions = new Subscription();

    constructor(
        private eventNotificationsService: EventNotificationsService,
        private notificationService: NzNotificationService,
        private store: Store<AppStore>
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            // eslint-disable-next-line @ngrx/no-store-subscription
            this.store.select(selectSettingsFeature).subscribe((settings) => {
                this.settings = {
                    notificationLevel: settings.notificationLevel,
                    notificationFrequency: settings.notificationFrequency,
                };
            })
        );
        this.subscriptions.add(
            this.notification$
                .pipe(
                    bufferWhen(() =>
                        interval(this.settings.notificationFrequency)
                    )
                )
                .subscribe((events) => {
                    if (events?.length) {
                        events.forEach((event) => this.showNotification(event));
                    }
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private showNotification(event: MachineUpdateResponse) {
        if (this.settings.notificationLevel[event.status]) {
            this.notificationService.template(this.template!, {
                nzData: {
                    color: MACHINE_COLORS_STATUS_MAP[event.status],
                    machine_id: event.machine_id,
                    status: event.status,
                },
                nzClass: MACHINE_COLORS_STATUS_MAP[event.status],
                nzPlacement: 'bottomRight',
            });
        }
    }
}
