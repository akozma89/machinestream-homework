import { EventNotificationsService } from './../../services/event-notifications.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MachineStatusMap } from '../../interfaces/machine-events-options';

@Component({
    standalone: true,
    selector: 'app-event-notifications',
    templateUrl: './event-notifications.component.html',
    styleUrls: ['./event-notifications.component.css'],
    imports: [NzNotificationModule],
})
export class EventNotificationsComponent implements OnInit {
    notification$ = this.eventNotificationsService.notifications$;

    constructor(
        private eventNotificationsService: EventNotificationsService,
        private notificationService: NzNotificationService
    ) {}

    ngOnInit(): void {
        this.notification$.subscribe((event) => {
            this.notificationService.create(
                MachineStatusMap[event.status],
                'Machine Event',
                `${event.machine_id} is ${event.status}`,
                { nzPlacement: 'bottomRight' }
            );
        });
    }
}
