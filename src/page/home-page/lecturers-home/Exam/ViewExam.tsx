import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
    Button,
    Grid,
    IconButton,
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
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Exam, ResultExam, participants } from "../../../../models/Interface";
import { getResultExam } from "../../../../service/ExamApi";
import { getExamList, getParticipants } from "../../../../service/ApiService";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

export const ViewExam = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [result, setResult] = useState<ResultExam[]>([])
    const [users, setUsers] = useState<participants[]>([])
    const [exams, setExams] = useState<Exam[]>([])

    const loaction = useLocation();
    const param = new URLSearchParams(loaction.search)
    const exID = param.get('exID');
    console.log(exID);

    const navigate = useNavigate();

    useEffect(() => {
        fetchResulte();
        fetchUser();
        fetcchExam();
    }, [])

    const fetchResulte = async () => {
        const res = await getResultExam(exID);
        if (Array.isArray(res)) {
            setResult(res)
        }
    }

    console.log(exams);

    const fetcchExam = async () => {
        const res = await getExamList();
        if (Array.isArray(res)) {
            setExams(res)
        }
    }

    const fetchUser = async () => {
        const res = await getParticipants();
        if (Array.isArray(res)) {
            setUsers(res)
        }
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container spacing={3} padding={3} width={"100%"}>
            {/* Tiêu đề */}
            <Button startIcon={<ReplyAllIcon />} onClick={() => navigate(-1)}>Back</Button>

            {/* Thông tin chi tiết */}
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
                    <Typography variant="subtitle1">
                        <strong>The Result of all user answer Exam

                        </strong>

                    </Typography>
                    <Typography variant="subtitle1">
                        Topic :{exams.find(ex => ex.examID == exID)?.examContent}
                    </Typography>
                </Paper>
            </Grid>

            {/* Bảng */}
            <Grid item xs={12}>
                <Paper elevation={3}>
                    {result.length > 0 ? <TableContainer>
                        <Table>
                            <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>User Id</TableCell>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Points</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {result
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((rs, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {rs.userId}
                                            </TableCell>
                                            <TableCell>
                                                {users.find(user => user.id === rs.userId)?.UserName}
                                            </TableCell>
                                            <TableCell>
                                                {(parseInt(rs.numberCorrect) / parseInt(rs.totalQuestion) * 10).toFixed(2)}
                                            </TableCell>

                                            <TableCell align="center">
                                                <Link to={`/viewDetailResult?userID=${rs.userId}&exID=${rs.examId}`}>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        startIcon={<Visibility />}
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        View detais
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer> : <Typography align="center" paddingTop={5}>Not Answer for exam</Typography>}
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
    )
}
