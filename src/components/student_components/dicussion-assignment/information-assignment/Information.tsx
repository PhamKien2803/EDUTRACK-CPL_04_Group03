import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import React from 'react';
import { assignmentSlot, slot } from '../../../../models/Interface';
import { useSearchParams } from 'react-router-dom';

interface Props {
  assignmentSlot: assignmentSlot[];
  slots: slot[];
  assignmentID: string | null;
  setSlots: (slots: slot[]) => void;
  selectedSlot: slot | null;
}

const Information: React.FC<Props> = ({ assignmentSlot }) => {
  const [searchParams] = useSearchParams();
  const slotID = searchParams.get('slotID');
  const assignmentID = searchParams.get('assignmentid');

  const filteredAssignments = assignmentSlot?.filter(
    (as) => as?.Slotid === slotID && as?.AssignmentID === assignmentID
  );
  console.log(filteredAssignments);

  //Lỗi CORS
  // const handleDownload = async (urlfile: string | undefined) => {
  //   if (urlfile && typeof urlfile === 'string') {
  //     try {
  //       
  //       const response = await axios.get(urlfile, { responseType: 'blob' });
  //       const blob = new Blob([response.data], { type: response.headers['content-type'] });
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.setAttribute('download', 'Assignment_File.pdf'); 
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(link.href); 
  //     } catch (error) {
  //       console.error("Download failed:", error);
  //       alert("Failed to download file");
  //     }

  //   } else {
  //     alert(urlfile ? "Invalid file URL" : "No file available to download");
  //   }
  // };

  const handleDownload = (urlfile: string | undefined) => {
    if (urlfile && typeof urlfile === 'string') {
      const link = document.createElement('a');
      link.href = urlfile;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(urlfile ? "Invalid file URL" : "No file available to open");
    }
  };


  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      {filteredAssignments?.length ? (
        filteredAssignments.map((asm, index) => (
          <Paper key={index} elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            {/* Assignment Title */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {asm?.description}
            </Typography>

            {/* Content Section */}
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
              Content
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {asm?.title}
            </Typography>

            {/* Additional Files Section */}
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
              Additional files:
            </Typography>

            {/* Action Button to download or open file */}
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
                // onClick={() => handleDownload(Array.isArray(asm.urlfile) ? asm.urlfile[0] : asm.urlfile)}
                onClick={() => handleDownload(Array.isArray(asm.urlfile) ? asm.urlfile[0] : asm.urlfile)}
              >
                Get Assignment File
              </Button>
            </Box>

            {/* Due Date and Score */}
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontSize: '1.25rem' }}>
              Due date: {asm?.TimeStart} - {asm?.TimeEnd} - <strong>SCORE: <span style={{ color: 'red' }}>100</span> points</strong>
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Paper>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No assignments found for this slot.
        </Typography>
      )}
    </Box>
  );
};

export default Information;
