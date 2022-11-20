import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    LOG_IN: (curState, adminData) => {
      const newState = {
        userName: "Adithya Nair",
        email: adminData.email,
        city: "Kollam",
        recently_used: curState.adminData.recently_used,
        bookmarked: {
          locations: new Set(),
          locationData: {},
        },
        dayTime:adminData.dayTime,
        nightTime:adminData.nightTime,
      };

      return { adminData: newState };
    },
    UPDATE_RECENTS: (curState, locData) => {
      const { adminData } = curState;
      let locList = adminData.recently_used;

      locList = locList.filter(
        (item) => item.name.toLowerCase() !== locData.search.toLowerCase()
      );

      locList.unshift(locData);

      if (locList.length === 4) {
        locList.pop();
      }
      const newState = {
        ...adminData,
        recently_used: locList,
      };
      return {
        adminData: newState,
      };
    },
    ADD_BOOKMARKED: ({ adminData }, locData) => {
      const {
        bookmarked: { locations, locationData },
      } = adminData;
      const newLocations = new Set([...locations, locData.name]);
      const newLocationData = {
        ...locationData,
        [locData.name]: {
          ...locData,
        },
      };
      const newState = {
        ...adminData,
        bookmarked: {
          locations: newLocations,
          locationData: newLocationData,
        },
      };
      return { adminData: newState };
    },
    REMOVE_BOOKMARKED: ({ adminData }, location) => {
      const {
        bookmarked: { locations, locationData },
      } = adminData;

      const newLocation = new Set(locations);

      newLocation.delete(location);

      const newLocationData = { ...locationData };

      delete newLocationData[location];

      const newState = {
        ...adminData,
        bookmarked: {
          locations: newLocation,
          locationData: newLocationData,
        },
      };
      return {
        adminData: newState,
      };
    },
  };
  initStore(actions, {
    adminData: {
      id: undefined,
      userName: undefined,
      city: undefined,
      notification: "Please Login to see 5 day forcast of your city",
      recently_used: [],
      bookmarked: {
        locations: new Set(),
        locationData: {},
      },
      dayTime: [],
      nightTime:[],
    },
  });
};

export default configureStore;
