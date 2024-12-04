import React, { useEffect, useState } from 'react'
import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { CheckCircle, Cancel as CancelIcon } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAnswerForQuestionExam, getExamByID, getQuestionByExID } from '../../../../service/ApiService';
import { Answer, Exam, Question } from '../../../../models/Interface';
import { ModalUpdateExam } from './ModalUpdateExam';
import { ModalUpdateQuestion } from './ModalUpdateQuestion';

export const UpdateExam = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dataQuestion, setDataQuestion] = useState<Question[]>([]);
    const [dataAnswer, setDataAnswer] = useState<Answer[]>([]);
    const [exam, setExam] = useState<Exam>();
    const [open, setOpen] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [questionUpdate, setQuestionUpdate] = useState<Question>();

    const location = useLocation();
    const param = new URLSearchParams(location.search)
    const exId = param.get('exID')

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        fetchQuestionByExID();
        fetchAnswer();
        fetchExamByExID();
    }, [])

    const fetchQuestionByExID = async () => {
        const res = await getQuestionByExID(exId)
        if (Array.isArray(res)) {
            setDataQuestion(res)
        }
    }

    const fetchAnswer = async () => {
        const res = await getAnswerForQuestionExam();
        if (Array.isArray(res)) {
            setDataAnswer(res)
        }
    }

    const fetchExamByExID = async () => {
        const res = await getExamByID(exId);
        if (Array.isArray(res)) {
            setExam(res[0])
        }
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClickModal = () => {
        setOpen(!open)
    }

    const handleClickOpenUpdate = () => {
        setOpenUpdate(!openUpdate)
    }

    const handleClickUpdate = async (question: Question) => {
        setQuestionUpdate(question);
        handleClickOpenUpdate();
    }


    return (
        <Grid container spacing={2} padding={2}>
            {/* Tiêu đề */}
            <Grid item xs={12} container spacing={2}>
                <Grid item>
                    <Button
                        startIcon={<ReplyAllIcon />}
                        onClick={() => navigate(-1)}
                        variant="outlined"
                        color="secondary"
                    >
                        {t("back")}
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        startIcon={<Edit />}
                        onClick={() => handleClickModal()}
                        variant="outlined"
                        color="secondary"
                    >
                        Edit title
                    </Button>
                </Grid>
            </Grid>


            {/* Thông tin chi tiết */}
            <Grid item xs={12}>
                <Paper elevation={4} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        <strong>{t("topic")}:</strong>{exam?.examContent}
                    </Typography>
                </Paper>
            </Grid>

            {/* Bảng */}
            <Grid item xs={12}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>{t("image")}</TableCell>
                                    <TableCell>{t("content")}</TableCell>
                                    <TableCell>{t("answer")}</TableCell>
                                    <TableCell align="center">{t("actions")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataQuestion
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((question, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>
                                                <Box
                                                    component="img"
                                                    src={question.image || "https://via.placeholder.com/100"}
                                                    alt="exam"
                                                    sx={{
                                                        borderRadius: "4px",
                                                        width: 65,
                                                        height: 65,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell>{question.content.substring(0, 45)}</TableCell>
                                            <TableCell>{question.answer.map((a) => (
                                                <div key={a}>{dataAnswer.find(ans => ans.id === a)?.content.substring(0, 30)} {dataAnswer.find(ans => ans.id === a)?.isCorrect ? <CheckCircle color='success' /> : <CancelIcon color='error' />}</div>
                                            ))}</TableCell>

                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={<Visibility />}
                                                    sx={{ marginRight: 1 }}
                                                >
                                                    {t("view")}
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleClickUpdate(question)}
                                                    startIcon={<Edit />}
                                                    sx={{ marginRight: 1 }}
                                                >
                                                    {t("update")}
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<Delete />}
                                                >
                                                    {t("delete")}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={dataQuestion.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            padding: "8px 16px",
                            "& .MuiTablePagination-toolbar": {
                                minHeight: "48px",
                            },
                            "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                                margin: 0,
                                lineHeight: "1.5",
                            },
                            "& .MuiTablePagination-select": {
                                fontSize: "14px",
                                marginRight: "8px",
                            },
                        }}
                    />
                </Paper>
            </Grid>
            {exam && <ModalUpdateExam open={open} handleClickModal={handleClickModal} exam={exam} setExam={setExam} />}
            {questionUpdate && <ModalUpdateQuestion openUpdate={openUpdate} handleClickOpenUpdate={handleClickOpenUpdate} question={questionUpdate} />}
        </Grid>
    )
}
