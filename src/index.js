import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App/App';
import './index.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer theme="colored" position="top-right" autoClose={3000} />
  </React.StrictMode>
);
