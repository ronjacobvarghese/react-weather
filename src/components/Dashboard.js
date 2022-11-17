import { Fragment } from 'react';

import styles from './Dashboard.module.css';
import TempStatus from './dashboard-content/TempStatus';
import TempDetail from './dashboard-content/TempDetail';
import HourlyDetails from './dashboard-content/DailyDetails';

function Dashboard() {
  return (
    <Fragment>
      <div className = {styles['dashboard-container']}>
        <TempStatus temp = "32"/>
        <TempDetail/>
        <HourlyDetails/>
      </div>

    </Fragment>
  )
}

export default Dashboard;
