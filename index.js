const addUserForm = document.getElementById('add-user-form');
const addTaskForm = document.getElementById('add-task-form');
const filterTaskNameInput = document.getElementById('filter-task-name');
const filterStatusSelect = document.getElementById('filter-status-select');
const filterDueDateInput = document.getElementById('filter-due-date');
const taskList = document.getElementById('task-list');

const tasks = [];

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userNameInput = document.getElementById('user-name');
    const userName = userNameInput.value;
    if (userName) {
        alert(`User "${userName}" added successfully.`);
        userNameInput.value = '';
    } else {
        alert('Please enter a valid user name.');
    }
});

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskNameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('due-date');
    const statusSelect = document.getElementById('status-select');
    const taskName = taskNameInput.value;
    const dueDate = dueDateInput.value;
    const status = statusSelect.value;
    if (taskName && dueDate) {
        const task = {
            taskName,
            dueDate,
            status
        };
        tasks.push(task);
        renderTaskList();
        taskNameInput.value = '';
        dueDateInput.value = '';
        statusSelect.value = 'pending';
        alert(`Task "${taskName}" added successfully.`);
    } else {
        alert('Please enter a valid task name and due date.');
    }
});

function renderTaskList() {
    taskList.innerHTML = '';
    const filteredTasks = filterTasks(tasks);
    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Task Name:</span> ${task.taskName}<br>
            <span>Due Date:</span> ${task.dueDate}<br>
            <span>Status:</span> ${task.status}<br>
            <button onclick="editTask(${taskList.indexOf(li)})">Edit</button>
            <button onclick="deleteTask(${taskList.indexOf(li)})">Delete</button>
            <button onclick="changeStatus(${taskList.indexOf(li)})">Change Status</button>
        `;
        taskList.appendChild(li);
    });
}

function filterTasks(tasks) {
    const filterTaskName = filterTaskNameInput.value.toLowerCase();
    const filterStatus = filterStatusSelect.value;
    const filterDueDate = filterDueDateInput.value;
    return tasks.filter((task) => {
        const taskName = task.taskName.toLowerCase();
        const status = task.status.toLowerCase();
        const dueDate = task.dueDate;
        return taskName.includes(filterTaskName) &&
               (filterStatus === 'all' || status === filterStatus) &&
               (!filterDueDate || dueDate === filterDueDate);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
}

function editTask(index) {
    const task = tasks[index];
    const taskNameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('due-date');
    const statusSelect = document.getElementById('status-select');
    taskNameInput.value = task.taskName;
    dueDateInput.value = task.dueDate;
    statusSelect.value = task.status;
    deleteTask(index);
}

function changeStatus(index) {
    const task = tasks[index];
    task.status = (task.status === 'pending') ? 'completed' : 'pending';
    renderTaskList();
}

filterTaskNameInput.addEventListener('input', renderTaskList);
filterStatusSelect.addEventListener('change', renderTaskList);
filterDueDateInput.addEventListener('input', renderTaskList);

renderTaskList();
