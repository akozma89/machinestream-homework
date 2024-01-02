import { TestBed } from '@angular/core/testing';

import { MachineStatusWebsocketService } from './machine-status-websocket.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { EventNotificationsService } from './event-notifications.service';

describe('MachineStatusWebsocketService', () => {
    let service: MachineStatusWebsocketService;
    let store: MockStore<any>;
    let eventNotificationsServiceMock: jasmine.SpyObj<EventNotificationsService>;

    beforeEach(() => {
        eventNotificationsServiceMock = jasmine.createSpyObj(
            'EventNotificationsService',
            ['notifyEvent']
        );

        TestBed.configureTestingModule({
            providers: [
                provideMockStore({}),
                {
                    provide: EventNotificationsService,
                    useValue: eventNotificationsServiceMock,
                },
            ],
        });

        store = TestBed.get<Store>(Store);
        service = TestBed.inject(MachineStatusWebsocketService);
    });

    it('should create MachineStatusWebsocketService', () => {
        expect(store).toBeTruthy();
        expect(service).toBeTruthy();
    });
});
