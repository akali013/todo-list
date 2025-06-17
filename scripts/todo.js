export class Todo {
  title;
  date
  time;
  note;

  constructor(title, date, time, note) {
    this.title = title;
    this.date = date;
    this.time = time;
    this.note = note;
  }
}

// Contains Todo objects
export let currentTodos = JSON.parse(localStorage.getItem("current-todos")) || [];

export function saveCurrentTodos() {
  localStorage.setItem("current-todos", JSON.stringify(currentTodos));
}