import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    RETRIEVE_LOC_DATA: (curState, locData) => {
      const newState = {
        id: locData.id,
        name: locData.name,
        country: locData.sys.country,
        weather: locData.weather[0].main,
        description: locData.weather[0].description,
        coord: locData.coord,
        feels_like: locData.main["feels_like"],
        humidity: locData.main.humidity,
        pressure: locData.main.pressure,
        temp: locData.main.temp,
        wind: locData.wind.speed,
      };
      return { locationData: newState };
    },
    RETRIEVE_DAILY_TIMES: (curState, dailyData) => {
      let dailyTimeState = {
        dailyDayTimes: dailyData.dayTime.map((data) => {
          return {
            title: data.title,
            weather: data.weather,
            temp: Math.floor(data.temp),
          };
        }),
        dailyNightTimes: dailyData.nightTime.map((data) => {
          return {
            title: data.title,
            weather: data.weather,
            temp: Math.floor(data.temp),
          };
        }),
      };

      let newState = { ...curState.locationData, ...dailyTimeState };
      return { locationData: newState };
    },
  };
  initStore(actions, {
    locationData: {
      id: "",
      name: "",
      country: "",
      weather: "",
      description: "",
      coord: {},
      feels_like: "--",
      humidity: "--",
      pressure: "--",
      temp: "--",
      wind: "--",
      dailyDayTimes: [{
        title:"today",
        weather:"--",
        temp:"--",
      },{
        title:"Tomorrow",
        weather:"--",
        temp:"--",
      },{
        title:"--",
        weather:"--",
        temp:"--",
      }],
      dailyNightTimes: [{
        title:"Today",
        weather:"--",
        temp:"--",
      },{
        title:"Tomorrow",
        weather:"--",
        temp:"--",
      },{
        title:"--",
        weather:"--",
        temp:"--",
      },],
    },
  });
};

export default configureStore;
