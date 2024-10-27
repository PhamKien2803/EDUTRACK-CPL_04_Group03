import { useEffect, useState } from 'react';

export const CountDown = () => {
    const [count, setCount] = useState<string>("30");

    const toHHMMSS = (time: number): string => {
        const sec_num = parseInt(time.toString(), 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num % 3600) / 60);
        const seconds = sec_num % 60;

        const pad = (num: number) => num.toString().padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    useEffect(() => {
        if (count == '0') return (alert(`Finish`));
        let timer = setInterval(() => {
            setCount((parseInt(count) - 1).toString())
        }, 1000)
        return () => {
            clearInterval(timer)
        }

    }, [count])
    return (
        <div>
            {toHHMMSS(parseInt(count))}
        </div>
    )
}
