import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppState from './context/appState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppState>
    <App />
    </AppState>
  </React.StrictMode>
);

