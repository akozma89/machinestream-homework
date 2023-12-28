/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Socket } from 'phoenix';
import { environment } from '../../environments/environment';
import { MachineUpdate } from '../interfaces/machine-update';

@Injectable({
    providedIn: 'root',
})
export class MachineStatusWebsocketService {
    socket = new Socket(environment.wsUrl);
    channel: any;

    constructor() {
        if (!this.channel) {
            this.socket.connect();
            this.channel = this.socket.channel('events', {});
            this.channel.join();
        }
    }

    subscribe(subscriptionFn: (event: MachineUpdate) => void) {
        this.channel.on('new', subscriptionFn);
    }
}
