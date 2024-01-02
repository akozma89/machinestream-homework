import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../interfaces/app-store';
import { ActivatedRoute } from '@angular/router';
import { Machine } from '../../../../models/machine';
import { selectMachineById } from '../../../../stores/machines/machines.selectors';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-machine-page',
    templateUrl: './machine-page.component.html',
    styleUrls: ['./machine-page.component.css'],
    imports: [CommonModule],
})
export class MachinePageComponent implements OnInit, OnDestroy {
    machine$!: Observable<Machine | undefined>;

    private subscriptions = new Subscription();

    constructor(
        private store: Store<AppStore>,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.activatedRoute.paramMap.subscribe((params) => {
                this.machine$ = this.store.select(
                    selectMachineById(params.get('id') || '')
                );
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
