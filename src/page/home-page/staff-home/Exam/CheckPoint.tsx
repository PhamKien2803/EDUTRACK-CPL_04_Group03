import React, { useEffect, useState } from 'react';
import { classRoom, lession } from '../../../../models/Interface';
import { getClass, getCourseSemester, getSemester } from '../../../../service/ApiService';
import { Box, Button, Container, FormControl, InputAdornment, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Semester {
    SemesterID: string;
    SemesterName: string;
    StartDate: string;
    EndDate: string;
    Status: boolean;
}

export const CheckPoint = () => {

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
        semesterId && (
            <Container>
                {/* Tiêu đề */}
                <Typography variant="h4" fontWeight="bold" mb={3} color="primary.black">
                    Exam Management
                </Typography>

                {/* Tìm kiếm và bộ lọc */}
                <Box
                    mt={2}
                    mb={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            size="small"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search exams..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="secondary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            select
                            label="Semester"
                            variant="outlined"
                            size="small"
                            value={semesterId}
                            onChange={(e) => setSemesterId(e.target.value)}
                            sx={{
                                minWidth: 200,
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                            }}
                        >
                            {dataSemester?.slice()
                                .reverse()
                                .map((sm) => (
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
                            size="small"
                            value={classId}
                            onChange={(e) => setClassID(e.target.value)}
                            sx={{
                                minWidth: 200,
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                            }}
                        >
                            <MenuItem value="all">ALL</MenuItem>
                            {dataClass.map((cl) => (
                                <MenuItem key={cl.ClassID} value={cl.ClassID}>
                                    {cl.ClassName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Box>

                {/* Bảng dữ liệu */}
                <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0px 4px 16px rgba(0,0,0,0.1)' }}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        {/* Header */}
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
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%' }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '25%' }}>Course</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '35%' }}>Semester</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '20%' }}>Class</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%', textAlign: 'center' }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Body */}
                        <TableBody>
                            {lessions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ls, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f9f9f9',
                                        },
                                    }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{ls.CourseID}</TableCell>
                                    <TableCell>{ls.SemesterID.toUpperCase()}</TableCell>
                                    <TableCell>{dataClass.find((item) => item.ClassID === ls.ClassID)?.ClassName}</TableCell>
                                    <TableCell align="center">
                                        <Link to={`/staff/manage-exam-point?exID=${ls.id}`}>
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
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
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
            </Container>
        )
    );
}

export default CheckPoint;