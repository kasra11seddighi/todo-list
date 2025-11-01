const modal = document.querySelector(".modal-screen");
const openModalBtn = document.querySelector(".open-modal-button");
const cancelTodoBtn = document.querySelector(".cancel");
const createTodoBtn = document.querySelector(".create");
const todoInput = document.querySelector(".input");
const todosContainer = document.querySelector(".todos-container");
const todoTitle = document.querySelector(".todo-title");
const sortBtns = document.querySelectorAll(".sort-menu button");
const sortTypeElem = document.querySelector(".sort-type");
const hoursElem = document.querySelector(".hours");
const minutesElem = document.querySelector(".minutes");
const secondsElem = document.querySelector(".seconds");

let todos = [];

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  showTodos(todos);
}

function showModal() {
  modal.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
}

function addTodo() {
  const todoTitle = todoInput.value;

  const newTodo = {
    id: Math.floor(Math.random() * 9999),
    title: todoTitle,
    isComplete: false,
  };

  todos.push(newTodo);
  todoInput.value = "";

  saveInToLocalStorage(todos);
  showTodos(todos);
  hideModal();
}

function showTodos(shownTodos) {
  todosContainer.innerHTML = "";

  if (shownTodos.length) {
    shownTodos.forEach(function (todo) {
      todosContainer.insertAdjacentHTML(
        "beforeend",
        `
        <article class="todo ${todo.isComplete ? 'complete' : ''}" data-id="${todo.id}">
          <div class="todo-data">
            <div class="checkbox">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                </svg>
              </span>
            </div>
            <div>
              <p class="todo-title">${todo.title}</p>
            </div>
          </div>

          <div class="todo-buttons">
            <button class="delete" onclick="deleteTodo(${todo.id})">حذف</button>
            <button class="complete" onclick="todoComplete(${todo.id})">
              ${todo.isComplete ? 'لغو' : 'تکمیل'}
            </button>
          </div>
        </article>
        `
      );
    });
  } else {
    todosContainer.innerHTML = `<h1 style="text-align:center;">هیچ تودویی پیدا نشد 😴</h1>`; 
  }
}



function saveInToLocalStorage(todosArray) {
  localStorage.setItem("todos", JSON.stringify(todosArray));
   
}

function todoComplete(todoId) {
  const todo = todos.find(t => t.id === todoId);
  if (!todo) return;

  todo.isComplete = !todo.isComplete; // toggle

  const todoElement = document.querySelector(`.todo[data-id='${todoId}']`);
   const completeBtn = todoElement.querySelector(".complete");

  if (todoElement) {
    todoElement.classList.toggle("complete");
  }
  if (completeBtn) {
        completeBtn.textContent = todo.isComplete ? "لغو" : "تکمیل";
      }
  saveInToLocalStorage(todos);
}

function deleteTodo(todoId) {
  // حذف تودو از آرایه
  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
  }

  // ذخیره‌سازی
  saveInToLocalStorage(todos);

  // بروزرسانی نمایش
  showTodos(todos);
}

function todoSortHandler(event) {
  const sortType = event.target.value;
  const sortTitle = event.target.innerHTML;

  switch (sortType) {
    case "completed": {
      const completedTodos = todos.filter(function (todo) {
        return todo.isComplete === true;
      });

      sortTypeElem.innerHTML = sortTitle;
      showTodos(completedTodos);
      break;
    }

    case "uncompleted": {
      const unCompletedTodos = todos.filter(function (todo) {
        return todo.isComplete === false;
      });

      sortTypeElem.innerHTML = sortTitle;
      showTodos(unCompletedTodos);
      break;
    }

    default: {
      sortTypeElem.innerHTML = sortTitle;
      showTodos(todos);
    }
  }
}

setInterval(() => {
  const date = new Date();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  hoursElem.innerHTML = hour;
  minutesElem.innerHTML = minute;
  secondsElem.innerHTML = second;
}, 1000);


sortBtns.forEach(function (sortBtn) {
  sortBtn.addEventListener("click", todoSortHandler);
});

openModalBtn.addEventListener("click", showModal);
cancelTodoBtn.addEventListener("click", hideModal);
createTodoBtn.addEventListener("click", addTodo);

