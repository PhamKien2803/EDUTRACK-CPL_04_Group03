import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Card, CardContent, Container, FormControl, InputAdornment, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TablePagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { classRoom, lession } from '../../../../models/Interface';
import { getClass, getCourseSemester, getSemester } from '../../../../service/ApiService';
import { Semester } from "../../../../models/Interface"
import VisibilityIcon from '@mui/icons-material/Visibility';


export const MangerCourse = () => {
    const [lessions, setLession] = useState<lession[]>([]);
    const [dataSemester, setDataSemester] = useState<Semester[]>([]);
    const [dataClone, setDataClone] = useState<lession[]>([]);
    const [semesterId, setSemesterId] = useState<string>('');
    const [classId, setClassID] = useState<string>('all');
    const [dataClass, setDataClass] = useState<classRoom[]>([]);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchClass();
        fetchDataSemester();
        fetchCourseSemester();
    }, []);

    useEffect(() => {
        let filteredData = [...dataClone];
        if (semesterId) {
            filteredData = filteredData.filter(item => item.SemesterID === semesterId);
        }
        if (classId !== 'all') {
            filteredData = filteredData.filter(item => item.ClassID === classId);
        }
        if (search) {
            filteredData = filteredData.filter(item => item.CourseID.includes(search));
        }
        setLession(filteredData);
    }, [semesterId, classId, search]);

    const fetchCourseSemester = async () => {
        const res = await getCourseSemester();
        if (Array.isArray(res)) {
            setLession(res);
            setDataClone(res);
        }
    };

    const fetchDataSemester = async () => {
        const res = await getSemester();
        if (Array.isArray(res) && res.length > 0) {
            const latestSemesterId = res[res.length - 1].SemesterID;
            setSemesterId(latestSemesterId);
            setDataSemester(res);
        }
    };

    const fetchClass = async () => {
        const res = await getClass();
        if (Array.isArray(res)) {
            setDataClass(res);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when rows per page change
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Manage Courses
            </Typography>

            <Card elevation={3} sx={{ mb: 4 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <FormControl sx={{ flex: 1 }}>
                            <TextField
                                size="small"
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search courses"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color='secondary' />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                select
                                label="Semester"
                                variant="outlined"
                                sx={{ minWidth: 200 }}
                                size="small"
                                value={semesterId}
                                onChange={(e) => setSemesterId(e.target.value)}
                            >
                                {dataSemester?.slice().reverse().map((sm) => (
                                    <MenuItem key={sm.SemesterID} value={sm.SemesterID}>
                                        {sm.SemesterName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl>
                            <TextField
                                select
                                label="Class"
                                variant="outlined"
                                sx={{ minWidth: 200 }}
                                size="small"
                                value={classId}
                                onChange={(e) => setClassID(e.target.value)}
                            >
                                <MenuItem value="all">ALL</MenuItem>
                                {dataClass.map((cl) => (
                                    <MenuItem key={cl.ClassID} value={cl.ClassID}>
                                        {cl.ClassName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <Link to={`/AddingCourseSemester`} style={{ textDecoration: 'none' }}>
                            <Button
                                startIcon={<AddCircleOutlineIcon />}
                                variant="contained"
                                color="secondary"
                                sx={{ textTransform: 'none' }}
                            >
                                Add Course
                            </Button>
                        </Link>
                    </Box>
                </CardContent>
            </Card>

            <Card elevation={3}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead sx={(theme) => ({
                            backgroundColor: theme.palette.mode === "dark" ? "#2C2C3E" : "#2C3E50",
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: "14px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            borderBottom: theme.palette.mode === "dark" ? "1px solid #383850" : "1px solid #DADCE0",
                        })}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: "white", textAlign: "center" }}>Index</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: "white", textAlign: "center" }}>Course</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: "white", textAlign: "center" }}>Semester</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: "white", textAlign: "center" }}>Class</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: "white", textAlign: "center" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lessions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ls, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{ls.CourseID}</TableCell>
                                    <TableCell align="center">{ls.SemesterID.toUpperCase()}</TableCell>
                                    <TableCell align="center">{dataClass.find(item => item.ClassID === ls.ClassID)?.ClassName}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size='medium'
                                            startIcon={<VisibilityIcon />}
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            View
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
                    count={lessions.length}
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
            </Card>
        </Container>
    );
};
