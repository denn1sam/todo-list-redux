const { createStore } = Redux;
const store = createStore(todoApp);

const state = [
  {
    id: 0,
    task: 'Do laundry',
    completed: true
  },
  {
    id: 1,
    task: 'Paint fence',
    completed: false
  }
];
