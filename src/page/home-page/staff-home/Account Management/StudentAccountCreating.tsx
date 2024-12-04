import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { createStudent, getParticipants } from '../../../../service/ApiService';
import emailjs from 'emailjs-com';
import { AccountCircle, Email, Cake, Home, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { participants } from "../../../../models/Interface"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { signUp } from '../../../../Config/firebase';
interface Props {
  handleCloseModals: () => void;
}

const StudentAccountCreating: React.FC<Props> = ({ handleCloseModals }) => {
  const [students, setStudents] = useState<participants[]>([]);
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getParticipants();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const generateStudentId = () => {
    const filteredStudents = students.filter((student) => student.Role === 0);
    if (filteredStudents.length === 0) return 'he170001';
    const lastStudentId = filteredStudents[filteredStudents.length - 1].id;
    const lastIdNumber = parseInt(lastStudentId.substring(2));
    const newIdNumber = lastIdNumber + 1;
    return `he17${newIdNumber.toString().padStart(6, '0')}`;
  };

  const isEmailUnique = (email: string) => {
    return !students.some((student: participants) => student.Email === email);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const { UserName, Email, Age, Address, Password } = newStudent;
  //   if (!UserName || !Email || !Age || !Address || !Password) {
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'All fields must be filled out.',
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //     });
  //     return;
  //   }
  //   if (!isEmailUnique(newStudent.Email)) {
  //     alert('Email already exists!');
  //     return;
  //   }

  //   const studentId = generateStudentId();
  //   const studentData = { ...newStudent, id: studentId };

  //   try {
  //     await createStudent(studentData);

  //     const emailData = {
  //       contact_number: studentId,
  //       from_name: 'EduTrack',
  //       from_email: newStudent.Email,
  //       subject: 'Account Created Successfully',
  //       html_message: `
  //         Hello ${newStudent.UserName},
  //         Your student account has been created successfully. Here are your account details:
  //         Username: ${newStudent.UserName}
  //         Email: ${newStudent.Email}
  //         Student ID: ${studentId}
  //         Password: ${newStudent.Password}
  //         Thank you for registering with EduTrack!

  //       `,
  //     };

  //     emailjs
  //       .send('service_k7tjo7o', 'template_afnxci2', emailData, 'BEG8X3EKg9_bLjfCn')
  //       .then((result) => {
  //         console.log(result.text);
  //         Swal.fire({
  //           title: 'Success!',
  //           text: `Account created successfully! A confirmation email has been sent to ${newStudent.Email}`,
  //           icon: 'success',
  //           confirmButtonText: 'OK'
  //         });
  //       },
  //         (error) => {
  //           console.log(error);
  //           Swal.fire({
  //             title: 'Error!',
  //             text: 'Error sending confirmation email. Please try again.',
  //             icon: 'error',
  //             confirmButtonText: 'OK'
  //           });
  //         });

  //     setNewStudent({
  //       id: '',
  //       UserName: 'EDUTRACK',
  //       Email: '',
  //       Age: '20',
  //       Gender: true,
  //       Address: 'Hà Nội',
  //       Password: '1223@',
  //       Image: '',
  //       Role: 0,
  //       isOnline: true,
  //       Status: 'true',
  //       createAt: ''
  //     });

  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Error creating account. Please try again.',
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //     });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { UserName, Email, Age, Address, Password } = newStudent;

    // Kiểm tra các trường dữ liệu có bị bỏ trống không
    if (!UserName || !Email || !Age || !Address || !Password) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields must be filled out.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Kiểm tra email có duy nhất không
    if (!isEmailUnique(newStudent.Email)) {
      Swal.fire({
        title: 'Error!',
        text: 'Email already exists!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Tạo studentId
    const studentId = generateStudentId();
    const studentData = { ...newStudent, id: studentId };

    try {
      // Gọi API tạo student
      await createStudent(studentData);
      signUp(studentData.Email, studentData.Email, studentData.Password, studentData.UserName)
      // Gọi hàm đóng modal ngay sau khi tạo thành công
      handleCloseModals();


      // Gửi email thông báo qua emailjs
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
        .then(
          (result) => {
            console.log(result.text);
            Swal.fire({
              title: 'Success!',
              text: `Account created successfully! A confirmation email has been sent to ${newStudent.Email}`,
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error!',
              text: 'Error sending confirmation email. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );

      // Reset form sau khi tài khoản được tạo
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
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Error creating account. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };


  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, Gender: event.target.value === 'true' });
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 2,
        overflowX: 'hidden',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create Account for Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
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
              value={newStudent.Password}
              onChange={(e) =>
                setNewStudent({ ...newStudent, Password: e.target.value })
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
              <Button variant="outlined" color="error" onClick={handleCloseModals}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#263238" }}>
                Create Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default StudentAccountCreating;
