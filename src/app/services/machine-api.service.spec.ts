import { TestBed } from '@angular/core/testing';
import { MachineApiService } from './machine-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MachineStatusWebsocketService } from './machine-status-websocket.service';

describe('Service: MachineApi', () => {
    let service: MachineApiService;
    let machineStatusWebsocketServiceMock: Partial<MachineStatusWebsocketService>;

    beforeEach(() => {
        machineStatusWebsocketServiceMock = {};
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MachineApiService,
                {
                    provide: MachineStatusWebsocketService,
                    useValue: machineStatusWebsocketServiceMock,
                },
            ],
        });

        service = TestBed.inject(MachineApiService);
    });

    it('should create MachineApi', () => {
        expect(service).toBeTruthy();
    });
});
