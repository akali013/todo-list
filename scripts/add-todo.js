import { Todo, currentTodos, saveCurrentTodos } from "./todo.js";

loadHeader();

const titleInput = document.querySelector(".js-title-input");
const noteInput = document.querySelector(".js-note-input");
const dateInput = document.querySelector(".js-date-input");
const timeInput = document.querySelector(".js-time-input");
let errorMessage = "";

// Add a new to do to the current to dos when the add button is clicked
document.querySelector(".js-add-button").addEventListener("click", () => {
  if (validateFields()) {
    const newToDo = new Todo(titleInput.value, dateInput.value, timeInput.value, noteInput.value);
    currentTodos.push(newToDo);
    saveCurrentTodos();

    const addedMessage = document.querySelector(".js-added-message");
    addedMessage.innerHTML = "Added!";
    
    setTimeout(() => {
      addedMessage.innerHTML = "";
    }, 2000);
  }
  else {
    const errorElement = document.querySelector(".js-error-message");
    errorElement.innerHTML = `
      <div class="error">
        ${errorMessage}
      </div>
    `;

    setTimeout(() => {
      errorElement.innerHTML = "";
    }, 5000);
  }
});

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

// Validates the four to do fields
function validateFields() {
  if (titleInput.value === "" || dateInput.value === "" || timeInput.value === "") {
    errorMessage = "You must fill out the title, date, and time.";
    return false;
  }
  return true;
} 