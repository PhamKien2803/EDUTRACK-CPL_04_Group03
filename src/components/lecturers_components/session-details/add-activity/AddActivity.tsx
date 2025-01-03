import React, { useState } from 'react';
import {
  Box, Button, Modal, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Fade, IconButton, Grid, Switch, FormControlLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from '@mui/icons-material/Upload';
import Swal from 'sweetalert2';
import axios from 'axios';
import { createAssignmentSlot } from '../../../../service/ApiService';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCommentSettings } from '../../../../redux/action/commentSettingsActions';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const QuestionForm: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const userid = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Slotid = queryParams.get("Slotid");

  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [commentSetting1, setCommentSetting1] = useState(false);
  const [commentSetting2, setCommentSetting2] = useState(false);
  const { t } = useTranslation();

  // Handle setting changes to ensure only one setting is active at a time
  const handleCommentSetting1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCommentSetting1(true);
      setCommentSetting2(false);  // Disable commentSetting2 when commentSetting1 is selected
    } else {
      setCommentSetting1(false);
    }
  };

  const handleCommentSetting2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCommentSetting2(true);
      setCommentSetting1(false);  // Disable commentSetting1 when commentSetting2 is selected
    } else {
      setCommentSetting2(false);
    }
  };

  const handleSubmit = async () => {
    if (!content || !startDate || !endDate) {
      Swal.fire({ icon: 'error', title: t('missing_data', { defaultValue: 'Missing Data' }), text: t('please_fill_required_fields', { defaultValue: 'Please fill out all required fields.' }) });
      return;
    }

    let settingStatus = 0;
    if (commentSetting1) settingStatus = 1;
    else if (commentSetting2) settingStatus = 2;

    dispatch(setCommentSettings(settingStatus));

    const startTime = new Date(startDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const endTime = new Date(endDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    try {
      await axios.post("QuestionSLot", {
        QuestionID: "q" + Math.floor(100 + Math.random() * 900),
        UserID: userid,
        content: content,
        TimeStart: startTime,
        TimeEnd: endTime,
        Slotid: Slotid || '',
        Status: 0,
        SettingStatus: settingStatus,
      });

      Swal.fire({ icon: 'success', title: t('successl', { defaultValue: 'Success' }), text: t('question_slot_created_successfully', { defaultValue: 'Question slot created successfully!' }) });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: 'error', title: t('errorl', { defaultValue: 'Error' }), text: t('failed_to_create_question_slot', { defaultValue: 'Failed to create question slot. Please try again.' }) });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
        overflowX: "hidden",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          overflowX: "hidden",
        }}
      >
        {/* Content Field */}
        <Grid item xs={12}>
          <TextField
            label={t('contentl', { defaultValue: 'Content' })}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        {/* Start Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label={t('start_date', { defaultValue: 'Start Date' })}
            type="datetime-local"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* End Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label={t('end_date', { defaultValue: 'End Date' })}
            type="datetime-local"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Comment Settings */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t('comment_settings', { defaultValue: 'Comment Settings' })}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={commentSetting1}
                onChange={handleCommentSetting1Change}
                color="primary"
              />
            }
            label={t('students_see_own_comments', { defaultValue: 'Students can only see their own comments' })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={commentSetting2}
                onChange={handleCommentSetting2Change}
                color="primary"
              />
            }
            label={t('students_view_all_comments', { defaultValue: 'Students can view all comments but cannot reply' })}
          />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              color="secondary"
              sx={{ textTransform: "capitalize" }}
            >
              {t('cancell', { defaultValue: 'Cancel' })}

            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
              sx={{ textTransform: "capitalize" }}
            >
              {t('submit', { defaultValue: 'Submit' })}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Form cho Assignments
