import { StatusFilterOption } from '@interfaces/machine-events-options.interface';
import { NzTableFilterList } from 'ng-zorro-antd/table';

export enum MACHINE_STATUS_MAP {
    idle = 'idle',
    running = 'running',
    errored = 'errored',
    repaired = 'repaired',
    finished = 'finished',
}

export const MACHINE_STATUS_FILTERS: StatusFilterOption[] = [
    { text: 'Idle', value: MACHINE_STATUS_MAP.idle },
    { text: 'Running', value: MACHINE_STATUS_MAP.running },
    { text: 'Errored', value: MACHINE_STATUS_MAP.errored },
    { text: 'Repaired', value: MACHINE_STATUS_MAP.repaired },
    { text: 'Finished', value: MACHINE_STATUS_MAP.finished },
];

export const MACHINE_COLORS_STATUS_MAP = {
    [MACHINE_STATUS_MAP.idle]: 'info',
    [MACHINE_STATUS_MAP.running]: 'warning',
    [MACHINE_STATUS_MAP.errored]: 'error',
    [MACHINE_STATUS_MAP.repaired]: 'success',
    [MACHINE_STATUS_MAP.finished]: 'success',
};

export const MACHINE_TYPE_OPTIONS: NzTableFilterList = [
    { text: 'Microscope', value: 'microscope' },
    { text: 'Measurement', value: 'measurement' },
];
