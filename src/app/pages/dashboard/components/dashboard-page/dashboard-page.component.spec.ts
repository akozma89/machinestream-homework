/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppStore } from '@interfaces/app-store';
import { Store } from '@ngrx/store';

describe('DashboardPageComponent', () => {
    let component: DashboardPageComponent;
    let fixture: ComponentFixture<DashboardPageComponent>;
    let store: MockStore<AppStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DashboardPageComponent],
            providers: [provideMockStore({})],
        }).compileComponents();

        store = TestBed.get<Store>(Store);
        fixture = TestBed.createComponent(DashboardPageComponent);
        component = fixture.componentInstance;
    });

    it('should create DashboardPageComponent', () => {
        // WHEN
        fixture.detectChanges();

        // THEN
        expect(component).toBeTruthy();
        expect(store).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });
});
