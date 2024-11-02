import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { getPaticipants } from "../../service/ApiService";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#424242" },
    background: { default: "#f0f4f8", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: "bold" },
  },
});

interface Participant {
  UserID: string;
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

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Participant | null>(null);
  const [userList, setUserList] = useState<Participant[]>([]);

  console.log(error, user, setUser);
  const nav = useNavigate();

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const users = await getPaticipants();
        if (Array.isArray(users)) {
          setUserList(users);
        }
      } catch {
        setError("Failed to load users. Please try again later.");
      }
    };
    fetchDataUser();
  }, []);

  const handleLogin = () => {
    const user = userList.find(
      (u) => u.Email === email && u.Password === password
    );

    if (user) {
      
      toast.success("Login successful");
      setTimeout(() => {
        nav("/homepage");
      }, 2000);
     
    } else {
      setEmail("");
      setPassword("");
      console.log("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.default"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="background.paper"
          p={4}
          borderRadius={2}
          boxShadow={3}
          maxWidth={400}
          width="100%"
        >
          {/* Nội dung giao diện đăng nhập */}
          <Typography variant="h5" color="primary" mb={1}>
            EduTrack
          </Typography>
          <Typography variant="body2" mb={3} color="textSecondary">
            The social constructive learning tool. Please enter your email and
            password to sign in.
          </Typography>
  
          <form style={{ width: "100%" }}>
<Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Stack>
  
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
  
          <Divider sx={{ width: "100%", mt: 2, mb: 2 }}>or</Divider>
  
          <Stack direction="row" spacing={1} width="100%">
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              startIcon={<FaUser />}
            >
              Sign in with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              startIcon={<FaLock />}
            >
              Sign in with Facebook
            </Button>
          </Stack>
        </Box>
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
    </ThemeProvider>
  );
  
};

export default Login;