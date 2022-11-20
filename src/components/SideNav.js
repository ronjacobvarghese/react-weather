import { Fragment, useState } from "react";
import {
  BsFillBookmarkStarFill,
  BsFillGeoAltFill,
  BsPersonCircle,
} from "react-icons/bs";

import styles from "./SideNav.module.css";
import { useStore } from "../store/store";

function SideNav({ isActive, onGeoClick, onBookmarkClick }) {
  const state = useStore()[0];

  const userName = state.adminData.userName ? (
    state.adminData.userName.trim()[0].toUpperCase()
  ) : (
    <BsPersonCircle size="2.2rem" />
  );

  return (
    <Fragment>
      <ul className={styles["nav-container"]}>
        <li className={styles["profile-button"]}>{userName}</li>
        <li onClick={onGeoClick} className={!isActive ? styles["active"]:""}>
          <BsFillGeoAltFill size="2rem" />
        </li>
          <li
            onClick={onBookmarkClick}
            className={isActive ? styles["active"]:""}
          >
            <div />
            <BsFillBookmarkStarFill size="2rem" />
          </li>
      </ul>
    </Fragment>
  );
}

export default SideNav;
