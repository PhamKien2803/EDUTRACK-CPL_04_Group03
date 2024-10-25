import React, { useEffect, useState } from 'react'
import { getDataExam } from "../../service/ApiSErvice"
import '../../Sass/ExamDetail.scss'
import Question from './Question/Question';
import { Button } from '@mui/material';

type Data = {
    id: string;
    content: string;
    image: string;
    answer: string[];
    exId: string
}

export const ExamDetail = () => {
    const [dataExam, setDataExam] = useState<Data[]>([]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const res = await getDataExam();
        if (res) {
            setDataExam(res);
        }

    }

    return (
        <div className='exam-container'>
            <div className="title">
                title
            </div>
            <div className='exam-content'>
                <div className="left-content">
                    <div className="q-content">
                        <Question index={index} data={dataExam && dataExam.length > 0 ? dataExam[index] : []} />
                    </div>
                    <div className="q-button">
                        <Button variant="contained" onClick={() => setIndex(index - 1)}>BACK</Button>
                        <Button variant="contained" onClick={() => setIndex(index + 1)}>NEXT</Button>
                    </div>
                </div>
                <div className="right-content">
                    right content
                </div>

            </div>

        </div>
    )
}
