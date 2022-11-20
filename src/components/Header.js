import { Fragment, useRef, useContext } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { useStore } from "../store/store";
import LocationContext from "../store/location-context";

import styles from "./Header.module.css";

function Header() {
  const [state, dispatch] = useStore();
  const locationRef = useRef("");
  const locationCtx = useContext(LocationContext);

  const bookmarkClasses = `${styles["bookmark-button"]} ${
    state.adminData.bookmarked.locations.has(state.locationData.name)
      ? styles["bookmark-active"]
      : ""
  }`;

  function onClickBookmark() {
    if (state.adminData.bookmarked.locations.has(state.locationData.name)) {
      dispatch("REMOVE_BOOKMARKED", state.locationData.name);
    } else {
      dispatch("ADD_BOOKMARKED", {
        name: state.locationData.name,
        country: state.locationData.country,
        weather: state.locationData.weather,
        temp: state.locationData.temp,
        feels_like: state.locationData.feels_like,
        wind: state.locationData.wind,
      });
    }
  }

  async function searchLocation(event) {
    event.preventDefault();
    let location = locationRef.current.value;
    if (location.trim() === "") {
      return;
    }

    if (state.locationData.name.toUpperCase() === location.toUpperCase()) {
      return;
    }
    locationCtx.fetchLocation(location, state.locationData);
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
        <li className={styles["actions-container"]}>
          {state.locationData.name && (
            <div onClick={onClickBookmark} className={bookmarkClasses}>
              <BsFillBookmarkStarFill size="2rem" color="grey" />
            </div>
          )}
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
