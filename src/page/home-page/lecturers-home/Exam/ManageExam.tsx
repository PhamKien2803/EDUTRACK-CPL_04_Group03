import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
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

const ManageExam: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [exams, setExams] = useState<Exam[]>([]);
    const [courseSemester, setCourseSemester] = useState<lession>();
    const [course, setCourse] = useState<courses[]>([]);
    const [classes, setClasses] = useState<classRoom[]>([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <Grid container spacing={3} padding={3} width={'100%'}>
            {/* Tiêu đề */}
            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <Button
                    startIcon={<ReplyAllIcon />}
                    onClick={() => navigate(-1)}
                    variant="outlined"
                    color="primary"
                    style={{ marginBottom: "20px" }}
                >
                    Back
                </Button>
                <Button
                    startIcon={<LibraryAddIcon />}
                    onClick={() => navigate(`/addingExam?csID=${csID}`)}
                    variant="outlined"
                    color="success"
                    style={{ marginBottom: "20px" }}
                >
                    Adding Exam
                </Button>
            </Grid>

            {/* Thông tin chi tiết */}
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
                    <Typography variant="h6" gutterBottom>
                        <strong>Class:</strong>{" "}
                        {classes.find((item) => item.ClassID === courseSemester?.ClassID)?.ClassName}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>Course:</strong>{" "}
                        {course.find((item) => item.id === courseSemester?.CourseID)?.CourseName}
                    </Typography>
                </Paper>
            </Grid>

            {/* Bảng */}
            <Grid item xs={12}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Content</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Display</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exams
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((exam, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>
                                                {exam.image && (
                                                    <img
                                                        src={exam.image}
                                                        alt="Thumbnail"
                                                        style={{
                                                            borderRadius: "5px",
                                                            width: "50px",
                                                            height: "50px",
                                                        }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{exam.examContent}</TableCell>
                                            <TableCell>{exam.createdAt}</TableCell>
                                            <TableCell>{exam.display ? "Yes" : "No"}</TableCell>
                                            <TableCell>{exam.status ? "Active" : "Inactive"}</TableCell>
                                            <TableCell align="center">
                                                <Link to={`/viewExam?exID=${exam.examID}`}>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        startIcon={<Visibility />}
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        View Result
                                                    </Button>
                                                </Link>
                                                <Link to={`/updateExam?exID=${exam.examID}`}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        startIcon={<Edit />}
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        Update
                                                    </Button>
                                                </Link>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<Delete />}
                                                    onClick={() => handleDelete(exam)}
                                                >
                                                    Delete
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
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ManageExam;
