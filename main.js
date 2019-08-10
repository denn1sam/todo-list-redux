const inputElement = document.getElementsByClassName('input-task')[0];
const addTaskButton = document.getElementsByClassName('add-task-btn')[0];
const listContainer = document.getElementsByClassName('list-container')[0];
const footerContainer = document.getElementsByClassName('footer')[0];

addTaskButton.addEventListener('click', addTask);

function rebuildList() {
  listContainer.innerHTML = '';

  store.getState().forEach(task => {
    this.renderTask(task);
  });
}

function rebuildTasksInfo() {
  const doneTasksArr = store.getState().filter(el => el.done === true);
  const html = `
    <p>all: ${store.getState().length}</p>
    <p>done: ${doneTasksArr.length}</p>
  `;
  footerContainer.innerHTML = html;
}

function addTask() {
  const text = inputElement.value;
  if (!text) return;

  store.dispatch(addTodo(text));

  inputElement.value = '';
}


function renderTask({ text, done, id }) {
  const html = `
    <p class="list-checkbox">+</p>
    <p class="list-element-text"></p>
    <p class="list-delete-btn">delete</p>
  `;

  const listDivElement = document.createElement('div');

  listDivElement.innerHTML = html;
  listDivElement.classList.add('list-element');
  listContainer.appendChild(listDivElement);

  const checkBox = listDivElement.getElementsByClassName('list-checkbox')[0];
  const taskTextElement = listDivElement.getElementsByClassName('list-element-text')[0];
  const deleteBtn = listDivElement.getElementsByClassName('list-delete-btn')[0];

  taskTextElement.innerText = text;

  if (done) {
    checkBox.style.backgroundColor = 'red';
  } else {
    checkBox.addEventListener('click', () => clickOnCheckBox(id, checkBox));
  }

  taskTextElement.addEventListener('dblclick', () => editTask(id, listDivElement));
  deleteBtn.addEventListener('click', () => clickToDeleteBtn(id, listDivElement));
}

function editTask(listId, listDivElement) {
  let textField = listDivElement.getElementsByClassName('list-element-text')[0];

  textField.innerHTML = `
    <input type="text" placeholder="edit text" class="input-task-edit" value="${textField.innerText}">
    <button class="save-btn">save</button>
  `;
  const saveBtn = textField.getElementsByClassName('save-btn')[0];
  saveBtn.addEventListener("click", () => saveEditedTask(listId, textField));
}

function saveEditedTask(listId, textField) {
  const editedTask = textField.getElementsByClassName('input-task-edit')[0];

  store.dispatch(editTodo(listId, editedTask.value));
}

function clickOnCheckBox(listId, checkBox) {
  store.dispatch(doneTodo(listId));
  checkBox.style.backgroundColor = 'red';

}

function clickToDeleteBtn(listId) {
  store.dispatch(delTodo(listId));
}
