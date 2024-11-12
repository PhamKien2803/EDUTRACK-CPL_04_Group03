import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Avatar } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AssignmentIcon from '@mui/icons-material/Assignment';

function OverViews() {
  // Sample data for Questions
  const questions = [
    { id: 1, code: 'CODE-87568', title: 'CQ2.1', status: 'On-going' },
    { id: 2, code: 'CODE-87569', title: 'CQ2.2', status: 'On-going' },
    { id: 3, code: 'CODE-87570', title: 'CQ2.3', status: 'On-going' },
    { id: 4, code: '', title: 'LAB1', status: 'On-going' },
  ];

  const assignments = [
    { id: 1, title: 'PRO 192 ASSIGNMENT', status: 'N/A' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Table of contents
      </Typography>

      {/* Questions Section */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        QUESTION
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q.id}>
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#FFCC80' }}>
                    <QuestionMarkIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {q.code ? `[${q.code}]` : ''} {q.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1976d2',
                      bgcolor: '#E3F2FD',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {q.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assignments Section */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        ASSIGNMENT
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {assignments.map((a) => (
              <TableRow key={a.id}>
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#FF8A80' }}>
                    <AssignmentIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {a.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#424242',
                      px: 1,
                      py: 0.5,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {a.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OverViews;
