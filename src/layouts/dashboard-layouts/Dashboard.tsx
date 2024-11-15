import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

//navigation structure with type annotations
const NAVIGATION: Navigation = [
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },

  {
    segment: "home-page",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Assignments",
    title: "Assignments",
    icon: <AssignmentIcon />,
  },
  {
    segment: "Upcoming",
    title: "UpcomingSlots",
    icon: <UpcomingIcon />,
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

function DashboardLayoutBranding() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(
    JSON.parse(localStorage.getItem("isMenuExpanded") || "false")
  );
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [location, navigationType]);

  useEffect(() => {
    localStorage.setItem("isMenuExpanded", JSON.stringify(isMenuExpanded));
  }, [isMenuExpanded]);

  // Toggle menu expansion
  const handleToggleMenu = () => {
    setIsMenuExpanded((prev) => !prev);
  };

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
      >
        {loading && (
          <Box position="fixed" top={0} left={0} right={0} zIndex={1101}>
            <CircularProgress color="secondary" />
          </Box>
        )}
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBranding;
