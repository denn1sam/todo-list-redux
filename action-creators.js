const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: +new Date().getTime(),
    text,
  };
};

const delTodo = (id) => {
  return {
    type: 'DEL_TODO',
    id,
  };
};

const doneTodo = (id) => {
  return {
    type: 'DONE_TODO',
    id,
  };
};

const editTodo = (id, text) => {
  return {
    type: 'EDIT_TODO',
    id,
    text,
  };
};
