/* eslint-disable @ngrx/avoid-mapping-selectors */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { Store } from '@ngrx/store';
import { MACHINES_STORE, MachinesStore } from './interfaces/machines-state';
import { Observable, map } from 'rxjs';
import { Machine } from './models/machine';
import {
    MachineCoordinate,
    PLACES_STORE,
    PlacesStore,
} from './interfaces/place-state';
import { Place } from './models/place';
import { LoadMachinesAction } from './stores/machines/machines.actions';

inject();
injectSpeedInsights({
    framework: 'angular',
});

interface AppStore extends MachinesStore, PlacesStore {}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'machinestream-homework';
    /*machines$: Observable<(Machine | undefined)[]> = this.store
        .select(MACHINES_STORE)
        .pipe(
            map((data) => data.entities),
            map((data) => Object.keys(data).map((key) => data[key]))
        );
    places$: Observable<(Place | undefined)[]> = this.store
        .select(PLACES_STORE)
        .pipe(
            map((data) => data.entities),
            map((data) => Object.keys(data).map((key) => data[key]))
        );
    coordinates$: Observable<(MachineCoordinate | undefined)[]> = this.store
        .select(PLACES_STORE)
        .pipe(map((data) => data.machineCoordinates));*/

    constructor(private store: Store<AppStore>) {}

    ngOnInit() {
        this.store.dispatch(LoadMachinesAction());
    }
}
