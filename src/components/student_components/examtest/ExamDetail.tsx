import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../Sass/ExamDetail.scss';
import { getAnswerForQuestionExam, getDataExam, getExamList } from '../../../service/ApiService';
import Question from './exam-question/Question';
import { RightContent } from './exam-controls/RightContent';


interface Data {
    id: string;
    content: string;
    image: string;
    answer: { id: string; isSelected: boolean }[];
    exId: string;
}

interface Answer {
    id: string;
    content: string;
    isCorrect: boolean;
}
interface Exam {
    examID: string;
    examContent: string;
    courseSemesterID: string;
    timeLimit: string;
    status: boolean;
}

export const ExamDetail = () => {
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const exId = param.get('exID');

    const [dataExam, setDataExam] = useState<Data[]>([]);
    const [exam, setExam] = useState<Exam | null>(null);
    const [index, setIndex] = useState(0);
    const [answerQs, setAnswerQs] = useState<Answer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
        fetchAnswerQuestionExam();
        fetchDataExamByID();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getDataExam();
            if (Array.isArray(res)) {
                const data = res.filter(item => item.exId === exId)
                const formattedData = data.map((question) => ({
                    ...question,
                    answer: question.answer.map((id: string) => ({ id, isSelected: false })),
                }));
                setDataExam(formattedData);
            }
        } catch (error) {
            console.error('Failed to fetch exam data:', error);
            setError('Could not load exam data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDataExamByID = async () => {
        try {
            const res = await getExamList();
            if (Array.isArray(res)) {
                const data = res.find(item => item.examID === exId)
                if (data) {
                    setExam(data);
                } else {
                    setError('Exam not found.');
                }
            }
        } catch (error) {
            console.error('Failed to fetch exam:', error);
            setError('Could not load exam. Please try again later.');
        }
    }
    const fetchAnswerQuestionExam = async () => {
        try {
            const res = await getAnswerForQuestionExam();
            if (Array.isArray(res)) setAnswerQs(res);
        } catch (error) {
            console.error('Failed to fetch answers:', error);
            setError('Could not load answers. Please try again later.');
        }
    };

    const handleCheckbox = useCallback((aid: string, qid: string) => {
        setDataExam(prevDataExam => {
            const dataClone = [...prevDataExam];
            const question = dataClone.find(item => item.id === qid);
            if (question) {
                question.answer = question.answer.map(item => {
                    if (item.id === aid) {
                        item.isSelected = !item.isSelected;
                    }
                    return item;
                });
            }
            return dataClone;
        });
    }, []);

    console.log(exam);


    return (
        <div className="exam-container">
            <div className="title">{exam?.examContent}</div>
            <div className="exam-content">
                <div className="left-content">
                    <div className="q-content">
                        {isLoading ? (
                            <p>Loading questions...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : dataExam.length > 0 ? (
                            <Question
                                index={index}
                                data={dataExam[index]}
                                answer={answerQs}
                                handleCheckbox={handleCheckbox}
                            />
                        ) : (
                            <p>No questions available.</p>
                        )}
                    </div>
                    <div className="q-button">
                        <Button
                            className="btn-back"
                            variant="contained"
                            onClick={() => setIndex(prev => Math.max(prev - 1, 0))}
                            disabled={index === 0}
                        >
                            BACK
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setIndex(prev => Math.min(prev + 1, dataExam.length - 1))}
                            disabled={index + 1 >= dataExam.length}
                        >
                            NEXT
                        </Button>
                    </div>
                </div>
                <div className="right-content">
                    {
                        exam ? <RightContent dataExam={dataExam} setIndex={setIndex} timer={exam?.timeLimit} /> : <></>
                    }

                </div>
            </div>
        </div>
    );
};
