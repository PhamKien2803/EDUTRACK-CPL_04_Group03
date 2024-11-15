import { Route, Routes } from 'react-router-dom';
import DashboardLayoutBranding from './layouts/dashboard-layouts/Dashboard';
import LoginPage from './page/Auth/login/Login';
import { routesLecturersHome, routesStaffHome, routesStudentHome } from './routes/routes';
import { Layout } from './routes/Layout';
import { PrivateRoute } from './routes/PrivateRoute';
import { useSelector } from 'react-redux';

function App() {
  const account = useSelector((state: any) => state.account.account);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayoutBranding />}>
          {/* Student routes */}
          {account.Role === 0 && routesStudentHome.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}

          {/* Lecturer routes */}
          {account.Role === 1 && routesLecturersHome.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}

          {/* Staff routes */}
          {account.Role === 2 && routesStaffHome.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Route>

    </Routes>

  );
}

export default App;
