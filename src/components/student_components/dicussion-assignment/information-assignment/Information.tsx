import { Box, Typography, Button, Paper, Divider } from '@mui/material';

function Information() {

  const assignment = {
    title: '(Assignment) QuickSort',
    content: 'All students are required to submit assignments',
    dueDate: '2023-01-05 13:00:00 (GMT+07)',
    additionalFiles: ['file1.pdf', 'file2.docx'],
    score: 100,
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        {/* Assignment Title */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {assignment.title}
        </Typography>

        {/* Content Section */}
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
          Content
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {assignment.content}
        </Typography>
      </Paper>

      {/* Additional Files Section */}
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
        Additional files:
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4CAF50',
            color: 'white',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
          }}
        >
          Get Assignment File
        </Button>
      </Box>

      {/* Due Date */}
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontSize: '1.25rem' }}>
        Due date: {assignment.dueDate} - <strong>SCORE (YOUR SCORE IS): <span style={{ color: "red" }}>{assignment.score}</span> points</strong>
      </Typography>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}

export default Information;
