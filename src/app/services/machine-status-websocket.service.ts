import { EventNotificationsService } from './event-notifications.service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Socket } from 'phoenix';
import { environment } from '../../environments/environment';
import { MachineUpdateResponse } from '../interfaces/machine-update-response.interface';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { UpdateMachineAction } from '../stores/machines/machines.actions';

@Injectable({
    providedIn: 'root',
})
export class MachineStatusWebsocketService {
    socket = new Socket(environment.wsUrl);
    channel: any;
    subscription$ = new Subject<MachineUpdateResponse>();

    constructor(
        private store: Store,
        private eventNotificationsService: EventNotificationsService
    ) {
        this.initializeSocket();
    }

    get machineUpdates$(): Observable<MachineUpdateResponse> {
        return this.subscription$.asObservable();
    }

    private initializeSocket() {
        if (!this.channel) {
            this.socket.connect();
            this.channel = this.socket.channel('events', {});
            this.channel.join();
            this.subscription$.subscribe((event: MachineUpdateResponse) => {
                this.store.dispatch(
                    UpdateMachineAction({ machineEvent: event })
                );
                this.eventNotificationsService.notifyEvent(event);
            });
            this.channel.on('new', (event: MachineUpdateResponse) =>
                this.subscription$.next(event)
            );
        }
    }
}
