import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipants } from "../../../service/ApiService";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from '@mui/icons-material/Badge';

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
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Participant | null>(null);

  interface RootState {
    account: {
      account: {
        UserID: string;
      };
    };
  }

  const user = useSelector((state: RootState) => state.account.account);
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

  if (!profile) return <Typography variant="h6" color="textSecondary">{t("loading")}</Typography>;

  return (
    <Box bgcolor="#f6f9fc" minHeight="130vh" pb={5}>
      {/* Cover Photo */}
      <Box
        sx={{
          width: "100%",
          height: 250,
          background: `linear-gradient(45deg, #6a11cb, #2575fc)`,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome, {profile.UserName}!
        </Typography>
        <Avatar
          src={profile.Image || "/default-avatar.png"}
          sx={{
            width: 150,
            height: 150,
            position: "absolute",
            bottom: -75,
            border: "6px solid white",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            background: "linear-gradient(145deg, #6a11cb, #2575fc)",
          }}
        />
      </Box>

      {/* User Info Section */}
      <Box
        mt={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        px={3}
      >
        <Typography variant="h5" fontWeight="bold" color="#333">
          {profile.UserName}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {t("role")}: {profile.Role === 1 ? t("Staff") : t("Student")}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          mt={2}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate("/edit-profile")}
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              "&:hover": {
                background: "linear-gradient(45deg, #5b10ba, #1e66e1)",
              },
            }}
          >
            {t("update_profile")}
          </Button>

          
        </Box>
      </Box>

      {/* About Section */}
      <Card
        sx={{
          maxWidth: "80%",
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
          background: "white",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3} color="#333">
          {t("about_me")}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box display="flex" alignItems="center" mb={2}>
          <BadgeIcon sx={{ color: "#2575fc", mr: 1 }} />
          <Typography color="black" sx={{ flex: 1 }}>
            {t("studentid")}
          </Typography>
          <Typography fontWeight="bold" color="#555">
            {profile.id}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <MailIcon sx={{ color: "#2575fc", mr: 1 }} />
          <Typography color="black" sx={{ flex: 1 }}>
            {t("email")}
          </Typography>
          <Typography fontWeight="bold" color="#555">
            {profile.Email}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <CakeIcon sx={{ color: "#2575fc", mr: 1 }} />
          <Typography color="black" sx={{ flex: 1 }}>
            {t("age")}
          </Typography>
          <Typography fontWeight="bold" color="#555">
            {profile.Age}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <LocationOnIcon sx={{ color: "#2575fc", mr: 1 }} />
          <Typography color="black" sx={{ flex: 1 }}>
            {t("address")}
          </Typography>
          <Typography fontWeight="bold" color="#555">
            {profile.Address}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <WcIcon sx={{ color: "#2575fc", mr: 1 }} />
          <Typography color="black" sx={{ flex: 1 }}>
            {t("gender")}
          </Typography>
          <Typography fontWeight="bold" color="#555">
            {profile.Gender ? t("male") : t("female")}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Profile;
