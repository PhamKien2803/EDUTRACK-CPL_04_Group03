import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import DriveIcon from '@mui/icons-material/DriveFolderUpload';

const ClassMeetingCard: React.FC = () => {
    return (
        <Card sx={{ width: '450px', margin: '20px', borderRadius: '10px' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Class meeting
                </Typography>
                <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f7f7f7', padding: 1, borderRadius: '10px' }}>
                    <Avatar sx={{ backgroundColor: '#4285F4', marginRight: 2 }}>
                        <DriveIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="body1" fontWeight="bold">anhtn35</Typography>
                        <Typography variant="body2" color="textSecondary">anhtn35@fpt.edu.vn</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ClassMeetingCard;
