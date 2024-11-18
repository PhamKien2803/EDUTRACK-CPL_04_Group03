import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Swal from "sweetalert2";
import { assignmentSlot } from "../../../../../../models/Interface";
import { updateAssignmentSlot } from "../../../../../../service/ApiService";

interface AssignmentSlotUpdateModalProps {
  assignment: assignmentSlot;
  open: boolean;
  onClose: () => void;
  onSave: (updatedAssignment: assignmentSlot) => void;
}

const AssignmentSlotUpdateModal: React.FC<AssignmentSlotUpdateModalProps> = ({
  assignment,
  open,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [startDate, setStartDate] = useState(assignment.TimeStart);
  const [endDate, setEndDate] = useState(assignment.TimeEnd);
  const [file, setFile] = useState<string>(""); 
  const [fileName, setFileName] = useState<string>("");

  // Handle file change and convert to base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result as string;

        const [header, data] = base64File.split(",");

        sessionStorage.setItem("fileHeader", header);
        sessionStorage.setItem("fileData", data);

        setFile(base64File); 
        setFileName(selectedFile.name); 
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = async () => {
    try {
      const urlfile = file ? [file] : []; 

      const updatedAssignment = {
        ...assignment,
        title,
        description,
        TimeStart: startDate,
        TimeEnd: endDate,
        urlfile,
      };

      await updateAssignmentSlot(updatedAssignment);
      onSave(updatedAssignment); 
      Swal.fire("Success", "Assignment updated successfully!", "success");
      onClose(); 
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "There was an error updating the assignment.", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Assignment</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              maxRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          {/* Start Date */}
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

          {/* End Date */}
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

          {/* File Upload */}
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
              Update Assignment File
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {fileName && (
              <Typography mt={1} color="textSecondary">
                File uploaded: {fileName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      <Box mt={2} p={2} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: "capitalize", color: "#757575" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

export default AssignmentSlotUpdateModal;
