import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import React from 'react';

const UpcomingQuestionsTable: React.FC = () => {
    const upcomingQuestions = [
        { text: 'What is React?', dueDate: '2024-10-25', status: 'Upcoming' },
        { text: 'Explain Hooks in React', dueDate: '2024-10-27', status: 'Upcoming' },
        { text: 'What is JSX?', dueDate: '2024-10-30', status: 'Upcoming' },
    ];

    return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ margin: 2 }}>Upcoming Questions</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {upcomingQuestions.map((question, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{question?.text}</TableCell>
                            <TableCell>{question?.dueDate}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="success">
                                {question?.status}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UpcomingQuestionsTable;
