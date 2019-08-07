let nextTodoId = 0;
const addTodo = (task) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        task
    };
};
