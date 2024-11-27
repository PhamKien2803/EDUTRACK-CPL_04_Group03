import { Box } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';

function FeedBack() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="300px"
            textAlign="center"
            color="#999"
        >
            <FeedbackIcon style={{ fontSize: 100, color: '#999' }} />
            <h2>No feedback from teacher</h2>
            <p style={{ maxWidth: 400, fontSize: 16, lineHeight: 1.5 }}>
                Please wait for teacher to send feedback or check back later.
            </p>
        </Box>
    );
}

export default FeedBack;
