import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';

const AssignmentContent: React.FC = () => {
  const assignment = {
    title: '(Assignment) QuickSort',
    content: 'All students are required to submit assignments',
    dueDate: '2023-01-05 13:00:00 (GMT+07)',
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
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

        {/* Additional Files Section */}
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
          Additional files:
        </Typography>

        {/* Due Date */}
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          Due date: {assignment.dueDate}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="secondary">
            Export Submissions
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssignmentContent;
