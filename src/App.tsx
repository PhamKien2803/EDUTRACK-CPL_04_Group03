import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import DashboardLayoutBranding from './layouts/dashboard-layouts/Dashboard';
import LoginPage from './page/Auth/login/Login';
import { persistor, store } from './redux/store';
import { routesStudentHome } from './routes/routes';

function App() {




  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />


            <Route element={<DashboardLayoutBranding />}>
              {routesStudentHome.map((route) => (
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
