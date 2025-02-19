// Global Variables
let allTodos = [];

// Elements
const createTodoInput = document.getElementById("create-todo-input");
const createTodoButton = document.getElementById("create-todo-btn");
const todosList = document.getElementById("todos-list");

// Event Listenors
createTodoButton.addEventListener("click", handleCreateTodo);
createTodoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleCreateTodo();
});

// Utility Functions

function getHTMLNode(todoId, todoValue) {
  const template = document.createElement("div");
  template.innerHTML = `<div class="todo-item" id="${todoId}">
            <button class="todo-drag-btn">::</button>
            <input type="checkbox" class="todo-checkbox">
            <input type="text" class="todo-value" value="${todoValue}" readonly>
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
      return { ...todo, checked: e.target.checked };
    } else {
      return todo;
    }
  });
  getTodo(todoId, ".todo-value").classList.toggle("checked");
}

function handleTodoDelete(e) {
  const todoId = e.target.parentNode.id;
  allTodos = allTodos.filter((todo) => todo.todoId != todoId);
  getTodo(todoId, "").remove();
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
  }
}

function handleCreateTodo(e) {
  const todoValue = createTodoInput.value;
  const todoId = "todo-" + crypto.randomUUID();
  //   const currentTodos = todosList.innerHTML;

  const todoHTML = getHTMLNode(todoId, todoValue);

  allTodos.push({ todoId, todoValue, checked: false });
  todosList.appendChild(todoHTML)
  createTodoInput.value = "";

  getTodo(todoId, ".todo-checkbox").addEventListener(
    "change",
    handleTodoCheckbox
  );
  getTodo(todoId, ".todo-delete").addEventListener("click", handleTodoDelete);
  getTodo(todoId, ".todo-edit").addEventListener("click", handleTodoEdit);
}
