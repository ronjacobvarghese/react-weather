import { Fragment } from 'react';

import styles from './DailyDetails.module.css';
import LabelCard from './common-comp/LabelCard';
import { useStore } from '../../store/store';

function HourlyDetails(){
  const state = useStore()[0];
  const {dailyDayTimes: dayTimes, dailyNightTimes:nightTimes} = state.locationData;

  const listItems = () => {
    if (dayTimes){
      return(
        <Fragment>
          <LabelCard className = {styles['active']} title = {dayTimes[0].title} climate = {dayTimes[0].weather} temp = {`${dayTimes[0].temp} / ${nightTimes[0].temp}`}/>
          <LabelCard title = {dayTimes[1].title} climate = {dayTimes[1].weather} temp = {`${dayTimes[1].temp} / ${nightTimes[1].temp}`}/>
          <LabelCard title = {dayTimes[2].title} climate = {dayTimes[2].weather} temp = {`${dayTimes[2].temp} / ${nightTimes[2].temp}`}/>
        </Fragment>
      )
    }
  }
  return(
    <Fragment>
      <ul className = {styles['hourly-container']}>
        {listItems()}
      </ul>
    </Fragment>
  )
}

export default HourlyDetails;