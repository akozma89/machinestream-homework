import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotificationsComponent } from './event-notifications.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

describe('EventNotificationsComponent', () => {
    let component: EventNotificationsComponent;
    let fixture: ComponentFixture<EventNotificationsComponent>;
    let store: MockStore<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [EventNotificationsComponent, NzIconTestModule],
            providers: [provideMockStore({})],
        }).compileComponents();

        store = TestBed.get<Store>(Store);
        fixture = TestBed.createComponent(EventNotificationsComponent);
        component = fixture.componentInstance;
    });

    it('should create EventNotificationsComponent', () => {
        // WHEN
        fixture.detectChanges();

        // THEN
        expect(component).toBeTruthy();
        expect(store).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });
});
