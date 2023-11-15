let btnAddTask = document.querySelector('button')
let taskName = document.querySelector('#content')
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let tasks = getTaskFromLocalStorage()
displayTasks(tasks)
    // add task
btnAddTask.addEventListener('click', function() {
        if (!taskName.value) {
            alert('Please add a task')
            return false
        }
        let taskId = this.getAttribute('id')
        let tasks = getTaskFromLocalStorage()
        let task = {
            name: taskName.value
        }
        if (taskId == 0 || taskId) {
            tasks[taskId] = task
            this.removeAttribute('id')
        } else {
            tasks.push(task)
        }
        taskName.value = ''
        localStorage.setItem('tasks', JSON.stringify(tasks))
        displayTasks(tasks)
    })
    // edit task
function editTask(id) {
    let tasks = getTaskFromLocalStorage()
    if (tasks.length > 0) {
        tasks[id]
        taskName.value = tasks[id].name
        btnAddTask.setAttribute('id', id)
    }
}
// delete task
function deleteTask(id) {
    let tasks = getTaskFromLocalStorage()
    tasks.splice(id, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    displayTasks(getTaskFromLocalStorage())
}

function displayTasks(tasks = []) {
    let content = '<ul>'
    tasks.forEach((task, index) => {
        content += `<li>
                        <input type="checkbox" id="myCheckbox" class="class-status" checked>
                        <div class="task-name">${task.name}</div> 
                        <a href="#" onclick="editTask(${index})">Edit</a>
                        <a href="#" onclick="deleteTask(${index})">Delete</a>
                    </li>`
    })
    content += '</ul>'

    document.querySelector('#result').innerHTML = content
}

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}
const tabs = $$('.tab-item')
const panes = $$('.tab-pane')

tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function() {
        $(".tab-item.active").classList.remove('active')
        $(".tab-pane.active").classList.remove('active')

        this.classList.add('active')
        pane.classList.add('active')
    }
})