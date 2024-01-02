import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    static storeItem<T>(key: string, initialState: T): T {
        window.localStorage.setItem(key, JSON.stringify(initialState));

        return initialState;
    }

    static getItem<T>(key: string): T {
        const initialState = window.localStorage.getItem(key);

        return initialState ? JSON.parse(initialState) : null;
    }
}
