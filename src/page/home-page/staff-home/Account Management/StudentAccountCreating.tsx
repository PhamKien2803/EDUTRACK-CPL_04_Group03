import React, { useState, useEffect } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, Typography } from '@mui/material';
import { createStudent, getParticipants } from '../../../../service/ApiService';
import emailjs from 'emailjs-com';
import { AccountCircle, ArrowBack, CalendarToday, Email, Female, Home, Lock, Male } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const StudentAccountCreating = () => {
  const navigate = useNavigate()
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
    if (students.length === 0) return 'he170001';

    const lastStudentId = students[students.length - 1].id;
    const lastIdNumber = parseInt(lastStudentId.substring(5));
    const newIdNumber = lastIdNumber + 1;
    return `he17${newIdNumber.toString().padStart(4, '0')}`;
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
    const studentData = { ...newStudent,
       id: studentId,
       createAt: new Date().toISOString()
      
      };

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
        Status: 'true'
      });

    } catch (error) {
      alert('Error creating account: ' + error.message);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, Gender: event.target.value === 'true' });
  };
  const handleBackClick = () => {
    navigate('/staff/account-management'); 
  };


  return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', marginTop: '10px' }}>
        
        <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '20px' }}>
          Create Account for Student
        </Typography>
  
        <TextField
          label="UserName"
          value={newStudent.UserName}
          onChange={(e) => setNewStudent({ ...newStudent, UserName: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <AccountCircle sx={{ marginRight: 1 }} />
          }}
        />
        
        <TextField
          label="Email"
          value={newStudent.Email}
          onChange={(e) => setNewStudent({ ...newStudent, Email: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <Email sx={{ marginRight: 1 }} />
          }}
        />
        
        <TextField
          label="Age"
          value={newStudent.Age}
          onChange={(e) => setNewStudent({ ...newStudent, Age: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <CalendarToday sx={{ marginRight: 1 }} />
          }}
        />
        
        <TextField
          label="Address"
          value={newStudent.Address}
          onChange={(e) => setNewStudent({ ...newStudent, Address: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <Home sx={{ marginRight: 1 }} />
          }}
        />
  
        <FormControl component="fieldset" sx={{ marginBottom: 2, gap: 1,  }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            value={newStudent.Gender ? 'true' : 'false'}
            onChange={handleGenderChange}

          >
            <FormControlLabel value="true" control={<Radio />} label={<><Male sx={{ marginRight: 1 }} /> Male</>} /> 
            <FormControlLabel value="false" control={<Radio /> } label={<><Female sx={{ marginRight: 1 }} /> Female</>} />
          </RadioGroup>
        </FormControl>
  
        <TextField
          label="Password"
          value={newStudent.Password}
          onChange={(e) => setNewStudent({ ...newStudent, Password: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <Lock sx={{ marginRight: 1 }} />
          }}
          type="password"
        />
  
  <div style={{ display: 'flex', gap: '10px' }}>  
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, padding: '10px', flex: 1 }}  
          startIcon={<AccountCircle />}  
        >
          Create Account
        </Button>

 
        <Button
          onClick={handleBackClick}
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 2, padding: '10px', flex: 1 }} 
          startIcon={<ArrowBack />} 
        >
          Back
        </Button>
        </div>
      </form>
  );
};

export default StudentAccountCreating;
