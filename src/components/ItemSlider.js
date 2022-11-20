import { useContext } from 'react';

import styles from './ItemSlider.module.css';
import Card from './footer-content/Card';
import { useStore } from '../store/store';
import LocationContext from '../store/location-context';

export const WEATHER_LIST = {
  "Smoke":"/images/haze.png",
  "Haze":"/images/haze.png",
  "Extreme":"/images/sun.png",
  "Clouds":"/images/cloudy.png",
  "Mist":"/images/mist.png",
  "Snow":"/images/snow.png",
  "Rain":"/images/heavy-rain.png",
  "Clear":"/images/sun.png",
}

function ItemSlider({items}){
  const locationCtx = useContext(LocationContext);
  const state = useStore()[0];
  const {recently_used} = state.adminData;
  const color = [
    "rgb(125,39,255)",
    "rgb(254,105,28)",
    "rgb(255,197,0)"
  ]


  return (
      <div className ={ styles['slider-container']}>
        {recently_used && recently_used.map((item,index) => 
        <Card 
          key = {index}
          onClick = {locationCtx.fetchLocation.bind(null,item.name,state.locationData)}
          image = {WEATHER_LIST[item.weather]}
          style = {{borderColor:color[index]}}
          title ={item.name}
          weather = {item.weather}
          temp = {item.temp}
          feels_like = {item.feels_like}
          wind = {item.wind}
          />)}
      </div>
  )
}

export default ItemSlider;