import React, { useState, useEffect } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, InputAdornment, Box, Typography } from '@mui/material';
import { createStudent, getParticipants } from '../../../../service/ApiService';
import emailjs from 'emailjs-com';
import { AccountCircle, Email, Cake, Home, Lock, Wc } from '@mui/icons-material';
import Swal from 'sweetalert2';
const StudentAccountCreating = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [newStudent, setNewStudent] = useState({
    id: '',
    UserName: 'EDUTRACK',
    Email: '',
    Age: '20',
    Gender: true,
    Address: 'Hà Nội',
    Password: '1223@',
    Image: '',
    Role: 0,
    isOnline: true,
    Status: 'true',
    createAt: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getParticipants();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const generateStudentId = () => {
    const filteredStudents = students.filter((student) => student.role === 0);
    if (filteredStudents.length === 0) return 'he170001';
    const lastStudentId = filteredStudents[filteredStudents.length - 1].id;
    const lastIdNumber = parseInt(lastStudentId.substring(2));
    const newIdNumber = lastIdNumber + 1;
    return `he17${newIdNumber.toString().padStart(6, '0')}`;
  };
  

  const isEmailUnique = (email: string) => {
    return !students.some((student: any) => student.Email === email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailUnique(newStudent.Email)) {
      alert('Email already exists!');
      return;
    }

    const studentId = generateStudentId();
    const studentData = { ...newStudent, id: studentId };

    try {
      await createStudent(studentData);

      const emailData = {
        contact_number: studentId,
        from_name: 'EduTrack',
        from_email: newStudent.Email,
        subject: 'Account Created Successfully',
        html_message: `
          Hello ${newStudent.UserName},
          Your student account has been created successfully. Here are your account details:
          Username: ${newStudent.UserName}
          Email: ${newStudent.Email}
          Student ID: ${studentId}
          Password: ${newStudent.Password}
          Thank you for registering with EduTrack!
          
        `,
      };

      emailjs
      .send('service_k7tjo7o', 'template_afnxci2', emailData, 'BEG8X3EKg9_bLjfCn')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        Swal.fire({
          title: 'Success!',
          text: `Account created successfully! A confirmation email has been sent to ${newStudent.Email}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      
      (error) => {
        console.error('Error sending email:', error.text);
        Swal.fire({
          title: 'Error!',
          text: 'Error sending confirmation email. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });


      setNewStudent({
        id: '',
        UserName: 'EDUTRACK',
        Email: '',
        Age: '20',
        Gender: true,
        Address: 'Hà Nội',
        Password: '1223@',
        Image: '',
        Role: 0,
        isOnline: true,
        Status: 'true',
        createAt: ''
      });

    } catch (error) {
      alert('Error creating account: ' + error.message);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, Gender: event.target.value === 'true' });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create Account for Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="UserName"
          value={newStudent.UserName}
          onChange={(e) => setNewStudent({ ...newStudent, UserName: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={newStudent.Email}
          onChange={(e) => setNewStudent({ ...newStudent, Email: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          value={newStudent.Age}
          onChange={(e) => setNewStudent({ ...newStudent, Age: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Cake />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={newStudent.Address}
          onChange={(e) => setNewStudent({ ...newStudent, Address: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Home />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            value={newStudent.Gender ? 'true' : 'false'}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label={
                <>
                  <Wc style={{ marginRight: '4px' }} />
                  Male
                </>
              }
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label={
                <>
                  <Wc style={{ marginRight: '4px', transform: 'rotate(90deg)' }} />
                  Female
                </>
              }
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Password"
          type="password"
          value={newStudent.Password}
          onChange={(e) => setNewStudent({ ...newStudent, Password: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Account
        </Button>
      </form>
    </Box>
  );
};

export default StudentAccountCreating;
