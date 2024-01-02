import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { Place } from '@models/place';

describe('MapComponent', () => {
    let component: MapComponent;
    let fixture: ComponentFixture<MapComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MapComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create MapComponent', () => {
        // THEN
        expect(component).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });

    describe('ngOnChanges', () => {
        it('should call removeMarkers and addMarker', () => {
            // GIVEN
            const data = [{}, {}, {}];

            component.data = data as any;

            spyOn(component, 'removeMarkers');
            spyOn(component, 'addMarker');

            // WHEN
            component.ngOnChanges({ data: {} as any });

            // THEN
            expect(component.removeMarkers).toHaveBeenCalledTimes(1);
            expect(component.addMarker).toHaveBeenCalledTimes(data.length);
        });

        it('should not call removeMarkers and addMarker', () => {
            // GIVEN
            spyOn(component, 'removeMarkers');
            spyOn(component, 'addMarker');

            // WHEN
            component.ngOnChanges({});

            // THEN
            expect(component.removeMarkers).not.toHaveBeenCalled();
            expect(component.addMarker).not.toHaveBeenCalled();
        });
    });

    describe('ngAfterViewInit', () => {
        it('should create map', () => {
            // GIVEN
            component.mapElement = {
                nativeElement: document.createElement('div'),
            } as any;

            // WHEN
            component.ngAfterViewInit();

            // THEN
            expect(component.map).toBeTruthy();
        });
    });

    describe('addMarker', () => {
        it('should create marker', () => {
            // GIVEN
            component.ngAfterViewInit();

            // WHEN
            component.addMarker({
                longitude: 0,
                latitude: 0,
            } as Place);

            // THEN
            expect(component.markers.length).toBe(1);
        });
    });

    describe('removeMarkers', () => {
        it('should remove markers', () => {
            // GIVEN
            const marker1 = {
                remove: jasmine.createSpy(),
            } as any;
            component.markers = [marker1];

            // WHEN
            component.removeMarkers();

            // THEN
            expect(marker1.remove).toHaveBeenCalled();
            expect(component.markers.length).toBe(0);
        });
    });
});
