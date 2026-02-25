import React from "react";
import ControlButtons from "./ControlButtons";
import { formatTime } from "../utils/time";
import { useTime } from "../hooks/useTime";
import { Card, Badge } from "react-bootstrap";

const Stopwatch = () => {

    const { status, time, stopwatchStart, pause, reset } = useTime();

    return (
        <Card className="text-center shadow-sm border-1" style={{ width: '400px', maxWidth: '100%' }}>
            <Card.Body className="p-4">
                <div className="mb-4">
                    <Badge bg={status === 'RUNNING' ? 'success' : status === 'PAUSED' ? 'danger' : 'secondary'} className="px-3 py-2 fs-6">
                        {status}
                    </Badge>
                </div>

                <h1 className="display-3 fw-bold mb-4 font-monospace text-dark">
                    {formatTime(time)}
                </h1>

                <ControlButtons status={status} handleStart={stopwatchStart} handlePause={pause} handleReset={reset} />
            </Card.Body>
        </Card>
    );

}

export default Stopwatch;
