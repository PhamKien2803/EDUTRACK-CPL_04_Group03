// components/Profile.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipants, getParticipantsById } from "../../../service/ApiService";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Thêm import này

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
  const navigate = useNavigate(); // Khởi tạo navigate

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
      bgcolor="#f9f9f9"
      borderRadius="8px"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      maxWidth="400px"
      mx="auto"
      margin="10px auto"
    >
      <Avatar
        src={profile.Image || "/default-avatar.png"}
        sx={{
          width: 120,
          height: 120,
          mb: 2,
          border: "2px solid #1976d2",
        }}
      />
      <Typography variant="h5" fontWeight="bold" color="#333" mb={1}>
        {profile.UserName}
      </Typography>
      <Typography color="textSecondary" variant="body1" mb={1}>
        Email: <strong>{profile.Email}</strong>
      </Typography>
      <Typography color="textSecondary" variant="body1" mb={1}>
        Age: <strong>{profile.Age}</strong>
      </Typography>
      <Typography color="textSecondary" variant="body1" mb={1}>
        Address: <strong>{profile.Address}</strong>
      </Typography>
      <Typography color="textSecondary" variant="body1" mb={1}>
        Gender: <strong>{profile.Gender ? "Male" : "Female"}</strong>
      </Typography>

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