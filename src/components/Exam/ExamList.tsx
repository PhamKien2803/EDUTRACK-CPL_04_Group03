import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { getExamList } from "../../service/ApiService";
import UsingStylesUtils from '../../utils/Button/UsingStylesUtils';
import { ToHHMMSS } from '../../utils/Timer/ToHHMMSS';

interface Exam {
    examID: string;
    examContent: string;
    courseSemesterID: string;
    timeLimit: string;
    status: boolean;
}

export const ExamList = () => {
    const [examList, setExamList] = useState<Exam[]>([]);

    useEffect(() => {
        fetchExam();
    }, []);

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
                            <TableCell align="center" sx={{ width: '30%' }}>Content</TableCell>
                            <TableCell align="right" sx={{ width: '15%' }}>Course</TableCell>
                            <TableCell align="right" sx={{ width: '10%' }}>Time Limit</TableCell>
                            <TableCell align="right" sx={{ width: '10%' }}>Status</TableCell>
                            <TableCell align="center" sx={{ width: '10%' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {examList.map((exam, index) => (
                            <TableRow
                                key={`ex-${index}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{index + 1}</TableCell>
                                <TableCell align="center">{exam.examContent}</TableCell>
                                <TableCell align="right">{exam.courseSemesterID}</TableCell>
                                <TableCell align="right"><ToHHMMSS time={exam.timeLimit} /></TableCell>
                                <TableCell align="right">
                                    {exam.status ? 'Start' : 'Done'}
                                </TableCell>
                                <TableCell align="center">
                                    {exam.status ? <UsingStylesUtils color='#7F00FF' string="Start" icon={<ModeEditIcon />} />
                                        :
                                        <UsingStylesUtils color='#4eb1ce' string="View" icon={<ModeEditIcon />} />}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
};