const AssignmentForm: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const userid = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Slotid = queryParams.get("Slotid");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [file, setFile] = useState<string[]>([]); // Lưu Base64 của tệp
  const [fileName, setFileName] = useState<string>("");


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result as string;

        const [header, data] = base64File.split(",");

        sessionStorage.setItem("fileHeader", header);
        sessionStorage.setItem("fileData", data);

        setFile([header + "," + data]);
        setFileName(selectedFile.name);
      };
      reader.readAsDataURL(selectedFile);
    }
  };



  // Hàm gửi form
  const handleSubmit = async () => {
    if (!startDate || !endDate || !title || !description || !file) {
      Swal.fire({ icon: "error", title: t('missing_data', { defaultValue: 'Missing Data' }), text: "Please fill out all required fields." });
      return;
    }

    const startTime = new Date(startDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const endTime = new Date(endDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    try {
      // Gửi dữ liệu lên API
      await createAssignmentSlot({
        id: "a" + Math.floor(100 + Math.random() * 900),
        AssignmentID: "a" + Math.floor(100 + Math.random() * 900),
        UserID: userid,
        title,
        description,
        urlfile: file, // Gửi Base64 của tệp dưới dạng mảng
        TimeStart: startTime,
        TimeEnd: endTime,
        Slotid: Slotid || '',
        Status: 0,
      });

      Swal.fire({ icon: "success", title: t('successl', { defaultValue: 'Success' }), text: t('assignment_created_successfully', { defaultValue: 'Assignment created successfully!' }) });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      handleClose();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: t('errorl', { defaultValue: 'Error' }), text: "Failed to create assignment. Please try again." });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
        overflowX: "hidden",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          overflowX: "hidden",
        }}
      >
        {/* Content Field */}
        <Grid item xs={12}>
          <TextField label={t('title', { defaultValue: 'Title' })} variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={t('description', { defaultValue: 'Description' })}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        {/* Start Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label={t('start_date', { defaultValue: 'Start Date' })}
            type="datetime-local"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* End Date Field */}
        <Grid item xs={12} sm={6} sx={{ mt: 2, mb: 2 }}>
          <TextField
            label={t('starend_date', { defaultValue: 'End Date' })}
            type="datetime-local"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

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
            {t('upload_assignment_file', { defaultValue: 'Upload Assignment File' })}
            <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" hidden onChange={handleFileChange} />
          </Button>
          <span style={{ color: "gray" }}>{t('allowed_file_formats', { defaultValue: '.pdf,.doc,.docx,.ppt,.pptx' })} </span>
          {fileName && (
            <Typography mt={1} color="textSecondary">
              {t('file_uploaded', { defaultValue: 'File uploaded:' })} {fileName}
            </Typography>
          )}
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              color="secondary"
              sx={{ textTransform: "capitalize" }}
            >
              {t('cancell', { defaultValue: 'Cancel' })}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
              sx={{ textTransform: "capitalize" }}
            >
              {t('submit', { defaultValue: 'Submit' })}

            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
const AddActivity: React.FC = () => {
  const [activityType, setActivityType] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!activityType) {
      Swal.fire({ icon: 'warning', title: t('oops', { defaultValue: 'Oops!' }), text: t('please_select_activity_first', { defaultValue: 'Please select an activity first!' }), confirmButtonText: t('ok', { defaultValue: 'OK' }) });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setActivityType('');
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <FormControl fullWidth sx={{ maxWidth: 200 }}>
          <InputLabel>{t('select_activity', { defaultValue: 'Select Activity' })}</InputLabel>
          <Select value={activityType} label="Select Activity" onChange={(e) => setActivityType(e.target.value)}>
            <MenuItem value="questions">{t('questionsl', { defaultValue: 'Questions' })}</MenuItem>
            <MenuItem value="assignments">{t('assignmentsl', { defaultValue: 'Assignments' })}</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={handleOpen}>{t('add_new_activity_for_student', { defaultValue: 'Add New Activity for Student' })}</Button>
      </Box>

      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropProps={{ timeout: 500 }}>
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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {t('add_new', { defaultValue: 'Add New ' })} {activityType === 'questions' ? 'Question' : 'Assignment'}
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {activityType === 'questions' ? (
              <QuestionForm handleClose={handleClose} />
            ) : (
              <AssignmentForm handleClose={handleClose} />
            )}
          </Box>
        </Fade>
      </Modal>

    </Box>
  );
};

export default AddActivity;
