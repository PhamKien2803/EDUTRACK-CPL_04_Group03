// components/Profile.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipants } from "../../../service/ApiService";
import { Box, Typography, Avatar, Button } from "@mui/material";
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

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Participant | null>(null);
  const user = useSelector((state: any) => state.account.account); // Lấy `id` người dùng từ Redux
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, [user.UserID]);

  const fetchUser = async () => {
    const res = await getParticipants();
    if (Array.isArray(res)) {
      const participant = res.find((item: Participant) => item.id === user.UserID);
      setProfile(participant);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      bgcolor="#f5f5f5"
      borderRadius="8px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.15)"
      maxWidth="500px"
      mx="auto"
      margin="20px auto"
    >
      <Avatar
        src={profile.Image || "/default-avatar.png"}
        sx={{
          width: 130,
          height: 130,
          mb: 3,
          border: "3px solid #4CAF50",
        }}
      />
      <Typography variant="h5" fontWeight="bold" color="#333" mb={1}>
        {profile.UserName}
      </Typography>
      
      {/* Profile Information Sections */}
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        gap={2}
        mt={3}
      >
        <Box p={2} bgcolor="#ffffff" borderRadius="8px" boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)">
          <Typography color="textSecondary" variant="subtitle2">
            Student ID:
          </Typography>
          <Typography fontWeight="bold" color="#333">
            {profile.id}
          </Typography>
        </Box>
        {/* Email */}
        <Box p={2} bgcolor="#ffffff" borderRadius="8px" boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)">
          <Typography color="textSecondary" variant="subtitle2">
            Email:
          </Typography>
          <Typography fontWeight="bold" color="#333">
            {profile.Email}
          </Typography>
        </Box>

        {/* Age */}
        <Box p={2} bgcolor="#ffffff" borderRadius="8px" boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)">
          <Typography color="textSecondary" variant="subtitle2">
            Age:
          </Typography>
          <Typography fontWeight="bold" color="#333">
            {profile.Age}
          </Typography>
        </Box>

        {/* Address */}
        <Box p={2} bgcolor="#ffffff" borderRadius="8px" boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)">
          <Typography color="textSecondary" variant="subtitle2">
            Address:
          </Typography>
          <Typography fontWeight="bold" color="#333">
            {profile.Address}
          </Typography>
        </Box>

        {/* Gender */}
        <Box p={2} bgcolor="#ffffff" borderRadius="8px" boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)">
          <Typography color="textSecondary" variant="subtitle2">
            Gender:
          </Typography>
          <Typography fontWeight="bold" color="#333">
            {profile.Gender ? "Male" : "Female"}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/edit-profile")}
        sx={{ mt: 2 }}
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default Profile;
