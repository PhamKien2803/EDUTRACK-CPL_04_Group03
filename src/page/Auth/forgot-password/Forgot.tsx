import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    maxWidth: '500px',
    width: '100%',
  },
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
}));

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();
    // Add logic here for form submission, such as sending the email for password reset
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleFormSubmit,
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>Reset Password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account's email address, and we'll send you a link to reset your password.
        </DialogContentText>
        <StyledOutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          placeholder="Email address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', gap: 1.5 }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
