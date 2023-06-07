import { createItem } from "./app.js";

const saveTodoListToLocalStorage = (todoList) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const getTodoListFromLocalStorage = () => {
  const storedTodoList = localStorage.getItem("todoList");
  if (storedTodoList) {
    const parsedList = JSON.parse(storedTodoList);
    return parsedList.map((item) => {
      const newItem = createItem(item.title, item.dueDate);
      newItem.isCompleted = item.isCompleted;
      newItem.toggleCompletion = function () {
        this.isCompleted = !this.isCompleted;
      };
      return newItem;
    });
  }
  return [];
};

export { saveTodoListToLocalStorage, getTodoListFromLocalStorage };
