import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureWeatherStore from './store/weather-store';
import configureAdminStore from './store/admin-store';

configureWeatherStore();
configureAdminStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
