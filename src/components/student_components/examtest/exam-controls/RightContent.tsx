import React from 'react'
import '../../../../Sass/RightContent.scss'
import { CountDown } from '../exam-timer/CountDown';

interface Data {
    id: string;
    content: string;
    image: string;
    answer: { id: string; isSelected: boolean }[];
    exId: string;
}
interface Props {
    dataExam: Data[],
    setIndex: (id: number) => void
}
export const RightContent: React.FC<Props> = (props) => {
    const { dataExam, setIndex } = props

    const getClassNameQs = (item: Data): string => {
        const checkedAnswer = item.answer.every(item => item.isSelected === false)
        return checkedAnswer ? 'question' : 'question selected'
    }

    return (
        <>
            <div className="main-timer">
                <CountDown />
            </div>
            <div className="main-question">
                {dataExam.map((item, index) => (
                    <div key={`qi-${index}`} onClick={() => setIndex(index)} className={getClassNameQs(item)}>{index + 1}</div>
                ))
                }
            </div>
        </>
    )
}
