import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postAnswerAssignmentSlot } from "../../../../service/ApiService";
import { answerAssignmentSlot } from "../../../../models/Interface";

const Submited: React.FC = () => {
  const userid = useSelector((state: { account: { account: { UserID: string } } }) => state.account.account.UserID);
  const [searchParams] = useSearchParams();
  const assignmentID = searchParams.get('assignmentid');
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [selection, setSelection] = useState<'file' | 'link'>('file');
  const [status, setStatus] = useState<number>(0); 
  const [timestamp, setTimestamp] = useState<string>('');

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return 'Submitted';
      case 2:
        return 'Late';
      default:
        return 'Missing';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setSelection('file');
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmitAssignment = async () => {
    if (file || link) {
      const submissionTimestamp = new Date().toISOString(); 
      const formData: answerAssignmentSlot = {
        id: 'as' + Math.floor(100 + Math.random() * 900),
        AssignmentID: assignmentID || '',
        UserID: userid,
        urlfile: file ? URL.createObjectURL(file) : link,
        score: 0,  
        Timestamped: submissionTimestamp,
        Status: 1,  
      };

      try {
        await postAnswerAssignmentSlot(formData);
        setStatus(1); 
        setTimestamp(submissionTimestamp); 
      } catch (error) {
        console.error('Error submitting assignment:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SUBMISSION STATUS</Typography>
          <Box sx={{ mt: 1, px: 1.5, py: 0.5, bgcolor: '#E0E0E0', borderRadius: 1, display: 'inline-block' }}>
            <Typography variant="body2">{getStatusLabel(status)}</Typography>
          </Box>
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
            {selection === 'file' ? (
              <>
                <Button variant="contained" color="primary" component="label" sx={{ fontSize: '1rem', py: 1.5, width: '100%' }}>
                  CHOOSE FILE
                  <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                {file && (
                  <Typography sx={{ mt: 2, fontSize: '0.9rem' }}>
                    Uploaded File: {file.name}
                  </Typography>
                )}
              </>
            ) : (
              <TextField
                label="Enter Link"
                variant="outlined"
                fullWidth
                value={link}
                onChange={handleLinkChange}
                sx={{ mt: 1, fontSize: '1rem' }}
              />
            )}
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>YOUR SCORE</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>0</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" color="secondary" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1.2, px: 3 }} onClick={handleSubmitAssignment}>
          SUBMIT ASSIGNMENT
        </Button>
      </Box>
    </Box>
  );
};

export default Submited;
