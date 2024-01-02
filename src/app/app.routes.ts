import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import(
                './pages/dashboard/components/dashboard-page/dashboard-page.component'
            ).then((m) => m.DashboardPageComponent),
    },
    {
        path: 'machines',
        loadComponent: () =>
            import(
                './pages/machines/components/machines-page/machines-page.component'
            ).then((m) => m.MachinesPageComponent),
    },
    {
        path: 'machines/:id',
        loadComponent: () =>
            import(
                './pages/machines/components/machine-page/machine-page.component'
            ).then((m) => m.MachinePageComponent),
    },
    {
        path: 'map',
        loadComponent: () =>
            import('./pages/map/components/map-page/map-page.component').then(
                (m) => m.MapPageComponent
            ),
    },
    {
        path: 'settings',
        loadComponent: () =>
            import(
                './pages/settings/components/settings-page/settings-page.component'
            ).then((m) => m.SettingsPageComponent),
    },
    {
        path: '**',
        loadComponent: () =>
            import(
                './pages/not-found/components/not-found-page/not-found-page.component'
            ).then((m) => m.NotFoundPageComponent),
    },
];
