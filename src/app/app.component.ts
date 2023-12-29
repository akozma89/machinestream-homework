/* eslint-disable @ngrx/avoid-mapping-selectors */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { LoadMachinesAction } from './stores/machines/machines.actions';
import { AppStore } from './interfaces/app-store';
import {
    selectMachineCoordinates,
    selectPlaces,
} from './stores/places/places.selectors';
import { selectMachines } from './stores/machines/machines.selectors';

inject();
injectSpeedInsights({
    framework: 'angular',
});

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'machinestream-homework';

    machines$ = this.store
        .select(selectMachines)
        .pipe(map((data) => Object.keys(data).map((key) => data[key])));
    places$ = this.store
        .select(selectPlaces)
        .pipe(map((data) => Object.keys(data).map((key) => data[key])));
    coordinates$ = this.store.select(selectMachineCoordinates);

    constructor(private store: Store<AppStore>) {}

    ngOnInit() {
        this.store.dispatch(LoadMachinesAction());
    }
}
