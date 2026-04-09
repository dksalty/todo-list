import function TodoArray () {
  const todoArray = [];
  
  const todoForm = document.getElementById('todoForm')

  const formObject = {
    day: document.getElementById('day').value,
    priority: document.getElementById('priority').value,
    project: document.getElementById('project').value,
    todo:  document.getElementById('todo').value, 
    time: document.getElementById('time').value
};
  
  myForm.addEventListener('submit', (event) => {
    event.preventDefault();

});
}