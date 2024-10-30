import React from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Divider, IconButton, Stack } from '@mui/material';
import { Google, Facebook, Settings, Build, ThumbUp, Bolt } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Custom dynamic theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize the primary color
    },
    secondary: {
      main: '#424242', // Customize the secondary color
    },
    background: {
      default: '#f0f4f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
  },
});

function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" minHeight="100vh" bgcolor="background.default" p={4}>
        {/* Left Side - Features */}
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" pr={4}>
          <Typography variant="h4" color="primary" mb={2}>
            EduTrack
          </Typography>
          <Feature icon={<Settings />} title="Adaptive Performance" description="EduTrack effortlessly adjusts to your needs, enhancing efficiency and simplifying your tasks." />
          <Feature icon={<Build />} title="Built to Last" description="Experience unmatched durability that provides long-term value." />
          <Feature icon={<ThumbUp />} title="User-Centric Experience" description="Enjoy an intuitive, user-friendly interface tailored for seamless use." />
          <Feature icon={<Bolt />} title="Innovative Functionality" description="Stay ahead with advanced features that cater to your evolving educational needs." />
        </Box>

        {/* Right Side - Login Form */}
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgcolor="background.paper" borderRadius={2} boxShadow={3} p={4}>
          <Typography variant="h5" mb={2}>
            Sign in
          </Typography>

          <TextField label="Email" type="email" fullWidth variant="outlined" margin="normal" />
          <TextField label="Password" type="password" fullWidth variant="outlined" margin="normal" />

          <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button variant="text">Forgot your password?</Button>
          </Box>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
            Sign in
          </Button>

          <Typography variant="body2">
            Don't have an account? <Button variant="text">Sign up</Button>
          </Typography>

          <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>or</Divider>

          <Stack direction="column" spacing={1} width="100%">
            <Button variant="outlined" fullWidth startIcon={<Google />} color="secondary">
              Sign in with Google
            </Button>
            <Button variant="outlined" fullWidth startIcon={<Facebook />} color="secondary">
              Sign in with Facebook
            </Button>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <Box display="flex" alignItems="center" mb={3}>
    <IconButton color="primary" sx={{ mr: 1 }}>
      {icon}
    </IconButton>
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </Box>
  </Box>
);

export default LoginPage;
