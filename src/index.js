console.log('Hello');
import './styles.css';
import { TodoArray } from './index2.js';
import { ScreenController } from './index3.js';

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
