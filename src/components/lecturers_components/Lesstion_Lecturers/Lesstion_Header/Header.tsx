import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import { classRoom as ClassRoom, courses as Course, lession as Lession, participants as Participants, questionSlot as QuestionSlot, slot as Slot } from "../../../../models/Interface";

import HomeIcon from '@mui/icons-material/Home';


interface Props {
    lession: Lession;
    courses: Course[];
}
const Header: React.FC<Props> = ({ lession, courses }) => {
    
    return (
        <Box p={3}>
            {/* Breadcrumbs */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link href="/lecturer/homePage" color="inherit" underline="hover" display="flex" alignItems="center">
                    <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Home
                </Link>
                <Typography color="text.primary" display="flex" alignItems="center">
                    {courses?.find((c) => c.id === lession?.CourseID)?.CourseName}
                </Typography>

            </Breadcrumbs>
            <div>
                {/* <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">FPT Education</Typography>
                <Typography variant="body1">User Guide | Chat</Typography>
            </header> */}
                <Typography variant="h4" style={{ margin: '20px 0' }}>
                    {courses?.find((c) => c.id === lession?.CourseID)?.CourseName}
                </Typography>
                <Typography variant="body1">Course code: {lession.CourseID}</Typography>

            </div>
        </Box>
    );
};

export default Header;
