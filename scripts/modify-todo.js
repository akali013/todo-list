import { Todo, currentTodos, getToDo, saveCurrentToDos } from "./todo.js";

let titleInput;
let noteInput;
let dateInput;
let timeInput;
let errorMessage = "";

loadHeader();
initializeBasePage();
// Utilize the URL parameters to see if a to do is being added or edited
// mode param can either be add or edit
const url = new URL(window.location.href);
url.searchParams.get("mode") === "add" ? loadAddPage() : loadEditPage();

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

// Initialize the four fields that are shared
// between the edit and add pages.
function initializeBasePage() {
  document.querySelector(".js-container").innerHTML = `
    <div class="fields-container">
      <div class="title-input-container">
        Title
        <input type="text" class="title-input js-title-input">
      </div>

      <div class="note-input-container">
        Note
        <textarea class="note-input js-note-input"></textarea>
      </div>

      <div class="date-input-container">
        Date
        <input type="date" class="date-input js-date-input">
      </div>

      <div class="time-input-container">
        Time
        <input type="time" class="time-input js-time-input">
      </div>
    </div>
  `;

  titleInput = document.querySelector(".js-title-input");
  noteInput = document.querySelector(".js-note-input");
  dateInput = document.querySelector(".js-date-input");
  timeInput = document.querySelector(".js-time-input");
}

// Load the add page, which is just the add button
function loadAddPage() {
  document.querySelector(".js-title").innerHTML = "Add To Do";
  document.querySelector(".js-buttons-container").innerHTML = `
    <div class="add-button-container">
      <button class="add-button js-add-button">
        Add
      </button>

      <div class="added-message js-added-message"></div>
    </div>
  `;
  loadAddButton();
}

// Add a new to do to the current to dos when the add button is clicked
function loadAddButton() {
  document.querySelector(".js-add-button").addEventListener("click", () => {
    if (validateFields()) {
      const newToDo = new Todo(titleInput.value, dateInput.value, timeInput.value, noteInput.value);
      currentTodos.push(newToDo);
      saveCurrentToDos();

      const addedMessage = document.querySelector(".js-added-message");
      addedMessage.innerHTML = "Added!";
      
      setTimeout(() => {
        addedMessage.innerHTML = "";
      }, 2000);
    }
    else {
      showErrorPopUp();
    }
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

// Loads the edit page with prefilled values and
// the cancel and save buttons
function loadEditPage() {
  document.querySelector(".js-title").innerHTML = "Edit To Do";
  document.querySelector(".js-buttons-container").innerHTML = `
    <button class="cancel-button js-cancel-button">
      Cancel
    </button>

    <button class="save-button js-save-button">
      Save
    </button>
  `;

  const todoId = url.searchParams.get("id");
  let todo = getToDo(todoId, currentTodos);

  // Prefill form values
  titleInput.value = todo.title;
  dateInput.value = todo.date;
  timeInput.value = todo.time;
  noteInput.value = todo.note;

  loadEditButtons(todo);
}

// Load cancel and save buttons
function loadEditButtons(todo) {
  document.querySelector(".js-cancel-button").addEventListener("click", () => {
    window.location.href = "todos-page.html?mode=current";
  });

  document.querySelector(".js-save-button").addEventListener("click", () => {
    if (validateFields()) {
      todo.title = titleInput.value;
      todo.date = dateInput.value;
      todo.time = timeInput.value;
      todo.note = noteInput.value;

      saveCurrentToDos();
      window.location.href = "todos-page.html?mode=current";
    }
    else {
      showErrorPopUp();
    }
  });
}

function showErrorPopUp() {
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