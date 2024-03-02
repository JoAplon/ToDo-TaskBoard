// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>');
    taskCard.addClass('card project-card draggable my-3');
    taskCard.attr('task-card-id','task.id');

    const cardBody = $('<div>').addClass('card-body');
    cardBody.append($('<h5>').addClass('card-title').text(task.title));
    cardBody.append($('<p>').addClass('card-title').text(task.description));
    cardBody.append($('<p>').addClass('card-title').text('Due Date: ' + task.dueDate));

    taskCard.append(cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskListElement = document.getElementById('task-list');

    taskListElement.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.name;

    
        taskListElement.appendChild(taskElement);
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    const taskAddBtn = $('<button>');
    taskAddBtn.text('Add');
    taskAddBtn.on('click', function(){

    });
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskDeleteBtn = $('<button>');
    taskDeleteBtn.text('Delete');
    taskDeleteBtn.on('click', function(){

    });
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
