const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let editItemid;

const addDangerText = (where, message) => {
  document.getElementById(where).textContent = message;
  setInterval(() => {
    document.getElementById(where).textContent = "";
  }, 2500);
};

//check
let todos = JSON.parse(localStorage.getItem("lists"))
  ? JSON.parse(localStorage.getItem("lists"))
  : [];

//get Time

const getTime = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const year = now.getFullYear();

  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const month_title = now.getMonth();

  fullDay.textContent = `${date} ${months[month_title]}, ${year}`;
  hourEl.textContent = `${hour}`;
  minuteEl.textContent = `${minute}`;
  secondEl.textContent = `${second}`;
  return `${hour}:${minute}, ${date}.${month}.${year}`;
};

setInterval(getTime, 1000);

if (todos.length) showTodos();
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("lists"));
  listGroupTodo.innerHTML = "";
  todos.forEach((todo, index) => {
    listGroupTodo.innerHTML += `
          <li ondblclick="setCompleted(${index})" class="list-group-item d-flex justify-content-between ${
      todo.complated == true ? "completed" : ""
    }">
          ${todo.text}
          <div class="todo-icons">
          <span class="opacity-50 me-2"> ${todo.time} </span>
          <img onclick="editeTodo(${index})" src="img/edit.svg" alt="edit-image" width="25" height="25" />
          <img
          onclick="deleteItem(${index})"
          src="img/delete.svg"
          alt="delete-image"
          width="25"
          height="25"
          />
          </div>
          </li>
          `;
  });
}

//set todo
const setTodo = () => {
  localStorage.setItem("lists", JSON.stringify(todos));
};

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  let textTodo = formCreate["input-create"].value.trim();
  formCreate.reset();

  if (textTodo.length) {
    todos.push({ text: textTodo, time: getTime(), complated: false });
    setTodo();
    showTodos();
  } else {
    addDangerText("message-create", "Please add some todo...");
  }
});

function deleteItem(id) {
  const filteredItems = todos.filter((item, index) => index !== id);
  todos = filteredItems;
  setTodo();
  showTodos();
}
function setCompleted(i) {
  const complatedTodos = todos.map((item, index) => {
    if (index == i) {
      return { ...item, complated: item.complated == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = complatedTodos;
  setTodo();
  showTodos();
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  let textTodo = formEdit["input-edit"].value.trim();
  formEdit.reset();

  if (textTodo.length) {
    todos.splice(editItemid, 1, {
      text: textTodo,
      time: getTime(),
      complated: false,
    });
    setTodo();
    showTodos();
    close();
  } else {
    addDangerText("message-edit", "Please add some todo...");
  }
});

//edit todo

function editeTodo(id) {
  open();
  editItemid = id;
}

document.addEventListener("keydown", (e) => {
  if (e.which == 27) {
    close();
  }
});

overlay.addEventListener("click", close);
closeEl.addEventListener("click", close);
//open
function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
//close
function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
