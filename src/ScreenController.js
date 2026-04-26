import { parse, format, addDays, isToday, isTomorrow, isFuture, isAfter, isBefore } from "date-fns";
export function ScreenController (getTodos) {
const todayDiv = document.getElementById('today');
const tomorrowDiv = document.getElementById('tomorrow')
const comingUpDiv = document.getElementById('comingUp')
const anytimeDiv = document.getElementById('anytime')

const today = new Date();
const tomorrow = addDays(new Date(), 1);

const appendArray = getTodos();

todayDiv.textContent = '';
tomorrowDiv.textContent = '';
comingUpDiv.textContent = '';
anytimeDiv.textContent = '';



appendArray.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('addedTodo');
    const projectTitle = document.createElement('h2');
    const priorityLevel = document.createElement('p');
    const todoInfo = document.createElement('p');
    const timeInfo = document.createElement('p');
    
    const userDate = todo.day;
    const userTime = todo.time;
   

    const combinedString = `${userDate} ${userTime}`;
    const parsedDate = parse(combinedString, 'yyyy-MM-dd HH:mm', new Date());
    const standardResult = format(parsedDate, 'MMMM do, yyyy @ h:mm a');

    projectTitle.textContent = todo.project;
    priorityLevel.textContent = todo.priority;
    todoInfo.textContent = todo.description;
    timeInfo.textContent = standardResult;
    
  
    newTodo.append(projectTitle, priorityLevel, todoInfo, timeInfo);
    
   if (isToday(parsedDate)) {
    todayDiv.appendChild(newTodo)
   }
   else if (isTomorrow(parsedDate)) {
    tomorrowDiv.appendChild(newTodo);
   }
   else if (parsedDate > tomorrow && parsedDate < addDays(today, 7)) {
   comingUpDiv.appendChild(newTodo);
   }
   else anytimeDiv.appendChild(newTodo);


});

}