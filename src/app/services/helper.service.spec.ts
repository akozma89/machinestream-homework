import { TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';
import { of } from 'rxjs';

describe('Service: Helper', () => {
    let service: HelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HelperService);
    });

    it('should create HelperService', () => {
        // THEN
        expect(service).toBeTruthy();
    });

    describe('toRad', () => {
        it('should convert degrees to radians', () => {
            // GIVEN
            const degrees = 180;

            // WHEN
            const result = HelperService.toRad(degrees);

            // THEN
            expect(result).toEqual(Math.PI);
        });
    });

    describe('distanceBetween', () => {
        it('should return distance between two coordinates', () => {
            // GIVEN
            const coords1 = {
                longitude: 0,
                latitude: 0,
            };
            const coords2 = {
                longitude: 0,
                latitude: 0,
            };

            // WHEN
            const result = HelperService.distanceBetween(coords1, coords2);

            // THEN
            expect(result).toEqual(0);
        });
    });

    describe('mapObjectKeysToArray', () => {
        it('should convert object keys to array', () => {
            // GIVEN
            const data = {
                test: 'test',
            };

            // WHEN
            of(data)
                .pipe(HelperService.mapObjectKeysToArray())
                .subscribe((result) => {
                    // THEN
                    expect(result).toEqual(['test']);
                });
        });
    });
});
