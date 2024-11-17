import { Button, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { getExamList } from "../../../service/ApiService";
import { ToHHMMSS } from '../../../utils/Timer/ToHHMMSS';
import { Link } from 'react-router-dom';
import { Exam, ResultExam } from '../../../models/Interface';
import { getResultExamList } from '../../../service/ExamApi';

export const ExamList = () => {
    const [examList, setExamList] = useState<Exam[]>([]);
    const [result, setResult] = useState<ResultExam[]>([])


    useEffect(() => {
        fetchExam();
        fetchResult();
    }, []);
    const fetchResult = async () => {
        const res = await getResultExamList();
        console.log(res);

        if (Array.isArray(res)) {
            setResult(res)
        }
    }

    const fetchExam = async () => {
        const res = await getExamList();
        if (Array.isArray(res)) {
            setExamList(res);
        }
    };
    console.log(examList);


    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'rgba(33,151,191,255)' }}>
                            <TableCell align="right" sx={{ width: '5%' }}>Index</TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>Image</TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>Content</TableCell>
                            <TableCell align="right" sx={{ width: '15%' }}>Course</TableCell>
                            <TableCell align="right" sx={{ width: '10%' }}>Time Limit</TableCell>
                            <TableCell align="right" sx={{ width: '10%' }}>Status</TableCell>
                            <TableCell align="center" sx={{ width: '10%' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {examList.map((exam, index) => (

                            exam.display &&
                            <TableRow
                                key={`ex-${index}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{index + 1}</TableCell>
                                <TableCell align="center">{exam.image ? <img style={{ width: '100px' }} src={exam.image} /> : <img style={{ width: '100px' }} src='https://th.bing.com/th/id/R.e77d23a4500cebf53c6c9cb66b06d6f5?rik=WJJsAXxvwLtJ8A&riu=http%3a%2f%2fwww.icomedia.eu%2fwp-content%2fuploads%2f2017%2f06%2fIQT-Widescreen-Banner.jpg&ehk=ASlrc9o%2fRqEEDL%2bf6Ha7v6C%2ffGc1iuG0VWl8XZbQJfk%3d&risl=&pid=ImgRaw&r=0' />}</TableCell>
                                <TableCell align="center">{exam.examContent}</TableCell>
                                <TableCell align="right">{exam.courseSemesterID}</TableCell>
                                <TableCell align="right"><ToHHMMSS time={exam.timeLimit} /></TableCell>
                                <TableCell align="right">
                                    {exam.status ? 'Start' : 'Done'}
                                </TableCell>
                                <TableCell align="center">
                                    {result.find(items => items.examId == exam.examID) ?
                                        <Link to={`/history?exID=${exam.examID}`}>
                                            <Button
                                                variant="contained" >
                                                VIEW
                                            </Button>
                                        </Link>
                                        : <Link to={`/examDetail?exID=${exam.examID}`}>
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
            </TableContainer>
        </Container>

    );
};
