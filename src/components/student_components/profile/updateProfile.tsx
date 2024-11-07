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
}

const EditProfile: React.FC = () => {
    const [profile, setProfile] = useState<Participant | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [addres, setAdress] = useState<string>("");
    const [gender, setGender] = useState<boolean>(false);


    const user = useSelector((state: any) => state.account.account);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getParticipantsById(user.UserID);
                const profileData = res.data; // Access the actual data from the Axios response

        setName(profileData.UserName);
        setAge(profileData.Age);
        setAdress(profileData.Address);
        setGender(profileData.Gender);
        setProfile(profileData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (user.UserID) {
            fetchUser();
        }
    }, [user.UserID]);


    const handleConfirmSave = async () => {
        const req = await updateProfile(user.UserID, name, addres, age, gender);
        if (req) {
            navigate('/profile')
        } else {
            console.log("erro");

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
                    defaultValue={profile.Age}
                    onChange={e => setAge(parseInt(e.target.value))}
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
                    defaultValue={profile.Gender} // Default to "true" if Gender is undefined
                    onChange={(e) => setGender(e.target.value === "true")}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="true">Male</MenuItem>
                    <MenuItem value="false">Female</MenuItem>
                </TextField>


                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmSave}
                    sx={{ mt: 2 }}
                >
                    Save
                </Button>

                {/* Dialog for Save Confirmation */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Confirm Save</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to save these changes?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmSave} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>}


        </>
    );
};

export default EditProfile;