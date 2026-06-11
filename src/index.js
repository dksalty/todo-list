
import './styles.css';
import { TodoArray } from './TodoArray.js';
import { ScreenController } from './ScreenController.js';
const updateScreen = () => ScreenController(getTodos, deleteTodo, updateScreen, editedDescription, toggleComplete);
const todoForm = document.getElementById('todoForm')
const prioritySelect = document.getElementById('priority');
const projectSelect = document.getElementById('project');
const todoData = TodoArray();
const addNewObject = todoData.createNewObject;
const getTodos = todoData.getArray;
const deleteTodo = todoData.deleteTodo;
const editedDescription = todoData.editedDescription;
const toggleComplete = todoData.toggleComplete;
const priorityError = document.getElementById('priorityError');
const projectError = document.getElementById('projectError');
const descriptionError = document.getElementById('descriptionError');
const newProjectInput = document.getElementById('newProject');
const descriptionInput = document.getElementById('todo');
const defaultButton = document.getElementById('defaultButton');
const priorityHighButton = document.getElementById('priorityHighButton');
const priorityMediumButton = document.getElementById('priorityMediumButton');
const priorityLowButton = document.getElementById('priorityLowButton');
updateScreen();
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
const dayValue = document.getElementById('day').value;
const timeValue = document.getElementById('time').value; 
const descriptionValue = descriptionInput.value;
const priorityValue = prioritySelect.options[prioritySelect.selectedIndex].value;
const newProjectValue = document.getElementById('newProject').value.trim();
const projectText = newProjectValue || projectSelect.options[projectSelect.selectedIndex].text;
const todoValues = {
        day: dayValue,
        time: timeValue,
        description: descriptionValue,
        priority: priorityValue,
        project: projectText,
        completed: false
    };
if (!descriptionValue.trim()) {
  descriptionError.classList.remove('hidden');
  descriptionError.textContent = 'Please add a description.';
   return;
}
if (!priorityValue) {
  priorityError.classList.remove('hidden');
  priorityError.textContent = 'Please select a priority.';
  return;
}
if (!projectText) {
  projectError.classList.remove('hidden');
  projectError.textContent = 'Please select a project.';
  return;
}
descriptionError.textContent = '';
priorityError.textContent = '';
projectError.textContent = '';
    addNewObject(todoValues);
    updateScreen();
    todoForm.reset();
});
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
function getAllTodos() {
  const allTodos = document.querySelectorAll('.addedTodo');
  return allTodos;
}


defaultButton.addEventListener('click', () => {
getAllTodos().forEach(todo => {
  todo.classList.remove('hidden');  
})
});

priorityHighButton.addEventListener('click', () => {
  getAllTodos().forEach(todo => {if (todo.dataset.priority !== 'high') {
 todo.classList.add('hidden');
}
 else todo.classList.remove('hidden');  })});

 priorityMediumButton.addEventListener('click', () => {
  getAllTodos().forEach(todo => {if (todo.dataset.priority !== 'medium') {
   todo.classList.add('hidden');
  }
 else todo.classList.remove('hidden');  })});

 priorityLowButton.addEventListener('click', () => {
  getAllTodos().forEach(todo => {if (todo.dataset.priority !== 'low') {
 todo.classList.add('hidden');
}
 else todo.classList.remove('hidden');  })});

