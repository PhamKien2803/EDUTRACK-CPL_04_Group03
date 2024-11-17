import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { resetPassword } from '../../../service/ApiService';



export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;

    }

    // Lấy email của người dùng đã được xác minh (lưu trong localStorage)
    const email = localStorage.getItem('verifiedEmail');
    if (!email) {
      setError('No verified email found. Please restart the process.');
      return;
    }
    
    

    try {
      

      // Tìm người dùng cần cập nhật
      await resetPassword(email, newPassword);

     
     

      alert('Password reset successfully!');
      localStorage.removeItem('verifiedEmail'); // Xóa email sau khi sử dụng
      navigate('/login'); // Chuyển về trang login
    } catch (err) {
      console.error('Error updating password:', err);
      setError('An error occurred while resetting your password. Please try again.');
    }
  };

  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleResetPassword} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Reset Password
        </Button>
      </form>
    </Box>
  );
}
