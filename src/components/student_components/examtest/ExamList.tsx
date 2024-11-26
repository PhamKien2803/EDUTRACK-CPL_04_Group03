import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Chip, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
import { useTranslation } from 'react-i18next';
import QuizIcon from '@mui/icons-material/Quiz';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export const ExamList = () => {
    const { t } = useTranslation();
    const [examList, setExamList] = useState<Exam[]>([]);
    const [examListClone, setExamListClone] = useState<Exam[]>([]);
    const [result, setResult] = useState<ResultExam[]>([])
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("all")

    const location = useLocation();
    const param = new URLSearchParams(location.search)
    const csId = param.get('csId')
    console.log('csID', csId);

    interface RootState {
        account: {
            account: {
                UserID: string;
            };
        };
    }

    const account = useSelector((state: RootState) => state.account.account);


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
            {examListClone && examListClone.length ? (
                <Box mt={2}>
                    {/* Filter Section */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                        gap={2}
                        flexWrap="wrap"
                    >
                        <FormControl variant="standard" size="small">
                            <InputLabel>{t('filter_label')}</InputLabel>
                            <Select
                                sx={{
                                    minWidth: 200,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#6a1b9a' },
                                        '&:hover fieldset': { borderColor: '#8e24aa' },
                                    },
                                }}
                                size="small"
                                displayEmpty
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="true">NEW</MenuItem>
                                <MenuItem value="false">DONE</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            variant="standard"
                            size="medium"
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('search_placeholder')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                style: { borderColor: '#6a1b9a' },
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    '&:hover': { borderColor: '#8e24aa' },
                                    '&:focus': { borderColor: '#6a1b9a' },
                                },
                            }}
                        />
                    </Box>

                    {/* Table Section */}
                    <TableContainer
                        component={Paper}
                        sx={{
                            transition: 'all 0.3s',
                            '&:hover': {
                                boxShadow: '0 4px 10px rgba(106, 27, 154, 0.5)',
                                borderColor: '#6a1b9a',
                            },
                        }}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f3e5f5' }}>
                                    <TableCell align="center">{t('exam_table_index')}</TableCell>
                                    <TableCell align="center">{t('exam_table_image')}</TableCell>
                                    <TableCell align="center">{t('exam_table_content')}</TableCell>
                                    <TableCell align="center">{t('exam_table_created_at')}</TableCell>
                                    <TableCell align="center">{t('exam_table_time_limit')}</TableCell>
                                    <TableCell align="center">{t('exam_table_status')}</TableCell>
                                    <TableCell align="center">{t('exam_table_action')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {examList.map((exam, index) => (
                                    exam.display &&
                                    compareTime(exam.dateOfBooking) && (
                                        <TableRow
                                            key={index}
                                            hover
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#ede7f6',
                                                    boxShadow: '0 4px 6px rgba(106, 27, 154, 0.3)',
                                                },
                                            }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={exam.image || 'https://via.placeholder.com/100'}
                                                    alt="exam"
                                                    style={{ width: 100, borderRadius: 4 }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{exam.examContent}</TableCell>
                                            <TableCell align="center">{exam.createdAt}</TableCell>
                                            <TableCell align="center">
                                                <ToHHMMSS time={exam.timeLimit} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    icon={
                                                        result.find((item) => item.examId === exam.examID) ? (
                                                            <CheckCircleIcon style={{ color: '#64dd17' }} />
                                                        ) : (
                                                            <NewReleasesIcon style={{ color: '#fff' }} />
                                                        )
                                                    }
                                                    label={
                                                        result.find((item) => item.examId === exam.examID)
                                                            ? t('status_end')
                                                            : t('status_new')
                                                    }
                                                    size="medium"
                                                    sx={{
                                                        backgroundColor: result.find((item) => item.examId === exam.examID)
                                                            ? '#a5d6a7'
                                                            : '#ff7043',
                                                        color: result.find((item) => item.examId === exam.examID) ? '#1b5e20' : '#fff', // Dark green or white text
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                        '&:hover': {
                                                            backgroundColor: result.find((item) => item.examId === exam.examID)
                                                                ? '#81c784'
                                                                : '#ff5722',
                                                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                                                        },
                                                    }}
                                                />
                                            </TableCell>


                                            <TableCell align="center">
                                                {result.find((item) => item.examId === exam.examID) ? (
                                                    <Link to={`/history?exID=${exam.examID}`}>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{ backgroundColor: '#6a1b9a', color: '#fff' }}
                                                        >
                                                            {t('exam_action_view')}
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Link to={`/examDetail?exID=${exam.examID}&csID=${csId}`}>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{ backgroundColor: '#8e24aa', color: '#fff' }}
                                                        >
                                                            {t('exam_action_exam')}
                                                        </Button>
                                                    </Link>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="300px"
                    textAlign="center"
                    color="#999"
                >
                    <QuizIcon style={{ fontSize: 100, color: '#999' }} />
                    <h2>{t('no_exams_title')}</h2>
                    <p style={{ maxWidth: 400, fontSize: 16, lineHeight: 1.5 }}>
                        {t('no_exams_message')}
                    </p>
                </Box>
            )}
        </Container>



    );
};
