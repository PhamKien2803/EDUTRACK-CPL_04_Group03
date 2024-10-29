import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes';
import Breadcrumb from './layouts/header-nav/Breadcrumb';

function App() {
  return (
    <BrowserRouter>
      <Breadcrumb />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
