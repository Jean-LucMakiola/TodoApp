const apiUrl = "http://localhost:3000/todos";

const todoForm = document.querySelector("#todo-form");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");
const todoList = document.querySelector("#todo-list");

// Get all todos from the server and render them in the UI
async function getTodos() {
  const response = await fetch(apiUrl);
  const todos = await response.json();
  todos.forEach(renderTodo);
}

// Create a new todo on the server and render it in the UI
async function createTodo() {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  if (!title || !description) {
    return;
  }
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, completed: false }),
  });
  const todo = await response.json();
  renderTodo(todo);
  titleInput.value = "";
  descriptionInput.value = "";
}

// Update a todo on the server and update it in the UI
async function updateTodo(id, completed) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  const todo = await response.json();
  const todoItem = document.querySelector(`#todo-${id}`);
  renderTodoItem(todo, todoItem);
}

// Delete a todo from the server and remove it from the UI
async function deleteTodo(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  const todoItem = document.querySelector(`#todo-${id}`);
  todoList.removeChild(todoItem);
}

// Render a todo in the UI
function renderTodo(todo) {
  const todoItem = document.createElement("li");
  todoItem.id = `todo-${todo.id}`;
  renderTodoItem(todo, todoItem);
  todoList.appendChild(todoItem);
}

// Render a todo item in the UI
function renderTodoItem(todo, todoItem) {
  todoItem.innerHTML = `
    <input type="checkbox" ${todo.completed ? "checked" : ""}>
    <span>${todo.title}: ${todo.description}</span>
    <button>Delete</button>
  `;
  const checkbox = todoItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", () => {
    updateTodo(todo.id, checkbox.checked);
  });
  const deleteButton = todoItem.querySelector("button");
  deleteButton.addEventListener("click", () => {
    deleteTodo(todo.id);
  });
}

// Event listeners
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createTodo();
});

// Initial rendering
getTodos();


const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    // Save the JWT token to local storage
    localStorage.setItem('token', data.token);

    // Redirect the user to the app
    window.location.href = '/app';
  } else {
    // Display an error message to the user
    const errorMessage = document.createElement('p');
    errorMessage.textContent = data.message;
    loginForm.appendChild(errorMessage);
  }
});
