import { RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    NzTableFilterFn,
    NzTableFilterList,
    NzTableModule,
    NzTableSortFn,
    NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { AppStore } from '@interfaces/app-store.interface';
import { Machine } from '@models/machine.model';
import { selectMachines } from '@stores/machines/machines.selectors';
import { HelperService } from '@services/helper.service';
import { Observable, Subscription, take, tap } from 'rxjs';
import { selectSettingsFeature } from '@stores/settings/settings.selectors';
import { UpdatePageSizeAction } from '@stores/settings/settings.actions';
import { StatusFilterOption } from '@interfaces/machine-events-options.interface';
import {
    MACHINE_TYPE_OPTIONS,
    MACHINE_STATUS_FILTERS,
} from '@constants/machine.constant';
import { SelectOption } from '@interfaces/select.interface';

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
export class MachinesPageComponent implements OnInit, OnDestroy {
    machines$: Observable<Machine[]> = this.store.select(selectMachines).pipe(
        HelperService.mapObjectKeysToArray(),
        tap((machines) => this.buildAllFilterOptions(machines), take(1))
    );
    settings$ = this.store.select(selectSettingsFeature);

    listOfColumns: ColumnItem[] = [
        {
            name: 'ID',
            left: true,
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) => a.id.localeCompare(b.id),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: [],
            filterFn: (list: string[], item: Machine) =>
                list.some((id) => item.id.indexOf(id) !== -1),
        },
        {
            name: 'Machine Type',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.machine_type.localeCompare(b.machine_type),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: MACHINE_TYPE_OPTIONS,
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
            listOfFilter: MACHINE_STATUS_FILTERS,
            filterFn: (list: string[], item: Machine) =>
                list.some((status) => item.status.indexOf(status) !== -1),
        },
        {
            name: 'Install Date',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.install_date.localeCompare(b.install_date),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: [],
            filterFn: (list: string[], item: Machine) =>
                list.some(
                    (install_date) =>
                        item.install_date.indexOf(install_date) !== -1
                ),
        },
        {
            name: 'Last Maintenance',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.last_maintenance.localeCompare(b.last_maintenance),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: [],
            filterFn: (list: string[], item: Machine) =>
                list.some(
                    (last_maintenance) =>
                        item.last_maintenance !== last_maintenance
                ),
        },
        {
            name: 'Floor',
            sortOrder: null,
            sortFn: (a: Machine, b: Machine) =>
                a.floor.toString().localeCompare(b.floor.toString()),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: [],
            filterFn: (list: string[], item: Machine) =>
                list.some((floor) => item.floor.toString() !== floor),
        },
    ];

    private subscriptions = new Subscription();

    constructor(
        private store: Store<AppStore>,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.activatedRoute.queryParamMap.subscribe((params) => {
                this.filerOnStatusQueryParams(params);
                this.filterOnMachineTypeQueryParams(params);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onPageSizeChange(tablePageSize: number): void {
        this.store.dispatch(UpdatePageSizeAction({ tablePageSize }));
    }

    private filerOnStatusQueryParams(params: ParamMap): void {
        const statusParam: string[] =
            params.get('statusFilters')?.split(',') || [];

        this.listOfColumns[2].listOfFilter.forEach(
            (filter: StatusFilterOption) => {
                filter.byDefault = !!statusParam.some(
                    (status) => status === filter.value
                );
            }
        );
    }

    private filterOnMachineTypeQueryParams(params: ParamMap): void {
        const machineTypeParam: string[] =
            params.get('machineTypeFilters')?.split(',') || [];

        this.listOfColumns[1].listOfFilter.forEach((filter) => {
            filter.byDefault = !!machineTypeParam.some(
                (machineType) => machineType === filter.value
            );
        });
    }

    private buildAllFilterOptions(machines: Machine[]): void {
        if (!this.listOfColumns[0].listOfFilter.length) {
            this.listOfColumns[0].listOfFilter = this.buildFilterOptions(
                machines,
                'id'
            );
        }

        if (!this.listOfColumns[3].listOfFilter.length) {
            this.listOfColumns[3].listOfFilter = this.buildFilterOptions(
                machines,
                'install_date'
            );
        }

        if (!this.listOfColumns[4].listOfFilter.length) {
            this.listOfColumns[4].listOfFilter = this.buildFilterOptions(
                machines,
                'last_maintenance'
            );
        }

        if (!this.listOfColumns[5].listOfFilter.length) {
            this.listOfColumns[5].listOfFilter = this.buildFilterOptions(
                machines,
                'floor'
            );
        }
    }

    private buildFilterOptions(
        array: Machine[],
        selector: string
    ): SelectOption[] {
        const optionArray = array.map(
            (item: Machine) =>
                ({
                    text: item[selector as keyof Machine].toString(),
                    value: item[selector as keyof Machine],
                }) as SelectOption
        );

        return optionArray
            .filter(
                (option, index, self) =>
                    self.findIndex((t) => t.value === option.value) === index
            )
            .sort((a, b) => a.text.localeCompare(b.text));
    }
}
