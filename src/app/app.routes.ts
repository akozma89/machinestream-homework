import { Routes } from '@angular/router';
import { SettingsPageComponent } from './pages/settings/components/settings-page/settings-page.component';
import { MapPageComponent } from './pages/map/components/map-page/map-page.component';
import { HomePageComponent } from './pages/home/components/home-page/home-page.component';
import { ListPageComponent } from './pages/list/components/list-page/list-page.component';
import { NotFoundPageComponent } from './pages/not-found/components/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'list',
        component: ListPageComponent,
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
