import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField } from '@mui/material';

interface StudentSubmission {
  id: number;
  student: string;
  status: string;
  fileLink: string;
  score: number | string; 
}

const TableSubmission: React.FC = () => {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    { id: 1, student: 'Pham Duy Kien', status: 'Submitted', fileLink: '#', score: '' },
    { id: 2, student: 'Do Dang Phuong', status: 'Not Submitted', fileLink: '#', score: '' },
  ]);

  // Handle score change
  const handleScoreChange = (id: number, value: string) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === id ? { ...submission, score: value } : submission
      )
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Number of Student Submissions: {submissions.length}/20
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Student</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Submission Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Link/File Assignment</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Score</TableCell> {/* New column for Score */}
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow
                key={submission.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                  },
                  transition: 'background-color 0.3s',
                }}
              >
                <TableCell>{submission.id}</TableCell>
                <TableCell>{submission.student}</TableCell>
                <TableCell>{submission.status}</TableCell>
                <TableCell>
                  <a
                    href={submission.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Code.zip
                  </a>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={submission.score}
                    onChange={(e) => handleScoreChange(submission.id, e.target.value)}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    sx={{ width: '80px' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableSubmission;
