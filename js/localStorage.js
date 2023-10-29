import { createItem } from "./app.js";

const saveTodoListToLocalStorage = (todoList) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const getTodoListFromLocalStorage = () => {
  const storedTodoList = localStorage.getItem("todoList");
  if (storedTodoList) {
    const parsedList = JSON.parse(storedTodoList);
    console.log(parsedList);
    return parsedList.map((item) => {
      const newItem = createItem(item.title, item.dueDate);
      newItem.isCompleted = item.isCompleted;
      // newItem.toggleCompletion = function () {
      //   this.isCompleted = !this.isCompleted;
      // };
      newItem.toggleCompletion = createItem().toggleCompletion;
      return newItem;
    });
  }
  return [];
};

export { saveTodoListToLocalStorage, getTodoListFromLocalStorage };
