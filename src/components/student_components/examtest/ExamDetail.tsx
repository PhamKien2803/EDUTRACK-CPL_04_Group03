import { Box, Button, CircularProgress, Typography, LinearProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnswerForQuestionExam, getDataExam, getExamList, postAnswer } from '../../../service/ApiService';
import Question from './exam-question/Question';
import { RightContent } from './exam-controls/RightContent';
import { Answer, Exam } from '../../../models/Interface';
import { v4 as uuidv4 } from 'uuid';
import { postResultExam } from '../../../service/ExamApi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


interface Data {
    id: string;
    content: string;
    image: string;
    answer: { id: string; isSelected: boolean }[];
    exId: string;
}




export const ExamDetail = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const exId = param.get('exID');
    const csId = param.get('csID');
    const nav = useNavigate()

    const [dataExam, setDataExam] = useState<Data[]>([]);
    const [exam, setExam] = useState<Exam | null>(null);
    const [index, setIndex] = useState(0);
    const [answerQs, setAnswerQs] = useState<Answer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const answeredQuestionsCount = dataExam.filter((question) =>
        question.answer.some((ans) => ans.isSelected)
    ).length;
    const totalQuestions = dataExam.length;
    const progressPercentage = totalQuestions ? (answeredQuestionsCount / totalQuestions) * 100 : 0;

    const account = useSelector((state: any) => state.account.account);

    useEffect(() => {
        fetchData();
        fetchAnswerQuestionExam();
        fetchDataExamByID();
    }, []);
    console.log(exId);


    const fetchData = async () => {
        try {
            const res = await getDataExam();
            if (Array.isArray(res)) {
                const data = res.filter((item) => item.exId === exId);
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
                const data = res.find((item) => item.examID === exId);
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
        setDataExam((prevDataExam) => {
            const dataClone = [...prevDataExam];
            const question = dataClone.find((item) => item.id === qid);
            if (question) {
                question.answer = question.answer.map((item) => ({
                    ...item,
                    isSelected: item.id === aid ? !item.isSelected : item.isSelected,
                }));
            }
            return dataClone;
        });
    }, []);

    const arraysEqual = (arr1: string[], arr2: string[]) => {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    }

    const handleFinish = () => {
        Swal.fire({
            title: t("exam_finish_title"),
            text: t("exam_finish_text"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonText: t("exam_finish_cancel"),
            confirmButtonText: t("exam_finish_confirm"),
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (dataExam) {
                    const dataAnswer = dataExam.map(item => {
                        const list: string[] = [];
                        item.answer.forEach(as => {
                            if (as.isSelected) list.push(as.id)
                        })
                        return { ...item, answer: list }
                    })

                    // console.log('datas', dataAnswer);
                    let count = 0
                    const dataIsCorrect = dataExam.map(item => {
                        const list: string[] = [];
                        item.answer.forEach(as => {
                            if (answerQs.find(item => item.id === as.id)?.isCorrect) list.push(as.id)
                        })
                        return { ...item, answer: list }
                    })
                    // console.log('dataiscorrect', dataIsCorrect);

                    dataAnswer.forEach(item => {
                        const question = dataIsCorrect.find(it => it.id === item.id)
                        if (question && arraysEqual(question.answer, item.answer)) {
                            count += 1
                        }
                    })

                    // console.log(count);

                    // console.log();

                    const req = await postResultExam({
                        id: uuidv4(),
                        userId: account.UserID,
                        numberCorrect: `${count}`,
                        totalQuestion: `${dataExam.length}`,
                        examId: `${exId}`
                    })
                    console.log(req);


                    for (const ques of dataExam) {
                        const answer = {
                            id: uuidv4(),
                            answer: ques.answer.filter(item => item.isSelected).map(item => item.id),
                            QuestionID: ques.id,
                            UserID: account?.UserID
                        };
                        try {
                            console.log(answer);

                            const req = await postAnswer(answer);
                            if (req) {


                                nav(`/exam-test?csId=${csId}`);

                            }
                        } catch (error) {
                            console.error("Error posting answer:", error);
                        }
                    }
                } else {
                    console.log('abc');
                }
            }
        });

    };

    return (
        <Box className="exam-container" sx={{ padding: 3 }}>
            <Typography variant="h4" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                {exam?.examContent || 'Exam'}
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ my: 2 }}>
                <Typography variant="body1">Progress: {Math.round(progressPercentage)}%</Typography>
                <LinearProgress variant="determinate" value={progressPercentage} sx={{ height: 10, borderRadius: 5 }} />
            </Box>

            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                {/* Left Content (Questions) */}
                <Box flex={1} sx={{ borderRight: { md: '1px solid lightgray' }, pr: { md: 2 } }}>
                    <Box className="q-content" sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : dataExam.length > 0 ? (
                            <>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Question {index + 1} of {dataExam.length}
                                </Typography>
                                <Question
                                    index={index}
                                    data={dataExam[index]}
                                    answer={answerQs}
                                    handleCheckbox={handleCheckbox}
                                />
                            </>
                        ) : (
                            <Typography>{t('question_unavailable')}</Typography>
                        )}
                    </Box>

                    {/* Navigation Buttons */}
                    <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={index === 0}
                        >
                            {t('button_back')}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIndex((prev) => Math.min(prev + 1, dataExam.length - 1))}
                            disabled={index + 1 >= dataExam.length}
                        >
                            {t('button_next')}
                        </Button>
                    </Box>
                </Box>

                {/* Right Content (Question Navigation and Timer) */}
                <Box className="right-content" sx={{ width: { xs: '100%', md: '30%' }, mt: { xs: 2, md: 0 } }}>
                    {exam ? (
                        <RightContent dataExam={dataExam} setIndex={setIndex} timer={exam?.timeLimit} handleFinish={handleFinish} />
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};