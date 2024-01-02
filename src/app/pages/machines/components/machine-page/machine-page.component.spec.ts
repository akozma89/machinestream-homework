import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinePageComponent } from './machine-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import machineSelectors from '@stores/machines/machines.selectors';
import {
    MachineColorStatusMap,
    MachineStatusMap,
} from '@interfaces/machine-events-options';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapComponent } from '@components/map/map.component';

@Component({
    standalone: true,
    selector: 'app-map',
    template: '',
})
class MockMapComponent {
    @Input() data = [];
}

describe('MachinePageComponent', () => {
    let component: MachinePageComponent;
    let fixture: ComponentFixture<MachinePageComponent>;
    let activatedRouteStub: Partial<ActivatedRoute>;
    let paramMapSpy: jasmine.Spy;
    let store: MockStore<any>;

    beforeEach(() => {
        paramMapSpy = jasmine.createSpy('paramMap');
        activatedRouteStub = {};

        Object.defineProperties(activatedRouteStub, {
            paramMap: {
                get: paramMapSpy,
            },
        });

        TestBed.configureTestingModule({
            imports: [MachinePageComponent],
            providers: [
                provideMockStore({}),
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteStub,
                },
            ],
        })
            .overrideComponent(MachinePageComponent, {
                remove: {
                    imports: [MapComponent],
                },
                add: {
                    imports: [MockMapComponent],
                },
            })
            .compileComponents();

        store = TestBed.get<Store>(Store);
        fixture = TestBed.createComponent(MachinePageComponent);
        component = fixture.componentInstance;
    });

    it('should create MachinePageComponent', () => {
        // GIVEN
        paramMapSpy.and.returnValue(
            of({
                get: () => 1,
            })
        );
        // WHEN
        fixture.detectChanges();

        // THEN
        expect(fixture.nativeElement).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should dispatch LoadMachinesAction', () => {
            // GIVEN
            const id = 'id';
            const machine$Mock = of({});

            paramMapSpy.and.returnValue(
                of({
                    get: () => id,
                })
            );

            spyOn(store, 'select').and.returnValue(machine$Mock);
            spyOn<any>(machineSelectors, 'selectMachineById');

            // WHEN
            component.ngOnInit();

            // THEN
            expect(component.machine$).toEqual(machine$Mock);
        });
    });

    describe('ngOnDestroy', () => {
        it('should unsubscribe', () => {
            // GIVEN
            spyOn(component['subscriptions'], 'unsubscribe');

            // WHEN
            component.ngOnDestroy();

            // THEN
            expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
        });
    });

    describe('getStatusColor', () => {
        it('should return color', () => {
            // GIVEN
            const status = MachineStatusMap.idle;

            // WHEN
            const color = component.getStatusColor(status);

            // THEN
            expect(color).toEqual(MachineColorStatusMap.idle);
        });
    });
});
