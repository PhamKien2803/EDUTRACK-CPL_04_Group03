import React, { useState } from 'react';
import {
  Box, Button, Modal, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Fade, IconButton, Grid, Card, CardMedia, Switch, FormControlLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from '@mui/icons-material/Upload';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddActivity: React.FC = () => {
  const [activityType, setActivityType] = useState('');
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  console.log(imageFile);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userID, setUserID] = useState('he170155');
  const [slotID, setSlotID] = useState('s11');
  const [content, setContent] = useState('');
  const [commentSetting1, setCommentSetting1] = useState(false);
  const [commentSetting2, setCommentSetting2] = useState(false);
  const [commentSetting3, setCommentSetting3] = useState(false);

  const handleOpen = () => {
    if (!activityType) {
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
    setImageFile(null);
    setImagePreview(null);
    setUserID('123');
    setSlotID('456');
    setContent('');
    setCommentSetting1(false);
    setCommentSetting2(false);
    setCommentSetting3(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          // Khi đọc xong, lấy Base64 string
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file!');
      }
    }
  };

  const handleSubmit = async () => {
    if (!userID || !content || !startDate || !endDate || !slotID) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Data',
        text: 'Please fill out all required fields.',
      });
      return;
    }

    try {
      const imageBase64 = imagePreview;

      const response = await axios.post("QuestionSLot", {
        QuestionID: "q" + Math.floor(100 + Math.random() * 900),
        UserID: userID,
        content: content,
        image: imageBase64,
        TimeStart: startDate,
        TimeEnd: endDate,
        Slotid: slotID,
        Status: 0,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Question slot created successfully!',
      });
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create question slot. Please try again.',
      });
      console.error(error);
    }
  };


  return (
    <Box>
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
        BackdropProps={{ timeout: 500 }}
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
              width: 800,
              borderRadius: 2,
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Add New {activityType === 'questions' ? 'Question' : 'Assignment'}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User ID"
                  variant="outlined"
                  fullWidth
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Slot ID"
                  variant="outlined"
                  fullWidth
                  value={slotID}
                  onChange={(e) => setSlotID(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Content"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  type="datetime-local"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  type="datetime-local"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    color: '#1976d2',
                    borderColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      color: '#fff',
                    },
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>

                {imagePreview && (
                  <Card sx={{ maxWidth: 150, boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                    <CardMedia component="img" height="150" image={imagePreview} alt="Preview" />
                  </Card>
                )}
              </Grid>

              {/* Comment Settings Switches */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Comment Settings
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={commentSetting1}
                      onChange={(e) => setCommentSetting1(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Students can only see their own comments"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={commentSetting2}
                      onChange={(e) => setCommentSetting2(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Students can view all comments but cannot reply"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={commentSetting3}
                      onChange={(e) => setCommentSetting3(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Students can view and reply to all comments"
                />
              </Grid>
            </Grid>

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleClose} sx={{ textTransform: 'capitalize' }}>Cancel</Button>
              <Button variant="contained" onClick={handleSubmit} sx={{ textTransform: 'capitalize' }}>Submit</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddActivity;
