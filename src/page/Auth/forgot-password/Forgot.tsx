import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import { participants } from '../../../models/Interface';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
  user: participants[];
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

export default function ForgotPassword({ open, handleClose, user }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Hàm sinh mã OTP ngẫu nhiên
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số
  };

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
  
    // Kiểm tra email tồn tại trong danh sách user
    const foundUser = user?.find((item) => item.Email === email);
    if (!foundUser) {
      setError('Email not found. Please try again.');
      return;
    }
  
    // Sinh mã OTP
    const otp = generateOTP();
    const expirationTime = Date.now() + 60 * 1000; // 5 phút từ thời điểm gửi
  
    // Lưu OTP và thời gian hết hạn vào localStorage
    localStorage.setItem('otp', otp);
    localStorage.setItem('otpExpiration', expirationTime.toString()); // Lưu thời gian hết hạn
    localStorage.setItem('verifiedEmail', foundUser.id);
    localStorage.setItem('mail', foundUser.Email);
    
    
    // Chuẩn bị dữ liệu gửi qua EmailJS
    const emailData = {
      contact_number: Math.random().toString(36).substr(2, 9),
      from_name: 'EduTrack',
      from_email: email,
      subject: 'Your OTP Code',
      html_message: `Your OTP code is: ${otp}. Please use this code to verify your account.`,
    };
  
    emailjs
      .send('service_k7tjo7o', 'template_afnxci2', emailData, 'BEG8X3EKg9_bLjfCn')
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          alert(`OTP sent successfully to ${email}`);
          handleClose(); // Đóng dialog
          navigate('/verify-otp', { state: { email } }); // Chuyển đến trang nhập OTP
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setError('Error sending email. Please try again.');
        }
      );
  };
  

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <form onSubmit={handleSendEmail}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email address to receive a One-Time Password (OTP).
          </DialogContentText>
          <StyledOutlinedInput
            fullWidth
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mt: 2 }}
          />
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Send OTP
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
}
