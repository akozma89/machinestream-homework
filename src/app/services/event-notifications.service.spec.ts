/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventNotificationsService } from './event-notifications.service';

describe('Service: EventNotifications', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventNotificationsService]
    });
  });

  it('should ...', inject([EventNotificationsService], (service: EventNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
