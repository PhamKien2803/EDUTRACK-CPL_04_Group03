import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getParticipants } from "../../../service/ApiService";
import ForgotPassword from "../forgot-password/Forgot";
import { GoogleIcon, SitemarkIcon } from "../icons/CustomIcon";
import SchoolIcon from "@mui/icons-material/School";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";
import { login } from "../../../Config/firebase";

interface Participant {
  id: string;
  UserName: string;
  Age: number;
  Gender: boolean;
  Address: string;
  Email: string;
  Password: string;
  Image: string;
  Role: number;
  isOnline: boolean;
  Status: "true" | "false";
}
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(5),
  gap: theme.spacing(2.5),
  boxShadow:
    "0px 10px 25px rgba(0, 0, 0, 0.05), 0px 20px 40px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}));

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Participant | null>(null);
  const [userList, setUserList] = useState<Participant[]>([]);

  const nav = useNavigate();

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const users = await getParticipants();
        if (Array.isArray(users)) {
          setUserList(users);
        }
      } catch {
        setError("Failed to load users. Please try again later.");
      }
    };
    fetchDataUser();
  }, []);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  console.log(
    error,
    user,
    userList,
    setUser,
    setPasswordError,
    setPasswordErrorMessage
  );

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = () => {
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Invalid email. Please enter the correct format.");
      return;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
    const user = userList.find(
      (u) => u.Email === email && u.Password === password
    );

    if (user) {
      login(email, password)
      dispatch(doLogin(user));
      toast.success("Login successful");
      switch (user.Role) {
        case 2: return setTimeout(() => {
          nav("/staff/dashboardStaff");
        }, 1000);
        case 0: return setTimeout(() => {
          nav("/dashboardPage");
        }, 1000);
        case 1: return setTimeout(() => {
          nav("/lecturer/homePage");
        }, 1000);
      }


    } else {
      setEmail("");
      setPassword("");

      toast.error(
        "Invalid email, password or status is not active! Please try again"
      );
    }
  };

  return (
    <Card variant="outlined">
      {/* Nội dung giao diện đăng nhập */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <SchoolIcon sx={{ fontSize: "2.5rem" }} />
        <img
          src="https://th.bing.com/th/id/OIP.yQVfminp9JifX-QE4swlHwAAAA?rs=1&pid=ImgDetMain"
          alt="EduTrack logo"
          style={{ marginRight: 8, width: "50%" }}
        />
      </Box>

      <form style={{ width: "100%" }}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            error={emailError}
            helperText={emailErrorMessage}
            placeholder="your@email.com"
            required
            color={emailError ? "error" : "primary"}
            InputProps={{ style: { borderRadius: "12px" } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            error={passwordError}
            helperText={passwordErrorMessage}
            placeholder="••••••"
            color={passwordError ? "error" : "primary"}
            InputProps={{ style: { borderRadius: "12px" } }}
          />
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "flex-end", mt: 1 }}
          >
            Forgot Password?
          </Link>
        </Stack>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} user={userList} />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "12px",
            fontSize: "1rem",
            backgroundColor: "secondary.main",
          }}
          onClick={handleLogin}
        >
          Sign in to EduTrack
        </Button>
      </form>

      <Divider sx={{ mt: 3, mb: 2 }}>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
          sx={{ borderRadius: "12px", py: 1.5 }}
        >
          Sign in with Google
        </Button>
      </Box>

      {/* Đặt ToastContainer ngay đây */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Card>
  );
};

export default Login;
