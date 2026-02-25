export type Status = 'IDLE' | 'RUNNING' | 'PAUSED';
export type Mode = 'stopwatch' | 'timer';

export interface ControlButtonsProps {
    status: Status;
    handleStart: () => void;
    handlePause: () => void;
    handleReset: () => void;
}