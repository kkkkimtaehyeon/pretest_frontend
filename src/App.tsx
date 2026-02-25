import React, { useState } from "react";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import { Mode } from "./types/types";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [mode, setMode] = useState<Mode>('stopwatch');

    const switchMode = (mode: Mode) => {
        setMode(mode);
    }

    return (
        <Container className="py-5 d-flex flex-column align-items-center">

            <ButtonGroup className="mb-4 shadow-sm">
                <Button
                    variant={mode === 'stopwatch' ? 'primary' : 'outline-primary'}
                    onClick={() => switchMode('stopwatch')}
                    className="px-4 py-2"
                >
                    스톱워치
                </Button>
                <Button
                    variant={mode === 'timer' ? 'primary' : 'outline-primary'}
                    onClick={() => switchMode('timer')}
                    className="px-4 py-2"
                >
                    카운트업 타이머
                </Button>
            </ButtonGroup>

            <div className="w-100 d-flex justify-content-center">
                {mode === 'stopwatch' && <Stopwatch />}
                {mode === 'timer' && <Timer />}
            </div>
        </Container>
    );
}

export default App;
