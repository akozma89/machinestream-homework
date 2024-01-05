import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageComponent } from './settings-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { AppStore } from '@interfaces/app-store.interface';
import { SETTINGS_STORE } from '@interfaces/settings-state.interface';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SettingsPageComponent', () => {
    let component: SettingsPageComponent;
    let fixture: ComponentFixture<SettingsPageComponent>;
    let store: MockStore<AppStore>;

    const initialState = {
        [SETTINGS_STORE]: {
            mapView: 'machines',
            notificationLevel: {
                idle: true,
                running: true,
                errored: true,
                repaired: true,
                finished: true,
            },
            notificationFrequency: 5,
            tablePageSize: 10,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SettingsPageComponent],
            providers: [
                provideMockStore({
                    initialState,
                }),
                provideAnimations(),
            ],
        }).compileComponents();

        store = TestBed.get<Store>(Store);
        fixture = TestBed.createComponent(SettingsPageComponent);
        component = fixture.componentInstance;
    });

    it('should create SettingsPageComponent', () => {
        // WHEN
        fixture.detectChanges();

        // THEN
        expect(component).toBeTruthy();
        expect(store).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });
});
