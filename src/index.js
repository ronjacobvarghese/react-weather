import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import configureWeatherStore from "./store/weather-store";
import configureAdminStore from "./store/admin-store";
import { LocationContextProvider } from "./store/location-context";

configureWeatherStore();
configureAdminStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </React.StrictMode>
);
