import { Router, RouterLink } from '@angular/router';
import {
    STACKED_DISTRIBUTION_OPTIONS,
    PIE_BREAKDOWN_OPTIONS,
} from '@constants/chart.constant';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { AppStore } from '@interfaces/app-store.interface';
import { Machine } from '@models/machine.model';
import { Store } from '@ngrx/store';
import { HelperService } from '@services/helper.service';
import { selectMachines } from '@stores/machines/machines.selectors';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { Observable, map } from 'rxjs';
import {
    MACHINE_COLORS_STATUS_MAP,
    MACHINE_STATUS_MAP,
} from '@constants/machine.constant';

@Component({
    standalone: true,
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
    imports: [
        CommonModule,
        NzGridModule,
        NzStatisticModule,
        NgxChartsModule,
        RouterLink,
    ],
})
export class DashboardPageComponent {
    readonly MachineColorStatusMap = MACHINE_COLORS_STATUS_MAP;
    readonly showMachineTypePieChart = !environment.production;

    machines$: Observable<Machine[]> = this.store
        .select(selectMachines)
        .pipe(HelperService.mapObjectKeysToArray());
    idleMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MACHINE_STATUS_MAP.idle
            )
        )
    );
    runningMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MACHINE_STATUS_MAP.running
            )
        )
    );
    erroredMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MACHINE_STATUS_MAP.errored
            )
        )
    );
    repairedMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MACHINE_STATUS_MAP.repaired
            )
        )
    );
    finishedMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MACHINE_STATUS_MAP.finished
            )
        )
    );

    stackedMachineStatusDistribution = {
        ...STACKED_DISTRIBUTION_OPTIONS,
        yAxisLabel: 'Status',
        xAxisLabel: 'Count',
        data$: this.machines$.pipe(
            map((machines) =>
                this.buildStackedMachineStatusDistribution(machines)
            )
        ),
    };

    pieMachineStatusBreakdown = {
        ...PIE_BREAKDOWN_OPTIONS,
        data$: this.machines$.pipe(
            map((machines) => this.buildPieMachineStatusBreakdown(machines))
        ),
    };

    constructor(
        private store: Store<AppStore>,
        private router: Router
    ) {}

    selectChartItem(event: {
        name: string;
        value: number;
        label: string;
        series: string;
    }) {
        this.router.navigate(['/machines'], {
            queryParams: {
                machineTypeFilters: event.label.toLowerCase(),
                statusFilters: event.series.toLowerCase(),
            },
        });
    }

    private buildStackedMachineStatusDistribution(machines: Machine[]) {
        const machineTypes = machines.reduce(
            (acc: string[], machine: Machine) => {
                if (!acc.includes(machine.machine_type)) {
                    acc.push(machine.machine_type);
                }

                return acc;
            },
            []
        );
        const idle = {
            name: 'Idle',
            series: machineTypes.map((machineType) => {
                return {
                    name: machineType,
                    value: machines.filter(
                        (machine) =>
                            machine.machine_type === machineType &&
                            machine.status === MACHINE_STATUS_MAP.idle
                    ).length,
                };
            }),
        };
        const running = {
            name: 'Running',
            series: machineTypes.map((machineType) => {
                return {
                    name: machineType,
                    value: machines.filter(
                        (machine) =>
                            machine.machine_type === machineType &&
                            machine.status === MACHINE_STATUS_MAP.running
                    ).length,
                };
            }),
        };
        const errored = {
            name: 'Errored',
            series: machineTypes.map((machineType) => {
                return {
                    name: machineType,
                    value: machines.filter(
                        (machine) =>
                            machine.machine_type === machineType &&
                            machine.status === MACHINE_STATUS_MAP.errored
                    ).length,
                };
            }),
        };
        const repaired = {
            name: 'Repaired',
            series: machineTypes.map((machineType) => {
                return {
                    name: machineType,
                    value: machines.filter(
                        (machine) =>
                            machine.machine_type === machineType &&
                            machine.status === MACHINE_STATUS_MAP.repaired
                    ).length,
                };
            }),
        };
        const finished = {
            name: 'Finished',
            series: machineTypes.map((machineType) => {
                return {
                    name: machineType,
                    value: machines.filter(
                        (machine) =>
                            machine.machine_type === machineType &&
                            machine.status === MACHINE_STATUS_MAP.finished
                    ).length,
                };
            }),
        };

        return [idle, running, errored, repaired, finished];
    }

    private buildPieMachineStatusBreakdown(machines: Machine[]) {
        const machineTypes = machines.reduce(
            (acc: string[], machine: Machine) => {
                if (!acc.includes(machine.machine_type)) {
                    acc.push(machine.machine_type);
                }

                return acc;
            },
            []
        );

        return machineTypes.map((machineType) => {
            return {
                name: machineType,
                value: machines.filter(
                    (machine) => machine.machine_type === machineType
                ).length,
            };
        });
    }
}
