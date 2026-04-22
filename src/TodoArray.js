export function TodoArray () {
  const todoArray = [];
  
const prioritySelect = document.getElementById('priority');
const projectSelect = document.getElementById('project');


const createNewObject = () => {
  const formObject = {
    day: document.getElementById('day').value,
    priority: prioritySelect.options[prioritySelect.selectedIndex].text,
    project: projectSelect.options[projectSelect.selectedIndex].text,
    description:  document.getElementById('todo').value, 
    time: document.getElementById('time').value
};
todoArray.push(formObject);
return formObject;
}
  
const getArray = () => todoArray;


return {
getArray,
createNewObject,


}

}