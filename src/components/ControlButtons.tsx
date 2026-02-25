import React from "react";
import { ControlButtonsProps } from "../types/types";
import { Button } from "react-bootstrap";

const ControlButtons = ({
    status,
    handleStart,
    handlePause,
    handleReset
}: ControlButtonsProps) => {
    const isRunning = status === 'RUNNING';
    return (
        <div className="d-flex justify-content-center gap-3">
            {isRunning ?
                <Button variant="danger" size="lg" className="px-4 fw-bold shadow-sm" onClick={handlePause}>
                    Pause
                </Button>
                :
                <>
                    <Button variant="success" size="lg" className="px-4 fw-bold shadow-sm" onClick={handleStart}>
                        Start
                    </Button>
                    {status === 'PAUSED' && (
                        <Button
                            variant="secondary"
                            size="lg"
                            className="px-4 fw-bold shadow-sm"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    )}
                </>

            }

        </div>
    );
}
export default ControlButtons;