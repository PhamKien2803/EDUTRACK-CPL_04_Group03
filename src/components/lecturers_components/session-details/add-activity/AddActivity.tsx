import React, { useState } from 'react';
import {
  Box, Button, Modal, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Fade, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddActivity: React.FC = () => {
  const [activityType, setActivityType] = useState('');
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Open the modal
  const handleOpen = () => {
    if (!activityType) {
      // Show SweetAlert2 message if no activity is selected
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please select an activity first!',
        confirmButtonText: 'OK',
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setActivityType('');
    setStartDate('');
    setEndDate('');
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", {
      activityType,
      startDate,
      endDate,
    });
    handleClose();
  };

  return (
    <Box>
      {/* Flex container to align Select and Button horizontally */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <FormControl fullWidth sx={{ maxWidth: 200 }}>
          <InputLabel>Select Activity</InputLabel>
          <Select
            value={activityType}
            label="Select Activity"
            onChange={(e) => setActivityType(e.target.value)}
          >
            <MenuItem value="questions">Questions</MenuItem>
            <MenuItem value="assignments">Assignments</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Add New Activity for Student
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: 600, 
              borderRadius: 2,
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography variant="h6" gutterBottom>
              Add New {activityType === 'questions' ? 'Question' : 'Assignment'}
            </Typography>

            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label={activityType === 'questions' ? "Content" : "Description"}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              multiline
              rows={4}
            />

            {activityType === 'questions' ? (
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            ) : (
              <TextField
                label="Upload File"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}

            <TextField
              label="Start Date"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="End Date"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddActivity;
