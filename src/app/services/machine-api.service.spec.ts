/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MachineApiService } from './machine-api.service';

describe('Service: MachineApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineApiService]
    });
  });

  it('should ...', inject([MachineApiService], (service: MachineApiService) => {
    expect(service).toBeTruthy();
  }));
});
