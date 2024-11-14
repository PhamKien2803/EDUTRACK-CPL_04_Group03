import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, FormControlLabel, Switch, Typography, Card, CardMedia, Divider } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
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
  const [image, setImage] = useState<File | null>(null);
  console.log(image);
  const [imagePreview, setImagePreview] = useState<string | null>(question.image || "");
  const [commentSetting1, setCommentSetting1] = useState(false);
  const [commentSetting2, setCommentSetting2] = useState(false);
  const [commentSetting3, setCommentSetting3] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        Swal.fire("Invalid File", "Please select an image file!", "warning");
      }
    }
  };

  const handleSave = async () => {
    try {
      const updatedQuestion = {
        ...question,
        content,
        TimeStart: startDate,
        TimeEnd: endDate,
        image: imagePreview || "", 
        commentSetting1,
        commentSetting2,
        commentSetting3,
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

          {/* Image Upload */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": { backgroundColor: "#1976d2", color: "#fff" },
              }}
            >
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            {imagePreview && (
              <Card sx={{ maxWidth: 180, boxShadow: 3, borderRadius: 2, overflow: "hidden", mt: 2 }}>
                <CardMedia component="img" height="180" image={imagePreview} alt="Preview" />
              </Card>
            )}
          </Grid>

          {/* Divider for Comment Settings */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Comment Settings
            </Typography>
            <FormControlLabel
              control={<Switch checked={commentSetting1} onChange={(e) => setCommentSetting1(e.target.checked)} color="primary" />}
              label="Students can only see their own comments"
            />
            <FormControlLabel
              control={<Switch checked={commentSetting2} onChange={(e) => setCommentSetting2(e.target.checked)} color="primary" />}
              label="Students can view all comments but cannot reply"
            />
            <FormControlLabel
              control={<Switch checked={commentSetting3} onChange={(e) => setCommentSetting3(e.target.checked)} color="primary" />}
              label="Students can view and reply to all comments"
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
