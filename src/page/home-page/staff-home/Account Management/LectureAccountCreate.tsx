import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material';
import { createStudent, getParticipants } from '../../../../service/ApiService';
import emailjs from 'emailjs-com';
import { AccountCircle, CalendarToday, Email, Home, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { participants } from "../../../../models/Interface"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface Props {
  handleCloseModals: () => void;
}

const LectureAccountCreating: React.FC<Props> = ({ handleCloseModals }) => {
  const [lecture, setLecture] = useState<participants[]>([]);
  const [newLectures, setNewLectures] = useState({
    id: '',
    UserName: 'EDUTRACK',
    Email: '',
    Age: '30',
    Gender: true,
    Address: 'Hà Nội',
    Password: '1223@',
    Image: '',
    Role: 1,
    isOnline: true,
    Status: 'true',
    createAt: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchLecture = async () => {
      const data = await getParticipants();
      setLecture(data);
    };
    fetchLecture();
  }, []);

  const generateLecturesId = () => {
    const filteredLecture = lecture.filter((lectures) => lectures.Role === 1);
    if (filteredLecture.length === 0) return 'lt100001';

    const lastLecturesId = filteredLecture[filteredLecture.length - 1].id;
    const lastIdNumber = parseInt(lastLecturesId.substring(2));
    const newIdNumber = lastIdNumber + 1;
    return `lt${newIdNumber.toString().padStart(6, '0')}`;
  };

  const isEmailUnique = (email: string) => {
    return !lecture.some((lectures: participants) => lectures.Email === email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { UserName, Email, Age, Address, Password } = newLectures;
    if (!UserName || !Email || !Age || !Address || !Password) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields must be filled out.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (!isEmailUnique(newLectures.Email)) {
      alert('Email already exists!');
      return;
    }

    const lecturesId = generateLecturesId();
    const lecturesData = {
      ...newLectures,
      id: lecturesId,
      createAt: new Date().toISOString(),
    };

    try {
      await createStudent(lecturesData);
      handleCloseModals();

      emailjs
        .send(
          'service_k7tjo7o',
          'template_afnxci2',
          {
            contact_number: lecturesId,
            from_name: 'EduTrack',
            from_email: newLectures.Email,
            subject: 'Account Created Successfully',
            html_message: `
          <html>
            <body>
              <p>Hello ${newLectures.UserName},</p>
              <p>Your lectures account has been created successfully. Here are your account details:</p>
              <ul>
                <li><strong>Email:</strong> ${newLectures.Email}</li>
                <li><strong>Lectures ID:</strong> ${lecturesId}</li>
                <li><strong>Password:</strong> ${newLectures.Password}</li>
              </ul>
              <p>Thank you for registering with EduTrack!</p>
            </body>
          </html>
        `,
          },
          'BEG8X3EKg9_bLjfCn'
        )
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          Swal.fire({
            title: 'Success!',
            text: `Account created successfully! A confirmation email has been sent to ${newLectures.Email}`,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .catch((error) => {
          console.error('Error sending email:', error.text);
          Swal.fire({
            title: 'Error!',
            text: 'Error sending confirmation email. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });

      setNewLectures({
        id: '',
        UserName: 'EDUTRACK',
        Email: '',
        Age: '20',
        Gender: true,
        Address: 'Hà Nội',
        Password: '1223@',
        Image: '',
        Role: 1,
        isOnline: true,
        Status: 'true',
        createAt: '',
      });
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLectures({ ...newLectures, Gender: event.target.value === 'true' });
  };

  // const handleBackClick = () => {
  //   navigate('/staff/account-management');
  // };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create Account for Lecturers
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="UserName"
              value={newLectures.UserName}
              onChange={(e) => setNewLectures({ ...newLectures, UserName: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: (
                  <AccountCircle sx={{ marginRight: 1, color: "gray" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={newLectures.Email}
              onChange={(e) => setNewLectures({ ...newLectures, Email: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: <Email sx={{ marginRight: 1, color: "gray" }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              value={newLectures.Age}
              onChange={(e) => setNewLectures({ ...newLectures, Age: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: <CalendarToday sx={{ marginRight: 1, color: "gray" }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              value={newLectures.Address}
              onChange={(e) => setNewLectures({ ...newLectures, Address: e.target.value })}
              fullWidth
              InputProps={{
                startAdornment: <Home sx={{ marginRight: 1, color: "gray" }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                value={newLectures.Gender ? 'true' : 'false'}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Male <MaleIcon />
                    </div>
                  }
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Female <FemaleIcon />
                    </div>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
              value={newLectures.Password}
              onChange={(e) =>
                setNewLectures({ ...newLectures, Password: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseModals}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#263238",
                  "&:hover": { backgroundColor: "#37474f" },
                }}
              >
                Create Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

    </Box>
  );
};

export default LectureAccountCreating;
