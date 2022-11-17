import { Fragment } from "react";
import { FaWind } from "react-icons/fa";
import { useStore } from '../../store/store';
import { BsThermometerSun, BsCloudSun, BsSpeedometer } from 'react-icons/bs';

import styles from "./TempDetail.module.css";

function TempDetail() {
  const state = useStore()[0];
  return (
    <div className={styles["detail-container"]}>
      <p>Details</p>
      <ul>
        <li className={styles["icon-card-container"]}>
          <div style={{ backgroundImage: "linear-gradient(to bottom right,rgb(162,62,255),rgb(125,39,255)"}}><FaWind size = '2rem'/></div>
          <section>
            <header>Wind</header>
            <p>{state.locationData.wind}km/h</p>
          </section>
        </li>
        <li className={styles["icon-card-container"]}>
          <div style={{ backgroundImage: "linear-gradient(to bottom right,rgb(255,162,61),rgb(254,105,28)"}}><BsThermometerSun size = '2rem'/></div>
          <section>
            <header>Real Feel</header>
            <p>{state.locationData.feels_like} C/h</p>
          </section>
        </li>
        <li className={styles["icon-card-container"]}>
          <div style={{ backgroundImage: "linear-gradient(to bottom right,rgb(255,220,0),rgb(255,197,0)"}}><BsCloudSun size = '2rem'/></div>
          <section>
            <header>Humidity</header>
            <p>{state.locationData.humidity}%</p>
          </section>
        </li>
        <li className={styles["icon-card-container"]}>
          <div style={{ backgroundImage: "linear-gradient(to top right, rgb(87, 236, 172) 20%, rgb(43, 212, 115))"}}><BsSpeedometer size = '2rem'/></div>
          <section>
            <header>Pressure</header>
            <p>{state.locationData.pressure} mb</p>
          </section>
        </li>
      </ul>
    </div>
  );
}

export default TempDetail;
