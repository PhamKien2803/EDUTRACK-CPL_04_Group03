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
  IconButton,
  DialogActions,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Swal from "sweetalert2";
import { assignmentSlot } from "../../../../../../models/Interface";
import { updateAssignmentSlot } from "../../../../../../service/ApiService";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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

      const updatedAssignment = {
        ...assignment,
        title,
        description,
        TimeStart: startTime,
        TimeEnd: endTime,
        urlfile,
      };

      await updateAssignmentSlot(updatedAssignment);
      onSave(updatedAssignment);
      Swal.fire(t('successl', { defaultValue: 'Success' }), t('success_message', { defaultValue: 'Assignment updated successfully!' }), "success");
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire(t('errorl', { defaultValue: 'Error' }), t('error_message', { defaultValue: 'There was an error updating the assignment.' }), "error");
    }
  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
        >
          <Typography variant="h6" fontWeight="bold">
            {t('edit_assignment', { defaultValue: 'Edit Assignment' })}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: '#757575' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '400px',
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: '100%' }}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              label={t('title_label', { defaultValue: 'Title' })}
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label={t('description_label', { defaultValue: 'Description' })}
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              maxRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('start_date_label', { defaultValue: 'Start Date' })}
              type="datetime-local"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('end_date_label', { defaultValue: 'End Date' })}
              type="datetime-local"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
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
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: '#1976d2',
                borderColor: '#1976d2',
                '&:hover': { backgroundColor: '#1976d2', color: '#fff' },
              }}
            >
              {t('update_assignment_file', { defaultValue: 'Update Assignment File' })}
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {fileName && (
              <Typography mt={1} color="textSecondary">
                {t('file_uploadedl', { defaultValue: 'File uploaded:' })} {fileName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

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
          {t('cancel_button', { defaultValue: 'Cancel' })}
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
          {t('submit_button', { defaultValue: 'Submit' })}
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default AssignmentSlotUpdateModal;
