import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import App from './App';
axios.defaults.baseURL = "http://localhost:9999";
import "react-awesome-lightbox/build/style.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
