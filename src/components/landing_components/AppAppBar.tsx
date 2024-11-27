import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ColorModeIconDropdown from './theme/ColorModelconDropdown';
import SchoolIcon from '@mui/icons-material/School';
import LanguageSelector from "../../i18n/LanguageSelector";
import { theme } from '../student_components/examtest/exam-history/HisTheme';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',

  opacity: 0,
  animation: 'fadeIn 0.8s ease-out forwards',

  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(-20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));


export default function AppAppBar() {
  const navigate = useNavigate();
  const [language, setLanguage] = React.useState<"eng" | "vie">(
    JSON.parse(localStorage.getItem("language") || '"eng"') as "eng" | "vie"
  );

  const handleLanguageChange = (lang: "eng" | "vie") => {
    setLanguage(lang);
    localStorage.setItem("language", JSON.stringify(lang));
  };

  const navigatetoSignIn = () => {
    navigate("/login");
  };


  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <SchoolIcon sx={{ fontSize: "2.5rem", color: "black", backgroundColor: "#fff" }} />
            <img
              src="/assets/edutracklogo-removebg-preview.png"
              alt="EduTrack logo"
              style={{
                marginRight: 8,
                width: 150,
                height: 40,
                filter: theme.palette.mode === "dark" ? "brightness(0) invert(1)" : "none",
                backgroundColor: "#fff",
              }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button onClick={navigatetoSignIn} color="primary" variant="contained" size="large">
              Sign in
            </Button>
            <Box>
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
            </Box>
            <ColorModeIconDropdown />
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
