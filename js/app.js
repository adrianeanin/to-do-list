const todoForm = document.querySelector("#todo-form");
const todoName = document.querySelector("#todo-name");
const todoDueDate = document.querySelector("#todo-due-date");
const todoListElement = document.querySelector("#todo-list");

const createItem = (title, dueDate) => {
  return {
    title,
    dueDate,
    isCompleted: false,
    toggleCompletion() {
      this.isCompleted = !this.isCompleted;
    },
  };
};

const todoList = [];

const addTodoItem = (event) => {
  event.preventDefault();
  const title = todoName.value.trim();
  const dueDate = todoDueDate.value;
  if (title === "") {
    return;
  }
  const todoItem = createItem(title, dueDate);
  todoList.push(todoItem);
  renderTodoList();
};

const renderTodoList = () => {
  todoListElement.innerHTML = "";
  todoList.forEach((todoItem, index) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("list__item");
    todoElement.innerHTML = `
    
        <input type="checkbox" class="form__check" id="todo-checkbox-${index}" ${
      todoItem.isCompleted ? "checked" : ""
    }>
          <label for="todo-checkbox-${index}"></label>

        <li class="list__task ${todoItem.isCompleted ? "completed" : ""}">${
      todoItem.title
    }</li>

    <div class="due-date">${todoItem.dueDate}</div>

    <div class="list__cancel" data-index="${index}" >
      <img src="images/icon-cross.svg" alt="cancel-icon" />
    </div>
      `;

    const taskElement = todoElement.querySelector(".list__task");
    if (todoItem.isCompleted) {
      taskElement.classList.add("completed");
    }

    const checkbox = todoElement.querySelector(".form__check");
    checkbox.addEventListener("click", () => {
      todoItem.toggleCompletion();
      renderTodoList();
    });

    const deleteButton = todoElement.querySelector(".list__cancel");
    deleteButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
    todoListElement.appendChild(todoElement);
  });
};

// Initialize the to-do list
const initializeTodoList = () => {
  const todoItem1 = createItem("Buy groceries", "2023-05-07");

  todoList.push(todoItem1);
  renderTodoList();
};

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTodoItem(event);
  }
}

initializeTodoList();
