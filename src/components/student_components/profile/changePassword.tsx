import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getParticipants, changePassword } from "../../../service/ApiService";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Lock, Visibility, VisibilityOff, VpnKey  } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { participants } from "../../../models/Interface";

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      const currentUser = participants.find((participant: participants) => participant.id === user.UserID);

      if (!currentUser) {
        Swal.fire({
          icon: "error",
          title: t("error_titles"),
          text: t("error_user_not_found"),
        });
        return;
      }
      if (oldPassword !== currentUser.Password) {
        Swal.fire({
          icon: "error",
          title: t("error_titles"),
          text: t("error_incorrect_old_password"),
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: t("error_titles"),
          text: t("error_password_mismatch"),
        });
        return;
      }
      await changePassword(user.UserID, { Password: newPassword });
      Swal.fire({
        icon: "success",
        title: t("Success_titles"),
        text: t("success_password_updated"),
      }).then(() => {
        navigate("/profile"); 
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: t("error_titles"),
        text: t("error_password_update_failed"),
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f4f6"
    >
      <Box
        bgcolor="white"
        borderRadius="16px"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        p={4}
        width="400px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          variant="h5"
          mb={3}
          fontWeight="600"
          color="primary"
          textAlign="center"
        >
          {t("change_password")}
        </Typography>

        {/* Old Password */}
        <TextField
          label={t("old_password")}
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          sx={{ mb: 2, width: "100%" }}
          InputProps={{
            startAdornment: (
              <IconButton sx={{ position: "start" }}>
                <Lock />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                onClick={() => setShowOldPassword(!showOldPassword)}
                edge="end"
              >
                {showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        {/* New Password */}
        <TextField
          label={t("new_password")}
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2, width: "100%" }}
          InputProps={{
            startAdornment: (
              <IconButton sx={{ position: "start" }}>
                <VpnKey />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                onClick={() => setShowNewPassword(!showNewPassword)}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        {/* Confirm Password */}
        <TextField
          label={t("confirm_password")}
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3, width: "100%" }}
          InputProps={{
            startAdornment: (
              <IconButton sx={{ position: "start" }}>
                <VpnKey />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            width: "100%",
            textTransform: "capitalize",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            "&:hover": {
              background: "linear-gradient(90deg, #556cd6, #5a3e94)",
            },
            padding: "10px 16px",
          }}
        >
          {t("save_changes")}
        </Button>
      </Box>
    </Box>
  );

};

export default ChangePassword;
