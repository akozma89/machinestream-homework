import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventNotificationsComponent } from './components/event-notifications/event-notifications.component';
import { Store } from '@ngrx/store';
import { AppStore } from './interfaces/app-store';
import { LoadMachinesAction } from './stores/machines/machines.actions';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, LayoutComponent, EventNotificationsComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isCollapsed = false;

    constructor(private store: Store<AppStore>) {}

    ngOnInit(): void {
        this.store.dispatch(LoadMachinesAction());
    }
}
