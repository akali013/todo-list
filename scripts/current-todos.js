import { Todo, currentTodos, deleteToDo } from "./todo.js";

loadHeader();
loadTodos();
// Setup the delete button for each todo
document.querySelectorAll(".js-delete-button").forEach((button) => {
  button.addEventListener("click", () => {
    const todoId = button.dataset.todoId;
    deleteToDo(todoId);
    loadTodos();
  });
})

// Setup the edit button for each todo
document.querySelectorAll(".js-edit-button").forEach((button) => {
  button.addEventListener("click", () => {
    const todoId = button.dataset.todoId;
    window.location.href = `modify-todo.html?mode=edit&id=${todoId}`;
  });
})

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
          <button class="edit-button js-edit-button" data-todo-id="${todo.id}">
            <img src="icons/edit.svg">
          </button>
          <button class="delete-button js-delete-button" data-todo-id="${todo.id}">
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
    window.location.href = "modify-todo.html?mode=add";
  });
}