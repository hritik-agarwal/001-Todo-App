This is **phase-1/sub-phase-1A/project-001** from my ongoing self-challenge called [Purpose Driven Learning](https://github.com/hritik-agarwal/purpose-driven-learning/blob/main/README.md)

# 001-todo-app

Basic todo app with vanilla js to learn crud operations, filtering, local storage, drag-drop sorting.

**Todo App Objectives**

- [X] Add ability to create, view, update, delete and check todos (est. 1hr)
- [X] Use local storage to store all todos, on refresh should persist (est. 30mins)
- [X] Add a search bar to filter through the todos (est. 30mins)
- [X] Add a toggle to hide completed tasks (est. 30mins)
- [X] Add a drag-drop logic to allow changing todos position (est. 1hr)

**Tools and Resources Used**

- HTML5, CSS, JS

**Daily Progress**

* [X] **Day 1 : 17th Feb** : Done with project setup
* [X] **Day 2 : 18th Feb** : Created a wireframe and initial UI for the todo app
* [X] **Day 3 : 19th Feb** : Added CRUD functionality in JS
* [X] **Day 4 : 20th Feb** : Added localStorage, search feature and hide done todos functionality
* [X] **Day 5 : 21st Feb** : Added todo reorder feature using draggable api

**Things I Learned**

- *Lessons in HTML*
  - Use correct classes and ids from the start
  - 'checked' attribute in checkbox doesn't work with true/false (attr itself needs to be added/removed)
- *DOM Manipulation*
  - Fetching nodes : using querySelector everywhere is faster juggling between other methods
  - HTML String to Node : Assign it to a temporary div innerHTML and return it's firstElementChild
  - Delete Node : node.remove()
  - Toggle Class : node.classList.toggle('class-name')
  - Update Attribute : node.setAttribute('attr-name', 'attr-value')
  - Add Child : node.appendChild(node)
  - Nearest Element : use node.closest('#id') to find nearest matching node in node to root path
  - Rearragne childs : use insertBefore to move them around
- *Random UUID* : use browser crypto.randomUUID() to generate random uuids
- *Event Listeners*
  - mouse : click, mouseenter, mouseleave
  - input : change
  - drag : dragstart, dragover, dragenter, drop
- *Function Call*
  - to spread and pass object values : function-name(...Object.values(obj))
- *Local Storage*
  - localStorage.setItem('key-name', JSON.stringify(data))
  - JSON.parse(localStorage.getItem('key-name'))
- *Draggable*
  - add 'draggable' attribute to make any element draggable
  - use of e.preventDefault() is essential to declare drop zones
 
**Deployment**

I am deploying the project on github pages as it's a pretty simple app. 

https://hritik-agarwal.github.io/001-todo-app/
