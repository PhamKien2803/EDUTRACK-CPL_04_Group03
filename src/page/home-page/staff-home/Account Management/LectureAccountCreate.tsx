import React, { useState, useEffect } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, Typography } from '@mui/material';
import { createStudent,getParticipants } from '../../../../service/ApiService';
import emailjs from 'emailjs-com';
import { AccountCircle, ArrowBack, CalendarToday, Email, Female, Home, Lock, Male } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LectureAccountCreating = () => {
  const navigate = useNavigate()
  const [lecture, setLecture] = useState<any[]>([]);
  const [newlectures, setNewlectures] = useState({
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
    createAt: ''
  });

  useEffect(() => {
    const fetchlecture = async () => {
      const data = await getParticipants();
      setLecture(data);
    };
    fetchlecture();
  }, []);

  const generateLecturesId = () => {
    const filteredlecture = lecture.filter((lectures) => lectures.Role === 1);
    if (filteredlecture.length === 0) return 'lt100001';
    
    const lastLecturesId = filteredlecture[filteredlecture.length - 1].id;
    const lastIdNumber = parseInt(lastLecturesId.substring(2));
    const newIdNumber = lastIdNumber + 1;
    return `lt${newIdNumber.toString().padStart(6, '0')}`;
  };

  const isEmailUnique = (email: string) => {
    return !lecture.some((lectures: any) => lectures.Email === email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailUnique(newlectures.Email)) {
      alert('Email already exists!');
      return;
    }

    const lecturesId = generateLecturesId();
    const lecturesData = { ...newlectures,
       id: lecturesId,
       createAt: new Date().toISOString()
      
      };

    try {
      await createStudent(lecturesData);

      
      const emailData = {
        contact_number: lecturesId,
        from_name: 'EduTrack',
        from_email: newlectures.Email,
        subject: 'Account Created Successfully',
        html_message: `
          Hello ${newlectures.UserName},
          Your lectures account has been created successfully. Here are your account details:
          Email: ${newlectures.Email}
          lectures ID: ${lecturesId}
          Password: ${newlectures.Password}
          Thank you for registering with EduTrack!
          
         
        `,
      };

      emailjs
      .send('service_k7tjo7o', 'template_afnxci2', emailData, 'BEG8X3EKg9_bLjfCn')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        Swal.fire({
          title: 'Success!',
          text: `Account created successfully! A confirmation email has been sent to ${newlectures.Email}`,
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

     
      setNewlectures({
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
        createAt: ''
      });

    } catch (error) {
      alert('Error creating account: ' + error.message);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewlectures({ ...newlectures, Gender: event.target.value === 'true' });
  };
  const handleBackClick = () => {
    navigate('/staff/account-management'); 
  };


  return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', marginTop: '10px' }}>
        
        <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '20px' }}>
          Create Account for lectures
        </Typography>
  
        <TextField
          label="UserName"
          value={newlectures.UserName}
          onChange={(e) => setNewlectures({ ...newlectures, UserName: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <AccountCircle sx={{ marginRight: 1 }} />
          }}
        />
        
        <TextField
          label="Email"
          value={newlectures.Email}
          onChange={(e) => setNewlectures({ ...newlectures, Email: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <Email sx={{ marginRight: 1 }} />
          }}
        />
        
        <TextField
          label="Age"
          value={newlectures.Age}
          onChange={(e) => setNewlectures({ ...newlectures, Age: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ borderRadius: 2, marginBottom: 2 }}
          InputProps={{
            startAdornment: <CalendarToday sx={{ marginRight: 1 }} />
          }}
        />
        
        <TextField
          label="Address"
          value={newlectures.Address}
          onChange={(e) => setNewlectures({ ...newlectures, Address: e.target.value })}
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
            value={newlectures.Gender ? 'true' : 'false'}
            onChange={handleGenderChange}

          >
            <FormControlLabel value="true" control={<Radio />} label={<><Male sx={{ marginRight: 1 }} /> Male</>} /> 
            <FormControlLabel value="false" control={<Radio /> } label={<><Female sx={{ marginRight: 1 }} /> Female</>} />
          </RadioGroup>
        </FormControl>
  
        <TextField
          label="Password"
          value={newlectures.Password}
          onChange={(e) => setNewlectures({ ...newlectures, Password: e.target.value })}
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

export default LectureAccountCreating;