import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MachineUpdateResponse } from '../interfaces/machine-update-response.interface';

@Injectable({
    providedIn: 'root',
})
export class EventNotificationsService {
    event$ = new Subject<MachineUpdateResponse>();

    constructor() {}

    get notifications$(): Observable<MachineUpdateResponse> {
        return this.event$.asObservable();
    }

    notifyEvent(machine: MachineUpdateResponse): void {
        this.event$.next(machine);
    }
}
