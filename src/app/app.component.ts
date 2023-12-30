/* eslint-disable @ngrx/avoid-mapping-selectors */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { Store } from '@ngrx/store';
import { LoadMachinesAction } from './stores/machines/machines.actions';
import { AppStore } from './interfaces/app-store';

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
    constructor(private store: Store<AppStore>) {}

    ngOnInit() {
        this.store.dispatch(LoadMachinesAction());
    }
}
