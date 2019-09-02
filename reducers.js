const initialState = [
  {
    id: +new Date().getTime(),
    text: 'Do laundry',
    done: true,
  },
  {
    id: +new Date().getTime() + 1,
    text: 'Paint fence',
    done: false,
  },
]

const todos = (currentState, { id, text, type }) => {
  let currentItem;
  switch (type) {
  case 'ADD_TODO':
    return [
      ...currentState,
      {
        id,
        text,
        done: false
      }
    ];
  case 'DEL_TODO':
    return currentState.filter((item) => item.id !== id);
  case 'DONE_TODO':
    currentItem = currentState.find((item) => item.id === id);
    currentItem.done = true;

    return currentState;
  case 'EDIT_TODO':
    currentItem = currentState.find((item) => item.id === id);
    currentItem.text = text;

    return currentState;
  default:
    return currentState;
  }
};

const todoApp = (currentState, action) => {
  return todos(currentState, action);
}
