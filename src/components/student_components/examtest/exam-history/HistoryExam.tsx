import { ThemeProvider } from "@emotion/react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControlLabel, FormGroup, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ResultExam } from "../../../../models/Interface";
import { getAnswerByUserId, getAnswerForQuestionExam, getExamList, getQuestionByExID } from "../../../../service/ApiService";
import { getResultExam } from "../../../../service/ExamApi";
import { ToHHMMSS } from "../../../../utils/Timer/ToHHMMSS";
import { theme } from "./HisTheme";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useTranslation } from 'react-i18next';


interface question {
    id: string;
    content: string;
    image: string;
    answer: string[];
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

interface UserAnswer {
    id: string,
    answer: string[],
    QuestionID: string,
    UserID: string
}

export const HistoryExam = () => {
    const [questionEx, setQuestionEx] = useState<question[]>([]);
    const [answerQs, setAnswerQs] = useState<Answer[]>([]);
    const [exam, setExam] = useState<Exam | null>(null);
    const [userAnswer, setUserAnswer] = useState<UserAnswer[]>([]);
    const [result, setResult] = useState<ResultExam>()

    interface RootState {
        account: {
            account: {
                UserID: string;
            };
        };
    }

    const account = useSelector((state: RootState) => state.account.account);
    const navigate = useNavigate();
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const exId = param.get('exID');
    const { t } = useTranslation();


    useEffect(() => {
        fetchAnswerQuestionExam();
        fetchDataExamByID();
        fetchDataAnswer();
        fetchResult();
    }, []);

    useEffect(() => {
        fetchDataQuestionByexID();
    }, [exId]);

    const fetchDataQuestionByexID = async () => {
        const res = await getQuestionByExID(exId);
        if (Array.isArray(res)) setQuestionEx(res);
    };

    const fetchDataAnswer = async () => {
        const res = await getAnswerByUserId(account.UserID);
        if (Array.isArray(res)) setUserAnswer(res);
    };

    const fetchAnswerQuestionExam = async () => {
        try {
            const res = await getAnswerForQuestionExam();
            if (Array.isArray(res)) setAnswerQs(res);
        } catch (error) {
            console.error('Failed to fetch answers:', error);
        }
    };

    const fetchResult = async () => {
        const res = await getResultExam(exId);
        console.log(res);

        if (Array.isArray(res)) {
            setResult(res.find(item => item.userId === account.UserID))
        }
    }

    const fetchDataExamByID = async () => {
        try {
            const res = await getExamList();
            if (Array.isArray(res)) {
                const data = res.find((item) => item.examID === exId);
                if (data) {
                    setExam(data);
                } else {
                    console.log('Exam not found.');
                }
            }
        } catch (error) {
            console.error('Failed to fetch exam:', error);
        }
    };

    const handleChecked = (qid: string, id: string) => {
        const answer = userAnswer.find(item => item.QuestionID === qid)
        if (answer) {
            return answer.answer.some(item => item === id)
        }
        return false
    }

    const handleNavigation = (index: number) => {
        const questionElement = document.getElementById(`question-${index}`);
        if (questionElement) {
            questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };


    const arraysEqual = (arr1: string[], arr2: string[]) => {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    }

    const handleCheckIsCorrect = (data: question) => {
        const arr: string[] = [];
        data.answer.forEach(a => {
            const answer = answerQs.find(ans => ans.id === a);
            if (answer && answer.isCorrect) {
                arr.push(answer.id);
            }
        });

        const arr2 = userAnswer.find(item => item.QuestionID === data.id)
        if (arr2) {
            return arraysEqual(arr, arr2.answer)
        }
        return false
    };



    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button startIcon={<ReplyAllIcon />} onClick={() => navigate(-1)}>Back</Button>
            </Box>
            <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5">{t('history_exam_title')}</Typography>
                </Box>

                {/* Bulk update and search */}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Typography variant="body1"><h4>{t('title_examination')}</h4></Typography>
                                    <h4>
                                        {exam?.examContent}
                                    </h4>
                                </Box>
                                <Typography variant="subtitle1">{t('questions_label', { count: questionEx.length })}</Typography>


                                {/* Question Items */}
                                {questionEx && questionEx.map((qs, index) => (
                                    <Box mt={2} key={index} id={`question-${index}`}>

                                        <Card sx={{ mb: 2 }}>
                                            <CardContent>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body1">Question {index + 1}. Multiple Choice</Typography>
                                                    <Box display="flex" alignItems="center">
                                                        {handleCheckIsCorrect(qs) ? (
                                                            <CheckBoxOutlinedIcon sx={{ width: '30px', height: '30px' }} color="success" />
                                                        ) : (
                                                            <CancelPresentationOutlinedIcon sx={{ width: '30px', height: '30px' }} color="error" />
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Typography sx={{ textAlign: 'center' }} variant="h5">{qs.content}</Typography>
                                                <Divider sx={{ my: 1 }} />

                                                {qs.image && (
                                                    <Box display="flex" justifyContent="center" my={2} >
                                                        <img src={qs.image} alt="Preview" style={{ height: '200px', cursor: 'pointer' }} />
                                                    </Box>
                                                )}
                                                <Typography variant="body2">{t('answer_choices_label')}</Typography>
                                                <Box display="flex" alignItems="center" sx={{ mb: 2 }} >
                                                    {/* Checkbox */}
                                                    <FormGroup >
                                                        {qs?.answer?.map((item, itemIndex) => (
                                                            <FormControlLabel
                                                                key={itemIndex}
                                                                value={item}
                                                                control={<Checkbox />}
                                                                label={answerQs.find(ans => ans.id === item)?.content || ''}
                                                                checked={handleChecked(qs.id, item)}
                                                                disabled
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Box>
                                                <Typography sx={{ backgroundColor: '#fcefdc', display: "block", unicodeBidi: "isolate", border: "1px solid rgba(0, 0, 0, .125)", padding: '15px', borderRadius: "5px" }}>
                                                    {t('correct_answer_label')}:{qs?.answer?.map((item, itemIndex) => (
                                                        <span key={itemIndex}>{answerQs.find(as => as.id === item)?.isCorrect && <span>{itemIndex + 1}.{answerQs.find(as => as.id === item)?.content} </span>}</span>
                                                    ))}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}
                        sx={{ position: 'sticky', top: '10px', alignSelf: 'start' }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">{t('bulk_update_title')}</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Button variant="text" startIcon={<AccessTimeIcon />}>{t('time_label')}</Button>
                                {exam &&
                                    <Select defaultValue={exam.timeLimit} size="small" sx={{ mx: 1 }}>
                                        <MenuItem value={exam.timeLimit}><ToHHMMSS time={exam.timeLimit} /></MenuItem>
                                    </Select>
                                }

                                <Divider sx={{ my: 1 }} />
                                {result && (
                                    <>
                                        <Button
                                            variant="text"
                                            startIcon={<FactCheckIcon />}
                                            color="primary"
                                        >
                                            {t('result_label')}
                                        </Button>
                                        <Box mt={2} mb={2}>
                                            <Typography variant="subtitle1">
                                                <strong>{t('score_label1')}</strong> {parseInt(result.totalQuestion) > 0
                                                    ? (parseInt(result.numberCorrect) / parseInt(result.totalQuestion) * 10).toFixed(2)
                                                    : "N/A"} Point
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                <strong>{t('number_correct_label')}</strong> {result?.numberCorrect} Questions
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                <strong>{t('total_questions_label')}</strong> {result?.totalQuestion} Questions
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                                <Divider sx={{ my: 1 }} />

                            </CardContent>
                        </Card>
                        <Card sx={{ marginTop: '10px' }}>
                            <CardContent>
                                <Typography variant="subtitle1">{t('answers_questions_label')}</Typography>

                                <Divider sx={{ my: 1 }} />
                                <Box display="flex" flexWrap="wrap" justifyContent="center">
                                    {userAnswer && questionEx?.map((data, index) => {
                                        const isAnswered =
                                            (userAnswer?.find(item => item.QuestionID === data.id)?.answer?.length ?? 0) > 0;
                                        const isCorrect = handleCheckIsCorrect(data);

                                        return (
                                            <Box
                                                key={index + 1}
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                sx={{
                                                    margin: '8px',
                                                    minWidth: '50px',
                                                    borderRadius: '8px',
                                                    padding: '4px',
                                                    backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
                                                    boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
                                                    transition: 'transform 0.2s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                                    },
                                                }}
                                            >
                                                <Button
                                                    variant={isAnswered ? 'contained' : 'outlined'}
                                                    onClick={() => handleNavigation(index)}
                                                    color={isCorrect ? 'success' : 'error'}
                                                    sx={{
                                                        minWidth: '40px',
                                                        backgroundColor: isCorrect ? '#4caf50' : '#f44336',
                                                        color: '#fff',
                                                        '&:hover': {
                                                            backgroundColor: isCorrect ? '#388e3c' : '#d32f2f',
                                                        },
                                                    }}
                                                    className={`navigation-button ${isCorrect ? 'correct' : 'wrong'}`}
                                                >
                                                    {index + 1}
                                                </Button>
                                                <Box mt={1} display="flex" alignItems="center">
                                                    {isCorrect ? (
                                                        <CheckBoxOutlinedIcon color="success" fontSize="small" />
                                                    ) : (
                                                        <CancelPresentationOutlinedIcon color="error" fontSize="small" />
                                                    )}
                                                </Box>
                                            </Box>
                                        );
                                    })}

                                </Box>
                                <Divider sx={{ my: 1 }} />
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>

            </Box >
        </ThemeProvider>
    );
};
