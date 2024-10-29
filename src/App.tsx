import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes';
import HomePage from './page/HomePage/HomePage';
import LecturersHomePage from './page/LecturersHome/LecturersHomePage';
import StaffHomePage from './page/StaffHome/StaffHomePage';

interface RouteType {
  key?: string;
  path?: string;
  component: React.ComponentType;
}

function App() {

  const showRoutes = (Component: React.ComponentType, routes: RouteType[]) => {
    return routes.map((route: RouteType) => (
      <Route
        key={route?.key}
        path={route?.path}
        element={<Component />}
      />
    ));
  };

  return (
    <BrowserRouter>
      <Routes>
        {showRoutes(HomePage, routes)}
        {showRoutes(LecturersHomePage, routes)}
        {showRoutes(StaffHomePage, routes)}
        {routes.map((route: RouteType) => (
          <Route
            key={route?.key}
            path={route?.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;