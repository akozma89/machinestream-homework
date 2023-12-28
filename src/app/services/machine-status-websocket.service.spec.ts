import { TestBed } from '@angular/core/testing';

import { MachineStatusWebsocketService } from './machine-status-websocket.service';

describe('MachineStatusWebsocketService', () => {
  let service: MachineStatusWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineStatusWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
