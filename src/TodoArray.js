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

return {
getArray,
createNewObject,
deleteTodo
}
}