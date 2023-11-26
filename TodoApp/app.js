let btnAddTask = document.querySelector("#addTask");
let taskNameInput = document.querySelector("#taskInput");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let tasks = getTaskFromLocalStorage();
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

  let taskId = btnAddTask.dataset.taskId;
  let tasks = getTaskFromLocalStorage();
  let task = {
    name: taskInputValue,
    startDate: startDateValue,
  };

  if (taskId || taskId === 0) {
    tasks[taskId] = task;
    btnAddTask.removeAttribute("data-task-id");
  } else {
    tasks.push(task);
  }

  taskNameInput.value = "";
  $("#startDate").value = "";
  closePopup();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
});

// delete task
function deleteTask(id) {
  let tasks = getTaskFromLocalStorage();
  tasks.splice(id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(getTaskFromLocalStorage());
}

function displayTasks(tasks = [], isCompletedTab = false) {
  let content = "<ul>";
  tasks.forEach((task, index) => {
    content += `<li data-task-id="${index}">
      <input type="checkbox" id="myCheckbox" class="class-status">
      <div class="task-name">${task.name}</div>
      <div class="start-date">Start Date: ${task.startDate}</div>`;

    if (!isCompletedTab) {
      content += `
        <a href="#" class="deleteButton" onclick="deleteTask(${index})">Delete</a>`;
    }

    content += `</li>`;
  });
  content += "</ul>";

  $(".uncompleted-tasks").innerHTML = content;
}

function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
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
// move Task
function moveTask(taskElement, sourceTab, targetTab) {
  const sourceList = $(`.${sourceTab} ul`);
  const targetList = $(`.${targetTab} ul`);

  sourceList.removeChild(taskElement);
  targetList.appendChild(taskElement);

  if (targetTab !== "completed-tasks") {
    showDeleteButton(taskElement);
  } else {
    hideDeleteButton(taskElement);
  }
}

$(".uncompleted-tasks").addEventListener("click", (event) => {
  if (event.target.type === "checkbox") {
    const taskElement = event.target.parentNode;
    moveTask(taskElement, "uncompleted-tasks", "completed-tasks");
  }
});

$(".completed-tasks").addEventListener("click", (event) => {
  if (event.target.type === "checkbox") {
    const taskElement = event.target.parentNode;
    moveTask(taskElement, "completed-tasks", "uncompleted-tasks");
  }
});
// hidden delete
function hideDeleteButton(taskElement) {
  const deleteButton = taskElement.querySelector(".deleteButton");
  if (deleteButton) {
    deleteButton.style.display = "none";
  }
}

// show delete
function showDeleteButton(taskElement) {
  const deleteButton = taskElement.querySelector(".deleteButton");
  if (deleteButton) {
    deleteButton.style.display = "inline";
  }
}
