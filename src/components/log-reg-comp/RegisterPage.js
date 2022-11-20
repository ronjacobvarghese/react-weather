import { Drawer, useMantineTheme } from '@mantine/core';


import styles from "./RegisterPage.module.css";
import useInput from '../../hooks/use-input';

function RegisterPage(props) {
  const theme = useMantineTheme();


  const isNotEmpty = (value) => {
    return value.trim() !== "";
  };

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => {
    return value.includes("@");
  });

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && cityIsValid && passwordIsValid && emailIsValid) formIsValid = true;

  async function submitHandler(event){
    event.preventDefault();

    if(!formIsValid) return;
    const data = {
      userName: name,
      city:city,
      email:email,
      password: password,
      recently_used:[],
      bookmarked:[],      
    };

    console.log(data);

    try{
      // await axios.post('https://react-weather-7c7ac-default-rtdb.firebaseio.com/accounts.json', data).then(
      //   (res) =>{
      //     console.log("Data");
      //     console.log(res.data);
      //   }
      // );
    }catch(e){
      console.log(e);
      return;
    }
    resetCity();
    resetName();
    resetEmail();
    resetPassword();
    props.onClose();
    props.sendNotify("Registration process Success");
  }


  const nameInputClasses = nameHasError
    ? `${styles["form-control"]} ${styles["invalid"]}`
    : `${styles["form-control"]}`;
  const emailInputClasses = emailHasError
    ? `${styles["form-control"]} ${styles["invalid"]}`
    : `${styles["form-control"]}`;
    const cityInputClasses = cityHasError
    ? `${styles["form-control"]} ${styles["invalid"]}`
    : `${styles["form-control"]}`;
  const passwordInputClasses = passwordHasError
    ? `${styles["form-control"]} ${styles["invalid"]}`
    : `${styles["form-control"]}`;

  return (
    <Drawer
      opened={props.isOpen}
      onClose={props.onClose}
      size={500}
      position="left"
      padding="lg"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
    
    <header className={styles.header}>
        <h2>Register Page</h2>
      </header>
      <form onSubmit={submitHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="name"
            id="name"
            placeholder = "Enter Name"
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
            value={name}
          />
          {nameHasError ? (
            <p className={styles["error-text"]}>Put Something here for name</p>
          ) : (
            <p />
          )}
        </div>
        <div className={cityInputClasses}>
          <label htmlFor="city">Your City</label>
          <input
            type="text"
            id="city"
            placeholder = "Enter City"
            onBlur={cityBlurHandler}
            onChange={cityChangeHandler}
            value={city}
          />
          {cityHasError ? (
            <p className={styles["error-text"]}> City must not be left blank </p>
          ) : (
            <p />
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Your E-mail</label>
          <input
            type="email"
            id="email"
            placeholder = "Enter Email"
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
            placeholder = "Enter Password"
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
          <button onClick = {submitHandler} disabled={!formIsValid} className={styles.submit}>
            Register
          </button>
        </div>
      </form>

    </Drawer>
  );
}

export default RegisterPage;
