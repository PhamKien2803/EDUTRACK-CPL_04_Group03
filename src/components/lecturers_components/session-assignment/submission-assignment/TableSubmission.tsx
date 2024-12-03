import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, Button, TextField,
  Link
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { answerAssignmentSlot, participants } from '../../../../models/Interface';
import { updateScoreAssignmentSlot } from "../../../../service/ApiService";
import { useTranslation } from 'react-i18next';
    
interface Props {
  answerAssignmentSlot: answerAssignmentSlot[];
  participants: participants[];
}

const TableSubmission: React.FC<Props> = ({ answerAssignmentSlot, participants }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const assignmentID = searchParams.get('assignmentid');
  const [latestSubmissions, setLatestSubmissions] = useState<(answerAssignmentSlot & { studentName: string })[]>([]);
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

    // Nhóm bài nộp theo UserID và lấy bài có thời gian nộp mới nhất
    const groupedSubmissions = mappedSubmissions.reduce((acc, curr) => {
      const existing = acc[curr.UserID];
      if (!existing || new Date(curr.Timestamped).getTime() > new Date(existing.Timestamped).getTime()) {
        acc[curr.UserID] = curr;
      }
      return acc;
    }, {} as Record<string, answerAssignmentSlot & { studentName: string }>);

    setLatestSubmissions(Object.values(groupedSubmissions));
  }, [answerAssignmentSlot, participants, assignmentID]);

  const handleEditClick = (index: number, score: string) => {
    setEditingIndex(index);
    setTempScore(score);
  };

  const handleSaveClick = (index: number) => {
    const updatedSubmissions = [...latestSubmissions];
    const newScore = Number(tempScore);
    updatedSubmissions[index].score = newScore;

    setLatestSubmissions(updatedSubmissions);
    setEditingIndex(null);

    updateScore(index, newScore);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setTempScore('');
  };

  const updateScore = (index: number, score: number) => {
    const updatedSubmission = latestSubmissions[index];
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

  const openInNewTab = (url: string) => {
    const header = sessionStorage.getItem("fileHeader") || "";
    const data = sessionStorage.getItem("fileData") || "";

    const fullBase64 = header && data ? `${header},${data}` : url;

    if (fullBase64.startsWith("data:")) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(
          `<iframe src="${fullBase64}" frameborder="0" style="width:100%;height:100%;"></iframe>`
        );
      } else {
        alert("{t('allow_popups')}");
      }
    } else {
      alert("{t('invalid_base64')}");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        {t('latest_submissions_title')}
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
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>{t('no')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>{t('student')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>{t('table_submission_status')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>{t('time_submitted')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>{t('table_link_file_assignment')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>{t('table_score')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>{t('update_score')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestSubmissions.map((submission, index) => (
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
                  {submission.Status === 1 ? "{t('table_submitted')}" : "{t('submitted_late')}"}
                </TableCell>
                <TableCell>{new Date(submission?.Timestamped).toLocaleString()}</TableCell>

                <TableCell>
                  <Link href={submission?.urlfile} onClick={() => openInNewTab(submission?.urlfile)} target="_blank" rel="noopener noreferrer">{t('assignment_link')}</Link>
                </TableCell>

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
                        {t('Save')}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleCancelClick}
                      >
                        {t('Cancel')}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEditClick(index, submission.score?.toString() || '')}
                    >
                      {t('Edit')}
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
