// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
// Defined elements using querySelector
let title = document.querySelector('.titleText')
let whenDue = document.querySelector('.dates')
let taskDescribe = document.querySelector('.contentText')
let userInput = document.querySelector('.formInput')

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
    
}
console.log();


// Todo: create a function to create a task card

function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('card', 'project-card', 'draggable', 'my-3');
    taskCard.setAttribute('task-card-id', task.id);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.innerHTML = `
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">Due Date: ${task.dueDate}</p>
        <p class="card-text">${task.description}</p>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'delete-button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => handleDeleteTask(task.id));

    cardBody.appendChild(deleteBtn);
    taskCard.appendChild(cardBody);


}
console.log();

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    taskList.forEach(task => {
        createTaskCard(task);
    });

    $('.draggable').draggable({
        revert: 'invalid',
        helper: 'clone'
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    let title = titleInput.value;
    let whenDue =whenDueInput.value;
    let taskDescribe = taskDescribeInput.value;
    const newTask = {
        id: generateTaskId(),
        title: title,
        dueDate: whenDue,
        description: taskDescribe
    };
    taskList.push(newTask);

    localStorage.setItem('taskList', JSON.stringify(taskList));

    renderTaskList();

    document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
}

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

    console.log(`Task ${draggedTaskId} dropped into ${newStatusLaneId}`);

    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('#addTaskForm').submit(function(event){
        event.preventDefault();
        handleAddTask();
    })

    $('.createButton').on('click', handleAddTask);

    $('.draggable').draggable({
        revert: 'invalid',
        helper: 'clone'
    });

    $('.status-lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    });
});
