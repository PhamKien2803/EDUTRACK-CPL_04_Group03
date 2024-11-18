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

  const handleDownload = (urlfile: string | string[] | undefined) => {
    if (!urlfile) {
      alert("No file available to open");
      return;
    }

    if (Array.isArray(urlfile)) {
      const fileUrl = urlfile[0];
      openInNewTab(fileUrl);
    } else {
      openInNewTab(urlfile);
    }
  };

  // Hàm mở tệp trong tab mới
  // const openInNewTab = (url: string) => {
  //   // Kiểm tra xem URL có hợp lệ hay không
  //   if (url) {
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.target = '_blank'; // Mở trong tab mới
  //     document.body.appendChild(link);
  //     link.click(); // Mô phỏng click để mở tệp
  //     document.body.removeChild(link); // Xóa liên kết sau khi đã mở
  //   } else {
  //     alert("Invalid file URL.");
  //   }
  // };

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
