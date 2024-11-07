import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../../Sass/HistoryExam.scss';
import { getAnswerByUserId, getAnswerForQuestionExam, getExamList, getQuestionByExID } from '../../../../service/ApiService';
import { useSelector } from 'react-redux';

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
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);
    const [questionEx, setQuestionEx] = useState<question[]>([]);
    const [answerQs, setAnswerQs] = useState<Answer[]>([]);
    const [exam, setExam] = useState<Exam | null>(null);
    const [userAnswer, setUserAnswer] = useState<UserAnswer[]>([]);


    const account = useSelector((state: any) => state.account.account);

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const exId = param.get('exID');

    useEffect(() => {
        fetchAnswerQuestionExam();
        fetchDataExamByID();
        fetchDataAnswer();
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
        let answer = userAnswer.find(item => item.QuestionID === qid)
        if (answer) {
            return answer.answer.some(item => item === id)
        }
        return false
    }




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

    const handleClick = (question: number) => {
        setCurrentQuestion(question);
    };

    return (
        <Box className="exam-container" padding={3}>
            <Typography variant="h4" gutterBottom align="center" className="exam-title">
                {exam?.examContent}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
                {/* Question Display Area */}
                <Box
                    flex={3}
                    className="exam-box"
                    sx={{
                        maxHeight: '500px',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '16px',
                    }}
                >
                    {questionEx?.map((data, index) => (
                        <Box key={index} mb={3} className="question-box">
                            <Typography variant="h6">Question {index + 1}</Typography>
                            {data.image && (
                                <Box my={2} textAlign="center">
                                    <img src={data?.image} alt={`Question ${index + 1}`} height="300px" />
                                </Box>
                            )}
                            <Typography mb={2}>{data.content}</Typography>
                            <FormControl component="fieldset" className="radio-group">
                                <RadioGroup name={`question${index + 1}`}>
                                    {data?.answer?.map((item, itemIndex) => (
                                        <FormControlLabel
                                            key={itemIndex}
                                            value={item}
                                            control={<Radio />}
                                            label={answerQs.find(ans => ans.id === item)?.content || ''}
                                            checked={handleChecked(data.id, item)}
                                            disabled={!handleChecked(data.id, item)}
                                        />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                            <Typography variant="h6" gutterBottom align="center" >
                                {handleCheckIsCorrect(data) ? (
                                    <Box sx={{ bgcolor: 'success.main', color: 'white' }} >is correct</Box>
                                ) : (
                                    <Box sx={{ bgcolor: 'error.main', color: 'white' }}>not correct</Box>
                                )}
                            </Typography>
                            <hr />
                        </Box>
                    ))}
                </Box>

                {/* Quiz Navigation */}
                <Box flex={1} ml={3} className="quiz-navigation" sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>
                    <Typography variant="h6" gutterBottom>
                        Quiz Navigation
                    </Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="center" mb={2}>
                        {questionEx?.map((data, index) => (
                            <Button
                                key={index + 1}
                                variant={userAnswer.find(item => item.QuestionID === data.id) ? 'contained' : 'outlined'}
                                color="primary"
                                onClick={() => handleClick(index + 1)}
                                sx={{ margin: '4px', minWidth: '40px' }}
                                className={`navigation-button ${currentQuestion === index + 1 ? 'navigation-button-contained' : ''}`}
                            >
                                {index + 1}
                            </Button>
                        ))}

                    </Box>
                    <Button variant="text" color="secondary" fullWidth onClick={() => alert('Show one page at a time')}>
                        Show one page at a time
                    </Button>
                    <Button variant="text" color="error" fullWidth sx={{ mt: 1 }} onClick={() => alert('Finish review')}>
                        Finish review
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
