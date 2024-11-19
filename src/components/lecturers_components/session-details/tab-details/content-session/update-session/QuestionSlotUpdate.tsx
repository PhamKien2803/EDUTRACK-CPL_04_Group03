import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, FormControlLabel, Switch, Typography, Divider, Box, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import { questionSlot } from "../../../../../../models/Interface";
import { updateQuestionSLot } from "../../../../../../service/ApiService";
import CloseIcon from '@mui/icons-material/Close';

interface QuestionSlotUpdateProps {
  question: questionSlot;
  open: boolean;
  onClose: () => void;
  onSave: (updatedQuestion: questionSlot) => void;
}

const QuestionSlotUpdate: React.FC<QuestionSlotUpdateProps> = ({ question, open, onClose, onSave }) => {
  const [content, setContent] = useState(question.content);
  const [startDate, setStartDate] = useState(question.TimeStart);
  const [endDate, setEndDate] = useState(question.TimeEnd);
  const [commentSetting1, setCommentSetting1] = useState(false);
  const [commentSetting2, setCommentSetting2] = useState(false);

  useEffect(() => {
    if (question.SettingStatus === 1) {
      setCommentSetting1(true);
      setCommentSetting2(false);
    } else if (question.SettingStatus === 2) {
      setCommentSetting1(false);
      setCommentSetting2(true);
    } else {
      setCommentSetting1(false);
      setCommentSetting2(false);
    }
  }, [question]);

  const handleSave = async () => {
    try {
      const updatedSettingStatus = determineSettingStatus(commentSetting1, commentSetting2);

      // Định dạng hh:mm:ss
      const startTime = new Date(startDate).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      const endTime = new Date(endDate).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      const updatedQuestion = {
        ...question,
        content,
        TimeStart: startTime,
        TimeEnd: endTime,
        SettingStatus: updatedSettingStatus,
      };

      await updateQuestionSLot(updatedQuestion);
      onSave(updatedQuestion);
      Swal.fire("Success", "Question updated successfully!", "success");
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "There was an error updating the question.", "error");
    }
  };


  // Function to determine SettingStatus based on the current settings
  const determineSettingStatus = (commentSetting1: boolean, commentSetting2: boolean) => {
    if (commentSetting1) return 1;
    if (commentSetting2) return 2;
    return 0;
  };

  const handleCommentSetting1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCommentSetting1(true);
      setCommentSetting2(false);
    } else {
      setCommentSetting1(false);
    }
  };

  const handleCommentSetting2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCommentSetting2(true);
      setCommentSetting1(false);
    } else {
      setCommentSetting2(false);
    }
  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 700,
          margin: '0 auto',
          padding: 2,
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pb: 1, borderBottom: '1px solid #e0e0e0' }}
        >
          <Typography variant="h6" fontWeight="bold">
            Edit Question
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: '#757575' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 1,
          overflowX: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '400px',
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: '100%',
          }}
        >
          {/* Content Field */}
          <Grid item xs={12}>
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Date and Time Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="datetime-local"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="datetime-local"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Comment Settings */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Comment Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={commentSetting1}
                  onChange={handleCommentSetting1Change}
                  color="primary"
                />
              }
              label="Students can only see their own comments"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={commentSetting2}
                  onChange={handleCommentSetting2Change}
                  color="primary"
                />
              }
              label="Students can view all comments but cannot reply"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          justifyContent: 'flex-end',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: 'capitalize',
            mr: 2,
            color: '#757575',
            borderColor: '#757575',
            '&:hover': { backgroundColor: '#f5f5f5' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="secondary"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default QuestionSlotUpdate;
