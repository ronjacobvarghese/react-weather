import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export function useStore() {
  const setState = useState(globalState)[1];

  const dispatch = (actionId, payload = {}) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
}

export function initStore(userActions, initialState) {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
}
