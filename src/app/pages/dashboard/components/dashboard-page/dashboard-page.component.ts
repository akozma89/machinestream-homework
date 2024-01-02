import {
    stackedDistributionOptions,
    pieBreakdownOptions,
} from './../../../../constants/chart.constant';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { AppStore } from '@interfaces/app-store';
import {
    MachineColorStatusMap,
    MachineStatusMap,
} from '@interfaces/machine-events-options';
import { Machine } from '@models/machine';
import { Store } from '@ngrx/store';
import { HelperService } from '@services/helper.service';
import { selectMachines } from '@stores/machines/machines.selectors';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { Observable, map } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
    imports: [CommonModule, NzGridModule, NzStatisticModule, NgxChartsModule],
})
export class DashboardPageComponent {
    readonly MachineColorStatusMap = MachineColorStatusMap;
    readonly showMachineTypePieChart = !environment.production;

    machines$: Observable<Machine[]> = this.store
        .select(selectMachines)
        .pipe(HelperService.mapObjectKeysToArray());
    idleMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MachineStatusMap.idle
            )
        )
    );
    runningMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MachineStatusMap.running
            )
        )
    );
    erroredMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MachineStatusMap.errored
            )
        )
    );
    repairedMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MachineStatusMap.repaired
            )
        )
    );
    finishedMachines$ = this.machines$.pipe(
        map((machines) =>
            machines.filter(
                (machine) => machine.status === MachineStatusMap.finished
            )
        )
    );

    stackedMachineStatusDistribution = {
        ...stackedDistributionOptions,
        yAxisLabel: 'Status',
        xAxisLabel: 'Count',
        data$: this.machines$.pipe(
            map((machines) =>
                this.buildStackedMachineStatusDistribution(machines)
            )
        ),
    };

    pieMachineStatusBreakdown = {
        ...pieBreakdownOptions,
        data$: this.machines$.pipe(
            map((machines) => this.buildPieMachineStatusBreakdown(machines))
        ),
    };

    constructor(private store: Store<AppStore>) {}

    buildStackedMachineStatusDistribution(machines: Machine[]) {
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
                            machine.status === MachineStatusMap.idle
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
                            machine.status === MachineStatusMap.running
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
                            machine.status === MachineStatusMap.errored
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
                            machine.status === MachineStatusMap.repaired
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
                            machine.status === MachineStatusMap.finished
                    ).length,
                };
            }),
        };

        return [idle, running, errored, repaired, finished];
    }

    buildPieMachineStatusBreakdown(machines: Machine[]) {
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
