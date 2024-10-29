import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { keyframes } from '@mui/system';

type Student = {
  id: string;
  name: string;
  email: string;
  isOnline: boolean;
};

//Data Sample
const students: Student[] = [
  { id: 'HE170155', name: 'Phạm Duy Kiên', email: 'kienpdhe170155@fpt.edu.vn', isOnline: true },
  { id: 'HE170861', name: 'Nguyễn Kim Quang', email: 'quangnkhe170861@fpt.edu.vn', isOnline: true },
  { id: 'HE171973', name: 'Trần Quyết Tiến', email: 'tientqhe171973@fpt.edu.vn', isOnline: true },
  { id: 'HE170569', name: 'Nguyễn Trung Nghĩa', email: 'nghianthe170569@fpt.edu.vn', isOnline: true },
  { id: 'HE170155', name: 'Phạm Duy Kiên', email: 'kienpdhe170155@fpt.edu.vn', isOnline: true },
  { id: 'HE170861', name: 'Nguyễn Kim Quang', email: 'quangnkhe170861@fpt.edu.vn', isOnline: true },
  { id: 'HE171973', name: 'Trần Quyết Tiến', email: 'tientqhe171973@fpt.edu.vn', isOnline: false },
  { id: 'HE170569', name: 'Nguyễn Trung Nghĩa', email: 'nghianthe170569@fpt.edu.vn', isOnline: false },
];

//Animation online blink
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

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
              <CircleIcon
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
    </Box>
  );
};

export default TrackingOnline;
