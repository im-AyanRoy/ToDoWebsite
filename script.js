document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('taskList');
  const addTaskButton = document.getElementById('addTaskButton');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  addTaskButton.addEventListener('click', addTask);

  function addTask() {
	const taskName = document.getElementById('taskName').value;
	const taskCategory = document.getElementById('taskCategory').value;
	const taskDueDate = document.getElementById('taskDueDate').value;

	if (taskName === '' || taskDueDate === '') return;

	const task = {
	  name: taskName,
	  category: taskCategory,
	  dueDate: taskDueDate,
	  completed: false
	};

	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	renderTasks();

	document.getElementById('taskName').value = '';
	document.getElementById('taskCategory').selectedIndex = 0;
	document.getElementById('taskDueDate').value = '';
  }

  function renderTasks() {
	taskList.innerHTML = '';
	tasks.forEach((task, index) => {
	  const taskItem = document.createElement('li');
	  taskItem.classList.add('task-item');
	  if (task.completed) taskItem.classList.add('completed');
	  taskItem.innerHTML = `
		<span>${task.name} - ${task.category} - ${task.dueDate}</span>
		<div>
		  <button onclick="toggleComplete(${index})">Complete</button>
		  <button onclick="deleteTask(${index})">Delete</button>
		</div>
	  `;
	  taskList.appendChild(taskItem);
	});
  }

  window.toggleComplete = function(index) {
	tasks[index].completed = !tasks[index].completed;
	localStorage.setItem('tasks', JSON.stringify(tasks));
	renderTasks();
  };

  window.deleteTask = function(index) {
	tasks.splice(index, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	renderTasks();
  };
});
