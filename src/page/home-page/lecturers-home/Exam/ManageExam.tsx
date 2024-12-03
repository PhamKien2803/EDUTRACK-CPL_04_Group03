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
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Exam, classRoom, courses, lession } from "../../../../models/Interface";
import {
    getClass,
    getCourse,
    getCourseSemesterById,
    getExamList,
} from "../../../../service/ApiService";
import { deleteExam } from "../../../../service/ExamApi";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { CheckCircle, Cancel as CancelIcon } from '@mui/icons-material';
import { useTranslation } from "react-i18next";

const ManageExam: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [exams, setExams] = useState<Exam[]>([]);
    const [courseSemester, setCourseSemester] = useState<lession>();
    const [course, setCourse] = useState<courses[]>([]);
    const [classes, setClasses] = useState<classRoom[]>([]);
    const [loading, setLoading] = useState(false);
    console.log(loading);

    const navigate = useNavigate();
    const location = useLocation();
    const param = new URLSearchParams(location.search);

    const csID = param.get("csID");

    useEffect(() => {
        fetchCourseSemester();
    }, []);

    useEffect(() => {
        fetchExamByLectureID();
        fetchCourseByID();
        fetchClass();
    }, [csID]);

    const fetchCourseSemester = async () => {
        const res = await getCourseSemesterById(csID);
        setCourseSemester(res);
    };

    const fetchCourseByID = async () => {
        const res = await getCourse();
        if (Array.isArray(res)) {
            setCourse(res);
        }
    };

    const fetchClass = async () => {
        const res = await getClass();
        if (Array.isArray(res)) {
            setClasses(res);
        }
    };

    const fetchExamByLectureID = async () => {
        setLoading(true);
        try {
            const res = await getExamList();
            if (Array.isArray(res)) {
                setExams(res.filter((item) => item.courseSemesterID === csID));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (exam: Exam) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You would delete Exam :${exam.examContent}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteExam(exam);
                setExams(exams.filter((ex) => ex.examID !== exam.examID));
            }
        });
    };
    const { t } = useTranslation();
    return (
        <Grid container spacing={2} padding={2}>
            {/* Tiêu đề */}
            <Grid item xs={12} container spacing={1}>
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
                        startIcon={<LibraryAddIcon />}
                        onClick={() => navigate(`/addingExam?csID=${csID}`)}
                        variant="contained"
                        color="success"
                    >
                        {t("add_exam")}
                    </Button>
                </Grid>
            </Grid>

            {/* Thông tin chi tiết */}
            <Grid item xs={12}>
                <Paper elevation={4} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        <strong>{t("class")}:</strong>{" "}
                        {classes.find((item) => item.ClassID === courseSemester?.ClassID)?.ClassName}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>{t("course")}:</strong>{" "}
                        {course.find((item) => item.id === courseSemester?.CourseID)?.CourseName}
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
                                    <TableCell>{t("created_at")}</TableCell>
                                    <TableCell>{t("display")}</TableCell>
                                    <TableCell>{t("status")}</TableCell>
                                    <TableCell align="center">{t("actions")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exams
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((exam, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>
                                                <Box
                                                    component="img"
                                                    src={exam.image || "https://via.placeholder.com/100"}
                                                    alt="exam"
                                                    sx={{
                                                        borderRadius: "4px",
                                                        width: 65,
                                                        height: 65,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell>{exam.examContent}</TableCell>
                                            <TableCell>{exam.createdAt}</TableCell>
                                            <TableCell>{exam.display ? t("yes") : t("no1")}</TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    {exam.status ? (
                                                        <>
                                                            <CheckCircle sx={{ color: "green", marginRight: 1 }} />
                                                            <Typography
                                                                variant="body2"
                                                                sx={{ color: "green", fontWeight: "bold" }}
                                                            >
                                                                {t("active")}
                                                            </Typography>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CancelIcon sx={{ color: "red", marginRight: 1 }} />
                                                            <Typography
                                                                variant="body2"
                                                                sx={{ color: "red", fontWeight: "bold" }}
                                                            >
                                                                {t("inactive")}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Box>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Link to={`/viewExam?exID=${exam.examID}`}>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        startIcon={<Visibility />}
                                                        sx={{ marginRight: 1 }}
                                                    >
                                                        {t("view")}
                                                    </Button>
                                                </Link>
                                                <Link to={`/updateExam?exID=${exam.examID}`}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        startIcon={<Edit />}
                                                        sx={{ marginRight: 1 }}
                                                    >
                                                        {t("update")}
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<Delete />}
                                                    onClick={() => handleDelete(exam)}
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
                        count={exams.length}
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
        </Grid>
    );



};

export default ManageExam;
