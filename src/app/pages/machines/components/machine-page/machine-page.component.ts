import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../interfaces/app-store';
import { ActivatedRoute } from '@angular/router';
import { Machine } from '../../../../models/machine';
import { selectMachineById } from '../../../../stores/machines/machines.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-machine-page',
    templateUrl: './machine-page.component.html',
    styleUrls: ['./machine-page.component.css'],
    imports: [CommonModule],
})
export class MachinePageComponent implements OnInit {
    machine$!: Observable<Machine | undefined>;

    constructor(
        private store: Store<AppStore>,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.machine$ = this.store.select(
            selectMachineById(
                this.activatedRoute.snapshot.paramMap.get('id') || ''
            )
        );
    }
}
