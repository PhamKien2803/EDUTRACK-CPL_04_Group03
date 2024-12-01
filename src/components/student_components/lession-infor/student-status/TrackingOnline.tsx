import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import { keyframes } from '@mui/system';

interface Student {
  id: number;
  name: string;
  email: string;
  isOnline: boolean;
}

//Animation online blink
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Dummy data (empty list to simulate no students online)
const students: Student[] = [];

function TrackingOnline() {
  return (
    <Box
      sx={{
        maxWidth: 360,
        maxHeight: 850,
        padding: 2,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        border: '1px solid lightgray',
        marginTop: '2rem',
        marginLeft: '1rem',
        paddingLeft: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto',
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
      >
        Student Online Status
      </Typography>
      <hr style={{ border: '1px solid lightgray', margin: '8px auto' }} />

      {students.length > 0 ? (
        <List>
          {students.map((student) => (
            <ListItem key={student.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ListItemAvatar>
                <Avatar>{student.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={500}>
                    {student.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {student.email}
                  </Typography>
                }
              />
              <Box display="flex" alignItems="center" gap={0.5}>
                {/* Blinking Online Indicator */}
                <SignalWifiStatusbarConnectedNoInternet4Icon
                  fontSize="small"
                  sx={{
                    color: student.isOnline ? 'green' : 'grey',
                    animation: student.isOnline ? `${blink} 1s infinite` : 'none',
                  }}
                />
                <Typography variant="body2" color={student.isOnline ? 'green' : 'text.secondary'}>
                  {student.isOnline ? 'Online' : 'Offline'}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Currently, there are no students online.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TrackingOnline;
