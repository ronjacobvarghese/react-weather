import React, { useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";


import { useStore } from "./store";

const LocationContext = React.createContext({
  notification: "",
  sendNotify: (message) => {},
  fetchLocation: async (location, locationData) => {},
});

export const LocationContextProvider = (props) => {
  const [message, setMessage] = useState("");
  const dispatch = useStore()[1];

  const sentNotifyHandler = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  function formatToLocalTime(secs, zone, format) {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  }

  const fetchLocationContent = async (location, locationData) => {
    let tempor = locationData;
    const { name, country, weather, temp, feels_like, wind } = tempor;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_APP_API_KEY}&units=metric`;
    await axios
      .get(url)
      .then((res) => {
        dispatch("RETRIEVE_LOC_DATA", res.data);

        if (name !== "") {
          dispatch("UPDATE_RECENTS", {
            name,
            country,
            weather,
            temp,
            feels_like,
            wind,
            search: location,
          });
        }
      })
      .catch((err) => {
        sentNotifyHandler("Invalid Search");
      });

    let weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=24&appid=${process.env.REACT_APP_WEATHER_APP_API_KEY}&units=metric`;

    axios
      .get(weeklyUrl)
      .then((res) => {
        let timezone = res.data.city.timezone;
        let daily = res.data.list.map((d) => {
          return {
            title: formatToLocalTime(d.dt, timezone, "cccc"),
            time: formatToLocalTime(d.dt, timezone, "t"),
            weather: d.weather[0].main,
            temp: d.main.temp,
          };
        });
        return daily;
      })
      .then((res) => {
        let dayTime = res.filter((item) => item.time === "09:00");
        let nightTime = res.filter((item) => item.time === "21:00");
        dispatch("RETRIEVE_DAILY_TIMES", {
          dayTime,
          nightTime,
        });
      })
      .catch((err) => {
        return;
      });
  };
  return (
    <LocationContext.Provider
      value={{
        notification: message,
        sendNotify: sentNotifyHandler,
        fetchLocation: fetchLocationContent,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
