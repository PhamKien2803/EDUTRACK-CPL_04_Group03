import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import {  courses as Course, lession as Lession } from "../../../../models/Interface";
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
    

interface Props {
    lession: Lession;
    courses: Course[];
}
const Header: React.FC<Props> = ({ lession, courses }) => {
    const { t } = useTranslation();
    return (
        <Box p={3}>
            {/* Breadcrumbs */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link href="/lecturer/homePage" color="inherit" underline="hover" display="flex" alignItems="center">
                    <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {t('Home')}
                </Link>
                <Typography color="text.primary" display="flex" alignItems="center">
                    {courses?.find((c) => c.id === lession?.CourseID)?.CourseName}
                </Typography>
            </Breadcrumbs>
            <div>
                <Typography variant="h4" style={{ margin: '20px 0' }}>
                    {courses?.find((c) => c.id === lession?.CourseID)?.CourseName}
                </Typography>
                <Typography variant="body1">{t('CourseCode')}: {lession.CourseID}</Typography>
            </div>
        </Box>
    );
};

export default Header;
