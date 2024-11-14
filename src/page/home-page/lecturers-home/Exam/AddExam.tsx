import React, { useEffect, useRef, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    FormControl,
    Checkbox,
    Button,
    Box,
    Switch,
    Divider,
} from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { v4 as uuidv4 } from 'uuid';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface Question {
    id: string;
    content: string;
    image: string;
    imagePreview: boolean;
    answer: Answer[];
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

export const AddExam = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const Exid = uuidv4();

    const [question, setQuestion] = useState<Question[]>([
        {
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
            exId: uuidv4()
        }
    ])

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const data = _.cloneDeep(question);
        const index = question.findIndex(item => item.id === id);
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                data[index].image = reader.result;
                setQuestion(data);
                setErrorMessage(null);
            };
            reader.readAsDataURL(file);
        } else {
            setErrorMessage("Please upload a valid image file.");
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

            data[index].answer = data[index].answer.filter(item => item.id != aid)
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
                exId: uuidv4()
            }
            setQuestion([...question, newQuestion])
        } else {
            const questions = question.filter(qs => qs.id != id)
            setQuestion(questions)
        }

    }

    const handleAnswerQuestion = (
        type: string,
        qid: string,
        aid: string,
        checked: boolean,
        value: string
    ) => {
        let data = _.cloneDeep(question);
        const questionIndex = data.findIndex(item => item.id === qid);

        if (questionIndex !== -1) {
            data[questionIndex].answer = data[questionIndex].answer.map(answer => {
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

    const handleZoomImage = (id: string) => {
        const data = _.cloneDeep(question);
        const index = data.findIndex(item => item.id == id);
        console.log(data[index]);

        if (index > -1) {
            data[index].imagePreview = !data[index].imagePreview
        }
        setQuestion(data)


    }


    // console.log(question);

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: '#f3e5f5', padding: 4, borderRadius: 2, mt: 5 }}>
            <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', color: '#4a148c', fontWeight: 'bold', mb: 2 }}>
                    EXAM ADDING
                </Typography>
                <TextField
                    label="Description Exam"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label="Time Limit (minutes)"
                    variant="standard"
                    type="number"
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </Box>
            {question && question.map((item, index) => (
                <Box key={`q-${index}`} sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
                    <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <TextField
                            label={`Question ${index + 1} Title`}
                            variant="standard"
                            fullWidth
                            sx={{ mr: 2 }}
                        />
                        <ImageSearchIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
                    </Box>

                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={e => handleImage(e, item.id)}
                    />

                    {item.image && (
                        <Box display="flex" justifyContent="center" my={2} >
                            <img onClick={() => handleZoomImage(item.id)} src={item.image} alt="Preview" style={{ width: '300px', cursor: 'pointer' }} />
                            <ClearIcon color="error" style={{ cursor: 'pointer' }} onClick={() => hanldleDeleteImage(item.id)} />
                        </Box>
                    )}

                    {errorMessage && (
                        <Typography color="error" variant="caption" sx={{ textAlign: 'center', display: 'block', mb: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <FormControl component="fieldset" fullWidth>
                        {item.answer.map((data, index) => (
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }} key={index}>
                                <Checkbox checked={data.isCorrect} onChange={(e) => handleAnswerQuestion("CHECKBOX", item.id, data.id, e.target.checked, "")} />
                                <TextField type="text" value={data.content} label='Answer question' variant="standard" fullWidth onChange={(e) => handleAnswerQuestion("INPUT", item.id, data.id, data.isCorrect, e.target.value)} />
                                <RemoveCircleIcon color='error' style={{ cursor: 'pointer' }} onClick={() => handleAnswer('REMOVE', item.id, data.id)} />
                            </Box>

                        ))}

                    </FormControl>
                    <Typography sx={{ ml: 1 }} style={{ cursor: 'pointer' }} onClick={() => handleAnswer('ADD', item.id, "0")}>
                        <AddCircleOutlineIcon color='success' />
                        Add Answer
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button variant="outlined" color="primary" size="small" onClick={() => handleQuestion('ADD', item.id)}>
                            ADD Question
                        </Button>
                        <Typography variant="caption" color="textSecondary">
                            (0 points)
                        </Typography>
                        {question.length > 1 && <Box display="flex" alignItems="center">
                            <Button variant="contained" color="primary" size="small" onClick={() => handleQuestion('REMOVE', item.id)}>
                                REmove Question
                            </Button>

                        </Box>}
                    </Box>
                    {item.imagePreview &&
                        <Lightbox onClose={() => handleZoomImage(item.id)} image={item.image} title="Image Title"></Lightbox>
                    }
                </Box>
            ))
            }


            <Box textAlign="center" mt={4}>
                <Button variant="contained" color="primary">
                    Save Quiz
                </Button>
            </Box>


        </Container>
    );
};
