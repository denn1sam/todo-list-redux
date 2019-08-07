const inputElement = document.getElementsByClassName('input-task')[0];
const addTaskButton = document.getElementsByClassName('add-task-btn')[0];
const listContainer = document.getElementsByClassName('list-container')[0];
const footerContainer = document.getElementsByClassName('footer')[0];

addTaskButton.addEventListener('click', addTask);

let mockArr = [];

window.onload = () => {
  mockArr = JSON.parse(localStorage.getItem('tasksList')) || [];
  if (mockArr.length) {
    mockArr.forEach(el => renderTask(el.listId));
  }
}

function pushToLocalStorage() {
  localStorage.setItem('tasksList', JSON.stringify(mockArr));
}

function addTask() {
  const text = inputElement.value;
  if (!text) return;

  store.dispatch(addTodo(text));
  // mockArr.push({ listId, text });

  pushToLocalStorage();
  // renderTask(listId);
  inputElement.value = '';
}

function renderTask(listId) {
  const { text, done } = mockArr.find(el => el.listId === listId);
  const html = `
    <p class="list-checkbox">+</p>
    <p class="list-element-text"></p>
    <p class="list-delete-btn">delete</p>
  `;

  const listDivElement = document.createElement('div');

  listDivElement.innerHTML = html;
  listDivElement.classList.add('list-element');
  listContainer.appendChild(listDivElement);

  renderTasksInfo();

  const checkBox = listDivElement.getElementsByClassName('list-checkbox')[0];
  const taskTextElement = listDivElement.getElementsByClassName('list-element-text')[0];
  const deleteBtn = listDivElement.getElementsByClassName('list-delete-btn')[0];

  taskTextElement.innerText = text;

  if (done) {
    checkBox.style.backgroundColor = 'red';
  }

  checkBox.addEventListener('click', () => clickOnCheckBox(listId, checkBox));
  taskTextElement.addEventListener('dblclick', () => editTask(listId, listDivElement));
  deleteBtn.addEventListener('click', () => clickToDeleteBtn(listId, listDivElement));
}

function clickOnCheckBox(listId, checkBox) {
  const listElement = mockArr.find(el => el.listId === listId);

  if (listElement.done) return;

  listElement.done = true;
  checkBox.style.backgroundColor = 'red';

  pushToLocalStorage();
  renderTasksInfo();
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
  const task = mockArr.find(el => el.listId === listId);
  task.text = editedTask.value;
  textField.innerHTML = task.text;

  pushToLocalStorage();
}

function clickToDeleteBtn(listId, listDivElement) {
  const arrIndex = mockArr.findIndex(el => el.listId === listId);
  mockArr.splice(arrIndex, 1);
  listDivElement.remove();

  renderTasksInfo();
  pushToLocalStorage();
}

function renderTasksInfo() {
  const doneTasksArr = mockArr.filter(el => el.done === true);
  const html = `
    <p>all: ${mockArr.length}</p>
    <p>done: ${doneTasksArr.length}</p>
  `;
  footerContainer.innerHTML = html;
}
