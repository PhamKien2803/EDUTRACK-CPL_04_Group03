import ModeEditIcon from '@mui/icons-material/ModeEdit';
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

interface Exam {
    examID: string,
    examContent: string,
    courseSemesterID: string,
    timeLimit: string,
    status: boolean
}



export const ExamList = () => {
    const [examList, setExamList] = useState<Exam[]>([]);

    useEffect(() => {
        fetchExam();
    }, [])

    const fetchExam = async () => {
        const res = await getExamList();
        if (Array.isArray(res)) {
            setExamList(res)
        }
    }
    console.log(examList);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Index</TableCell>
                        <TableCell align="right">Content</TableCell>
                        <TableCell align="right">courseSemesterID</TableCell>
                        <TableCell align="right">timeLimit</TableCell>
                        <TableCell align="right">status</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {examList.map((exam, index) => (
                        <TableRow
                            key={`ex-${index}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{index + 1}</TableCell>
                            <TableCell align="right">{exam.examContent}</TableCell>
                            <TableCell align="right">{exam.courseSemesterID}</TableCell>
                            <TableCell align="right">{exam.timeLimit}</TableCell>
                            {exam.status ? <TableCell align="right">Done</TableCell> : <TableCell align="right"></TableCell>}

                            <TableCell align="right"><UsingStylesUtils string='DO NOW' icon={<ModeEditIcon />} /></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
