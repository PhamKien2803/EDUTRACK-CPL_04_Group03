import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { assignmentSlot, slot } from '../../../../models/Interface';
import { updateStatusAssignmentSlot } from "../../../../service/ApiService";
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  assignmentSlot: assignmentSlot[];
  slots: slot[];
  assignmentID: string | null;
  setSlots: (slots: slot[]) => void;
  selectedSlot: slot | null;
}

const Information: React.FC<Props> = ({ assignmentSlot }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const slotID = searchParams.get('slotID');
  const assignmentID = searchParams.get('assignmentid');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const assignment = assignmentSlot.find(
    (as) => as?.Slotid === slotID && as?.AssignmentID === assignmentID
  );

  const handleDownload = (urlfile: string | string[] | undefined) => {
    if (!urlfile) {
      alert(t('no_file_available'));
      return;
    }

    if (Array.isArray(urlfile)) {
      const fileUrl = urlfile[0];
      openInNewTab(fileUrl);
    } else {
      openInNewTab(urlfile);
    }
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
        alert("Failed to open a new tab. Please allow pop-ups for this site.");
      }
    } else {
      alert("Invalid Base64 data.");
    }
  };

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

          // Time hết thì set status = 2
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
      {assignmentSlot.length ? (
        assignmentSlot.map((asm, index) => (
          <Paper key={index} elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            {/* Assignment Title */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {asm?.title}
            </Typography>

            {/* Content Section */}
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
            {t('content')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {asm?.description || 'No description provided.'}
            </Typography>

            {/* Additional Files Section */}
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
            {t('additional_files')}
            </Typography>

            {/* Action Button to open file */}
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
                onClick={() => handleDownload(asm?.urlfile)}
              >
                {t('assignment_file_button')}
              </Button>
            </Box>

            {/* Due Date and Score */}
            <Typography
              variant="body2"
              sx={{
                mt: 2,
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
                ? 'Not Started'
                : status === 1
                  ? `Time remaining: ${formatTime(timeRemaining ?? 0)}`
                  : 'Discussion Time is over'}
            </Typography>
            <strong>{t('score_label')}: <span style={{ color: 'green' }}>100</span> points</strong>
            <Divider sx={{ my: 2 }} />
          </Paper>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          {t('no_assignments_found')}
        </Typography>
      )}
    </Box>
  );
};

export default Information;
