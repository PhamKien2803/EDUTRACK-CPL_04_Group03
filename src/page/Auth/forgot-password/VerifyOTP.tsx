import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('email');

  const [otpInputs, setOtpInputs] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input
    const updatedOtpInputs = [...otpInputs];
    updatedOtpInputs[index] = value;
    setOtpInputs(updatedOtpInputs);

    if (value && index < otpInputs.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpInput = otpInputs.join('');
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

    if (storedOtp === otpInput) {
      alert('OTP verified successfully!');
      localStorage.removeItem('otp');
      localStorage.removeItem('otpExpiration');
      localStorage.setItem('verifiedEmail', email || '');
      navigate('/reset-password');
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
        <h1 style={{ marginBottom: '20px' }}>Verify OTP</h1>
        {email && <p style={{ marginBottom: '20px' }}>We sent an OTP to: {email}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
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
          onClick={handleVerifyOTP}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;
