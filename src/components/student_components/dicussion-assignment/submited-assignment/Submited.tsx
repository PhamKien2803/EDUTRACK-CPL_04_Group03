import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Modal, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postAnswerAssignmentSlot, updateAnswerAssignmentSlot } from "../../../../service/ApiService";
import { answerAssignmentSlot } from "../../../../models/Interface";

const Submited: React.FC = () => {
  const userid = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const [searchParams] = useSearchParams();
  const assignmentID = searchParams.get('assignmentid');
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [selection, setSelection] = useState<'file' | 'link'>('file');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentSlotID, setAssignmentSlotID] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setSelection('file');
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setSelection('link');
  };
  

  const handleSubmitAssignment = async () => {
    if (file || link) {
      const submissionTimestamp = new Date().toISOString();
      const newID = 'as' + Math.floor(100 + Math.random() * 900);
      const formData: answerAssignmentSlot = {
        id: newID,
        AssignmentID: assignmentID || '',
        UserID: userid,
        urlfile: file ? URL.createObjectURL(file) : link,
        score: 10,
        Timestamped: submissionTimestamp,
        Status: 1,
      };

      try {
        await postAnswerAssignmentSlot(formData);
        setIsSubmitted(true);
        setTimestamp(submissionTimestamp);
        setAssignmentSlotID(newID);
        setScore(10);
      } catch (error) {
        console.error('Error submitting assignment:', error);
      }
    }
  };

  const handleReSubmit = () => {
    setIsModalOpen(true);
  };

  const handleUpdateAssignment = async () => {
    if ((file || link) && assignmentSlotID) {
      const updatedFormData: answerAssignmentSlot = {
        id: assignmentSlotID,
        AssignmentID: assignmentID || '',
        UserID: userid,
        urlfile: file ? URL.createObjectURL(file) : link,
        score: 0,
        Timestamped: new Date().toISOString(),
        Status: 1,
      };

      try {
        await updateAnswerAssignmentSlot(updatedFormData);
        setIsModalOpen(false);
        setTimestamp(updatedFormData.Timestamped);
      } catch (error) {
        console.error('Error updating assignment:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SUBMISSION STATUS</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {isSubmitted ? 'Submitted' : 'Not Submitted'}
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SUBMISSION TIME</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {timestamp ? new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }) : '(GMT+07)'}
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>LINK/FILE ASSIGNMENT</Typography>
          <Box sx={{ mt: 2 }}>
            {selection === 'file' && !isSubmitted && (
              <Button variant="contained" color="primary" component="label" sx={{ fontSize: '1rem', py: 1.5, width: '100%' }}>
                CHOOSE FILE
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>
            )}
            {file && (
              <Typography sx={{ mt: 2, fontSize: '0.9rem' }}>
                Uploaded File: {file.name}
              </Typography>
            )}
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>YOUR SCORE</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {score !== null ? score : 'Not graded yet'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        {isSubmitted ? (
          <Button variant="outlined" color="secondary" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1.2, px: 3 }} onClick={handleReSubmit}>
            RE-SUBMIT ASSIGNMENT
          </Button>
        ) : (
          <Button variant="outlined" color="secondary" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1.2, px: 3 }} onClick={handleSubmitAssignment}>
            SUBMIT ASSIGNMENT
          </Button>
        )}
      </Box>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Update Your Submission</Typography>
          <RadioGroup row value={selection} onChange={(e) => setSelection(e.target.value as 'file' | 'link')}>
            <FormControlLabel value="file" control={<Radio />} label="Upload File" />
            <FormControlLabel value="link" control={<Radio />} label="Enter Link" />
          </RadioGroup>
          {selection === 'file' ? (
            <Button variant="contained" component="label" color="primary" fullWidth>
              CHOOSE NEW FILE
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          ) : (
            <TextField
              label="Enter New Link"
              variant="outlined"
              fullWidth
              value={link}
              onChange={handleLinkChange}
              sx={{ mt: 1 }}
            />
          )}
          <Button variant="contained" sx={{ mt: 2 }} color="secondary" onClick={handleUpdateAssignment}>
            UPDATE ASSIGNMENT
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Submited;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
