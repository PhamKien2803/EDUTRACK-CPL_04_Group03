// <<<<<<< HEAD
// import React, { useEffect, useState } from "react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Stack,
//   Divider,
//   ThemeProvider,
//   createTheme,
// } from "@mui/material";
// import { FaUser, FaLock } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";
// import { getPaticipants } from "../../../service/ApiService";

// const theme = createTheme({
//   palette: {
//     primary: { main: "#1976d2" },
//     secondary: { main: "#424242" },
//     background: { default: "#f0f4f8", paper: "#ffffff" },
//   },
//   typography: {
//     fontFamily: "Roboto, Arial, sans-serif",
//     h5: { fontWeight: "bold" },
//   },
// });

// interface Participant {
//   UserID: string;
//   UserName: string;
//   Age: number;
//   Gender: boolean;
//   Address: string;
//   Email: string;
//   Password: string;
//   Image: string;
//   Role: number;
//   isOnline: boolean;
//   Status: "true" | "false";
// }

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<Participant | null>(null);
//   const [userList, setUserList] = useState<Participant[]>([]);

//   const nav = useNavigate();

//   useEffect(() => {
//     const fetchDataUser = async () => {
//       try {
//         const users = await getPaticipants();
//         if (Array.isArray(users)) {
//           setUserList(users);
//         }
//       } catch {
//         setError("Failed to load users. Please try again later.");
//       }
//     };
//     fetchDataUser();
//   }, []);

//   const handleLogin = () => {
//     const user = userList.find(
//       (u) => u.Email === email && u.Password === password
//     );

//     if (user) {

//       toast.success("Login successful");
//       setTimeout(() => {
//         nav("/homepage");
//       }, 2000);

//     } else {
//       setEmail("");
//       setPassword("");
//       console.log("Invalid email or password");
//       toast.error("Invalid email or password");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>

// <Box display="flex" minHeight="100vh" bgcolor="background.default" p={4}>
//         {/* Left Side - Features */}


//       <Box
//         display="flex"
//         minHeight="100vh"
//         justifyContent="center"
//         alignItems="center"
//         bgcolor="background.default"
//       >
//         <Box
//           display="flex"
//           flexDirection="column"
//           justifyContent="center"
//           alignItems="center"
//           bgcolor="background.paper"
//           p={4}
//           borderRadius={2}
//           boxShadow={3}
//           maxWidth={400}
//           width="100%"
//         >
//           {/* Nội dung giao diện đăng nhập */}
//           <Typography variant="h5" color="primary" mb={1}>
//             EduTrack
//           </Typography>
//           <Typography variant="body2" mb={3} color="textSecondary">
//             The social constructive learning tool. Please enter your email and
//             password to sign in.
//           </Typography>

//           <form style={{ width: "100%" }}>
//             <Stack spacing={2}>
//               <TextField
//                 label="Email"
//                 type="email"
//                 variant="outlined"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 fullWidth
//                 required
//               />
//               <TextField
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 fullWidth
//                 required
//               />
//             </Stack>

//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ mt: 3 }}
//               onClick={handleLogin}
//             >
//               Login
//             </Button>
//           </form>

//           <Divider sx={{ width: "100%", mt: 2, mb: 2 }}>or</Divider>

//           <Stack direction="row" spacing={1} width="100%">
//             <Button
//               variant="outlined"
//               fullWidth
//               color="secondary"
//               startIcon={<FaUser />}
//             >
//               Sign in with Google
//             </Button>
//             <Button
//               variant="outlined"
//               fullWidth
//               color="secondary"
//               startIcon={<FaLock />}
//             >
//               Sign in with Facebook
//             </Button>
//           </Stack>
//         </Box>
//       </Box>
//       </Box>

//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//     </ThemeProvider>
//   );

// };

// export default Login;
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Content from '../sign-in/Content';
import SignInCard from '../sign-in/SignInCard';
import { Box, Button } from '@mui/material';
import { Grid } from '@mui/material';
import  ReplyAllIcon  from '@mui/icons-material/ReplyAll';
import { useNavigate } from 'react-router-dom';


export default function SignInSide() {
  const navigate = useNavigate();
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        display="flex"
        alignItems="center"
        mt={1}
        ml={3}
        sx={{
          gap: 1,
        }}
      >
        <Grid item>
          <Button
            startIcon={<ReplyAllIcon />}
            onClick={() => navigate("/landing-page")}
            variant="outlined"
            color="secondary"
          >
            Back
          </Button>
        </Grid>
      </Box>
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 50%)',
            marginTop: 'max(10px - var(--template-frame-height, 0px), 0px)',
            minHeight: '60vh',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}

      // export default function SignInSide() {
      //   return (
      //     <>
      //       <CssBaseline enableColorScheme />
      //       <Stack
      //         direction="column"
      //         component="main"
      //         sx={[
      //           {
      //             justifyContent: 'center',
      //             height: 'calc((1 - var(--template-frame-height, 0)) * 50%)',
      //             marginTop: 'max(10px - var(--template-frame-height, 0px), 0px)',
      //             minHeight: '60vh',
      //           },
      //           (theme) => ({
      //             '&::before': {
      //               content: '""',
      //               display: 'block',
      //               position: 'absolute',
      //               zIndex: -1,
      //               inset: 0,
      //               backgroundImage:
      //                 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      //               backgroundRepeat: 'no-repeat',
      //               ...theme.applyStyles('dark', {
      //                 backgroundImage:
      //                   'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      //               }),
      //             },
      //           }),
      //         ]}

      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

