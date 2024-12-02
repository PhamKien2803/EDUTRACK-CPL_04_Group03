import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Divider, Grid, Button } from '@mui/material';
import { assignmentSlot, slot } from '../../../../models/Interface';
import { updateStatusAssignmentSlot } from "../../../../service/ApiService";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  ReplyAllIcon  from '@mui/icons-material/ReplyAll';
import { useTranslation } from 'react-i18next';
    
interface Props {
  assignmentSlot: assignmentSlot[];
  assignmentID: string | null;
  slots: slot[];
  setSlots: (slots: slot[]) => void;
  selectedSlot: slot | null;
}

const AssignmentContent: React.FC<Props> = ({ assignmentSlot }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slotID = searchParams.get('Slotid');
  const assignmentID = searchParams.get('assignmentid');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const assignment = assignmentSlot.find(
    (as) => as?.Slotid === slotID && as?.AssignmentID === assignmentID
  );

  useEffect(() => {
    if (status === 1 && timeRemaining !== null && timeRemaining <= 10) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }
  }, [status, timeRemaining]);


  useEffect(() => {
    if (!assignment) return;

    setStatus(assignment.Status);
    if (assignment.Status !== 1 || status === 2) {
      return;
    }
    const parseTimeToSeconds = (timeString: string): number => {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const storedTimeRemaining = localStorage.getItem(`timeRemaining_${assignment.AssignmentID}`);
    const initialTimeRemaining = storedTimeRemaining ? parseInt(storedTimeRemaining, 10) : null;

    if (initialTimeRemaining !== null) {
      setTimeRemaining(initialTimeRemaining);
    } else {
      const startSeconds = parseTimeToSeconds(assignment.TimeStart);
      const endSeconds = parseTimeToSeconds(assignment.TimeEnd);
      setTimeRemaining(endSeconds - startSeconds);
    }

    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(timerInterval);
          localStorage.removeItem(`timeRemaining_${assignment.AssignmentID}`);

          //Time hết thì set status = 2
          if (assignment.Status === 1) {
            setStatus(2);
            updateStatusAssignmentSlot({
              id: assignment.id,
              AssignmentID: assignment.AssignmentID,
              UserID: assignment.UserID,
              title: assignment.title,
              description: assignment.description,
              urlfile: assignment.urlfile,
              TimeStart: assignment.TimeStart,
              TimeEnd: assignment.TimeEnd,
              Slotid: assignment.Slotid,
              Status: 2
            });
          }

          return 0;
        }

        localStorage.setItem(`timeRemaining_${assignment.AssignmentID}`, (prevTime - 1).toString());
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [assignment]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        sx={{
          gap: 1,
        }}
      >
        <Grid item>
          <Button
            startIcon={<ReplyAllIcon />}
            onClick={() => navigate(-1)}
            variant="outlined"
            color="secondary"
          >
            {t('Back')}
          </Button>
        </Grid>
      </Box>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {assignment ? (
          <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {assignment.title}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
              {t('Content')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {assignment.description || '{t("no_description_provided")}' }
            </Typography>

            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
              {t('Additional_files')}
            </Typography>
            {assignment.urlfile && assignment.urlfile.length > 0 ? (
              assignment.urlfile.map((file, index) => (
                <Typography variant="body2" key={index} sx={{ color: 'primary.main', mb: 1 }}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    {t('assignment_file')}
                  </a>
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                {t('no_additional_files')}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color:
                  status === 0
                    ? 'text.secondary'
                    : status === 1
                      ? timeRemaining && timeRemaining <= 10
                        ? 'red'
                        : 'green'
                      : 'red',
                fontSize: status === 1 ? '1.2rem' : '1rem',
                fontWeight: status === 1 ? 'bold' : 'normal',
                animation: isBlinking ? 'blink 1s step-start infinite' : 'none',
              }}
            >
              {status === 0
                ? '{t("Not_started")}'
                : status === 1
                  ? `{t("Time_remaining")} ${formatTime(timeRemaining ?? 0)}`
                  : '{t("discussion_time_over")}'}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* <Box sx={{ display: 'flex', gap: 2 }}>
              <Button disabled variant="contained" color="secondary">
                Export Submissions
              </Button>
            </Box> */}
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            {t("no_assignment_found")}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AssignmentContent;


