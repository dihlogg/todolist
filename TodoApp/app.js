let btnAddTask = document.querySelector("#addTask");
let taskNameInput = document.querySelector("#taskInput");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let tasks = getTaskFromLocalStorage();
let currentTaskId = 0;
let completedTasksLoaded = false;
displayTasks(tasks);

// add task
btnAddTask.addEventListener("click", openPopup);

// open popup
function openPopup() {
  $("#popup").style.display = "block";
}
// close popup
function closePopup() {
  $("#popup").style.display = "none";
  taskNameInput.value = "";
}

$("#saveTask").addEventListener("click", function () {
  let taskInputValue = taskNameInput.value.trim();
  let startDateValue = $("#startDate").value;

  if (!taskInputValue) {
    alert("Please add a task");
    return;
  }

  let taskId = generateTaskId();
  let tasks = getTaskFromLocalStorage();
  let task = {
    id: taskId,
    name: taskInputValue,
    startDate: startDateValue,
    status: false,
  };
  tasks.push(task);
  taskNameInput.value = "";
  $("#startDate").value = "";
  closePopup();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
});

function generateTaskId() {
  return Math.random().toString(36).substring(2, 10);
}

// delete task
function deleteTask(id) {
  let tasks = getTaskFromLocalStorage();
  tasks.splice(id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(getTaskFromLocalStorage());
}

// display task
function displayTasks(tasks = [], isCompleted = false) {
  tasks = tasks.filter(s => s.status == isCompleted);
  let content = "<ul>";
  tasks.forEach((task, index) => {
    content += `<li data-task-id="${index}">
      <input type="checkbox" id="myCheckbox" class="class-status" ${
        task.status ? "checked" : ""
      }>
      <div class="task-name">${task.name}</div>
      <div class="start-date">Start Date: ${task.startDate}</div>
      <a href="#" class="editButton" onclick="editTask(${index})">Edit</a>
      <a href="#" class="deleteButton" onclick="deleteTask(${index})">Delete</a>`;
    content += `</li>`;
  });
  content += "</ul>";

  $(".uncompleted-tasks").innerHTML = content;
}

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    this.classList.add("active");
    pane.classList.add("active");
  };
});

function updateTaskStatus() {
  let tasks = getTaskFromLocalStorage();

  tasks.forEach((task) => {
    if (!task.hasOwnProperty("status")) {
      task.status = false;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// move Task
function moveTask(taskElement, sourceTab, targetTab, isCompleted = false) {
  console.log("abc 123");
  let tasks = getTaskFromLocalStorage();

  const sourceList = $(`.${sourceTab} ul`);
  const targetList = $(`.${targetTab} ul`);

  const taskId = taskElement.dataset.taskId;
  const task = tasks[taskId];

  task.status = targetTab === "completed-tasks";
  tasks[taskId] = task;

  sourceList.removeChild(taskElement);
  targetList.appendChild(taskElement);

  if (targetTab !== "completed-tasks") {
    showButton(taskElement);
  } else {
    hideButton(taskElement);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks, isCompleted);
}

$(".uncompleted-tasks").addEventListener("click", (event) => {
  console.log("co show");
  displayTasks(tasks);
  if (event.target.type === "checkbox") {
    const taskElement = event.target.parentNode;
    moveTask(taskElement, "uncompleted-tasks", "completed-tasks");  
  }
  
});

$(".completed-tasks").addEventListener("click", (event) => {
  console.log("có chạy vao");
  if (event.target.type === "checkbox") {
    const taskElement = event.target.parentNode;
    moveTask(taskElement, "completed-tasks", "uncompleted-tasks", true);
    
  }
});
// hidden button
function hideButton(taskElement) {
  const deleteButton = taskElement.querySelector(".deleteButton");
  const editButton = taskElement.querySelector(".editButton");
  if (deleteButton) {
    deleteButton.style.display = "none";
  }
  if (editButton) {
    editButton.style.display = "none";
  }
}

// show button
function showButton(taskElement) {
  const deleteButton = taskElement.querySelector(".deleteButton");
  const editButton = taskElement.querySelector(".editButton");
  if (deleteButton) {
    deleteButton.style.display = "inline";
  }
  if (editButton) {
    editButton.style.display = "inline";
  }
}

function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}
