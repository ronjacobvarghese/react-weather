import { Fragment } from "react";
import { BsFillBookmarkStarFill, BsFillGeoAltFill } from "react-icons/bs";

import styles from "./SideNav.module.css";

function SideNav() {
  return (
    <Fragment>
      <ul className={styles["nav-container"]}>
        <li className={styles["profile-button"]}>R</li>
        <li>
            <div/>
            <BsFillBookmarkStarFill size="2rem" />
        </li>
        <li>
          <div className={styles["active"]}/>
            <BsFillGeoAltFill  size="2rem" />
        </li>
      </ul>
    </Fragment>
  );
}

export default SideNav;
