import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { EventNotificationsComponent } from '@components/event-notifications/event-notifications.component';
import { LayoutComponent } from '@components/layout/layout.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    template: '',
})
class MockLayoutComponent {}

@Component({
    selector: 'app-event-notifications',
    standalone: true,
    template: '',
})
class MockEventNotificationsComponent {}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let store: MockStore<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppComponent, RouterTestingModule],
            providers: [provideMockStore({})],
        })
            .overrideComponent(AppComponent, {
                remove: {
                    imports: [EventNotificationsComponent, LayoutComponent],
                },
                add: {
                    imports: [
                        MockEventNotificationsComponent,
                        MockLayoutComponent,
                    ],
                },
            })
            .compileComponents();

        store = TestBed.get<Store>(Store);
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create AppComponent', () => {
        // WHEN
        fixture.detectChanges();

        // THEN
        expect(component).toBeTruthy();
        expect(store).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should dispatch LoadMachinesAction', () => {
            // GIVEN
            spyOn(store, 'dispatch');

            // WHEN
            component.ngOnInit();

            // THEN
            expect(store.dispatch).toHaveBeenCalled();
        });
    });
});
