
import styles from "./TempStatus.module.css";
import { useStore } from '../../store/store';

function TempStatus() {
  const state = useStore()[0];

  return (
    <div className = {styles['status-content']}>
      <div className={styles["status-container"]}>
        <div
          className={styles["status-dial"]}
          data-percent={state.locationData.temp}
          style={{
            backgroundImage: `conic-gradient(rgba(255, 0, 0, 0.01) ${
              state.locationData.temp * 3.6
            }deg, white 0deg)`,
          }}
        >
          <header>{state.locationData.weather.toUpperCase()}</header>
          <section>{state.locationData.temp !== "--" ? Math.floor(state.locationData.temp): " "}</section>
          <p> C </p>
        </div>
      </div>
        <section className = {styles['status-footer']}>
          Data is provided by <span>OpenWeather App</span>
        </section>
    </div>
  );
}

export default TempStatus;
