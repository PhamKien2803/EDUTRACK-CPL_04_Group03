import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipants } from "../../../service/ApiService";
import { Box, Typography, Avatar, Button, Card, CardContent, Divider } from "@mui/material";
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

  if (!profile) return <Typography variant="h6" color="textSecondary">Loading...</Typography>;

  return (
    <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  p={3}
  bgcolor="#f0f4f7"
  borderRadius="12px"
  boxShadow="0px 8px 24px rgba(0, 0, 0, 0.1)"
  width="60%" // Set width to 75% of the screen
  mx="auto"
  mt={4}
>
  {/* Avatar */}
  <Avatar
    src={profile.Image || "/default-avatar.png"}
    sx={{
      width: 140,
      height: 140,
      mb: 3,
      border: "4px solid #4CAF50",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
    }}
  />

  {/* Username */}
  <Typography variant="h5" fontWeight="bold" color="#333" mb={1}>
    {profile.UserName}
  </Typography>

  {/* Profile Card */}
  <Card sx={{ width: "100%", mb: 3 }}>
    <CardContent>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Profile Details
      </Typography>
      
      <Divider sx={{ mb: 2 }} />

      {/* Student ID */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography color="textSecondary">Student ID:</Typography>
        <Typography fontWeight="bold">{profile.id}</Typography>
      </Box>

      {/* Email */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography color="textSecondary">Email:</Typography>
        <Typography fontWeight="bold">{profile.Email}</Typography>
      </Box>

      {/* Age */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography color="textSecondary">Age:</Typography>
        <Typography fontWeight="bold">{profile.Age}</Typography>
      </Box>

      {/* Address */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography color="textSecondary">Address:</Typography>
        <Typography fontWeight="bold">{profile.Address}</Typography>
      </Box>

      {/* Gender */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography color="textSecondary">Gender:</Typography>
        <Typography fontWeight="bold">{profile.Gender ? "Male" : "Female"}</Typography>
      </Box>
    </CardContent>
  </Card>

  {/* Update Button */}
  <Button
    variant="contained"
    color="primary"
    onClick={() => navigate("/edit-profile")}
    sx={{
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      mt: 2,
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        backgroundColor: "#388E3C",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
      },
    }}
  >
    Update Profile
  </Button>
</Box>

  );
};

export default Profile;
