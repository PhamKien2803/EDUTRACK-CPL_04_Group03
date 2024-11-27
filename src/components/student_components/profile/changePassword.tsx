import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getParticipants, changePassword } from "../../../service/ApiService";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Lock, VpnKey,AccountCircle  } from "@mui/icons-material";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  interface RootState {
    account: {
      account: {
        UserID: string;
      };
    };
  }

  const user = useSelector((state: RootState) => state.account.account);

  const handleSubmit = async () => {
    try {
      
      const participants = await getParticipants();
      const currentUser = participants.find((participant: any) => participant.id === user.UserID);

      if (!currentUser) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "User not found.",
        });
        return;
      }

      
      if (oldPassword !== currentUser.Password) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Old password is incorrect.",
        });
        return;
      }

      
      if (newPassword !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "New passwords do not match.",
        });
        return;
      }

      
      await changePassword(user.UserID, { Password: newPassword });

     
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated successfully!",
      }).then(() => {
        navigate("/profile"); 
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update password. Please try again.",
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f6f9fc"
    >
      <Box
        bgcolor="white"
        borderRadius="8px"
        boxShadow={3}
        p={4}
        width="400px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h4" mb={3} fontWeight="bold">
          Change Password
        </Typography>
        
        <TextField
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          sx={{ mb: 2, width: "100%" }}
          InputProps={{
            startAdornment: (
              <IconButton position="start">
                <Lock />
              </IconButton>
            ),
          }}
        />
        
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2, width: "100%" }}
          InputProps={{
            startAdornment: (
              <IconButton position="start">
                <VpnKey />
              </IconButton>
            ),
          }}
        />
        
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3, width: "100%" }}
          InputProps={{
            startAdornment: (
              <IconButton position="start">
                <VpnKey />
              </IconButton>
            ),
          }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            textTransform: "capitalize",
            borderRadius: "30px",
            background: "linear-gradient(45deg, #6a11cb, #2575fc)",
            "&:hover": {
              background: "linear-gradient(45deg, #5b10ba, #1e66e1)",
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
