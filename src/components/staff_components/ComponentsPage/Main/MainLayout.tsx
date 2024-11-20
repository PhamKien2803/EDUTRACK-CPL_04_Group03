import { useState } from 'react';
import Box from '@mui/material/Box';
import SideMenu from './SideMenu';
import Typography from '@mui/material/Typography';
import DashboardStaff from '../../../../page/home-page/staff-home/DashboardStaff';

export default function MainLayout() {
    const [currentTab, setCurrentTab] = useState('dashboard');

    // Nội dung của các tab
    const renderContent = () => {
        switch (currentTab) {
            case 'dashboard':
                return <DashboardStaff /> //Components
            case 'class':
                return <Typography variant="h4">Class Dashboard</Typography>;
            case 'semesters':
                return <Typography variant="h4">Semester List</Typography>;
            case 'student':
                return <Typography variant="h4">Student List</Typography>;
            case 'settings':
                return <Typography variant="h4">Settings</Typography>;
            case 'about':
                return <Typography variant="h4">About Us</Typography>;
            case 'feedback':
                return <Typography variant="h4">Feedback Form</Typography>;
            default:
                return <Typography variant="h4">Page Not Found</Typography>;
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <SideMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: 'background.default',
                    overflow: 'auto',
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
}
