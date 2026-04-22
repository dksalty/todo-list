console.log('Hello');
import './styles.css';
import { TodoArray } from './TodoArray.js';
import { ScreenController } from './ScreenController.js';

  const todoForm = document.getElementById('todoForm')

const getArrayFunction = TodoArray();
const addNewObject = getArrayFunction.createNewObject;
const getTodos = getArrayFunction.getArray;

ScreenController(getTodos);
 
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
addNewObject();
ScreenController(getTodos);
console.log(getTodos())
});
