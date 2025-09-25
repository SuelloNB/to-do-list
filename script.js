// ===============================
// Element References
// ===============================
const homeButton = document.getElementById('home-btn');
const startButton = document.getElementById('start-btn');
const addTaskButton = document.getElementById('add-task-btn');
const clearTasksButton = document.getElementById('clear-tasks-btn');
const taskTitleInput = document.getElementById('title-input');
const taskDescriptionInput = document.getElementById('description-input');
const updateTaskButton = document.getElementById('add-or-update-task-btn');
const closeTaskFormButton = document.getElementById('close-task-form-btn');
const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('task-container');
const taskModal = document.getElementById('task-modal');

// ===============================
// Storage
// ===============================
let taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = null;

// ===============================
// Navigation
// ===============================
if (homeButton) {
  homeButton.addEventListener('click', () => {
    window.location.href = "index.html";
  });
}
if (startButton) {
  startButton.addEventListener('click', () => {
    window.location.href = "todo.html";
  });
}

// ===============================
// Modal Controls
// ===============================
addTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'block';
  updateTaskButton.textContent = 'Add Task';
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
  currentTask = null;
});

closeTaskFormButton.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === taskModal) taskModal.style.display = 'none';
});

// ===============================
// Handle Add / Update Task
// ===============================
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = {
    id: currentTask ? currentTask.id : Date.now(),
    title: taskTitleInput.value.trim(),
    description: taskDescriptionInput.value.trim(),
    date: new Date().toLocaleString(),
    completed: currentTask ? currentTask.completed : false
  };

  if (currentTask) {
    taskData = taskData.map((task) => task.id === currentTask.id ? newTask : task);
  } else {
    taskData.push(newTask);
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();

  taskForm.reset();
  taskModal.style.display = 'none';
});

// ===============================
// Display Tasks
// ===============================
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  if (taskData.length === 0) {
    tasksContainer.innerHTML = "<p>No tasks yet.</p>";
    return;
  }

  taskData.forEach(({ id, title, date, description, completed }) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = "task";
    taskDiv.id = id;

    taskDiv.innerHTML = `
      <div class="task-desc">
        <p><strong>Title:</strong> <span class="${completed ? 'completed' : ''}">${title}</span></p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> <span class="${completed ? 'completed' : ''}">${description}</span></p>
      </div>
      <div class="task-form-footer">
        <button type="button" class="large-btn complete-btn">${completed ? 'Undo' : 'Complete'}</button>
        <button type="button" class="large-btn edit-btn">Edit</button>
        <button type="button" class="close-task-form-btn delete-btn">Delete</button>
      </div>
    `;

    // Attach button listeners
    taskDiv.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(id));
    taskDiv.querySelector('.edit-btn').addEventListener('click', () => editTask(id));
    taskDiv.querySelector('.delete-btn').addEventListener('click', () => deleteTask(id));

    tasksContainer.appendChild(taskDiv);
  });
};

// ===============================
// Edit Task
// ===============================
const editTask = (id) => {
  const task = taskData.find((task) => task.id === id);
  if (!task) return;

  currentTask = task;
  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;
  updateTaskButton.textContent = "Update Task";
  taskModal.style.display = 'block';
};

// ===============================
// Delete Task
// ===============================
const deleteTask = (id) => {
  taskData = taskData.filter((task) => task.id !== id);
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
};

// ===============================
// Toggle Complete Task
// ===============================
const toggleComplete = (id) => {
  taskData = taskData.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
};

// ===============================
// Clear All Tasks
// ===============================
clearTasksButton.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    taskData = [];
    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
  }
});

// ===============================
// Date & Time
// ===============================
const updateDateTime = () => {
  const now = new Date();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  document.getElementById('date-time').textContent = now.toLocaleString('en-US', options);
};

setInterval(updateDateTime, 1000);
updateDateTime();

// ===============================
// Init
// ===============================
updateTaskContainer();
