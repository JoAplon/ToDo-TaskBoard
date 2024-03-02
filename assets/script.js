// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
// Defined elements using querySelector
let title = document.querySelector('.titleText')
let whenDue = document.querySelector('.dates')
let taskDescribe = document.querySelector('.contentText')
let formInput = document.querySelector('.formInput')

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
    
}
console.log();


// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = ('div');
    taskCard.addClass('card', 'project-card', 'draggable', 'my-3');
    taskCard.attr('task-card-id', task.id);

    const cardBody = $('<div>').addClass('card-body');
    cardBody.append($('<h5>').addClass('card-title').text(task.title));
    cardBody.append($('<p>').addClass('card-title').text('Due Date: ' + task.whenDue));
    cardBody.append($('<p>').addClass('card-title').text(task.taskDescribe));

    const deleteBtn = $('<button>').addClass('btn btn-danger delete-button');
    deleteBtn.text('Delete');
    deleteBtn.on('click', () => handleDeleteTask(task.id));
    cardBody.append(deleteBtn);

    taskCard.append(cardBody);

    const taskBoardContainer = $('#to-do');
    taskBoardContainer.append(taskCard);
}
console.log();

const sampleTask = {
    id: 1,
    title: 'Sample Task',
    dueDate: '2022-12-31',
    description: 'This is a sample task description.'
};
createTaskCard(sampleTask);
console.log();

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskList = [];

    const taskBoardContainer = $(taskBoardContainer).empty();

    taskList.forEach(task => {
        createTaskCard(task);
    });

    $('.draggable').draggable({
        revert: 'invalid',
        helper: 'clone'
    });
}
console.log();

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    let title = document.querySelector('.titleText').value;
    let whenDue = document.querySelector('.dates').value;
    let taskDescribe = document.querySelector('.contentText').value;
    const newTask = {
        id: nextId,
        title: title.value,
        dueDate: whenDue.value,
        description: taskDescribe.value
    };
    taskList.push(newTask);

    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('nextId', JSON.stringify(nextId));

    renderTaskList();

    formInput.requestFullscreen();
}
console.log();

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskId) {
    const taskIndex = taskList.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);

        localStorage.setItem('tasks', JSON.stringify(taskList));

        renderTaskList();
    }
}
console.log();

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const draggedTaskId = ui.helper.attr('task-card-id');
    const newStatusLaneId = $(this).attr('id');

    console.log('Task ${draggedTaskId} dropped into ${newStatusLaneId}');

    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    formInput.addEventListener('click', handleAddTask);
    taskList.addEventListener('click', handleDeleteTask);

    $('.draggable').draggable({
        revert: 'invalid',
        helper: 'clone'
    });

    $('.status-lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    });
});
