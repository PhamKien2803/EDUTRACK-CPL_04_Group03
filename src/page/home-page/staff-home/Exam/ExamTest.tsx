import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Grid, Typography, TablePagination } from "@mui/material";
import { getClass, getCourse, getCourseSemesterById, getExamList } from "../../../../service/ApiService";
import { classRoom, courses, Exam, lession } from "../../../../models/Interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

const ExamTest: React.FC = () => {
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
    const exID = param.get("exID");

    useEffect(() => {
        fetchCourseSemester();
    }, []);

    useEffect(() => {
        fetchExamByLectureID();
        fetchCourseByID();
        fetchClass();
    }, [exID]);

    const fetchCourseSemester = async () => {
        const res = await getCourseSemesterById(exID);
        setCourseSemester(res);
        console.log(res);
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
            console.log("API Response (getExamList):", res);
            if (Array.isArray(res)) {
                const filtered = res.filter((item) => item.courseSemesterID === exID);
                console.log("Filtered Exams:", filtered);
                setExams(filtered);
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
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

    console.log("exID:", exID);

    return (
        <Grid container spacing={3} padding={3} width={'100%'}>
            {/* Tiêu đề */}
            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <Button
                    onClick={() => navigate(-1)}
                    variant="outlined"
                    color="primary"
                    style={{ marginBottom: "20px" }}
                >
                    Back
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

            {/* Bảng hoặc thông báo */}
            <Grid item xs={12}>
                {exams.length === 0 ? (
                    <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
                        <Typography variant="h6" style={{ color: 'red' }}>No tests</Typography>
                    </Paper>
                ) : (
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
                                                    <Link to={`/staff/viewResultManager?exID=${exam.examID}`}>
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
                )}
            </Grid>
        </Grid>
    );
};

export default ExamTest;
