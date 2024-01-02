import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPageComponent } from './map-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { AppStore } from '@interfaces/app-store';
import { MACHINES_STORE } from '@interfaces/machines-state';
import { PLACES_STORE } from '@interfaces/place-state';
import { MapComponent } from '@components/map/map.component';

@Component({
    selector: 'app-map',
    standalone: true,
    template: '',
})
class MockMapComponent {
    @Input() data!: any[];
}

describe('MapPageComponent', () => {
    let component: MapPageComponent;
    let fixture: ComponentFixture<MapPageComponent>;
    let store: MockStore<AppStore>;

    const initialState = {
        [MACHINES_STORE]: {
            entities: {},
            selectedMachine: null,
            loading: false,
        },
        [PLACES_STORE]: {
            entities: {},
            selectedPlace: null,
            loading: false,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MapPageComponent],
            providers: [
                provideMockStore({
                    initialState,
                }),
            ],
        })
            .overrideComponent(MapPageComponent, {
                remove: {
                    imports: [MapComponent],
                },
                add: {
                    imports: [MockMapComponent],
                },
            })
            .compileComponents();

        store = TestBed.get<Store>(Store);
        fixture = TestBed.createComponent(MapPageComponent);
        component = fixture.componentInstance;
    });

    it('should create MapPageComponent', () => {
        // WHEN
        fixture.detectChanges();

        // THEN
        expect(component).toBeTruthy();
        expect(store).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });
});
