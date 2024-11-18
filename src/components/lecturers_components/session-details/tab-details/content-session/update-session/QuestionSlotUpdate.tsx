import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, FormControlLabel, Switch, Typography, Divider } from "@mui/material";
import Swal from "sweetalert2";
import { questionSlot } from "../../../../../../models/Interface";
import { updateQuestionSLot } from "../../../../../../service/ApiService";

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

  // const handleSave = async () => {
  //   try {
  //     const updatedQuestion = {
  //       ...question,
  //       content,
  //       TimeStart: startDate,
  //       TimeEnd: endDate,
  //       SettingStatus: determineSettingStatus(commentSetting1, commentSetting2),
  //     };

  //     await updateQuestionSLot(updatedQuestion);
  //     onSave(updatedQuestion);
  //     Swal.fire("Success", "Question updated successfully!", "success");
  //     onClose();
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire("Error", "There was an error updating the question.", "error");
  //   }
  // };

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Content */}
          <Grid item xs={12}>
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              InputLabelProps={{
                shrink: true,
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
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Divider for Comment Settings */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Comment Settings
            </Typography>
            <FormControlLabel
              control={<Switch checked={commentSetting1} onChange={handleCommentSetting1Change} color="primary" />}
              label="Students can only see their own comments"
            />
            <FormControlLabel
              control={<Switch checked={commentSetting2} onChange={handleCommentSetting2Change} color="primary" />}
              label="Students can view all comments but cannot reply"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "capitalize", color: "#757575" }}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionSlotUpdate;
