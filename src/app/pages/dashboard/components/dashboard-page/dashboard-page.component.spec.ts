import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppStore } from '@interfaces/app-store.interface';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardPageComponent', () => {
    let component: DashboardPageComponent;
    let fixture: ComponentFixture<DashboardPageComponent>;
    let store: MockStore<AppStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DashboardPageComponent, RouterTestingModule],
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
