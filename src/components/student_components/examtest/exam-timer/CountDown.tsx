import { useEffect, useState } from 'react';
import { ToHHMMSS } from '../../../../utils/Timer/ToHHMMSS';
import { useDispatch, useSelector } from 'react-redux';
import { saveDoingExam } from '../../../../redux/action/examAction';
interface Data {
    id: string;
    content: string;
    image: string;
    answer: { id: string; isSelected: boolean }[];
    exId: string;
}
interface Props {
    timer?: string
    exID: any
}
export const CountDown: React.FC<Props> = ({ timer, exID }) => {
    const [count, setCount] = useState<string>(timer);
    const dispatch = useDispatch();
    const account = useSelector((state: any) => state.account.account);


    useEffect(() => {
        if (count == '0') return (alert(`Finish`));
        const timer = setInterval(() => {
            setCount((parseInt(count) - 1).toString())
            dispatch(saveDoingExam(count, exID, account.UserID))
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
