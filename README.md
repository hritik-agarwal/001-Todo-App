# 001-todo-app

Basic todo app with vanilla js to learn crud operations, filtering, local storage, drag-drop sorting

**Todo App Objectives**

- [X] Add ability to create, view, update, delete and check todos (est. 1hr)
- [X] Use local storage to store all todos, on refresh should persist (est. 30mins)
- [X] Add a search bar to filter through the todos (est. 30mins)
- [X] Add a toggle to hide completed tasks (est. 30mins)
- [ ] Add a drag-drop logic to allow changing todos position (est. 1hr)

**Tools and Resources**

- HTML, CSS, JS for app
- Library to allow drag-drop (bonus if built custom)

**Daily Progress**

* [X] **Day 1 : 17th Feb** : Done with project setup
* [X] **Day 2 : 18th Feb** : Created a wireframe and initial UI for the todo app
* [X] **Day 3 : 19th Feb** : Added CRUD functionality in JS
* [X] **Day 4 : 20th Feb** : Added localStorage, search feature and hide done todos functionality
* [ ] **Day 5 : 21st Feb** : Agenda :- build drag-drop-feature (check draggable, sortable.js, dragula and interact.js)

**Things I Learned**

- *Lessons in HTML*
  - Use correct classes and ids from the start
  - checked attribute doesn't work with true/false (you should add/remove attr itself)
- *HTML Node*
  - Fetching nodes : Prefer querySelector over other methods
  - HTML String to Node : Assign it to a temporary div innerHTML and return it's firstElementChild
  - Delete Node : node.remove()
  - Toggle Class : node.classList.toggle('class-name')
  - Update Attribute : node.setAttribute('attr-name', 'attr-value')
  - Add Child : node.appendChild(node)
- *Random UUID* : use browser crypto.randomUUID()
- *Event Listenors*
  - mouse : click, dblclick, mouseover, mouseout, mousedown, mouseup
  - keyboard : keydown, keyup, keypress
  - form/input : submit, change, focus, blur
  - window : load, DOMContentLoaded, resize, scroll
- *Function Call*
  - pass object values : function-name(...Object.values(obj))
- *Local Storage*
  - localStorage.setItem('key-name', JSON.stringify(data))
  - JSON.parse(localStorage.getItem('key-name'))
