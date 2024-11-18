import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Button, TextField
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { answerAssignmentSlot, participants } from '../../../../models/Interface';
import { updateScoreAssignmentSlot } from "../../../../service/ApiService";

interface Props {
  answerAssignmentSlot: answerAssignmentSlot[];
  participants: participants[];
}

const TableSubmission: React.FC<Props> = ({ answerAssignmentSlot, participants }) => {
  const [searchParams] = useSearchParams();
  const assignmentID = searchParams.get('assignmentid');
  const [filteredSubmissions, setFilteredSubmissions] = useState<(answerAssignmentSlot & { studentName: string })[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempScore, setTempScore] = useState<string>('');

  useEffect(() => {
    const mappedSubmissions = answerAssignmentSlot
      .filter(slot => slot.AssignmentID === assignmentID)
      .map(slot => {
        const participant = participants.find(part => part.id === slot.UserID);
        return {
          ...slot,
          studentName: participant ? participant.UserName : 'Unknown User',
        };
      });

    setFilteredSubmissions(mappedSubmissions);
  }, [answerAssignmentSlot, participants, assignmentID]);

  const handleEditClick = (index: number, score: string) => {
    setEditingIndex(index);
    setTempScore(score);
  };

  const handleSaveClick = (index: number) => {
    const updatedSubmissions = [...filteredSubmissions];
    const newScore = Number(tempScore);
    updatedSubmissions[index].score = newScore;

    setFilteredSubmissions(updatedSubmissions);
    setEditingIndex(null);

    updateScore(index, newScore);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setTempScore('');
  };

  const updateScore = (index: number, score: number) => {
    const updatedSubmission = filteredSubmissions[index];
    const updatedData: answerAssignmentSlot = {
      ...updatedSubmission,
      score,
      Timestamped: new Date().toISOString(),
    };
    updateScoreAssignmentSlot(updatedData)
      .then(response => {
        console.log('Score updated successfully:', response);
      })
      .catch(error => {
        console.error('Error updating score:', error);
      });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Number of Student Submissions: {filteredSubmissions.length}
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
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Score</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Update Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubmissions.map((submission, index) => (
              <TableRow
                key={submission.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                  },
                  transition: 'background-color 0.3s',
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{submission.studentName}</TableCell>
                <TableCell
                  sx={{
                    color: submission.Status === 1 ? 'green' : 'red',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {submission.Status === 1 ? "Submitted" : "Not Submitted"}
                </TableCell>

                {/* <TableCell>
                  <a
                    href={submission.urlfile || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {submission.urlfile || 'Assignment File'}
                  </a>
                </TableCell> */}

                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      value={tempScore}
                      onChange={(e) => setTempScore(e.target.value)}
                      variant="outlined"
                      size="small"
                      type="number"
                    />
                  ) : (
                    submission.score !== undefined ? submission.score : 'No Score'
                  )}
                </TableCell>

                <TableCell>
                  {editingIndex === index ? (
                    <>
                      <Button
                        sx={{ marginRight: 1 }}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleSaveClick(index)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEditClick(index, submission.score?.toString() || '')}
                    >
                      Edit
                    </Button>
                  )}
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
