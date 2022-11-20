import { Fragment, useState, useContext } from "react";

import styles from "./ProfileBar.module.css";
import { useStore } from "../store/store";
import LoginPage from "./log-reg-comp/LoginPage";
import RegisterPage from "./log-reg-comp/RegisterPage";
import LocationContext from "../store/location-context";

function ProfileBar() {
  const state = useStore()[0];
  const { userName, dayTime, nightTime } = state.adminData;
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { notification, sendNotify } = useContext(LocationContext);


  // if (userName !== undefined) {


  return (
    <Fragment>
      <div className={styles["profile-container"]}>
        {userName !== undefined ? (
          <div>
            <section className={styles["profile-header"]}>
              <span>
                <span className={styles["icon-wrapper"]}>
                  <img src="/images/boy.png" alt="boy" />
                </span>
                <span>{state.adminData.userName}</span>
              </span>
            </section>

            <section className={styles["profile-content"]}>
              <header>5-day forecast</header>
              <ul>
                {dayTime.map((item, index) => {
                  return (
                    <li key={index}>
                      <header>{item.title}</header>
                      <p>{`${Math.floor(item.temp)} / ${Math.floor(
                        nightTime[index].temp
                      )}`}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        ) : (
          <Fragment>
            <button onClick={() => setOpenLogin(true)}>Log In</button>
            <button
              onClick={() => setOpenRegister(true)}
              className={styles["reg-button"]}
            >
              {" "}
              Register
            </button>
          </Fragment>
        )}
      </div>
      <LoginPage
        sendNotify={sendNotify}
        onClose={() => setOpenLogin(false)}
        isOpen={openLogin}
      />
      <RegisterPage
        sendNotify={sendNotify}
        onClose={() => setOpenRegister(false)}
        isOpen={openRegister}
      />
      {notification && (
        <div className={styles["notify-wrapper"]}>{notification}</div>
      )}
    </Fragment>
  );
}

export default ProfileBar;
