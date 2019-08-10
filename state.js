const { createStore } = Redux;
const store = createStore(todoApp);

rebuildList();
rebuildTasksInfo();

store.subscribe(rebuildList);
store.subscribe(rebuildTasksInfo);