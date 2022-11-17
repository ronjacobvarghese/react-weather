import { Fragment, useState } from "react";

import styles from "./ProfileBar.module.css";
import { useStore } from "../store/store";
import LoginPage from './log-reg-comp/LoginPage';

function ProfileBar() {
  const state = useStore()[0];
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <Fragment>
        <div className={styles["profile-container"]}>
      {state.adminData.id !== "" ? (
        <div>
          <section className={styles["profile-header"]}>
            <span>
              <span className={styles["icon-wrapper"]}>
                <img src="/images/boy.png" />
              </span>
              <span>Ron Jacob</span>
            </span>
          </section>

          <section className={styles["profile-content"]}>
            <header>5-day forecast</header>
            <ul>
              <li>
                <header>Yesterday</header>
                <p>31 C</p>
              </li>
              <li>
                <header>Today</header>
                <p>33 C</p>
              </li>
              <li>
                <header>Tomorrow</header>
                <p>29 C</p>
              </li>
              <li>
                <header>Sunday</header>
                <p>25 C</p>
              </li>
              <li>
                <header>Monday</header>
                <p>23 C</p>
              </li>
            </ul>
          </section>

          <button>Download Data</button>
        </div>
          ) : (
            <Fragment>
              <button onClick={() => setOpenLogin(true)}>Log In</button>
              <button onClick= {() => setOpenRegister(true)}className = {styles['reg-button']}> Register</button>
            </Fragment>
            )}
      </div>
      <LoginPage onClose = {() => setOpenLogin(false)} isOpen = {openLogin}/>
    </Fragment>
  );
}

export default ProfileBar;
