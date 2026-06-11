
export function TodoArray () {
  const todoArray = [];
   
const saveToStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todoArray));
}
const loadFromStorage = () => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todoArray.push(...JSON.parse(storedTodos));
  }
};
loadFromStorage();
const createNewObject = (todoData) => {
  const formObject = {
    id: Date.now(),
    ...todoData
};
todoArray.push(formObject);
saveToStorage();
return formObject;
}
 const deleteTodo = (id) => {
 const filteredTodos = todoArray.filter((obj) => obj.id !== id);
  todoArray.length = 0;
  todoArray.push(...filteredTodos);
  saveToStorage();
}
const getArray = () => todoArray;
const editedDescription = (id, newDescription) => {
  const todo = todoArray.find((obj) => obj.id === id);
  if (todo) {
    todo.description = newDescription;
    saveToStorage();
  }
};

const toggleComplete = (id) => {
  const todo = todoArray.find((obj) => obj.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveToStorage();
  }
};
return {
getArray,
createNewObject,
deleteTodo,
editedDescription,
toggleComplete
}
}