import { useRef, useState } from "react";
import { Status } from "../types/types";

export const useTime = () => {
    const [status, setStatus] = useState<Status>('IDLE');
    const [time, setTime] = useState<number>(0);
    const [inputTime, setInputTime] = useState({
        h: 0,
        m: 0,
        s: 0,
    });
    const targetTimeRef = useRef<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const startTimeRef = useRef<number>(0);   // 가장 최근 start 시각
    const accumulatedTimeRef = useRef<number>(0); //  누적 시간

    const timerStart = () => {
        if (status !== 'RUNNING' && targetTimeRef.current > 0) {
            startTimeRef.current = performance.now();

            intervalRef.current = setInterval(() => {
                // 실제경과시간 = 현재시간 - 시작시간 + 누적시간
                const elapsedMs = performance.now() - startTimeRef.current + accumulatedTimeRef.current;

                if (elapsedMs >= targetTimeRef.current) {
                    setTime(0);
                    clearInterval(intervalRef.current);
                    accumulatedTimeRef.current = 0;
                    setStatus('IDLE');
                    alert("설정한 시간이 종료되었습니다.");
                    return;
                }

                setTime(elapsedMs);
            }, 100);

            setStatus('RUNNING');
        }
    };


    const stopwatchStart = () => {
        if (status !== 'RUNNING') {
            startTimeRef.current = performance.now();
            intervalRef.current = setInterval(() => {
                const elapsedMs = performance.now() - startTimeRef.current + accumulatedTimeRef.current;
                setTime(elapsedMs);
            }, 100);
            setStatus('RUNNING');
        }
    };

    const pause = () => {
        clearInterval(intervalRef.current);
        // 누적시간 업데이트
        accumulatedTimeRef.current = performance.now() - startTimeRef.current + accumulatedTimeRef.current;
        setStatus('PAUSED');
    }

    const reset = () => {
        if (status === 'PAUSED') {
            clearInterval(intervalRef.current);
            accumulatedTimeRef.current = 0;
            startTimeRef.current = 0;
            setTime(0);
            setStatus('IDLE');
        }
    }


    return { status, time, inputTime, setInputTime, targetTimeRef, timerStart, stopwatchStart, pause, reset };
}