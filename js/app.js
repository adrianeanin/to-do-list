import {
  saveTodoListToLocalStorage,
  getTodoListFromLocalStorage,
} from "./localStorage.js";

const todoName = document.querySelector("#todo-name");
const todoDueDate = document.querySelector("#todo-due-date");
const todoListElement = document.querySelector("#todo-list");
const itemsLeft = document.querySelector(".items-left");
const clearCompleted = document.querySelector(".clear-completed");
const showActive = document.querySelector(".list-active");
const showAll = document.querySelector(".list-all");
const showCompleted = document.querySelector(".list-complete");

const createItem = (title, dueDate) => {
  const item = {
    title,
    dueDate,
    isCompleted: false,
    toggleCompletion: function () {
      this.isCompleted = !this.isCompleted;
    },
  };

  return item;
};

let todoList = getTodoListFromLocalStorage() || [];

const addTodoItem = (event) => {
  event.preventDefault();
  const title = todoName.value.trim();
  const dueDate = todoDueDate.value;
  if (title === "") {
    return;
  }
  const todoItem = createItem(title, dueDate);
  todoList.push(todoItem);
  saveTodoListToLocalStorage(todoList);
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

    //drag and drop functionality

    todoElement.draggable = true;

    todoElement.addEventListener("dragstart", () => {
      todoElement.classList.add("dragging");
    });

    todoElement.addEventListener("dragend", () => {
      todoElement.classList.remove("dragging");
    });

    todoListElement.addEventListener("dragover", (event) => {
      event.preventDefault();
      const afterElement = getDragAfterElement(todoListElement, event.clientY);

      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        todoListElement.appendChild(draggable);
      } else {
        todoListElement.insertBefore(draggable, afterElement);
      }
    });

    const getDragAfterElement = (todoListElement, y) => {
      const draggableElements = [
        ...todoListElement.querySelectorAll(".list__item:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
        }
      ).element;
    };

    // delete and checkbox toggle functionality

    const taskElement = todoElement.querySelector(".list__task");
    const dueDateElement = todoElement.querySelector(".due-date");
    if (todoItem.isCompleted) {
      taskElement.classList.add("completed");
      dueDateElement.classList.add("completed");
    }

    const checkbox = todoElement.querySelector(".form__check");
    checkbox.addEventListener("click", () => {
      todoItem.toggleCompletion();
      saveTodoListToLocalStorage(todoList);
      renderTodoList();
      updateItemsLeft();
    });

    const deleteButton = todoElement.querySelector(".list__cancel");
    deleteButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      saveTodoListToLocalStorage(todoList);
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
  saveTodoListToLocalStorage(todoList);
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

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTodoItem(event);
  }
}

todoName.addEventListener("keypress", handleKeyPress);
showActive.addEventListener("click", showActiveItems);
showAll.addEventListener("click", showAllItems);
showCompleted.addEventListener("click", showCompletedItems);
clearCompleted.addEventListener("click", clearCompletedItems);

// render items in local storage
document.addEventListener("DOMContentLoaded", () => {
  todoList = getTodoListFromLocalStorage() || [];
  renderTodoList();
});

export { createItem };
