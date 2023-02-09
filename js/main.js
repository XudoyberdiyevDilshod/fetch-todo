const elForm = document.querySelector(".js-form");
const elList = document.querySelector(".js-list");
const elInput = document.querySelector(".js-input");
const elLogOutBtn = document.querySelector(".js-logout");
const localData = localStorage.getItem("token");
let elAllCount = document.querySelector(".js-all-count");
let elComplCount = document.querySelector(".js-completed-count");
let elUnComplCount = document.querySelector(".js-uncompleted-count");
let elAllBtns = document.querySelector(".js-btns");

console.log(localData);

if (!localData) {
  location.replace("login.html");
}

elLogOutBtn.addEventListener("click", function () {
  localStorage.removeItem("token");
  location.reload();
});

const renderTodo = (arr, node) => {
  elAllCount.textContent = arr.allTodos.length;
  elComplCount.textContent = arr.allTodos.filter(
    (item) => item.completed
  ).length;
  elUnComplCount.textContent = arr.allTodos.filter(
    (item) => !item.completed
  ).length;
  node.innerHTML = "";
  arr.allTodos.forEach((todo) => {
    node.innerHTML += `
    <li class="list-group-item d-flex align-items-center ">
    <input class="form-check-input me-3 js-chechbox" type="checkbox" data-todo-id=${
      todo._id
    } ${todo.completed ? "checked" : ""}>
    <span class="flex-grow-1" style="${
      todo.completed ? "text-decoration: line-through " : ""
    };">${todo.task}</span>
    <button class="d-flex align-items-center btn btn-warning me-2 todo-edit" data-todo-id=${
      todo._id
    }>EDIT <img src="./images/edit.png" alt="edit" width="25" height="25"></button>
    <button class=" todo-delete d-flex align-items-center btn btn-danger" data-todo-id=${
      todo._id
    }>DELETE <img src="./images/delete.png" alt="delete" width="25" height="25"></button>
  </li>`;
  });
};

async function getTodos() {
  const res = await fetch("https://todo-for-n92.cyclic.app/todos/all", {
    headers: {
      "x-access-token": localData,
    },
  });
  const data = await res.json();

  renderTodo(data, elList);
}

getTodos();

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  fetch("https://todo-for-n92.cyclic.app/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localData,
    },
    body: JSON.stringify({
      task: elInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getTodos();
      }
    })
    .catch((err) => console.log(err));
  elInput.value = "";
});
// PUT --- EDIT TODO
const editTodo = (id) => {
  const newInputVal = prompt("Create new todo");
  fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localData,
    },
    body: JSON.stringify({
      task: newInputVal,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getTodos();
      }
    })
    .catch((err) => console.log(err));
};
// DELETE --- DELETE TODO
const deleteTodo = (id) => {
  fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getTodos();
      }
    })
    .catch((err) => console.log(err));
};
// PUT
const isCompleted = (id) => {
  fetch(`https://todo-for-n92.cyclic.app/todos?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localData,
    },
    body: JSON.stringify({
      task: "Update task",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getTodos();
      }
    })
    .catch((err) => console.log(err));
};

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".todo-delete")) {
    const todoDeleteId = evt.target.dataset.todoId;
    deleteTodo(todoDeleteId);
  }
  if (evt.target.matches(".todo-edit")) {
    const todoEditId = evt.target.dataset.todoId;
    editTodo(todoEditId);
  }
  if (evt.target.matches(".js-chechbox")) {
    const todoCheckId = evt.target.dataset.todoId;
    isCompleted(todoCheckId);
  }
});

// DARK MODE
let elModeBtn = document.querySelector(".js-mode");
let theme = false;

elModeBtn.addEventListener("click", function () {
  theme = !theme;
  const bg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", bg);
  changeTheme();
});

function changeTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    heading.style.color = "white"
    elModeBtn.innerHTML = `BRIGHT <img class="ms-1" src="./images/day-mode.png" alt="night-mode" width="20" height="20">`;
    document.body.classList.add("dark");
  } else {
    heading.style.color = "Black"
    elModeBtn.innerHTML = `DARK <img class="ms-2" src="./images/night-mode.png" alt="night-mode" width="20" height="20">`;
    document.body.classList.remove("dark");
  }
}
changeTheme();
