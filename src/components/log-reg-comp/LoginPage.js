import { Drawer, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { DateTime } from "luxon";

import styles from "./LoginPage.module.css";
import useInput from "../../hooks/use-input";
import { useStore } from "../../store/store";

function LoginPage(props) {
  const theme = useMantineTheme();
  const dispatch = useStore()[1];

  function emailValidate(email) {
    if (email !== "email@gmail.com") {
      return false;
    }
    return true;
  }

  function passwordValidate(password) {
    if (password !== "password") {
      return false;
    }
    return true;
  }
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailValidate);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(passwordValidate);

  let formIsValid = false;

  if (passwordIsValid && emailIsValid) formIsValid = true;

  function formatToLocalTime(secs, zone, format) {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (!formIsValid) return;
    let forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Kollam&appid=${process.env.REACT_APP_WEATHER_APP_API_KEY}&units=metric`;

    axios
      .get(forcastUrl)
      .then((res) => {
        let timezone = res.data.city.timezone;
        return res.data.list.map((d) => {
          return {
            title: formatToLocalTime(d.dt, timezone, "cccc"),
            time: formatToLocalTime(d.dt, timezone, "t"),
            weather: d.weather[0].main,
            temp: d.main.temp,
          };
        });
      })
      .then((daily) => {
        const data = {
          email: email,
          dayTime: daily.filter((item) => item.time === "09:00"),
          nightTime: daily.filter((item) => item.time === "21:00"),
        };
        dispatch("LOG_IN", data);
        resetEmail();
        resetPassword();
      });

    props.onClose();
    props.sendNotify("Log In process Success");
  }

  const emailInputClasses = emailHasError
    ? `${styles["form-control"]} ${styles["invalid"]}`
    : `${styles["form-control"]}`;
  const passwordInputClasses = passwordHasError
    ? `${styles["form-control"]} ${styles["invalid"]}`
    : `${styles["form-control"]}`;

  return (
    <Drawer
      opened={props.isOpen}
      onClose={props.onClose}
      size="xl"
      position="left"
      padding="xl"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <header className={styles.header}>
        <h2>Login Page</h2>
      </header>
      <form onSubmit={submitHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Your E-mail</label>
          <input
            id="email"
            placeholder="Enter Email"
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            value={email}
          />
          {emailHasError ? (
            <p className={styles["error-text"]}>Email must include @</p>
          ) : (
            <p />
          )}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            value={password}
          />
          {passwordHasError ? (
            <p className={styles["error-text"]}>
              Put Something here for password
            </p>
          ) : (
            <p />
          )}
        </div>
        <div className={styles["form-control"]}>
          <section>
            <p>Have an account?</p>
            <p className={styles["signin"]} onClick={() => {}}>
              Log In
            </p>
          </section>
        </div>
        <div className={styles["form-actions"]}>
          <button onClick={props.onClose} className={styles.submit}>
            Cancel
          </button>
          <button
            onClick={submitHandler}
            disabled={!formIsValid}
            className={styles.submit}
          >
            Login
          </button>
        </div>
      </form>
    </Drawer>
  );
}

export default LoginPage;
