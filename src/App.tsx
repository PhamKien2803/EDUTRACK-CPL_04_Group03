// import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import LanguageSelector from "./i18n/LanguageSelector";
import LoginPage from "./page/Auth/login/Login";
import {
  routesLecturersHome,
  routesStaffHome,
  routesStudentHome,
} from "./routes/routes";
import { Layout } from "./routes/Layout";
import { PrivateRoute } from "./routes/PrivateRoute";
import StudentDashboardLayout from "./layouts/dashboard-layouts/StudentDashboardLayout";
import LecturerDashboardLayout from "./layouts/dashboard-layouts/LecturerDashboardLayout";
import StaffDashboardLayout from "./layouts/dashboard-layouts/StaffDashboardLayout";
import VerifyOTP from "./page/Auth/forgot-password/VerifyOTP";
import ResetPassword from "./page/Auth/forgot-password/ResetPassword";
import EduTrackHome from "./page/landing_page/EduTrackHome";
import CheckPoint from "./page/home-page/staff-home/Exam/CheckPoint";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase";
import { AppContext } from "./context/AppContext";
import ChatUI from "./page/Chart/ChapApp";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  interface RootState {
    account: {
      account: {
        Role: number;
      };
    };
  }

  const account = useSelector((state: RootState) => state.account.account);

  // State để lưu ngôn ngữ hiện tại
  // const [language, setLanguage] = useState<"eng" | "vie">(
  //   JSON.parse(localStorage.getItem("language") || '"eng"') as "eng" | "vie"
  // );

  // const handleLanguageChange = (lang: "eng" | "vie") => {
  //   setLanguage(lang);
  //   localStorage.setItem("language", JSON.stringify(lang));
  // };

  const navigate = useNavigate();

  const { loadUserData } = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await loadUserData(user.uid)
        switch (account.Role) {
          case 2: return <Navigate to={"/staff/dashboardStaff"} />
          case 0: return <Navigate to={"/dashboardPage"} />
          case 1: return <Navigate to={"/lecturer/homePage"} />
        }

      } else {
        navigate('/landing-page')
      }
    })
  }, [])

  return (
    <>


      {/* Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/landing-page" element={<EduTrackHome />} />
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/chatapp' element={<ChatUI />} />
        {/* Private routes */}
        {account && (
          <Route element={<PrivateRoute />}>
            {/* Student routes */}
            {account.Role === 0 && (
              <Route path="/" element={<StudentDashboardLayout />}>
                {routesStudentHome.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Route>


            )}

            {/* <LanguageSelector
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      /> */}

            {/* Lecturer routes */}
            {account.Role === 1 && (
              <Route path="/" element={<LecturerDashboardLayout />}>
                {routesLecturersHome.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Route>
            )}

            {/* Staff routes */}
            {account.Role === 2 && (
              <Route path="/" element={<StaffDashboardLayout />}>
                {routesStaffHome.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Route>
            )}
          </Route>
        )}
      </Routes>
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
    </>
  );
}

export default App;
