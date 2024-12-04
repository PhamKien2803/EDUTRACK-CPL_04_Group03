import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Card, Checkbox, FormControlLabel, IconButton, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Answer, Exam, Question } from '../../../../models/Interface';
import { useTranslation } from 'react-i18next';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { CheckBox, Delete, Remove } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { getAnswerForQuestionExam } from '../../../../service/ApiService';

interface Props {
    openUpdate: boolean,
    handleClickOpenUpdate: () => void
    question: Question,
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const ModalUpdateQuestion: React.FC<Props> = ({ openUpdate, handleClickOpenUpdate, question }) => {
    const { t } = useTranslation();

    const [imagePreView, setImagePreView] = React.useState<string>("");
    const [dataQuestion, setDataQuestion] = React.useState<Question>()
    const [title, setTitle] = React.useState<string>("")
    const [answer, setAnswer] = React.useState<Answer[]>([])
    const [answerAdd, setAnswerAdd] = React.useState<Answer[]>([])

    React.useEffect(() => {
        fetchAnswer();
    }, [])
    React.useEffect(() => {
        setDataQuestion(question);
        setImagePreView(question.image)
        setTitle(question.content)
        addAnsweres();
    }, [question.id]);

    const fetchAnswer = async () => {
        const res = await getAnswerForQuestionExam();
        if (Array.isArray(res)) {
            setAnswer(res)
        }
    }

    const addAnsweres = () => {
        const answerArr: Answer[] = []
        question.answer.forEach(a => {
            if (answer.find(as => as.id === a)) {
                answerArr.push(answer.find(as => as.id === a))
            }
        })
        console.log('a', answerArr);

    }
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreView(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Please upload a valid image file.");
        }
    };

    const deleteAnswer = (id: string) => {
        setAnswer(answer.filter(as => as.id !== id))
        setDataQuestion({ ...dataQuestion, answer: dataQuestion.answer.filter(as => as !== id) })
    }

    const addAnswer = () => {
        const answerAdd = {
            id: uuidv4(),
            content: "",
            isCorrect: false
        }
        setAnswer([...answer, answerAdd])
        setDataQuestion({ ...dataQuestion, answer: [...dataQuestion.answer, answerAdd.id] })
    }

    const handleChecked = (id: string) => {
        const a = answer.find(as => as.id === id);
        console.log(a);
        if (a && a.isCorrect) return true
        return false
    }

    const handleChange = (id: string, text: string, type: string) => {
        let answerClone = [...answer]
        const index = answerClone.findIndex(a => a.id === id)
        if (type === "text") {
            answerClone[index].content = text
            setAnswer(answerClone)
        } else {
            answerClone[index].isCorrect = !answerClone[index].isCorrect
            setAnswer(answerClone)
        }
    }
    return (
        answer && dataQuestion && <Dialog
            open={openUpdate}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClickOpenUpdate}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            <Box
                sx={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    padding: "24px",
                    backgroundColor: "#f5f7fb",
                }}
            >
                <Card
                    sx={{
                        padding: "32px",
                        border: "none",
                        borderRadius: "16px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {/* Header */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 4 }}
                    >
                        <Typography variant="h5" component="div" fontWeight="600">
                            Update Question
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClickOpenUpdate}
                            sx={{
                                color: "#444",
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Form Fields */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        sx={{ mb: 3 }}
                    >
                        <TextField
                            label="Description"
                            value={title}
                            size="small"
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontSize: "1rem",
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </Box>

                    <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="2px dashed #d3d3d3"
                        borderRadius="12px"
                        position="relative"
                        height="150px"
                        style={{ backgroundColor: '#f9f9f9' }}
                    >
                        {imagePreView ? (
                            <>
                                <img
                                    src={imagePreView}
                                    alt={t('preview')}
                                    style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '8px' }}
                                />
                                <IconButton
                                    component="label"
                                    style={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        backgroundColor: '#fff',
                                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <AddPhotoAlternateIcon />
                                    <input type="file" hidden onChange={e => handleImage(e)} />
                                </IconButton>
                            </>
                        ) : (
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<AddPhotoAlternateIcon />}
                                style={{ borderRadius: 8 }}
                            >
                                {t('add_cover_image')}
                                <input type="file" hidden onChange={e => handleImage(e)} />
                            </Button>
                        )}
                    </Box>
                    <Typography>Answer</Typography>

                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        sx={{ mb: 3 }}
                    >
                        {
                            dataQuestion.answer.map((ans, index) => (
                                <Box sx={{ display: 'flex', gap: 2 }}>

                                    <Checkbox
                                        onChange={(e) => handleChange(ans, e.target.value, 'check')}
                                        checked={handleChecked(ans)}
                                    />
                                    <TextField
                                        key={ans}
                                        label={`Answer ${index + 1}`}
                                        fullWidth
                                        onChange={(e) => handleChange(ans, e.target.value, 'text')}
                                        value={answer.find(an => an.id === ans)?.content}
                                        size="small"
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                fontSize: "1rem",
                                                borderRadius: "8px",
                                            },
                                        }}
                                    />
                                    <IconButton onClick={() => deleteAnswer(ans)}><Delete color='error' /></IconButton>
                                </Box>

                            ))
                        }
                        <Button variant='outlined' onClick={() => addAnswer()}>Add Answer  </Button>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                        sx={{ mt: 4 }}
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClickOpenUpdate}
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                padding: "8px 16px",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                padding: "8px 16px",
                            }}
                        >
                            Save
                        </Button >
                    </Box>
                </Card>
            </Box>
        </Dialog>
    )
}
