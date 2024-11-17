import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { assignmentSlot, slot } from '../../../../models/Interface';
import { useSearchParams } from 'react-router-dom';

interface Props {
  assignmentSlot: assignmentSlot[];
  slots: slot[];
  assignmentID: string | null;
  setSlots: (slots: slot[]) => void;
  selectedSlot: slot | null;
}

const AssignmentContent: React.FC<Props> = ({ assignmentSlot }) => {
  const [searchParams] = useSearchParams();
  const slotID = searchParams.get('Slotid');
  const assignmentID = searchParams.get('assignmentid');

  const filteredAssignments = assignmentSlot?.filter(
    (as) => as?.Slotid === slotID && as?.AssignmentID === assignmentID
  );

  const assignment = filteredAssignments.length > 0 ? filteredAssignments[0] : null;

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {assignment ? (
          <>
            {/* Assignment Title */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {assignment.title}
            </Typography>

            {/* Content Section */}
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
              Content
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {assignment.description} {/* assuming description is the content */}
            </Typography>

            {/* Additional Files Section */}
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
              Additional files:
            </Typography>
            {assignment.urlfile && assignment.urlfile.length > 0 ? (
              assignment.urlfile.map((file, index) => (
                <Typography variant="body2" key={index} sx={{ color: 'primary.main', mb: 1 }}>
                  <a href={file} target="_blank" rel="noopener noreferrer"> 
                    {/* F5 mới hiển thị */}
                    Assignment File
                  </a>
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No additional files
              </Typography>
            )}

            {/* Due Date */}
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Due date: {assignment.TimeEnd}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="secondary">
                Export Submissions
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No assignment found for the specified SlotID and AssignmentID.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AssignmentContent;
