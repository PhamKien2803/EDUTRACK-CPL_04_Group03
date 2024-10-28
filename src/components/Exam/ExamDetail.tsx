import React, { useEffect, useState } from 'react'
import '../../Sass/QestionQuiz.scss'
import { getDataExam } from "../../service/ApiSErvice"

type Data = {
    id: string;
    content: string;
    image: string;
    answer: string[];
    exId: string
}

export const ExamDetail = () => {
    const [dataExam, setDataExam] = useState<Data[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const res = await getDataExam();
        setDataExam(res)

    }

    return (
        <div className='Question-container'>
            <div className="title">
                title
            </div>
            <div className='question-content'>
                <div className="left-content">
                    left content
                </div>
                <div className="right-content">
                    right content
                </div>

            </div>

        </div>
    )
}
