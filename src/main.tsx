import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import App from './App';
axios.defaults.baseURL = "http://localhost:9999";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { persistor, store } from './redux/store';
import './i18n/i18n';
import AppContextProvider from './context/AppContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppContextProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AppContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
