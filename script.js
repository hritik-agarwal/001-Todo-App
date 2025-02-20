// Elements
const todosList = document.querySelector("#todos-list");
const createTodoInput = document.querySelector("#create-todo-input");
const createTodoButton = document.querySelector("#create-todo-btn");
const searchTodosInput = document.querySelector("#search-todos-input")
const hideDoneTodosButton = document.querySelector("#hide-done-todos-btn")

// Global Variables
let allTodos = getDataFromLocalStorage()

// Event Listenors
createTodoButton.addEventListener("click", handleCreateTodo);
createTodoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleCreateTodo();
});
searchTodosInput.addEventListener("input", handleTodosSearch)
hideDoneTodosButton.addEventListener("click", toggleHideDoneTodos)

// Utility Functions

function addTodoinTodoList(todoId, todoValue, todoChecked){
    const todoHTML = getHTMLNode(todoId, todoValue, todoChecked);
    todosList.appendChild(todoHTML)
    getTodo(todoId, ".todo-checkbox").addEventListener(
        "change",
        handleTodoCheckbox
    );
    getTodo(todoId, ".todo-delete").addEventListener("click", handleTodoDelete);
    getTodo(todoId, ".todo-edit").addEventListener("click", handleTodoEdit);
}

function getDataFromLocalStorage() {
    const todoList = localStorage.getItem('todoList')
    const data = todoList ? JSON.parse(todoList) : []
    for(let todo of data){
        addTodoinTodoList(...Object.values(todo))
    }
    return data
}

function updateDatainLocalStorage(){
    const data = JSON.stringify(allTodos)
    localStorage.setItem('todoList', data)
}

function getHTMLNode(todoId, todoValue, todoChecked) {
  const template = document.createElement("div");
  template.innerHTML = `<div class="todo-item" id="${todoId}">
            <button class="todo-drag-btn">::</button>
            <input type="checkbox" class="todo-checkbox" ${todoChecked && "checked"}>
            <input type="text" class="todo-value ${todoChecked && "checked"}" value="${todoValue}" readonly>
            <button class="todo-edit">✍🏻</button>
            <button class="todo-delete">❌</button>
        </div>`;
  return template.firstElementChild;
}

function getTodo(todoId, classVal) {
  return document.querySelector(`#${todoId} ${classVal}`);
}

// Todo CRUD Functions

function handleTodoCheckbox(e) {
  const todoId = e.target.parentNode.id;
  console.log({ todoId });
  allTodos = allTodos.map((todo) => {
    if (todo.todoId === todoId) {
      return { ...todo, todoChecked: e.target.checked };
    } else {
      return todo;
    }
  });
  getTodo(todoId, ".todo-value").classList.toggle("checked");
  updateDatainLocalStorage();
  refreshHideDoneTodos()
}

function handleTodoDelete(e) {
  const todoId = e.target.parentNode.id;
  allTodos = allTodos.filter((todo) => todo.todoId != todoId);
  getTodo(todoId, "").remove();
  updateDatainLocalStorage();
}

function handleTodoEdit(e) {
  const todoId = e.target.parentNode.id;
  const todoValue = getTodo(todoId, ".todo-value");
  const todoEdit = getTodo(todoId, ".todo-edit");
  if (todoEdit.innerHTML === "✍🏻") {
    todoValue.removeAttribute("readonly");
    todoValue.focus();
    todoEdit.innerHTML = "💾";
  } else {
    const newTodoValue = todoValue.value;
    allTodos = allTodos.map((todo) => {
      if (todo.todoId === todoId) {
        return { ...todo, todoValue: newTodoValue };
      } else {
        return todo;
      }
    });
    todoValue.setAttribute("readonly", "true");
    todoEdit.innerHTML = "✍🏻";
    updateDatainLocalStorage();
  }
}

function handleCreateTodo(e) {
  const todoValue = createTodoInput.value;
  const todoId = "todo-" + crypto.randomUUID();
  addTodoinTodoList(todoId, todoValue, false)
  createTodoInput.value = "";
  allTodos.push({ todoId, todoValue, todoChecked: false });
  updateDatainLocalStorage();
}

function handleTodosSearch(){
    const searchValue = searchTodosInput.value;
    allTodos.map(todo => {
        const {todoId, todoValue} = todo
        let matchesSearch = String(todoValue).includes(searchValue)
        if(matchesSearch){
            getTodo(todoId, "").classList.remove('hide')
        } else {
            getTodo(todoId, "").classList.add('hide')
        }
    })
}

function refreshHideDoneTodos(){
    const hideDone = hideDoneTodosButton.classList.contains("activate")
    allTodos.map(todo => {
        const {todoId, todoChecked} = todo
        if(hideDone && todoChecked){
            getTodo(todoId, "").classList.add('hide')
        } else {
            getTodo(todoId, "").classList.remove('hide')
        }
    })
}

function toggleHideDoneTodos(){
    hideDoneTodosButton.classList.toggle("activate")
    refreshHideDoneTodos()
}