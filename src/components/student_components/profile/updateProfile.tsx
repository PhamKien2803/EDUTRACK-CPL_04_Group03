// components/EditProfile.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipantsById, updateProfile } from "../../../service/ApiService";
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
                handleConfirmSave(); // Xử lý khi người dùng nhấn Yes
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

    return (
        <>
            {profile && <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={3}
                bgcolor="#f9f9f9"
                borderRadius="8px"
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
                maxWidth="400px"
                mx="auto"
                margin="10px auto"
            >
                <Typography variant="h5" fontWeight="bold" color="#333" mb={2}>
                    Edit Profile
                </Typography>

                <TextField
                    label="Name"
                    name="UserName"
                    defaultValue={profile.UserName}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Age"
                    name="Age"
                    value={age}
                    onChange={handleAgeChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    name="Address"
                    defaultValue={profile.Address}
                    onChange={e => setAdress(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Gender"
                    select
                    name="Gender"
                    value={gender.toString()} // Chuyển đổi boolean thành string
                    onChange={(e) => setGender(e.target.value === "true")}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="true">Male</MenuItem>
                    <MenuItem value="false">Female</MenuItem>
                </TextField>
                <TextField
                    label="Email"
                    name="Email"
                    defaultValue={profile.Email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ display: 'none' }}
                />
                <TextField
                    label="Password"
                    name="Password"
                    defaultValue={profile.Password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ display: 'none' }}
                />
                <TextField
                    label="Image"
                    name="Image"
                    defaultValue={profile.Image}
                    onChange={e => setImage(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ display: 'none' }}
                />
                <TextField
                    label="Rating"
                    name="Rating"
                    defaultValue={profile.rating}
                    onChange={e => setRating(parseInt(e.target.value))}
                    type="number"
                    fullWidth
                    margin="normal"
                    sx={{ display: 'none' }}
                />
                <TextField
                    label="Role"
                    name="Role"
                    defaultValue={profile.Role}
                    onChange={e => setRole(parseInt(e.target.value))}
                    type="number"
                    fullWidth
                    margin="normal"
                    sx={{ display: 'none' }}
                />
                <TextField
                    label="Is Online"
                    name="IsOnline"
                    defaultValue={profile.isOnline}
                    onChange={e => setIsOnline(e.target.value === "true")}
                    fullWidth
                    margin="normal"
                    sx={{ display: 'none' }}
                />
                <TextField
                    label="Status"
                    name="Status"
                    defaultValue={profile.Status}
                    onChange={e => setStatus(e.target.value === "true")}
                    fullWidth
                    margin="normal"
                    sx={{ display: 'none' }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave} // Gọi hàm handleSave để mở hộp thoại xác nhận
                    sx={{ mt: 2 }}
                >
                    Save
                </Button>
            </Box>}
        </>
    );
};



export default EditProfile;