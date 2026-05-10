import { parse, format, addDays, isToday, isTomorrow, isAfter, isBefore, isValid, isPast} from "date-fns";

export function ScreenController (getTodos, deleteTodo, updateScreen) {
const todayDiv = document.getElementById('today');
const tomorrowDiv = document.getElementById('tomorrow')
const comingUpDiv = document.getElementById('comingUp')
const laterDiv = document.getElementById('later')
const anytimeDiv = document.getElementById('anytime');
const overdueDiv = document.getElementById('overdue');

const today = new Date();
const tomorrow = addDays(new Date(), 1);
const appendArray = getTodos();
const nextWeek = addDays(new Date(), 7);

todayDiv.textContent = '';
tomorrowDiv.textContent = '';
comingUpDiv.textContent = '';
laterDiv.textContent = '';
anytimeDiv.textContent = '';
overdueDiv.textContent = '';




appendArray.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('addedTodo');
    const projectTitle = document.createElement('h2');
    const priorityLevel = document.createElement('p');
    priorityLevel.textContent = todo.priority;
    const todoInfo = document.createElement('p');
    const timeInfo = document.createElement('p');
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton')
    removeButton.textContent = 'X'
    const userDate = todo.day;
    const userTime = todo.time;
    const combinedString = `${userDate} ${userTime}`;
    const parsedDate = parse(combinedString, 'yyyy-MM-dd HH:mm', new Date());
    const markCompleteButton = document.createElement('button');
    markCompleteButton.classList.add('markCompleteBtnColor');
    markCompleteButton.textContent = '✓';
    const markCompleteDiv = document.createElement('div');
    markCompleteDiv.classList.add('markCompleteColor');
    markCompleteDiv.textContent = '✓';
    
 
  let standardResult;
    
if (userDate && userTime) {
  const combinedString = `${userDate} ${userTime}`;
  const parsedDate = parse(combinedString, 'yyyy-MM-dd HH:mm', new Date());

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
 let timeinfo = format(parsedDate, 'MMMM do, yyyy @ h:mm a');
} else {
  timeDisplay = 'No date set';
}

timeInfo.textContent = timeDisplay;

    projectTitle.textContent = todo.project;
    priorityLevel.textContent = todo.priority;
    todoInfo.textContent = todo.description;
    timeInfo.textContent = standardResult;
    
  
    newTodo.append( projectTitle, priorityLevel, todoInfo, timeInfo, removeButton, markCompleteButton);
    
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
 deleteTodo(todo.id);
updateScreen();
})
});

}