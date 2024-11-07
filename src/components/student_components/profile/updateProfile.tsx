// components/EditProfile.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipantsById } from "../../../service/ApiService";
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
}

const EditProfile: React.FC = () => {
    const [profile, setProfile] = useState<Participant | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState<Participant | null>(null);

    const user = useSelector((state: any) => state.account.account);
    console.log("User:", user);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("User ID:", user.UserID);
        console.log("Fetched profile data:", profile);
       
        const fetchUser = async () => {
            try {
                const res = await getParticipantsById(user.UserID);
                const profileData = res.data;

                // Set default values if profileData or its fields are missing
                setProfile({
                    id: profileData?.id || "",
                    UserName: profileData?.UserName || "",
                    Age: profileData?.Age || 0,
                    Gender: profileData?.Gender !== undefined ? profileData.Gender : true, // Default to true if undefined
                    Address: profileData?.Address || "",
                    Email: profileData?.Email || "",
                });

                setUpdatedProfile({
                    id: profileData?.id || "",
                    UserName: profileData?.UserName || "",
                    Age: profileData?.Age || 0,
                    Gender: profileData?.Gender !== undefined ? profileData.Gender.toString() : "true",
                    Address: profileData?.Address || "",
                    Email: profileData?.Email || "",
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (user.UserID) {
            fetchUser();
        }
    }, [user.UserID]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (updatedProfile) {
            setUpdatedProfile({ ...updatedProfile, [name]: value });
        }
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedProfile) {
            setUpdatedProfile({ ...updatedProfile, Gender: e.target.value === "true" });
        }
    };

    const handleSave = () => {
        setOpenDialog(true);
    };

    const handleConfirmSave = async () => {
        setOpenDialog(false);
        // Call API to save updated profile to database (assuming an updateParticipant API function)
        // await updateParticipant(user.UserID, updatedProfile);
        navigate("/profile");
    };



    return (
        <Box
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
                value={updatedProfile?.UserName || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Age"
                name="Age"
                value={updatedProfile?.Age || ""}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Address"
                name="Address"
                value={updatedProfile?.Address || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Gender"
                select
                name="Gender"
                value={updatedProfile?.Gender?.toString() || "true"} // Default to "true" if Gender is undefined
                onChange={handleGenderChange}
                fullWidth
                margin="normal"
            >
                <MenuItem value="true">Male</MenuItem>
                <MenuItem value="false">Female</MenuItem>
            </TextField>


            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
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
        </Box>
    );
};

export default EditProfile;