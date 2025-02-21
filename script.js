// ELEMENTS
const todosList = document.querySelector("#todos-list");
const createTodoInput = document.querySelector("#create-todo-input");
const createTodoButton = document.querySelector("#create-todo-btn");
const searchTodosInput = document.querySelector("#search-todos-input")
const hideDoneTodosButton = document.querySelector("#hide-done-todos-btn")

// VARIABLES
let allTodos = getDataFromLocalStorage()

// EVENT_LISTENERS
createTodoButton.addEventListener("click", handleCreateTodo);
createTodoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleCreateTodo();
});
searchTodosInput.addEventListener("input", handleTodosSearch)
hideDoneTodosButton.addEventListener("click", toggleHideDoneTodos)

// HANDLE_LOCAL_STORAGE

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

// GET_TODO_ITEM_ELEMENTS

function getTodo(todoId, classVal = "") {
  return document.querySelector(`#${todoId} ${classVal}`);
}

// CREATE_TODO_ITEM

function getTodoNode(todoId, todoValue, todoChecked) {
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

function addTodoinTodoList(todoId, todoValue, todoChecked){
  const todoHTML = getTodoNode(todoId, todoValue, todoChecked);
  todosList.appendChild(todoHTML)
  getTodo(todoId).addEventListener("click", (e) => {
    if(e.target.classList.contains("todo-delete")) handleTodoDelete(e)
    if(e.target.classList.contains("todo-edit")) handleTodoEdit(e)
  })
  getTodo(todoId, ".todo-drag-btn").addEventListener("mouseenter", handleDragButton)
  getTodo(todoId, ".todo-drag-btn").addEventListener("mouseleave", handleDragButton)
  getTodo(todoId, ".todo-checkbox").addEventListener("change",handleTodoCheckbox);
  addDragListeners(todoId)
}

function handleCreateTodo(e) {
  const todoValue = createTodoInput.value;
  const todoId = "todo-" + crypto.randomUUID();
  addTodoinTodoList(todoId, todoValue, false)
  createTodoInput.value = "";
  allTodos.push({ todoId, todoValue, todoChecked: false });
  updateDatainLocalStorage();
}

// HANDLE_TODO_CHECK

function handleTodoCheckbox(e) {
  const todoId = e.target.parentNode.id;
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

// DELETE_TODO_ITEM

function handleTodoDelete(e) {
  const todoId = e.target.parentNode.id;
  allTodos = allTodos.filter((todo) => todo.todoId != todoId);
  getTodo(todoId, "").remove();
  updateDatainLocalStorage();
}

// EDIT_TODO_ITEM

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

// SEARCH_TODOS

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

// HIDE_DONE_TODOS

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

// OP_HANDLE_TODO_REORDER

function handleDragButton(e) {
  const todoId = e.target.parentNode.id;
  const todoItem = getTodo(todoId)
  if(todoItem.hasAttribute("draggable")){
    todoItem.removeAttribute("draggable")
  } else{
    todoItem.setAttribute("draggable", "true")
  }
}

function addDragListeners(todoId){
  const todoItem = getTodo(todoId)
  todoItem.addEventListener("dragstart", handleDragStart)
  todoItem.addEventListener("dragenter", handleDragEnter)
  todoItem.addEventListener("dragover", handleDragOver)
  todoItem.addEventListener("drop", handleDrop)
}

// fired when user starts dragging an element
function handleDragStart(e){
  e.dataTransfer.setData("text/plain", e.target.id)
}

// fired when dragged element enters a valid drop target
function handleDragEnter(e){
  e.preventDefault()
}

// fired when dragged element is over a valid drop target
function handleDragOver(e){
  e.preventDefault()
  e.dataTransfer.dropEffect = "move"
}

// fired when dragged element is dropped over valid drop target
function handleDrop(e){
  e.preventDefault();
  e.stopPropagation();

  const dropTarget = e.target.closest('.todo-item');
  if(!dropTarget) return false;

  const draggedId = e.dataTransfer.getData("text/plain");
  const droppedId = dropTarget.id;

  if(!draggedId || !droppedId || draggedId == droppedId) return false;

  const draggedIndex = allTodos.findIndex(todo => todo.todoId === draggedId);
  const droppedIndex = allTodos.findIndex(todo => todo.todoId === droppedId);

  if (draggedIndex === -1 || droppedIndex === -1) return false;
  
  const [draggedItem] = allTodos.splice(draggedIndex, 1)
  allTodos.splice(droppedIndex, 0, draggedItem)
  updateDatainLocalStorage()

  const todoItems = Array.from(todosList.querySelectorAll('.todo-item'));
  const draggedItemNode = todoItems.find(item => item.id === draggedId);

  if (draggedIndex < droppedIndex) {
    dropTarget.parentNode.insertBefore(draggedItemNode, dropTarget.nextSibling);
  } else {
    dropTarget.parentNode.insertBefore(draggedItemNode, dropTarget);
  }
}