export function TodoArray () {
  const todoArray = [];
  


const createNewObject = () => {
  const formObject = {
    day: document.getElementById('day').value,
    priority: document.getElementById('priority').value,
    project: document.getElementById('project').value,
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