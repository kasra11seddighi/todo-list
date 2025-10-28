const modal = document.querySelector(".modal-screen");
const openModalBtn = document.querySelector(".open-modal-button");
const cancelTodoBtn = document.querySelector(".cancel");
const createTodoBtn = document.querySelector(".create");
const todoInput = document.querySelector(".input");
const todosContainer = document.querySelector(".todos-container");
const todoTitle = document.querySelector(".todo-title")
let todos = [];

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  showTodos();
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
  showTodos();
  hideModal();
}

function showTodos() {
  todosContainer.innerHTML = "";

  todos.forEach(function (todo) {
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
  showTodos();
}

openModalBtn.addEventListener("click", showModal);
cancelTodoBtn.addEventListener("click", hideModal);
createTodoBtn.addEventListener("click", addTodo);
