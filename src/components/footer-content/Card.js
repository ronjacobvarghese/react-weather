import { Fragment } from "react";
import { BsFillSunFill } from 'react-icons/bs';
import { FaWind } from 'react-icons/fa';

import styles from "./Card.module.css";

function Card() {
  return (
    <div className={styles["card-container"]}>
      <header> New York City </header>
      <section className={styles["card-content"]}>
        <img src = "/images/cloudy.png" alt = ""/>
        <span>62</span>
      </section>
      <section className={styles["card-footer"]}>
        <span>
          <BsFillSunFill size = "1.8rem" style = {{ color : "rgb(206, 84, 2)"}}/>
          29 C
        </span>
        <span>
          <FaWind size = "1.5rem" style = {{ color : "rgb(125,39,255)"}}/>
          25km
        </span>
      </section>
    </div>
  );
}

export default Card;
