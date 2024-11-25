import { Button, Container } from '@mui/material';
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
import QuizIcon from '@mui/icons-material/Quiz';
import { useTranslation } from 'react-i18next';

export const ExamList = () => {
    const { t } = useTranslation();
    const [examList, setExamList] = useState<Exam[]>([]);
    const [result, setResult] = useState<ResultExam[]>([])

    const location = useLocation();
    const param = new URLSearchParams(location.search)
    const csId = param.get('csId')
    console.log('csID', csId);

    const account = useSelector((state: any) => state.account.account);


    useEffect(() => {
        fetchExam();
        fetchResult();
    }, []);
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
        }
    };

    return (

        <Container>{examList && examList.length ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'rgba(33,151,191,255)' }}>
                            <TableCell align="right" sx={{ width: '5%' }}>{t('exam_table_index')}</TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>{t('exam_table_image')}</TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>{t('exam_table_content')}</TableCell>
                            <TableCell align="right" sx={{ width: '15%' }}>{t('exam_table_created_at')}</TableCell>
                            <TableCell align="right" sx={{ width: '10%' }}>{t('exam_table_time_limit')}</TableCell>
                            <TableCell align="right" sx={{ width: '10%' }}>{t('exam_table_status')}</TableCell>
                            <TableCell align="center" sx={{ width: '10%' }}>{t('exam_table_action')}</TableCell>
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
                                <TableCell align="right">{exam.createdAt}</TableCell>
                                <TableCell align="right"><ToHHMMSS time={exam.timeLimit} /></TableCell>
                                <TableCell align="right">
                                    {result.find(items => items.examId === exam.examID) ? t('exam_status_end') : t('exam_status_new')}
                                </TableCell>
                                <TableCell align="center">
                                    {result.find(items => items.examId == exam.examID) ?
                                        <Link to={`/history?exID=${exam.examID}`}>
                                            <Button
                                                variant="contained" >
                                                {t('exam_action_view')}
                                            </Button>
                                        </Link>
                                        : <Link to={`/examDetail?exID=${exam.examID}&csID=${csId}`}>
                                            <Button
                                                variant="contained" >
                                                {t('exam_action_exam')}
                                            </Button>
                                        </Link>
                                    }

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px',
                textAlign: 'center',
                color: '#999'
            }}>
                <QuizIcon style={{ fontSize: '100px', color: '#999' }} />
                <h2>{t('no_exams_title')}</h2>
                <p style={{ maxWidth: '400px', fontSize: '16px', lineHeight: '1.5' }}>
                    {t('no_exams_message')}
                </p>
            </div>}
        </Container>

    );
};
