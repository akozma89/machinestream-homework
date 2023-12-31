export const MachineStatusMap = {
    idle: 'info',
    running: 'warning',
    errored: 'error',
    repaired: 'success',
    finished: 'success',
};

export type MachineStatus = 'idle' | 'running' | 'errored' | 'repaired';

export interface MachineEventsOptions {
    timestamp: string;
    status: MachineStatus;
}
