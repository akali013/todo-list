export class Todo {
  id;
  title;
  date
  time;
  note;

  constructor(title, date, time, note) {
    this.id = generateToDoID();
    this.title = title;
    this.date = date;
    this.time = time;
    this.note = note;
  }
}

// Contains Todo objects
export let currentTodos = JSON.parse(localStorage.getItem("current-todos")) || [];

export function saveCurrentToDos() {
  localStorage.setItem("current-todos", JSON.stringify(currentTodos));
}

// Let each to do be represented by a 10 digit number
function generateToDoID() {
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += Math.floor(Math.random() * 9);
  }

  return id;
}

// Returns a to do with a matching ID
export function getToDo(id) {
  let matchingToDo;
  currentTodos.forEach((todo) => {
    if (todo.id === id) {
      matchingToDo = todo;
    }
  });

  return matchingToDo;
}

// Deletes a to do from currentTodos with the given id
export function deleteToDo(id) {
  for (let i = 0; i < currentTodos.length; i++) {
    if (currentTodos[i].id === id) {
      currentTodos.splice(i, 1);
      break;
    }
  }
  saveCurrentToDos();
}