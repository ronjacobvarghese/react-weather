import { useContext } from 'react';
import { ScrollArea } from "@mantine/core";

import styles from "./BookmarkPage.module.css";
import Card from "./footer-content/Card";
import { useStore } from "../store/store";
import { WEATHER_LIST } from "./ItemSlider";
import LocationContext from '../store/location-context';

function BookmarkPage(props) {
  const state = useStore()[0];
  const locationCtx = useContext(LocationContext);

  const onClickBookmark = (location) => {
    locationCtx.fetchLocation(location,state.locationData);
    props.onGeoClick();
  }

  const {
    adminData: {
      bookmarked: { locations, locationData },
    },
  } = state;
  
  return (
    <div className={styles["bookmark-container"]}>
      <header>Bookmark Page</header>
      <ScrollArea style = {{ height: "85%"}}>
        <section className={styles["bookmark-content"]}>
          {[...locations].map((item) => {
            return (
              <Card
                key={item}
                onClick = {onClickBookmark.bind(null,item)}
                title={locationData[item].name}
                image={WEATHER_LIST[locationData[item].weather]}
                weather={locationData[item].weather}
                temp={locationData[item].temp}
                feels_like={locationData[item].feels_like}
                wind={locationData[item].wind}
              />
            );
          })}
        </section>
      </ScrollArea>
    </div>
  );
}

export default BookmarkPage;
