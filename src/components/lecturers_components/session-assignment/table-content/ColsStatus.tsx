import React from 'react';
import { Box, Typography, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Assignment {
    title: string;
    dueDate: string;
    status: 'Completed' | 'Pending' | 'Overdue';
}

const assignments: Assignment[] = [
    { title: 'Math Assignment 1', dueDate: '2024-11-20', status: 'Completed' },
    { title: 'Science Lab Report', dueDate: '2024-11-22', status: 'Pending' },
    { title: 'History Essay', dueDate: '2024-11-10', status: 'Overdue' },
    { title: 'English Project', dueDate: '2024-11-25', status: 'Pending' },
    { title: 'Physics Assignment', dueDate: '2024-11-12', status: 'Completed' },
];

const ColsStatus: React.FC = () => {

    return (
        <Box sx={{ padding: 3 }}>
            <Divider/>
            <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold', color: '#1976d2' }}>
                Assignment Breakdown
            </Typography>
            <Grid container spacing={3}>
                {['Completed', 'Pending', 'Overdue'].map(status => (
                    <Grid item xs={12} key={status}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${status}-content`} id={`${status}-header`}>
                                <Typography variant="h6">{status} Assignments</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {assignments.filter(a => a.status === status).length === 0 ? (
                                    <Typography>No assignments in this status.</Typography>
                                ) : (
                                    <Box>
                                        {assignments.filter(a => a.status === status).map((assignment, index) => (
                                            <Paper sx={{ padding: 1, marginBottom: 1, boxShadow: 1 }} key={index}>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{assignment.title}</Typography>
                                                <Typography variant="body2">Due Date: {assignment.dueDate}</Typography>
                                            </Paper>
                                        ))}
                                    </Box>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ColsStatus;
