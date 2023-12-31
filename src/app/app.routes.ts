import { Routes } from '@angular/router';
import { SettingsPageComponent } from './pages/settings/components/settings-page/settings-page.component';
import { MapPageComponent } from './pages/map/components/map-page/map-page.component';
import { HomePageComponent } from './pages/home/components/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found/components/not-found-page/not-found-page.component';
import { MachinePageComponent } from './pages/machines/components/machine-page/machine-page.component';
import { MachinesPageComponent } from './pages/machines/components/machines-page/machines-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'machines',
        component: MachinesPageComponent,
    },
    {
        path: 'machines/:id',
        component: MachinePageComponent,
    },
    {
        path: 'map',
        component: MapPageComponent,
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
    },
    {
        path: '**',
        component: NotFoundPageComponent,
    },
];
