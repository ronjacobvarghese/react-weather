import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    LOG_IN: (curState, adminData) => {
      const newState = {
        id: adminData.id,
        userName: adminData.name,
        city: adminData.city,
        recently_used: adminData.recently_used,
        bookmarked: adminData.bookmarked,
      };

      return { adminData: newState };
    },
    UPDATE_RECENTS: (curState, locData) => {
      const locList = curState.recently_used;
      if (locList.length === 3) {
        locList.pop();
      }
      locList.unshift(locData);
      const newState = {
        ...curState,
        recently_used: locList,
      };

      return {
        adminData: newState,
      };
    },
    ADD_BOOKMARKED: (curState, locData) => {
      const bookList = curState.bookmarked;
      bookList.unshift(locData);
      const newState = {
        ...curState,
        bookmarked: bookList,
      };
      return { adminData: newState };
    },
    REMOVE_BOOKMARKED: (curState, location) => {
      const bookList = curState.bookmarked.filter(
        (item) => item.name !== location
      );
      const newState = {
        ...curState,
        bookmarked: bookList,
      };

      return { adminData: newState };
    },
  };
  initStore(actions, {
    adminData: {
      id: "",
      userName: "",
      city: "",
      recently_used: [],
      forcasts: [],
      bookmarked: [],
    },
  });
};

export default configureStore;
