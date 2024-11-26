import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, FormControl, InputAdornment, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { classRoom, lession } from '../../../../models/Interface';
import { getClass, getCourseSemester, getSemester } from '../../../../service/ApiService';

interface Semester {
    SemesterID: string;
    SemesterName: string;
    StartDate: string;
    EndDate: string;
    Status: boolean;
}

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
        semesterId &&
        <Container>
            <Box mt={2} mb={2} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        size="small"
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color='secondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl sx={{ marginLeft: '20px' }}>
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
                <FormControl sx={{ marginLeft: '20px' }}>
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
                <Link to={`/AddingCourseSemester`}>
                    <Button variant="outlined" sx={{ marginLeft: "20px" }}>Add</Button>
                </Link>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'aqua' }}>
                            <TableCell sx={{ width: '15%' }}>Index</TableCell>
                            <TableCell sx={{ width: '25%' }}>Course</TableCell>
                            <TableCell sx={{ width: '35%' }}>Semester</TableCell>
                            <TableCell sx={{ width: '15%' }}>Class</TableCell>
                            <TableCell sx={{ width: '10%' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ls, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{ls.CourseID}</TableCell>
                                <TableCell>{ls.SemesterID.toUpperCase()}</TableCell>
                                <TableCell>{dataClass.find(item => item.ClassID === ls.ClassID)?.ClassName}</TableCell>
                                <TableCell><Button variant="contained">VIEW</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={lessions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
};
