// components/EditProfile.tsx
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipantsById, updateProfile } from "../../../service/ApiService";
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Grid,
    Paper,
    Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
interface Participant {
    id: string;
    UserName: string;
    Age: number;
    Gender: boolean;
    Address: string;
    Email: string;
    Image: string;
    Role: number;
    isOnline: boolean;
    Status: boolean;
    Password: string;
    rating: number;
}



const EditProfile: React.FC = () => {
    const [profile, setProfile] = useState<Participant | null>(null);
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [addres, setAdress] = useState<string>("");
    const [gender, setGender] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [role, setRole] = useState<number>(0);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);

    const user = useSelector((state: any) => state.account.account);

    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getParticipantsById(user.UserID);
                setName(res.UserName);
                setAge(res.Age);
                setAdress(res.Address);
                setGender(res.Gender);
                setEmail(res.Email);
                setPassword(res.Password);
                setImage(res.Image);
                setRating(res.rating);
                setRole(res.Role);
                setIsOnline(res.isOnline);
                setStatus(res.Status);
                setProfile(res);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (user.UserID) {
            fetchUser();
        }
    }, [user.UserID]);

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newAge = parseInt(e.target.value);
        if (newAge > 100) {
            newAge = 100;
        } else if (newAge < 0) {
            newAge = 0;
        }
        setAge(newAge);
    };
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
    const handleSave = () => {
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, save it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirmSave(); 
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your changes are safe :)",
                    icon: "error"
                });
            }
        });
    };

    const handleConfirmSave = async () => {
        const req = await updateProfile(user.UserID, name, addres, age, gender, email, password, image, rating, role, isOnline, status);
        if (req) {
            swalWithBootstrapButtons.fire({
                title: "Success!",
                text: "Your changes have been saved.",
                icon: "success"
            });
            navigate('/profile');
        } else {
            swalWithBootstrapButtons.fire({
                title: "Error",
                text: "There was an error saving your profile.",
                icon: "error"
            });
        }
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onloadend = () => {
                  setImage(reader.result as string);
                  
              };
              reader.readAsDataURL(file);
          } else {
              
          }
      }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
};
    
    return (
    <>
      {profile && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={3}
          bgcolor="#f9f9f9"
          borderRadius="8px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          maxWidth="800px"
          mx="auto"
          margin="20px auto"
        >
          <Grid container spacing={3}>
      {/* Profile Picture Section */}
      <Grid item xs={12} md={4}>
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Profile Picture
          </Typography>

         
          <Avatar
            src={image || profile.Image} 
            alt="Profile Picture"
            sx={{ width: 100, height: 100, margin: '20px auto' }}
          />

          <Typography variant="body2" color="textSecondary">
            JPG or PNG no larger than 5 MB
          </Typography>

          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleClick}>
            Upload New Image
          </Button>
        </Paper>

       
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png"
          style={{ display: 'none' }}
          placeholder="Upload New Image" 
          onChange={handleImage}
        />
      </Grid>
    

            {/* Account Details Section */}
            <Grid item xs={12} md={8}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Account Details
                </Typography>
                <Grid container spacing={2}>
                  {/* Username Field */}
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>

                  {/* Age Field */}
                  <Grid item xs={12}>
                  <TextField
                        label="Age"
                        name="Age"
                        value={age}
                        onChange={handleAgeChange}
                        type="number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                  </Grid>

                  {/* Address Field */}
                  <Grid item xs={12}>
                  <TextField
                        label="Address"
                        name="Address"
                        defaultValue={profile.Address}
                        onChange={e => setAdress(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                  </Grid>

                  {/* Gender Field */}
                  <Grid item xs={12}>
                    <TextField
                      label="Gender"
                      select
                      value={gender.toString()}
                      onChange={e => setGender(e.target.value === "true")}
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value="true">Male</MenuItem>
                      <MenuItem value="false">Female</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                {/* Save Button */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, fontWeight: 'bold', borderRadius: '8px', textAlign: 'center', alignItems: 'center' }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
    
};



export default EditProfile;