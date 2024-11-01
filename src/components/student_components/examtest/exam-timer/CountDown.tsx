import { useEffect, useState } from 'react';
import { ToHHMMSS } from '../../../../utils/Timer/ToHHMMSS';

interface Props {
    timer?: string
}
export const CountDown: React.FC<Props> = ({ timer }) => {
    const [count, setCount] = useState<string>(timer);

    useEffect(() => {
        if (count == '0') return (alert(`Finish`));
        const timer = setInterval(() => {
            setCount((parseInt(count) - 1).toString())
        }, 1000)
        return () => {
            clearInterval(timer)
        }

    }, [count])
    return (
        <div>
            <ToHHMMSS time={count} />
        </div>
    )
}
