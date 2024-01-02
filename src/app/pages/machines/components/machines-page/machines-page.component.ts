import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    NzTableFilterFn,
    NzTableFilterList,
    NzTableModule,
    NzTableSortFn,
    NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { AppStore } from '../../../../interfaces/app-store';
import { Machine } from '../../../../models/machine';
import { selectMachines } from '../../../../stores/machines/machines.selectors';
import { HelperService } from '../../../../services/helper.service';
import { Observable } from 'rxjs';
import { MachineStatusMap } from '@interfaces/machine-events-options';
import { selectSettingsFeature } from '@stores/settings/settings.selectors';
import { UpdatePageSizeAction } from '@stores/settings/settings.actions';

interface ColumnItem {
    left?: boolean;
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<Machine> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<Machine> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
}

@Component({
    standalone: true,
    selector: 'app-machines-page',
    templateUrl: './machines-page.component.html',
    styleUrls: ['./machines-page.component.css'],
    imports: [CommonModule, NzTableModule, RouterModule],
})
export class MachinesPageComponent {
    machines$: Observable<Machine[]> = this.store
        .select(selectMachines)
        .pipe(HelperService.mapObjectKeysToArray());
    settings$ = this.store.select(selectSettingsFeature);

    listOfColumns: ColumnItem[] = [
        {
            name: 'ID',
            left: true,
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) => a.id.localeCompare(b.id),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: false,
            listOfFilter: [],
            filterFn: null,
        },
        {
            name: 'Machine Type',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.machine_type.localeCompare(b.machine_type),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: [
                { text: 'Microscope', value: 'microscope' },
                { text: 'Measurement', value: 'measurement' },
            ],
            filterFn: (list: string[], item: Machine) =>
                list.some(
                    (machine_type) =>
                        item.machine_type.indexOf(machine_type) !== -1
                ),
        },
        {
            name: 'Status',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.status.localeCompare(b.status),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: [
                { text: 'Idle', value: MachineStatusMap.idle },
                { text: 'Running', value: MachineStatusMap.running },
                { text: 'Errored', value: MachineStatusMap.errored },
                { text: 'Repaired', value: MachineStatusMap.repaired },
                { text: 'Finished', value: MachineStatusMap.finished },
            ],
            filterFn: (list: string[], item: Machine) =>
                list.some((status) => item.status.indexOf(status) !== -1),
        },
        {
            name: 'Install Date',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.install_date.localeCompare(b.install_date),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: false,
            listOfFilter: [],
            filterFn: null,
        },
        {
            name: 'Last Maintenance',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.last_maintenance.localeCompare(b.last_maintenance),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: false,
            listOfFilter: [],
            filterFn: null,
        },
        {
            name: 'Floor',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.floor.toString().localeCompare(b.floor.toString()),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: false,
            listOfFilter: [],
            filterFn: null,
        },
    ];

    constructor(private store: Store<AppStore>) {}

    onPageSizeChange(tablePageSize: number): void {
        this.store.dispatch(UpdatePageSizeAction({ tablePageSize }));
    }
}
