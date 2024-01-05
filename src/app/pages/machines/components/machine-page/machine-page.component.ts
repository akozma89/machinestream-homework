import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '@interfaces/app-store.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Machine } from '@models/machine.model';
import { selectMachineById } from '@stores/machines/machines.selectors';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { MapComponent } from '@components/map/map.component';
import { MACHINE_COLORS_STATUS_MAP } from '@constants/machine.constant';

const tabMap: { [key: string]: number } = {
    overall: 0,
    events: 1,
    map: 2,
};

@Component({
    standalone: true,
    selector: 'app-machine-page',
    templateUrl: './machine-page.component.html',
    styleUrls: ['./machine-page.component.css'],
    imports: [
        CommonModule,
        NzGridModule,
        NzTabsModule,
        NzCardModule,
        NzAvatarModule,
        NzSpinModule,
        NzTagModule,
        NzListModule,
        MapComponent,
        RouterLink,
    ],
})
export class MachinePageComponent implements OnInit, OnDestroy {
    currentTabIndex: number = 0;
    machine$!: Observable<Machine | undefined>;

    private subscriptions = new Subscription();

    constructor(
        private store: Store<AppStore>,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.currentTabIndex = 0;
        this.subscriptions.add(
            this.activatedRoute.paramMap.subscribe((params) => {
                this.machine$ = this.store.select(
                    selectMachineById(params.get('id') || '')
                );
            })
        );
        this.subscriptions.add(
            this.activatedRoute.queryParamMap.subscribe((params) => {
                this.currentTabIndex = tabMap[params.get('tab') || 'overall'];
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getStatusColor(status: string): string {
        const machineColorStatusMap: { [key: string]: string } =
            MACHINE_COLORS_STATUS_MAP;

        return machineColorStatusMap[status];
    }
}
