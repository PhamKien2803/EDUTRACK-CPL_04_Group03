import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipantsById, updateProfile } from "../../../service/ApiService";
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
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
  Password: string;
  rating: number;
}

const EditProfile: React.FC = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Participant | null>(null);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const fetchUser = async () => {
      try {
        const res = await getParticipantsById(user.UserID);
        setName(res.UserName);
        setAge(res.Age);
        setAddress(res.Address);
        setGender(res.Gender);
        setEmail(res.Email);
        setPassword(res.Password);
        setImage(res.Image);
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSave = () => {
    Swal.fire({
      title: t("are_you_sure"),
      text: t("you_wont_revert"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes_save_it"),
      cancelButtonText: t("no_cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmSave();
      }
    });
  };

  const handleConfirmSave = async () => {
    try {
      await updateProfile(user.UserID, name, address, age, gender, email, password, image, 0, 0, false, false);
      Swal.fire(t("success"), t("changes_saved"), "success");
      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      Swal.fire(t("error"), t("error_saving_profile"), "error");
    }
  };

  return (
    <Box bgcolor="#f6f9fc" minHeight="100vh" p={3}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ color: "#2575fc", mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>

      {profile && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={3}
          borderRadius="12px"
          boxShadow="0px 8px 24px rgba(0, 0, 0, 0.1)"
          bgcolor="#fff"
          maxWidth="800px"
          mx="auto"
        >
          <Typography variant="h4" fontWeight="bold" color="#333" mb={4}>
            {t("edit_profile")}
          </Typography>
          <Grid container spacing={4}>
            {/* Profile Picture */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {t("profile_picture")}
                </Typography>
                <Avatar
                  src={image || profile.Image}
                  alt="Profile Picture"
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    my: 2,
                    border: "4px solid #2575fc",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "capitalize",
                    background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #5b10ba, #1e66e1)",
                    },
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t("upload_new_image")}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg, image/png"
                  style={{ display: "none" }}
                  onChange={handleImage}
                />
              </Paper>
            </Grid>

            {/* Form Fields */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  {t("account_details")}
                </Typography>
                <TextField
                  label={t("name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={t("age")}
                  value={age}
                  onChange={handleAgeChange}
                  type="number"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={t("address")}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={t("gender")}
                  select
                  value={gender.toString()}
                  onChange={(e) => setGender(e.target.value === "true")}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="true">{t("male")}</MenuItem>
                  <MenuItem value="false">{t("female")}</MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 3,
                    textTransform: "capitalize",
                    background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #5b10ba, #1e66e1)",
                    },
                  }}
                  onClick={handleSave}
                >
                  {t("save_changes")}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EditProfile;
