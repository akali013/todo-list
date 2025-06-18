import { currentTodos, deleteToDo, getToDo, previousTodos, saveCurrentToDos, savePreviousToDos } from "./todo.js";

const {animate} = anime;

loadHeader();
// If the mode URL parameter is "current", load current todos
const url = new URL(window.location.href);
url.searchParams.get("mode") === "current" ? loadCurrentToDos() : loadPreviousToDos();
animateTitle();
animateToDos();
animateButtons();

// For each Todo object in currentTodos, list their information
// with edit and delete buttons
function loadCurrentToDos() {
  let html = "";

  document.querySelector(".js-title").innerHTML = "Current To Dos";

  currentTodos.forEach((todo) => {
    html += `
      <div class="todo-container">
        <div class="todo">
          ${todo.title}
          <div class="todo-date-time">
            ${todo.date} ${todo.time}
          </div>
          <div class="todo-note">
            ${todo.note}
          </div>
        </div>

        <div class="todo-buttons">
          <button class="edit-button js-edit-button" data-todo-id="${todo.id}">
            <img src="icons/edit.svg">
          </button>
          <button class="check-button js-check-button" data-todo-id="${todo.id}">
            <img src="icons/check.svg">
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-todo-list").innerHTML = html;

  // Setup the check button for each todo
  // This will put a current to do into previousTodos (it's marked as completed)
  document.querySelectorAll(".js-check-button").forEach((button) => {
    button.addEventListener("click", () => {
      const todoId = button.dataset.todoId;
      const todo = getToDo(todoId, currentTodos);
      previousTodos.push(todo);
      savePreviousToDos();
      deleteToDo(currentTodos, todoId, saveCurrentToDos);
      loadCurrentToDos();
    });
  });

  // Setup the edit button for each todo
  document.querySelectorAll(".js-edit-button").forEach((button) => {
    button.addEventListener("click", () => {
      const todoId = button.dataset.todoId;
      window.location.href = `modify-todo.html?mode=edit&id=${todoId}`;
    });
  });
}

// List each Todo object in previousTodos with delete buttons
function loadPreviousToDos() {
  let html = "";

  document.querySelector(".js-title").innerHTML = "Previous To Dos";

  previousTodos.forEach((todo) => {
    html += `
      <div class="todo-container">
        <div class="todo">
          ${todo.title}
          <div class="todo-date-time">
            ${todo.date} ${todo.time}
          </div>
          <div class="todo-note">
            ${todo.note}
          </div>
        </div>

        <div class="todo-buttons">
          <button class="delete-button js-delete-button" data-todo-id="${todo.id}">
            <img src="icons/delete.svg">
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-todo-list").innerHTML = html;

  // Setup the delete button for each previous todo
  document.querySelectorAll(".js-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const todoId = button.dataset.todoId;
      deleteToDo(previousTodos, todoId, savePreviousToDos);
      loadPreviousToDos();
    });
  });
}

// Load button functionality in the header
function loadHeader() {
  document.querySelector(".js-current-todo").addEventListener("click", () => {
    window.location.href = "todos-page.html?mode=current";
  });

  document.querySelector(".js-previous-todo").addEventListener("click", () => {
    window.location.href = "todos-page.html?mode=previous";
  });

  document.querySelector(".js-add-todo").addEventListener("click", () => {
    window.location.href = "modify-todo.html?mode=add";
  });
}

// Animates each todo box
function animateToDos() {
  document.querySelectorAll(".todo-container").forEach((todo) => {
    animate(todo, {
      x: {
        from: "-200%",
        duration: 700,
        ease: "out(10)"
      }
    });
  });
}

function animateTitle() {
  animate(".js-title", {
    opacity: {
      from: 0,
      ease: "inOutCubic",
      duration: 400
    }
  });
}

// Animate buttons to have a bounce animation
// when hovered over and clicked
function animateButtons() {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("mouseover", () => {
      animate(button, {
        scale: {
          to: 1.25,
          duration: 100,
          ease: "out"
        }
      });
    });

    button.addEventListener("mouseleave", () => {
      animate(button, {
        scale: {
          to: 1,
          duration: 300,
          ease: "out"
        }
      });
    });

    button.addEventListener("click", () => {
      animate(button, {
        scale: {
          to: 0.75,
          duration: 50,
          ease: "out"
        }
      });
    });
  });
}