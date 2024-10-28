import React from 'react'

interface Props {
    time: string;
}

export const ToHHMMSS: React.FC<Props> = ({ time }) => {
    const toHHMMSS = (time: number): string => {
        const sec_num = parseInt(time.toString(), 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num % 3600) / 60);
        const seconds = sec_num % 60;

        const pad = (num: number) => num.toString().padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };
    return (
        <>{toHHMMSS(parseInt(time))}</>
    )
}
