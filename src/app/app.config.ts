import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { machinesReducer } from './stores/machines/machines.reducer';
import { MACHINES_STORE } from './interfaces/machines-state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PLACES_STORE } from './interfaces/place-state';
import { placesReducer } from './stores/places/places.reducer';
import { provideEffects } from '@ngrx/effects';
import { MachinesEffects } from './stores/machines/machines.effects';
import { provideHttpClient } from '@angular/common/http';
import { PlacesEffect } from './stores/places/places.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(routes),
        provideStore({
            [MACHINES_STORE]: machinesReducer,
            [PLACES_STORE]: placesReducer,
        }),
        provideEffects([MachinesEffects, PlacesEffect]),
        provideStoreDevtools({
            maxAge: 10,
        }),
    ],
};
