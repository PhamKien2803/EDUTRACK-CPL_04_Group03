import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import {
  Outlet,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Badge, Box, CircularProgress, IconButton } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import MessageIcon from '@mui/icons-material/Message';
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import LanguageSelector from "../../i18n/LanguageSelector";

const NAVIGATION: Navigation = [
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "lecturer/homePage",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Upcoming",
    title: "Read user guide",
    icon: <PictureAsPdfIcon />,
  },
  {
    segment: "Contact",
    title: "Contact Support",
    icon: <SupportAgentIcon />,
  },
  {
    segment: "FQA",
    title: "FQA",
    icon: <LiveHelpIcon />,
  },
  {
    segment: "Logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

//theme structure with type annotations
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function LecturerDashboardLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(
    JSON.parse(localStorage.getItem("isMenuExpanded") || "false")
  );
  const location = useLocation();
  const navigationType = useNavigationType();
  const [unreadCount, setUnreadCount] = useState(0);
  const { userData } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  // State để lưu ngôn ngữ hiện tại
  const [language, setLanguage] = useState<"eng" | "vie">(
    JSON.parse(localStorage.getItem("language") || '"eng"') as "eng" | "vie"
  );

  const handleLanguageChange = (lang: "eng" | "vie") => {
    setLanguage(lang);
    localStorage.setItem("language", JSON.stringify(lang));
  };


  useEffect(() => {
    getCountMesNotSeen();
  }, [userData])

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [location, navigationType]);

  useEffect(() => {
    localStorage.setItem("isMenuExpanded", JSON.stringify(isMenuExpanded));
  }, [isMenuExpanded]);

  const handleToggleMenu = () => {
    setIsMenuExpanded((prev) => !prev);
  };
  const getCountMesNotSeen = async () => {
    const userChatRef = doc(db, 'chats', userData.id)
    const userChatsSnapShot = await getDoc(userChatRef);
    const userChatsData = userChatsSnapShot.data();
    console.log('check data', userChatsData.chatsData);

    userChatsData.chatsData.forEach(item => {
      if (item.messageSeen === false) {

        setUnreadCount(unreadCount + 1);
        console.log('count', unreadCount);

      }
    });
  }
  const toggleModal = () => setOpen(!open);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <Box display="flex" alignItems="center">
            <SchoolIcon sx={{ fontSize: "2.5rem" }} />
            <img
              src="https://th.bing.com/th/id/OIP.yQVfminp9JifX-QE4swlHwAAAA?rs=1&pid=ImgDetMain"
              alt="EduTrack logo"
              style={{ marginRight: 8 }}
            />
          </Box>
        ),
        title: "",
      }}
      theme={demoTheme}
    >
      <DashboardLayout
        isMenuExpanded={isMenuExpanded}
        onToggleMenu={handleToggleMenu}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
        }}
      >

        <Box
          sx={{
            position: "absolute",
            top: 70,
            right: 25,
            transform: "scale(1.5)",
          }}
        >
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loading && (
            <Box position="fixed" top={0} left={0} right={0} zIndex={1101}>
              <CircularProgress color="secondary" />
            </Box>
          )}
          <Outlet />
          <Box
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 1000,
            }}
          >
            <IconButton aria-label="Open Messenger" onClick={toggleModal}>
              <Badge
                badgeContent={unreadCount}
                color="error"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MessageIcon sx={{ fontSize: 40 }} />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default LecturerDashboardLayout;
