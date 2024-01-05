import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
    let service: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StorageService);
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    it('should create StorageService', () => {
        // THEN
        expect(service).toBeTruthy();
    });

    describe('storeItem', () => {
        it('should store item in localStorage', () => {
            // GIVEN
            const key = 'test';
            const initialState = { test: 'test' };

            // WHEN
            StorageService.storeItem(key, initialState);

            // THEN
            expect(window.localStorage.getItem(key)).toEqual(
                JSON.stringify(initialState)
            );
        });
    });

    describe('getItem', () => {
        it('should return item from localStorage', () => {
            // GIVEN
            const key = 'test';
            const initialState = { test: 'test' };

            // WHEN
            window.localStorage.setItem(key, JSON.stringify(initialState));

            // THEN
            expect(StorageService.getItem(key)).toEqual(initialState);
        });

        it('should return null if item not found in localStorage', () => {
            // GIVEN
            const key = 'test';

            // WHEN
            const result = StorageService.getItem(key);

            // THEN
            expect(result).toEqual(null);
        });
    });
});
