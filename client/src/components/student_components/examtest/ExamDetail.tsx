import { Button } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import '../../../sass/ExamDetail.scss';
import { getAnswerForQuestionExam, getDataExam } from '../../../service/ApiService';
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

export const ExamDetail = () => {
    const [dataExam, setDataExam] = useState<Data[]>([]);
    const [index, setIndex] = useState(0);
    const [answerQs, setAnswerQs] = useState<Answer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
        fetchAnswerQuestionExam();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getDataExam();
            if (Array.isArray(res)) {
                const formattedData = res.map((question) => ({
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

    const fetchAnswerQuestionExam = async () => {
        try {
            const res = await getAnswerForQuestionExam();
            if (Array.isArray(res)) setAnswerQs(res as Answer[]);
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

    return (
        <div className="exam-container">
            <div className="title">Exam Title</div>
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
                    <RightContent dataExam={dataExam} setIndex={setIndex} />
                </div>
            </div>
        </div>
    );
};
