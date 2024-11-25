import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Exam, ResultExam } from '../../../models/Interface';
import { getExamListByID, getResultExamListByUserId } from '../../../service/ExamApi';
import { ToHHMMSS } from '../../../utils/Timer/ToHHMMSS';

export const ExamList = () => {
    const [examList, setExamList] = useState<Exam[]>([]);
    const [examListClone, setExamListClone] = useState<Exam[]>([]);
    const [result, setResult] = useState<ResultExam[]>([])
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("all")

    const location = useLocation();
    const param = new URLSearchParams(location.search)
    const csId = param.get('csId')
    console.log('csID', csId);

    const account = useSelector((state: any) => state.account.account);


    useEffect(() => {
        fetchExam();
        fetchResult();
    }, []);

    useEffect(() => {
        let filteredExams = [...examListClone];

        if (type !== 'all') {
            filteredExams = filteredExams.filter((ex) =>
                type === 'true' ? ex.status === true : ex.status === false
            );
        }


        if (name) {
            filteredExams = filteredExams.filter((ex) =>
                ex.examContent.toLowerCase().includes(name.toLowerCase())
            );
        }

        setExamList(filteredExams);
    }, [type, name, examListClone]);

    const fetchResult = async () => {
        const res = await getResultExamListByUserId(account.UserID);
        console.log(res);

        if (Array.isArray(res)) {
            setResult(res)
        }
    }

    const fetchExam = async () => {
        const res = await getExamListByID(csId);
        if (Array.isArray(res)) {
            setExamList(res);
            setExamListClone(res)
        }
    };



    const compareTime = (time: string) => {
        if (!time) {
            return true
        }
        const now = new Date();

        const targetTime = new Date(time);
        // console.log('now', now);
        // console.log('targetTime', targetTime);

        if (now > targetTime) {
            return true
        } else {
            return false
        }
    }


    return (

        <Container>
            {examListClone && examListClone.length ? <div>
                <Box mt={2} mb={2} sx={{ position: 'relative' }}>
                    <FormControl sx={{ position: 'absolute', right: "2px" }}>
                        <TextField
                            size="small"
                            onChange={(e) => setName(e.target.value)}
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
                    <FormControl >
                        <InputLabel>Sort</InputLabel>
                        <Select
                            variant="outlined"
                            sx={{ minWidth: 200 }}
                            size="small"
                            displayEmpty
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            <MenuItem value='all'>All</MenuItem>
                            <MenuItem value='true'>NEW</MenuItem>
                            <MenuItem value='false'>DONE</MenuItem>
                        </Select>
                    </FormControl>

                </Box>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'rgba(33,151,191,255)' }}>
                                <TableCell align="right" sx={{ width: '5%' }}>Index</TableCell>
                                <TableCell align="center" sx={{ width: '15%' }}>Image</TableCell>
                                <TableCell align="center" sx={{ width: '15%' }}>Content</TableCell>
                                <TableCell align="right" sx={{ width: '15%' }}>Created At</TableCell>
                                <TableCell align="right" sx={{ width: '10%' }}>Time Limit</TableCell>
                                <TableCell align="right" sx={{ width: '10%' }}>Status</TableCell>
                                <TableCell align="center" sx={{ width: '10%' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {examList.map((exam, index) => (

                                exam.display && compareTime(exam?.dateOfBooking) &&
                                <TableRow
                                    key={`ex-${index}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{index + 1}</TableCell>
                                    <TableCell align="center">{exam.image ? <img style={{ width: '100px' }} src={exam.image} /> : <img style={{ width: '100px' }} src='https://th.bing.com/th/id/R.e77d23a4500cebf53c6c9cb66b06d6f5?rik=WJJsAXxvwLtJ8A&riu=http%3a%2f%2fwww.icomedia.eu%2fwp-content%2fuploads%2f2017%2f06%2fIQT-Widescreen-Banner.jpg&ehk=ASlrc9o%2fRqEEDL%2bf6Ha7v6C%2ffGc1iuG0VWl8XZbQJfk%3d&risl=&pid=ImgRaw&r=0' />}</TableCell>
                                    <TableCell align="center">{exam.examContent}</TableCell>
                                    <TableCell align="right">{exam.createdAt}</TableCell>
                                    <TableCell align="right"><ToHHMMSS time={exam.timeLimit} /></TableCell>
                                    <TableCell align="right">
                                        {result.find(items => items.examId == exam.examID) ? 'END' : 'NEW'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {result.find(items => items.examId == exam.examID) ?
                                            <Link to={`/history?exID=${exam.examID}`}>
                                                <Button
                                                    variant="contained" >
                                                    VIEW
                                                </Button>
                                            </Link>
                                            : <Link to={`/examDetail?exID=${exam.examID}&csID=${csId}`}>
                                                <Button
                                                    variant="contained" >
                                                    EXAM
                                                </Button>
                                            </Link>
                                        }

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></div> : <div>Not Exam Now</div>}
        </Container>

    );
};
