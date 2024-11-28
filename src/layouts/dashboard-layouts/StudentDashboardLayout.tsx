import { useContext, useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { Badge, Box, CircularProgress, IconButton } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

import {
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Upcoming as UpcomingIcon,
  PictureAsPdf as PictureAsPdfIcon,
  SupportAgent as SupportAgentIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import ChatUI from "../../page/Chart/ChapApp";
import { AppContext } from "../../context/AppContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";

//navigation structure with type annotations
const NAVIGATION: Navigation = [
  { segment: "profile", title: "Profile", icon: <AccountCircleIcon /> },
  { segment: "dashboardPage", title: "dashboard", icon: <DashboardIcon /> },
  { segment: "Assignments", title: "Assignments", icon: <AssignmentIcon /> },
  { segment: "Upcoming", title: "UpcomingSlots", icon: <UpcomingIcon /> },
  { segment: "Upcoming", title: "Read user guide", icon: <PictureAsPdfIcon /> },
  { segment: "Contact", title: "Contact Support", icon: <SupportAgentIcon /> },
  { segment: "Logout", title: "Logout", icon: <LogoutIcon /> },
];

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

function StudentDashboardLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(
    JSON.parse(localStorage.getItem("isMenuExpanded") || "false")
  );
  const location = useLocation();
  const navigationType = useNavigationType();
  let unreadCount = 0;
  const [open, setOpen] = useState(false);
  const { userData } = useContext(AppContext);
  useEffect(() => {
    getCountMesNotSeen();
  }, [])
  const getCountMesNotSeen = async () => {
    const userChatRef = doc(db, 'chats', userData.id)
    const userChatsSnapShot = await getDoc(userChatRef);
    const userChatsData = userChatsSnapShot.data();
    console.log('check data', userChatsData.chatsData);
    userChatsData.chatsData.forEach(item => {
      if (item.messageSeen === false) {
        unreadCount++;
      }
    });


  }

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
  const toggleModal = () => setOpen(!open);

  return (
    <>
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
          {/* Main Content */}
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
        <ChatUI open={open} toggleModal={toggleModal} />
      </AppProvider>
    </>
  );
}

export default StudentDashboardLayout;
