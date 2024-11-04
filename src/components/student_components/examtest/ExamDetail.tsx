import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../Sass/ExamDetail.scss';
import { getAnswerForQuestionExam, getDataExam, getExamList, postAnswer } from '../../../service/ApiService';
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
    const nav = useNavigate()

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
                const data = res.find(item => item.examID === exId);
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
    };

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
                question.answer = question.answer.map(item => ({
                    ...item,
                    isSelected: item.id === aid ? !item.isSelected : item.isSelected,
                }));
            }
            return dataClone;
        });
    }, []);

<<<<<<< HEAD
    const handleFinish = async () => {
        if (dataExam) {
            for (const ques of dataExam) {
                const answer = {
                    id: '1',
                    answer: ques.answer.filter(item => item.isSelected).map(item => item.id),
                    QuestionID: ques.id,
                    UserID: 'he171694'
                };
                try {
                    const req = await postAnswer(answer);
                    if (req) {
                        alert('Finish Exam');
                        setTimeout(() => {
                            nav('/exam-test');
                        }, 0);
                    }
                } catch (error) {
                    console.error("Error posting answer:", error);
                }
            }
        } else {
            console.log('abc');
        }
    };



=======
>>>>>>> caa07acd7d93e8873d96bd6bbf4152580e3cebb9
    return (
        <Box className="exam-container" sx={{ padding: 3 }}>
            <Typography variant="h4" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                {exam?.examContent || 'Exam'}
            </Typography>

            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                {/* Left Content (Questions) */}
                <Box flex={1} sx={{ borderRight: { md: '1px solid lightgray' }, pr: { md: 2 } }}>
                    <Box className="q-content" sx={{ mb: 2 }}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : dataExam.length > 0 ? (
                            <Question
                                index={index}
                                data={dataExam[index]}
                                answer={answerQs}
                                handleCheckbox={handleCheckbox}
                            />
                        ) : (
                            <Typography>No questions available.</Typography>
                        )}
                    </Box>

                    {/* Navigation Buttons */}
                    <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Button
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
<<<<<<< HEAD
                    </div>
                </div>
                <div className="right-content">
                    {
                        exam ? <RightContent dataExam={dataExam} setIndex={setIndex} timer={exam?.timeLimit} handleFinish={handleFinish} /> : <></>
                    }
=======
                    </Box>
                </Box>
>>>>>>> caa07acd7d93e8873d96bd6bbf4152580e3cebb9

                {/* Right Content (Question Navigation and Timer) */}
                <Box className="right-content" sx={{ width: { xs: '100%', md: '30%' } }}>
                    {exam ? (
                        <RightContent dataExam={dataExam} setIndex={setIndex} timer={exam?.timeLimit} />
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
