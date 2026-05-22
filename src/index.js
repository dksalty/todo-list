console.log('Hello');
import './styles.css';
import { TodoArray } from './TodoArray.js';
import { ScreenController } from './ScreenController.js';
import { de } from 'date-fns/locale';
const updateScreen = () => ScreenController(getTodos, deleteTodo, updateScreen);
const todoForm = document.getElementById('todoForm')
const prioritySelect = document.getElementById('priority');
const projectSelect = document.getElementById('project');
const getArrayFunction = TodoArray();
const addNewObject = getArrayFunction.createNewObject;
const getTodos = getArrayFunction.getArray;
const deleteTodo = getArrayFunction.deleteTodo;
const priorityError = document.getElementById('priorityError');
const projectError = document.getElementById('projectError');
const descriptionError = document.getElementById('descriptionError');
updateScreen();
 
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const dayValue = document.getElementById('day').value;
const timeValue = document.getElementById('time').value;    
const descriptionValue = document.getElementById('todo').value;
const priorityValue = prioritySelect.options[prioritySelect.selectedIndex].value;
const newProjectValue = document.getElementById('newProject').value.trim();
const projectText = newProjectValue || projectSelect.options[projectSelect.selectedIndex].text;
const descriptionInput = document.getElementById('todo');
const descriptionError = document.getElementById('descriptionError');
const projectList = document.getElementById('projectList');  
const newProjectInput = document.getElementById('newProject');


  const todoData = {
        day: dayValue,
        time: timeValue,
        description: descriptionValue,
        priority: priorityValue,
        project: projectText
    };

 
descriptionInput.addEventListener('input', () => {
  if (descriptionInput.value.trim()) {
    descriptionError.textContent = '';
   descriptionError.classList.add('hidden');
  } 
});
prioritySelect.addEventListener('change', () => {
  if (prioritySelect.value) {
    priorityError.textContent = '';
    priorityError.classList.add('hidden');
  }
});
projectSelect.addEventListener('change', () => {
  if (projectSelect.value) {
    projectError.classList.add('hidden');
    projectError.textContent = '';
    }
});
newProjectInput.addEventListener('input', () => {
  if (newProjectInput.value.trim()) {
    projectError.classList.add('hidden');
    projectError.textContent = '';
  }
});

if (!descriptionValue.trim() 
 
) {
  descriptionError.classList.remove('hidden');
  descriptionError.textContent = 'Please add a description.';
  
 return;
}
if (!priorityValue || priorityValue === 'Select priority') {
  priorityError.classList.remove('hidden');
  priorityError.textContent = 'Please select a priority.';
  return;
}
if (!projectText || projectText === 'Select project') {
  projectError.classList.remove('hidden');
  projectError.textContent = 'Please select a project.';
  return;
}

descriptionError.textContent = '';
priorityError.textContent = '';
projectError.textContent = '';

    addNewObject(todoData);
    updateScreen();
    todoForm.reset();
    console.log(getTodos())
   

});

