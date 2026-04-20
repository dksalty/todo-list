export function ScreenController (getTodos) {
const todayDiv = document.getElementById('today');
const tomorrowDiv = document.getElementById('tomorrow')
const comingUpDiv = document.getElementById('comingUp')
const anytimeDiv = document.getElementById('anytime')

const appendArray = getTodos();

const daySelect = {
today: todayDiv,
tomorrow: tomorrowDiv,
comingUp: comingUpDiv,
anytime: anytimeDiv 
}

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
    
    projectTitle.textContent = todo.project;
    priorityLevel.textContent = todo.priority;
    todoInfo.textContent = todo.description;
    timeInfo.textContent = todo.time;
    

    newTodo.append(projectTitle, priorityLevel, todoInfo, timeInfo);
    
   daySelect[todo.day].appendChild(newTodo);


});

}