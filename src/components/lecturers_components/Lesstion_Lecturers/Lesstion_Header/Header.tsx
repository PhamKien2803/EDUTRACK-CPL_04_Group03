import React from 'react';
import { Link, Typography, Box, Breadcrumbs } from '@mui/material';
import { lession as Lession, participants as Participants, classRoom as ClassRoom, slot as Slot, questionSlot as QuestionSlot, courses as Course } from "../../../../models/Interface";

import HomeIcon from '@mui/icons-material/Home';


interface Props {
    questionSlot: QuestionSlot[];
    slot: Slot[];
    lession: Lession;
    participants: Participants[];
    classes: ClassRoom[];
    // setSelected: (id: string) => void;
    courses: Course[];
}
const Header: React.FC<Props> = ({ slot, lession, classes, questionSlot, courses, participants }) => {
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
                <Typography variant="body1">Course code: LAB211</Typography>

            </div>
        </Box>
    );
};

export default Header;
