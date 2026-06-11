import { parse, format, addDays, isToday, isTomorrow, isAfter, isBefore, isValid, isPast} from "date-fns";

export function ScreenController (getTodos, deleteTodo, updateScreen, editedDescription, toggleComplete) {  
const todayDiv = document.getElementById('today');
const tomorrowDiv = document.getElementById('tomorrow')
const comingUpDiv = document.getElementById('comingUp')
const laterDiv = document.getElementById('later')
const anytimeDiv = document.getElementById('anytime');
const overdueDiv = document.getElementById('overdue');
const today = new Date();
const tomorrow = addDays(new Date(), 1);
const allTodos = getTodos();
const nextWeek = addDays(new Date(), 7);

todayDiv.textContent = '';
tomorrowDiv.textContent = '';
comingUpDiv.textContent = '';
laterDiv.textContent = '';
anytimeDiv.textContent = '';
overdueDiv.textContent = '';

allTodos.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('addedTodo');
    const projectTitle = document.createElement('h2');
    projectTitle.classList.add('projectTitle');
    const priorityLevel = document.createElement('p');
    priorityLevel.textContent = todo.priority;
    const todoInfo = document.createElement('p');
    todoInfo.classList.add('todoInfo');
    const timeInfo = document.createElement('p');
    timeInfo.classList.add('timeInfo');
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton')
    removeButton.textContent = '🗑︎'
    const userDate = todo.day;
    const userTime = todo.time;
    const combinedString = `${userDate} ${userTime}`;
    const parsedDate = parse(combinedString, 'yyyy-MM-dd HH:mm', new Date());
    const markCompleteButton = document.createElement('button');
    markCompleteButton.classList.add('markCompleteBtnColor');
    markCompleteButton.textContent = '✓';
    const markCompleteDiv = document.createElement('div');
    markCompleteDiv.classList.add('markCompleteColor');
    markCompleteDiv.textContent = '✓ Completed ✓';
    const areYouSureButton = document.createElement('button');
    areYouSureButton.classList.add('areYouSureButton');
    areYouSureButton.textContent = 'Click here if you are sure you want to remove this todo';
    const priorityCircle = document.createElement('span');
    priorityCircle.classList.add('priority-circle');
    priorityCircle.classList.add(`priority-${todo.priority}`);
    const projectList = document.getElementById('projectList');
    const sortButton = document.createElement('button');
    sortButton.textContent = todo.project;
    sortButton.classList.add('sortButton');
    const editButton = document.createElement('button');
    editButton.classList.add('editButton');
    editButton.textContent = '✎';
    const editDescriptionInput = document.createElement('textarea');
    editDescriptionInput.classList.add('editDescriptionInput');
    editDescriptionInput.value = todo.description;
    const editDescriptionSubmitButton = document.createElement('button');
    editDescriptionSubmitButton.classList.add('editDescriptionSubmitButton');
    editDescriptionSubmitButton.textContent = 'Save';
    const todoHeader = document.createElement('div');
    todoHeader.classList.add('todoHeader');
    todoHeader.append(priorityCircle, projectTitle);
    const dateInfo = document.createElement('div');
    dateInfo.classList.add('dateInfo');
    dateInfo.textContent = format(parsedDate, 'MMMM do, yyyy');
    const timeInfoDiv = document.createElement('div');
    timeInfoDiv.classList.add('timeInfoDiv');
    timeInfoDiv.textContent = format(parsedDate, 'h:mm a');

sortButton.addEventListener('click', () => {
const todoCards = document.querySelectorAll('.addedTodo');
todoCards.forEach(todo => {
if (sortButton.textContent !== todo.dataset.project) {
 todo.classList.add('hidden');
}
 else todo.classList.remove('hidden');
})});
const existingProjects = Array.from(projectList.children).map(button => button.textContent);
 newTodo.dataset.project = todo.project;
newTodo.dataset.priority = todo.priority;
if (!existingProjects.includes(todo.project)) {
  projectList.appendChild(sortButton);
}
let standardResult;
  if (userDate && userTime) {
  if (isValid(parsedDate)) {
    standardResult = format(parsedDate, 'MMMM do, yyyy @ h:mm a');
  } else {
    standardResult = 'Anytime';
  }
}   else {
    standardResult = 'Anytime';
}
    projectTitle.textContent = todo.project;
    priorityLevel.textContent = todo.priority;
    todoInfo.textContent = todo.description;
   
    newTodo.append( todoHeader, todoInfo, dateInfo, timeInfoDiv, markCompleteButton, editButton, removeButton);
   
    if (isToday(parsedDate)) {
    todayDiv.appendChild(newTodo)
   }
   else if (isTomorrow(parsedDate)) {
    tomorrowDiv.appendChild(newTodo);
   }
   else if (isAfter(parsedDate, tomorrow) && isBefore(parsedDate, nextWeek)) {
   comingUpDiv.appendChild(newTodo);
   }
   else if (standardResult === 'Anytime') {
     anytimeDiv.appendChild(newTodo);
   }
   else if (isPast(parsedDate)) {
    overdueDiv.appendChild(newTodo);
   }
   else {
    laterDiv.appendChild(newTodo);
    }
   markCompleteButton.addEventListener('click', () => {
toggleComplete(todo.id);
updateScreen();
  
   });
    
   if (todo.completed) {
    newTodo.appendChild(markCompleteDiv);
   }

      
       
   

 editButton.addEventListener('click', () => {
    if (newTodo.contains(editDescriptionInput)) {
      editDescriptionInput.remove();
      editDescriptionSubmitButton.remove();
    }
    else {
      newTodo.append(editDescriptionInput);
      newTodo.append(editDescriptionSubmitButton);
    }
   });
editDescriptionSubmitButton.addEventListener('click', () => {
 const newDescription = editDescriptionInput.value.trim();  
if (newDescription) {
  if (newTodo.contains(editDescriptionInput)) {
    editDescriptionInput.remove();
    editDescriptionSubmitButton.remove();
  }
  else {
    newTodo.append(editDescriptionInput);
    newTodo.append(editDescriptionSubmitButton);
  }
  if (newDescription.trim()) {
    editedDescription(todo.id, newDescription);
    todoInfo.textContent = newDescription;
  }
updateScreen();
}
updateScreen();
}); 
removeButton.addEventListener('click', () => {
  if (!newTodo.contains(areYouSureButton)) {
    newTodo.appendChild(areYouSureButton);
    setTimeout(() => {
      areYouSureButton.remove();
    }, 3000);
  }
});
areYouSureButton.addEventListener('click', () => {
  deleteTodo(todo.id);
     const matchingProjects = getTodos().filter(
  item => item.project === todo.project
);
if (matchingProjects.length === 0) {
  const projectButtons = Array.from(projectList.children);
  projectButtons.forEach(button => {
    if (button.textContent === todo.project) {
      projectList.removeChild(button);  
    }
  });
}
 updateScreen();
});
});
}
