import { Add, Delete } from "@mui/icons-material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, Card, CardContent, Checkbox, Divider, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import _ from 'lodash';
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import QuizSettingsModal from "./QuizSettingsModal";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseSemesterById } from "../../../../service/ApiService";
import { CourseSemester } from "../../../../models/Interface";
import { postAnswerQs, postExam, postQuestion } from "../../../../service/ExamApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



interface Question {
    id: string;
    content: string;
    image: string;
    answer: Answer[];
    exId: string;
}

interface Answer {
    id: string;
    content: string;
    isCorrect: boolean;
}

export const AddExam = () => {
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
    const [description, setDescription] = useState<string>("");
    const [time, setTime] = useState<string>("900")
    const [courseSemester, setCourseSemester] = useState<CourseSemester>()
    const [open, setOpen] = useState<boolean>(false);

    const Exid = useRef(uuidv4());

    const [question, setQuestion] = useState<Question[]>([
        {
            id: uuidv4(),
            content: "",
            image: "",
            answer: [
                {
                    id: uuidv4(),
                    content: "",
                    isCorrect: false
                }
            ],
            exId: Exid.current
        }
    ])

    const nav = useNavigate();
    const location = useLocation();
    const param = new URLSearchParams(location.search)
    const csID = param.get('csID')

    useEffect(() => {
        fetchCourseSemester();
    }, [])

    const fetchCourseSemester = async () => {
        try {
            const res = await getCourseSemesterById(csID);
            setCourseSemester(res);
        } catch (error) {
            console.error("Failed to fetch course semester details:", error);
        }

    }

    const handleClick = (id: string) => {
        setCurrentQuestionId(id);
        fileInputRefs.current[id]?.click();
    };

    const onClose = () => setOpen(false)

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log(question);
        console.log(currentQuestionId);


        const data = _.cloneDeep(question);
        const index = question.findIndex(item => item.id === currentQuestionId);
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                data[index].image = reader.result;
                setQuestion(data);

            };
            reader.readAsDataURL(file);
        } else {
            console.log("Please upload a valid image file.");
        }
    };


    const handleAnswer = (type: string, qid: string, aid: string) => {
        const answer = {
            id: uuidv4(),
            content: "",
            isCorrect: false
        }

        let data = _.cloneDeep(question)
        const index = question.findIndex(item => item.id === qid)
        console.log('databefore', data);

        if (type === 'ADD') {
            data[index].answer.push(answer)
            setQuestion(data)
        } else {

            data[index].answer = data[index].answer.filter((item: any) => item.id != aid)
            setQuestion(data)
        }

    }

    const hanldleDeleteImage = (id: string) => {
        let data = _.cloneDeep(question)
        const index = question.findIndex(item => item.id === id)
        data[index].image = "";
        setQuestion(data)
    }



    // console.log(question);
    const handleQuestion = (type: string, id: string) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                content: "",
                image: "",
                imagePreview: false,
                answer: [
                    {
                        id: uuidv4(),
                        content: "",
                        isCorrect: false
                    }
                ],
                exId: Exid.current
            }
            setQuestion([...question, newQuestion])
        } else {
            const questions = question.filter(qs => qs.id != id)
            setQuestion(questions)
            if (currentQuestionId === id) {
                setCurrentQuestionId(null);
            }
        }

    }

    const handleAnswerQuestion = (type: string, qid: string, aid: string, checked: boolean, value: string) => {
        let data = _.cloneDeep(question);
        const questionIndex = data.findIndex((item: any) => item.id === qid);

        if (questionIndex !== -1) {
            data[questionIndex].answer = data[questionIndex].answer.map((answer: any) => {
                if (answer.id === aid) {
                    if (type === 'CHECKBOX') {
                        console.log(checked);

                        answer.isCorrect = checked;
                    } else {
                        answer.content = value;
                    }
                }
                return answer;
            });
        }

        setQuestion(data);
    };

    const handleDescriptionQs = (text: string, id: string) => {
        let data = _.cloneDeep(question);
        const questionIndex = data.findIndex((item: any) => item.id === id);
        data[questionIndex].content = text;
        setQuestion(data)
    }

    console.log(courseSemester);

    const handleSubmit = async () => {
        const questionClone = question.map(item => {
            const answers = item.answer.map(it => it.id)
            return { ...item, answer: answers }
        })
        console.log(questionClone);

        if (courseSemester) {
            const Exam = {
                examID: Exid.current,
                examContent: description,
                courseSemesterID: courseSemester.SemesterID,
                timeLimit: time,
                status: false
            }
            const req = await postExam(Exam)
            if (req) {
                for (const item of question) {
                    for (const answer of item.answer) {
                        await postAnswerQs(answer)
                    }
                }
                for (const items of questionClone) {
                    await postQuestion(items)
                }
                toast.success('Update success')
                return setTimeout(() => {
                    nav('/lecturer/homePage')
                }, 1500)
            }
        }

    }


    return (
        <Box p={3} sx={{ backgroundColor: "#f5f5f5" }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Untitled Quiz</Typography>
                <Box>
                    <Button variant="outlined" sx={{ marginRight: 2 }} onClick={() => setOpen(true)}>Settings</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Publish</Button>
                </Box>
            </Box>

            {/* Bulk update and search */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">Bulk update questions</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Button variant="text" startIcon={<AccessTimeIcon />}>Time:</Button>
                            <Select defaultValue="900" onChange={e => setTime(e.target.value)} size="small" sx={{ mx: 1 }}>
                                <MenuItem value="900">15 minis</MenuItem>
                                <MenuItem value="1800">30 minis</MenuItem>
                                <MenuItem value="2700">45 minis</MenuItem>
                                <MenuItem value="3600">60 minis</MenuItem>
                                <MenuItem value="5400">90 minis</MenuItem>
                                <MenuItem value="7200">120 minis</MenuItem>
                                <MenuItem value="9000">150 minis</MenuItem>
                                <MenuItem value="10800">180 minis</MenuItem>
                            </Select>
                            <Divider sx={{ my: 1 }} />

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" ><h4>Toppic quiz</h4></Typography>
                            <Box display="flex" alignItems="center" mb={2}>
                                <TextField onChange={e => setDescription(e.target.value)} fullWidth placeholder="Enter topic name" variant="outlined" size="small" />

                            </Box>
                            <Typography variant="subtitle1">{question.length} questions(10 points)</Typography>

                            {/* Question Items */}
                            <Box mt={2}>
                                {question && question.map((item, index) => (
                                    <Card key={index} sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="body1">Question {index + 1}. Multiple Choice</Typography>
                                                <Box display="flex" alignItems="center">
                                                    <IconButton>
                                                        <ImageSearchIcon onClick={() => handleClick(item.id)} style={{ cursor: 'pointer' }} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <Delete onClick={() => handleQuestion('REMOVE', item.id)} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <TextField
                                                label={`Description`}
                                                onChange={(e) => handleDescriptionQs(e.target.value, item.id)}
                                                variant="standard"
                                                fullWidth
                                                sx={{ mr: 2 }}
                                            />
                                            <Divider sx={{ my: 1 }} />
                                            <input
                                                ref={el => (fileInputRefs.current[item.id] = el)}
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={e => handleImage(e)}
                                            />
                                            {item.image && (
                                                <Box display="flex" justifyContent="center" my={2} >
                                                    <img src={item.image} alt="Preview" style={{ width: '300px', cursor: 'pointer' }} />
                                                    <ClearIcon color="error" style={{ cursor: 'pointer' }} onClick={() => hanldleDeleteImage(item.id)} />
                                                </Box>
                                            )}
                                            <Typography variant="body2">Answer choices:</Typography>
                                            {item.answer.map((data, index) => (
                                                <Box display="flex" alignItems="center" sx={{ mb: 2 }} key={index}>
                                                    {/* Checkbox */}
                                                    <Checkbox
                                                        checked={data.isCorrect}
                                                        onChange={(e) => handleAnswerQuestion("CHECKBOX", item.id, data.id, e.target.checked, "")}
                                                        sx={{ mr: 2 }}
                                                    />

                                                    <TextField
                                                        type="text"
                                                        value={data.content}
                                                        label="Answer question"
                                                        variant="standard"
                                                        sx={{ width: "70%", mr: 2 }}
                                                        onChange={(e) => handleAnswerQuestion("INPUT", item.id, data.id, data.isCorrect, e.target.value)}
                                                    />

                                                    <Box display="flex" alignItems="center" gap={"10px"}>
                                                        {item.answer.length === 1 ? <></> :
                                                            <IconButton>
                                                                <RemoveCircleIcon
                                                                    color="error"
                                                                    style={{ cursor: 'pointer', marginRight: 8 }}
                                                                    sx={{ fontSize: 30 }}
                                                                    onClick={() => handleAnswer('REMOVE', item.id, data.id)}
                                                                />
                                                            </IconButton>

                                                        }
                                                        <IconButton>
                                                            <AddCircleOutlineIcon
                                                                color="success"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => handleAnswer('ADD', item.id, "0")}
                                                                sx={{ fontSize: 30 }}
                                                            />
                                                        </IconButton>

                                                    </Box>
                                                </Box>


                                            ))}
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>

                            {/* Add question button */}
                            <Box textAlign="center" mt={2}>
                                <Button onClick={() => handleQuestion('ADD', "1")} variant="outlined" startIcon={<Add />}>Add question</Button>
                            </Box>
                        </CardContent>
                        <QuizSettingsModal open={open} onClose={onClose} />
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Box >
    );
};
