import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { CountDown } from './CountDown';

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.verifiedEmail || localStorage.getItem('verifiedEmail');
  console.log(email);
  const mail = location.state?.mail || localStorage.getItem('mail');

  const [otpInputs, setOtpInputs] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const [time, setTime] = useState<string>("300");
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  };

  const handleSendOTP = () => {
    if (!email) {
      setError('No email found. Please try again.');
      return;
    }
    setTime("300");
    setIsResetting(true);
    const otp = generateOTP();
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Save OTP and expiration in localStorage
    localStorage.setItem('otp', otp);
    localStorage.setItem('otpExpiration', expirationTime.toString());
    
    // Prepare email data for EmailJS
    const emailData = {
      contact_number: Math.random().toString(36).substr(2, 9),
      from_name: 'EduTrack',
      from_email: mail,
      subject: 'Your OTP Code',
      html_message: `Your OTP code is: ${otp}. Please use this code to verify your account.`,
    };

    emailjs
      .send('service_k7tjo7o', 'template_afnxci2', emailData, 'BEG8X3EKg9_bLjfCn')
      .then(
        (result) => {
          
          setIsResetting(false);
          window.location.reload();
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setError('Error sending OTP. Please try again.');
          setIsResetting(false);
        }
      );
      
    
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input
    const updatedOtpInputs = [...otpInputs];
    updatedOtpInputs[index] = value.slice(-1); // Take the last digit
    setOtpInputs(updatedOtpInputs);

    // Automatically focus next input if not empty
    if (value && index < otpInputs.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }

    // Auto-verify when all 6 digits are entered
    if (updatedOtpInputs.join('').length === 6) {
      handleVerifyOTP(updatedOtpInputs.join(''));
    }
  };
  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const pastedData = event.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    const updatedOtpInputs = Array(6).fill('');
    pastedData.split('').forEach((char, index) => {
      if (index < updatedOtpInputs.length) {
        updatedOtpInputs[index] = char;
      }
    });
    setOtpInputs(updatedOtpInputs);

    // Auto-verify when all 6 digits are entered
    if (pastedData.length === 6) {
      handleVerifyOTP(pastedData);
    }
  };


  const handleVerifyOTP = (otp: string) => {
    const storedOtp = localStorage.getItem('otp');
    const storedExpirationTime = localStorage.getItem('otpExpiration');
    const currentTime = Date.now();

    if (!storedOtp || !storedExpirationTime) {
      setError('OTP not found. Please request a new one.');
      return;
    }

    if (currentTime > Number(storedExpirationTime)) {
      setError('OTP has expired. Please request a new one.');
      localStorage.removeItem('otp');
      localStorage.removeItem('otpExpiration');
      return;
    }

    if (storedOtp === otp) {
      localStorage.removeItem('otp');
      localStorage.removeItem('otpExpiration');
      localStorage.setItem('verifiedEmail', email || '');
      setTimeout(() => navigate('/reset-password'), 500);
     
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <CountDown timer={time} />
        <h1 style={{ marginBottom: '20px' }}>Verify OTP</h1>

        {email && <p style={{ marginBottom: '20px' }}>We sent an OTP to: {email}</p>}
        <div
         onPaste={handlePaste}
         style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {otpInputs.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              style={{
                width: '40px',
                height: '40px',
                textAlign: 'center',
                fontSize: '18px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            />
          ))}
        </div>
        {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
        <button
          onClick={handleSendOTP}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: isResetting ? '#ccc' : '#007bff',
            color: '#fff',
            cursor: isResetting ? 'not-allowed' : 'pointer',
          }}
          disabled={isResetting}
        >
          {isResetting ? 'Sending...' : 'Reset OTP'}
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;