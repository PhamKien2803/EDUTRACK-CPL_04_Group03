import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/routes';
import DashboardLayoutBranding from './layouts/dashboard-layouts/Dashboard';
import LoginPage from './page/Auth/login/Login';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
    </PersistGate>
    </Provider>
  );
}

export default App;
