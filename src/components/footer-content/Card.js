import { BsFillSunFill } from 'react-icons/bs';
import { FaWind } from 'react-icons/fa';

import styles from "./Card.module.css";

function Card(props) {
  return (
    <div onClick = {props.onClick} style = {props.style} className={styles["card-container"]}>
      <header> {props.title} </header>
      <section className={styles["card-content"]}>
        <img src = {props.image} alt = ""/>
        <span>{Math.floor(props.temp)}</span>
      </section>
      <section className={styles["card-footer"]}>
        <span>
          <BsFillSunFill size = "1.8rem" style = {{ color : "rgb(206, 84, 2)"}}/>
          {props.feels_like} C
        </span>
        <span>
          <FaWind size = "1.5rem" style = {{ color : "rgb(125,39,255)"}}/>
          {props.wind} km
        </span>
      </section>
    </div>
  );
}

export default Card;
