import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import {
  Outlet,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

//navigation structure with type annotations
const NAVIGATION: Navigation = [
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "staff/dashboardStaff",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "staff/manage-semesters",
    title: "Management Semester",
    icon: <LocalLibraryIcon />,
  },
  {
    segment: "staff/manage_class",
    title: "Management Class",
    icon: <SchoolIcon />,
  },
  {
    segment: "staff/account-management",
    title: "Management Account",
    icon: <SupervisorAccountIcon />,
  },
  {
    segment: "staff/manage_course_semester",
    title: "Management Courses",
    icon: <AssignmentIcon />,
  },
  {
    segment: "staff/exam-check-point",
    title: "Management Exam",
    icon: <AssignmentIcon />,
  },

  {
    segment: "Upcoming",
    title: "Read user guide",
    icon: <PictureAsPdfIcon />,
  },

  {
    segment: "Logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

//theme structure with type annotations
const fixedTheme = createTheme({
  palette: {
    mode: 'light', 
  },
});

function StaffDashboardLayout() {
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
            <SchoolIcon sx={{ fontSize: "2.5rem", marginRight: "8px", color: "black" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "black",
                textTransform: "uppercase"
              }}
            >
              Staff Dashboard
            </Typography>
          </Box>
        ),

        title: "",
      }}
      theme={fixedTheme}
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
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default StaffDashboardLayout;
