import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/routes';
import DashboardLayoutBranding from './layouts/dashboard-layouts/Dashboard';
import LoginPage from './page/Auth/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<DashboardLayoutBranding />}>
          {routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
