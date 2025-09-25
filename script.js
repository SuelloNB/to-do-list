// Get references to elements (safe optional chaining)
const startButton = document.getElementById('start-btn');
const homeButton = document.getElementById('home-btn');
const addTaskButton = document.getElementById('add-task-btn');
const clearTasksButton = document.getElementById('clear-tasks-btn');
const taskContainer = document.getElementById('task-container');
const completeBtn = document.getElementById('complete-btn');
const deleteBtn = document.getElementById('delete-btn');
const taskTitleInput = document.getElementById('task-title');
const taskDesriptionInput = document.getElementById('description-input');
const updateTaskButton = document.getElementById('add-or-update-task-btn');
const closeTaskFormButton = document.getElementById('close-task-form-btn');

// Navigation buttons
if (homeButton) {
  homeButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // back to landing page
  });
}

if (startButton) {
  startButton.addEventListener('click', () => {
    window.location.href = 'todo.html'; // go to tasks page
  });
}

// date and time
function updateDateTime() {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      document.getElementById('date-time').textContent = now.toLocaleString('en-US', options);
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    //functions for task management