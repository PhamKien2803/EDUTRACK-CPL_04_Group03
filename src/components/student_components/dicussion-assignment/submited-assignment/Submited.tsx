import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const Submited: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState("file");
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  console.log(file)

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setOpen(false);
      console.log("Uploaded file:", event.target.files[0]);
    }
  };

  const handleLinkSubmit = () => {
    setOpen(false);
    console.log("Entered link:", link);
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SUBMISSION STATUS</Typography>
          <Box sx={{ mt: 1, px: 1.5, py: 0.5, bgcolor: '#E0E0E0', borderRadius: 1, display: 'inline-block' }}>
            <Typography variant="body2">Missing</Typography>
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SUBMISSION TIME</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>(GMT+07)</Typography>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>LINK/FILE ASSIGNMENT</Typography>
        </Paper>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" color="secondary" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1.2, px: 3 }} onClick={handleClickOpen}>
          SUBMIT ASSIGNMENT
        </Button>
      </Box>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', pb: 1 }}>Upload or Enter Link</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 1 }}>
          <RadioGroup value={selection} onChange={handleSelectionChange} row sx={{ gap: 4 }}>
            <FormControlLabel
              value="file"
              control={<Radio />}
              label={<Typography sx={{ fontSize: '1.1rem' }}>Upload File</Typography>}
              sx={{ '.MuiFormControlLabel-label': { fontWeight: '500' } }}
            />
            <FormControlLabel
              value="link"
              control={<Radio />}
              label={<Typography sx={{ fontSize: '1.1rem' }}>Enter Link</Typography>}
              sx={{ '.MuiFormControlLabel-label': { fontWeight: '500' } }}
            />
          </RadioGroup>

          {selection === "file" ? (
            <Button
              variant="contained"
              component="label"
              color="primary"
              fullWidth
              sx={{ fontSize: '1rem', py: 1.5 }}
            >
              CHOOSE FILE
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          ) : (
            <TextField
              label="Enter Link"
              variant="outlined"
              fullWidth
              value={link}
              onChange={(e) => setLink(e.target.value)}
              sx={{ mt: 1, fontSize: '1rem' }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
          {selection === "link" && (
            <Button onClick={handleLinkSubmit} variant="contained" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1, px: 3 }}>
              SUBMIT LINK
            </Button>
          )}
          <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1, px: 3 }}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Submited;
