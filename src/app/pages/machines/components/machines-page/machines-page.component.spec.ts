import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesPageComponent } from './machines-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { MACHINES_STORE } from '@interfaces/machines-state.interface';
import { SETTINGS_STORE } from '@interfaces/settings-state.interface';
import { AppStore } from '@interfaces/app-store.interface';
import { RouterTestingModule } from '@angular/router/testing';

describe('MachinesPageComponent', () => {
    let component: MachinesPageComponent;
    let fixture: ComponentFixture<MachinesPageComponent>;
    let store: MockStore<AppStore>;

    const initialState = {
        [MACHINES_STORE]: {
            entities: {},
            selectedMachine: null,
            loading: false,
        },
        [SETTINGS_STORE]: {
            mapView: 'map',
            notificationLevel: 'info',
            notificationFrequency: 5,
            tablePageSize: 10,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MachinesPageComponent, RouterTestingModule],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        store = TestBed.get<Store>(Store);
        fixture = TestBed.createComponent(MachinesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create MachinesPageComponent', () => {
        // THEN
        expect(component).toBeTruthy();
        expect(store).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });
});
