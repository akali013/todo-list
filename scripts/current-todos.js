import { Todo, currentTodos } from "./todo.js";

loadHeader();
loadTodos();

// For each Todo object in currentTodos, list their information
// with edit and delete buttons
function loadTodos() {
  let html = "";

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
          <button class="edit-button">
            <img src="icons/edit.svg">
          </button>
          <button class="delete-button">
            <img src="icons/delete.svg">
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-todo-list").innerHTML = html;
}

// Load button functionality in the header
function loadHeader() {
  document.querySelector(".js-current-todo").addEventListener("click", () => {
    window.location.href = "current-todos.html";
  });

  document.querySelector(".js-previous-todo").addEventListener("click", () => {
    window.location.href = "previous-todos.html";
  });

  document.querySelector(".js-add-todo").addEventListener("click", () => {
    window.location.href = "add-todo.html";
  });
}