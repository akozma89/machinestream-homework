import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MachineUpdateResponse } from '../interfaces/machine-update-response';

@Injectable({
    providedIn: 'root',
})
export class EventNotificationsService {
    event$ = new Subject<MachineUpdateResponse>();

    constructor() {}

    get notifications$() {
        return this.event$.asObservable();
    }

    notifyEvent(machine: MachineUpdateResponse) {
        this.event$.next(machine);
    }
}
