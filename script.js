const startButton = document.getElementById('start-btn');
const homeButton = document.getElementById('home-btn');
const addTaskButton = document.getElementById('add-task-btn');

if (homeButton) {
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to the home page
    });
}

startButton.addEventListener('click', () => {
    window.location.href = 'todo.html'; // Redirect to the to-do list page
});


