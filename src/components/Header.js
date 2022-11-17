import { Fragment, useState, useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useStore } from "../store/store";
import { DateTime } from "luxon";
import axios from "axios";

import styles from "./Header.module.css";

function Header() {
  const [state, dispatch] = useStore();
  const locationRef = useRef("");
  console.log(state);

  function formatToLocalTime(secs, zone, format) {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  }

  async function searchLocation(event) {
    event.preventDefault();
    let location = locationRef.current.value;

    if (location.trim() == "") {
      return;
    }

    let dailyUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=39d888eaa3b8d2cbc54e36a04bbe362c&units=metric`;
    let weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=24&appid=39d888eaa3b8d2cbc54e36a04bbe362c&units=metric`;

     await axios.get(dailyUrl).then((res) => {
      dispatch("RETRIEVE_LOC_DATA", res.data);
    });

     await axios.get(weeklyUrl).then((res) => {
      let timezone = res.data.city.timezone;
      let daily = res.data.list.map(d => {
        return {
        title:formatToLocalTime(d.dt, timezone,"cccc"),
        time:formatToLocalTime(d.dt,timezone,"t"),
        weather:d.weather[0].main,
        temp:d.main.temp
      }})
      let dayTime = daily.filter(item => item.time === "09:00");
      let nightTime = daily.filter(item => item.time === "21:00");
      dispatch("RETRIEVE_DAILY_TIMES", {
        dayTime,
        nightTime
      })
      
    });

    locationRef.current.value = "";
  }
  return (
    <Fragment>
      <ul className={styles["header-bar"]}>
        <li>
          <div className={styles["loc-header"]}>
            <header>
              {`${state.locationData.name},  ${state.locationData.country}`}{" "}
            </header>
            <section className={styles["loc-status"]}>
              <div />
              <p>Updated Status</p>
            </section>
          </div>
        </li>

        <li>
          <form onSubmit={searchLocation} className={styles["search-form"]}>
            <input ref={locationRef} placeholder="Enter Location" />
            <button onClick={searchLocation}>
              <BiSearchAlt2 size="1rem" />
            </button>
          </form>
        </li>
      </ul>
    </Fragment>
  );
}

export default Header;
