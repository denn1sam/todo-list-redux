const store = createStore(todoApp, initialState);

rebuildList();
rebuildTasksInfo();

store.subscribe(rebuildList);
store.subscribe(rebuildTasksInfo);

function createStore(initialReducer, initialState) {
  let reducer = initialReducer;
  let subscribers = [];
  let state = reducer(initialState, { type: 'INIT' });

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach((subscriber) => subscriber());
    },
    subscribe(listener) {
      subscribers.push(listener);

      return () => subscribers.filter((subscriber) => subscriber !== listener);
    }
  };
}