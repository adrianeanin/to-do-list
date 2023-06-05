const todoForm = document.querySelector("#todo-form");
const todoName = document.querySelector("#todo-name");
const todoDueDate = document.querySelector("#todo-due-date");
const todoListElement = document.querySelector("#todo-list");
const itemsLeft = document.querySelector(".items-left");
const clearCompleted = document.querySelector(".clear-completed");
const showActive = document.querySelector(".list-active");
const showAll = document.querySelector(".list-all");
const showCompleted = document.querySelector(".list-complete");

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
  updateItemsLeft();
};

const renderTodoList = (items) => {
  const renderItems = items || todoList;
  todoListElement.innerHTML = "";
  renderItems.forEach((todoItem, index) => {
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
      updateItemsLeft();
    });

    const deleteButton = todoElement.querySelector(".list__cancel");
    deleteButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      renderTodoList();
      updateItemsLeft();
    });
    todoListElement.appendChild(todoElement);
  });

  updateItemsLeft();
};

const updateItemsLeft = () => {
  const incompleteItems = todoList.filter((todoItem) => !todoItem.isCompleted);
  const count = incompleteItems.length;
  itemsLeft.innerText = `${count} item${count !== 1 ? "s" : ""} left`;
};

const clearCompletedItems = () => {
  const completedItems = todoList.filter((todoItem) => todoItem.isCompleted);
  completedItems.forEach((completedItem) => {
    const index = todoList.indexOf(completedItem);
    todoList.splice(index, 1);
  });
  renderTodoList();
  updateItemsLeft();
};

const showAllItems = (event) => {
  event.preventDefault();
  renderTodoList();

  showActive.classList.remove("active-link");
  showAll.classList.add("active-link");
  showCompleted.classList.remove("active-link");
};

const showActiveItems = (event) => {
  event.preventDefault();
  const activeItems = todoList.filter((todoItem) => !todoItem.isCompleted);
  renderTodoList(activeItems);

  showActive.classList.add("active-link");
  showAll.classList.remove("active-link");
  showCompleted.classList.remove("active-link");
};

const showCompletedItems = (event) => {
  event.preventDefault();
  const completedItems = todoList.filter((todoItem) => todoItem.isCompleted);
  renderTodoList(completedItems);

  showActive.classList.remove("active-link");
  showAll.classList.remove("active-link");
  showCompleted.classList.add("active-link");
};

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

showActive.addEventListener("click", showActiveItems);
showAll.addEventListener("click", showAllItems);
showCompleted.addEventListener("click", showCompletedItems);
