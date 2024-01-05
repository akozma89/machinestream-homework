import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { machinesReducer } from './stores/machines/machines.reducer';
import { MACHINES_STORE } from './interfaces/machines-state.interface';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PLACES_STORE } from './interfaces/place-state.interface';
import { placesReducer } from './stores/places/places.reducer';
import { provideEffects } from '@ngrx/effects';
import { MachinesEffects } from './stores/machines/machines.effects';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { PlacesEffect } from './stores/places/places.effects';
import { environment } from '../environments/environment';
import { EventNotificationsService } from './services/event-notifications.service';
import { provideNzIcons } from './icons-provider';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SETTINGS_STORE } from '@interfaces/settings-state.interface';
import { settingsReducer } from '@stores/settings/settings.reducer';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(routes),
        provideStore({
            [MACHINES_STORE]: machinesReducer,
            [PLACES_STORE]: placesReducer,
            [SETTINGS_STORE]: settingsReducer,
        }),
        provideEffects([MachinesEffects, PlacesEffect]),
        provideStoreDevtools({
            maxAge: 100,
            logOnly: !environment.production,
            autoPause: true,
            trace: true,
            traceLimit: 25,
            connectInZone: true,
        }),
        EventNotificationsService,
        provideNzIcons(),
        provideNzI18n(en_US),
        importProvidersFrom(FormsModule),
        importProvidersFrom(HttpClientModule),
        provideAnimations(),
    ],
};
