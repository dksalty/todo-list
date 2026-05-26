import { parse, format, addDays, isToday, isTomorrow, isAfter, isBefore, isValid, isPast} from "date-fns";

export function ScreenController (getTodos, deleteTodo, updateScreen) {
const todayDiv = document.getElementById('today');
const tomorrowDiv = document.getElementById('tomorrow')
const comingUpDiv = document.getElementById('comingUp')
const laterDiv = document.getElementById('later')
const anytimeDiv = document.getElementById('anytime');
const overdueDiv = document.getElementById('overdue');
const sortButton = document.createElement('button');
const today = new Date();
const tomorrow = addDays(new Date(), 1);
const appendArray = getTodos();
const nextWeek = addDays(new Date(), 7);
const defaultButton = document.getElementById('defaultButton');
const priorityHighButton = document.getElementById('priorityHighButton');
const priorityMediumButton = document.getElementById('priorityMediumButton');
const priorityLowButton = document.getElementById('priorityLowButton');

todayDiv.textContent = '';
tomorrowDiv.textContent = '';
comingUpDiv.textContent = '';
laterDiv.textContent = '';
anytimeDiv.textContent = '';
overdueDiv.textContent = '';

sortButton.addEventListener('click', () => {
const allTodos = document.querySelectorAll('.addedTodo');
allTodos.forEach(todo => {
if (sortButton.textContent !== todo.dataset.project) {
 todo.classList.add('hidden');
}
 else todo.classList.remove('hidden');
})});

defaultButton.addEventListener('click', () => {
const allTodos = document.querySelectorAll('.addedTodo');
allTodos.forEach(todo => {
  todo.classList.remove('hidden');  
})
});

priorityHighButton.addEventListener('click', () => {
  const allTodos = document.querySelectorAll('.addedTodo');
allTodos.forEach(todo => {if (todo.dataset.priority !== 'high') {
 todo.classList.add('hidden');
}
 else todo.classList.remove('hidden');  })});

 priorityMediumButton.addEventListener('click', () => {
  const allTodos = document.querySelectorAll('.addedTodo');
  allTodos.forEach(todo => {if (todo.dataset.priority !== 'medium') {
   todo.classList.add('hidden');
  }
 else todo.classList.remove('hidden');  })});

 priorityLowButton.addEventListener('click', () => {
  const allTodos = document.querySelectorAll('.addedTodo');
allTodos.forEach(todo => {if (todo.dataset.priority !== 'low') {
 todo.classList.add('hidden');
}
 else todo.classList.remove('hidden');  })});


appendArray.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('addedTodo');
    const projectTitle = document.createElement('h2');
    projectTitle.classList.add('projectTitle');
    const priorityLevel = document.createElement('p');
    priorityLevel.textContent = todo.priority;
    const todoInfo = document.createElement('p');
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

sortButton.textContent = todo.project;
sortButton.classList.add('sortButton');

const existingProjects = Array.from(projectList.children).map(button => button.textContent);
 newTodo.dataset.project = todo.project;
newTodo.dataset.priority = todo.priority;
if (!existingProjects.includes(todo.project)) {
  projectList.appendChild(sortButton);
}

  
let standardResult;
    
if (userDate && userTime) {
  const combinedString = `${userDate} ${userTime}`;
  

  if (isValid(parsedDate)) {
    standardResult = format(parsedDate, 'MMMM do, yyyy @ h:mm a');
  } else {
    standardResult = 'Anytime';
  }
} else {
  standardResult = 'Anytime';
}

    let timeDisplay;

if (isValid(parsedDate)) {
 let timeInfo = format(parsedDate, 'MMMM do, yyyy @ h:mm a');
} else {
  timeDisplay = 'No date set';
}

timeInfo.textContent = timeDisplay;

    projectTitle.textContent = todo.project;
    priorityLevel.textContent = todo.priority;
    todoInfo.textContent = todo.description;
    timeInfo.textContent = standardResult;
    
  
    newTodo.append( priorityCircle, projectTitle, todoInfo, timeInfo, markCompleteButton, removeButton);
    
   if (isToday(parsedDate)) {
    todayDiv.appendChild(newTodo)
   }
   else if (isTomorrow(parsedDate)) {
    tomorrowDiv.appendChild(newTodo);
   }
   else if (isAfter(parsedDate, tomorrow) && isBefore(parsedDate, nextWeek)) {
   comingUpDiv.appendChild(newTodo);
   }
   else if (timeDisplay === 'No date set') {
     anytimeDiv.appendChild(newTodo);
   }
   else if (isPast(parsedDate)) {
    overdueDiv.appendChild(newTodo);
   }
   else laterDiv.appendChild(newTodo);

   markCompleteButton.addEventListener('click', () => {
      if (newTodo.contains(markCompleteDiv)) {
        markCompleteDiv.remove();
      }
      else newTodo.append(markCompleteDiv);
      markCompleteDiv.classList.add('markCompleteColor');
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