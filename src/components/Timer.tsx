import React from "react";
import ControlButtons from "./ControlButtons";
import { formatTime } from "../utils/time";
import { useTime } from "../hooks/useTime";
import { Card, Badge, Form, InputGroup, Row, Col } from "react-bootstrap";

const Timer = () => {
    const {
        status,
        time, targetTimeRef, inputTime, setInputTime,
        timerStart, pause, reset
    } = useTime();

    const handleTimeInput = (type: 'h' | 'm' | 's', value: string) => {
        let numValue = Math.max(0, parseInt(value) || 0);

        if (type === 'm' || type === 's') {
            numValue = Math.min(numValue, 59);
        } else if (type === 'h') {
            numValue = Math.min(numValue, 23);
        }
        const newTimeH = type === 'h' ? numValue : inputTime.h;
        const newTimeM = type === 'm' ? numValue : inputTime.m;
        const newTimeS = type === 's' ? numValue : inputTime.s;

        setInputTime({ h: newTimeH, m: newTimeM, s: newTimeS });

        // inputTime은 비동기처리로 최신값 반영이 안될 수 있기 때문에, 변수로 ref에 저장
        targetTimeRef.current = (newTimeH * 3600 + newTimeM * 60 + newTimeS) * 1000;
    };

    return (
        <Card className="text-center shadow-sm border-1" style={{ width: '400px', maxWidth: '100%' }}>
            <Card.Body className="p-4">
                <div className="mb-4">
                    <Badge bg={status === 'RUNNING' ? 'success' : status === 'PAUSED' ? 'danger' : 'secondary'} className="px-3 py-2 fs-6">
                        {status}
                    </Badge>
                </div>

                {status === 'IDLE' ? (
                    <Row className="justify-content-center mb-4 g-2">
                        <Col xs="auto">
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={inputTime.h || ''}
                                    onChange={(e) => handleTimeInput('h', e.target.value)}
                                    min="0"
                                    className="text-center"
                                    style={{ width: '60px' }}
                                    placeholder="0"
                                />
                                <InputGroup.Text>시간</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={inputTime.m || ''}
                                    onChange={(e) => handleTimeInput('m', e.target.value)}
                                    min="0" max="59"
                                    className="text-center"
                                    style={{ width: '60px' }}
                                    placeholder="0"
                                />
                                <InputGroup.Text>분</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={inputTime.s || ''}
                                    onChange={(e) => handleTimeInput('s', e.target.value)}
                                    min="0" max="59"
                                    className="text-center"
                                    style={{ width: '60px' }}
                                    placeholder="0"
                                />
                                <InputGroup.Text>초</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>
                ) : (
                    <h1 className="display-3 fw-bold mb-4 font-monospace text-dark">
                        {formatTime(time)}
                    </h1>
                )}

                <ControlButtons status={status} handleStart={timerStart} handlePause={pause} handleReset={reset} />
            </Card.Body>
        </Card>
    );
}

export default Timer;
