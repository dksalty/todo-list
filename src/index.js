console.log('Hello');
import './styles.css';
import { TodoArray } from './TodoArray.js';
import { ScreenController } from './ScreenController.js';
const updateScreen = () => ScreenController(getTodos, deleteTodo, updateScreen);
const todoForm = document.getElementById('todoForm')
const prioritySelect = document.getElementById('priority');
const projectSelect = document.getElementById('project');
const getArrayFunction = TodoArray();
const addNewObject = getArrayFunction.createNewObject;
const getTodos = getArrayFunction.getArray;
const deleteTodo = getArrayFunction.deleteTodo;
const formError = document.getElementById('formError');
updateScreen();
 
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const dayValue = document.getElementById('day').value;
const timeValue = document.getElementById('time').value;    
const descriptionValue = document.getElementById('todo').value;
const priorityText = prioritySelect.options[prioritySelect.selectedIndex].text;
const projectText = projectSelect.options[projectSelect.selectedIndex].text;
    
    const todoData = {
        day: dayValue,
        time: timeValue,
        description: descriptionValue,
        priority: priorityText,
        project: projectText
    };
  if (
  !descriptionValue.trim() ||
  !priorityText ||
  !projectText
) {
  formError.textContent = 'Please fill in all required fields.';
  return;
  formError.textContent = '';
}
    addNewObject(todoData);
    updateScreen();
    console.log(getTodos())
});


