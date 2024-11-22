import { useEffect, useState } from 'react';
import { ToHHMMSS } from '../../../utils/Timer/ToHHMMSS';


interface Props {
    timer?: string
}
export const CountDown: React.FC<Props> = ({ timer }) => {
    const [count, setCount] = useState<string>(timer);
    const storedOtp = localStorage.getItem('otp');
    const storedExpirationTime = localStorage.getItem('otpExpiration');

    useEffect(() => {
        
        if (count == '0'){
            localStorage.removeItem('otp');
            localStorage.removeItem('otpExpiration');
        }
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
