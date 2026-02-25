export const formatTime = (timeMs: number): string => {
    const hours = Math.floor(timeMs / 3600000);
    const minutes = Math.floor((timeMs % 3600000) / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''
    }${seconds}`;
}