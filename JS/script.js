       // Lấy dl Local Storage
       let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
       const todoForm = document.getElementById('todoForm');
       //    const addItemInput = document.getElementById('addItem');
       const searchItemInput = document.getElementById('searchItem');
       const itemContainer = document.getElementById('itemContainer');
       const incompleteTaskContainer = document.getElementById('incompleteTaskContainer');
       const completedTaskContainer = document.getElementById('completedTaskContainer');
       const taskModal = document.getElementById('taskModal');
       const taskInput = document.getElementById('taskInput');
       const addTaskButton = document.getElementById('addTaskButton');
       const closeModal = document.getElementById('closeModal');

       addTaskButton.addEventListener('click', () => {
           taskModal.style.display = 'block'; // Hiển thị popup khi người dùng nhấn nút "Add"
       });

       closeModal.addEventListener('click', () => {
           taskModal.style.display = 'none'; // Ẩn popup khi người dùng nhấn nút đóng
       });
       // danh sách task
       function displayTasks() {
           incompleteTaskContainer.innerHTML = '';
           completedTaskContainer.innerHTML = '';
           const searchKeyword = searchItemInput.value.toLowerCase();

           tasks.forEach((task, index) => {
               const taskStatusClass = task.completed ? 'completed' : '';
               if (task.task.toLowerCase().includes(searchKeyword)) {
                   const taskItem = document.createElement('div');
                   taskItem.className = 'item-class';
                   taskItem.innerHTML = `
                    <div class="input-group">
                        <input type="checkbox" checked class="task-status" name="task-status">
                        <input type="text" class="form-control ${taskStatusClass}" value="${task.task}" readonly>
                        <input type="hidden" class="taskId" value="${index}">
                        <div class="input-group-append">
                            <button class="btn btn-delete deleteButton">Delete</button>
                            <button class="btn btn-edit editButton">Edit</button>
                        </div>
                    </div>
                    `;

                   if (task.completed) {

                       completedTaskContainer.appendChild(taskItem); // add task completed
                   } else {
                       incompleteTaskContainer.appendChild(taskItem); // add task incompleted
                   }
               }
           });
       }
       itemContainer.addEventListener('change', (e) => {
           if (e.target.classList.contains('task-status')) {
               const taskItem = e.target.closest('.item-class');
               const taskId = taskItem.querySelector('.taskId').value;
               const task = tasks[taskId];
               task.completed = !task.completed;
               displayTasks();
           }
       });
       addTaskButton.addEventListener('click', () => {
           const newTask = taskInput.value;
           if (newTask.trim() !== '') {
               tasks.push({
                   task: newTask,
                   completed: false
               });
               localStorage.setItem('tasks', JSON.stringify(tasks));
               displayTasks();
               taskInput.value = '';
               closeModal.click(); // Đóng modal sau khi thêm task
           }
       });
       addTaskButton.addEventListener('click', () => {
           taskModal.style.display = 'block'; // Hiển thị popup khi người dùng nhấn nút "Add"
       });

       closeModal.addEventListener('click', () => {
           taskModal.style.display = 'none'; // Ẩn popup khi người dùng nhấn nút đóng
       });

       addTaskButton.addEventListener('click', () => {
           const newTask = taskInput.value;
           if (newTask.trim() !== '') {
               tasks.push({
                   task: newTask,
                   completed: false
               });
               localStorage.setItem('tasks', JSON.stringify(tasks));
               displayTasks();
               taskInput.value = '';
               taskModal.style.display = 'none'; // Đóng modal sau khi thêm task
           }
       });

       // ... (không thay đổi phần này)

       // Xử lý sự kiện tìm kiếm
       searchItemInput.addEventListener('input', () => {
           displayTasks();
       });

       displayTasks();


       displayTasks();

       // Thêm task

       const addButton = document.getElementById('addButton');
       addButton.addEventListener('click', () => {
           taskModal.style.display = 'block';
       });

       // Đóng modal khi bấm vào nút đóng
       closeModal.addEventListener('click', () => {
           taskModal.style.display = 'none';
       });

       // Đóng modal khi bấm nút ngoài modal
       window.addEventListener('click', (event) => {
           if (event.target == taskModal) {
               taskModal.style.display = 'none';
           }
       });

       // Xử lý sự kiện tìm kiếm
       searchItemInput.addEventListener('input', () => {
           displayTasks();
       });

       displayTasks();
       // Xóa task
       itemContainer.addEventListener('click', function(event) {
           if (event.target.classList.contains('deleteButton')) {
               const taskId = event.target.parentElement.parentElement.querySelector('.taskId').value;
               tasks.splice(taskId, 1);
               localStorage.setItem('tasks', JSON.stringify(tasks));
               displayTasks();
           }
       });

       // Chỉnh sửa task
       itemContainer.addEventListener('click', function(event) {
           if (event.target.classList.contains('editButton')) {
               const taskId = event.target.parentElement.parentElement.querySelector('.taskId').value;

               // form chỉnh sửa task
               const taskItem = event.target.parentElement.parentElement;
               const editForm = document.createElement('div');
               editForm.className = 'item-class';
               editForm.innerHTML = `
                    <div class="input-group">
                        <input type="text" class="form-control" id="editedTaskName" value="${tasks[taskId].task}">
                        <input type="hidden" class="taskId" value="${taskId}">
                        <div class="input-group-append">
                            <button class="btn btn-edit saveButton">Save</button>
                            <button class="btn btn-delete cancelButton">Cancel</button>
                        </div>
                    </div>
                `;

               taskItem.replaceWith(editForm);

               // Lưu or hủy chỉnh sửa task
               editForm.addEventListener('click', function(event) {
                   if (event.target.classList.contains('saveButton')) {
                       const updatedTaskName = editForm.querySelector('#editedTaskName').value;
                       tasks[taskId].task = updatedTaskName;
                       localStorage.setItem('tasks', JSON.stringify(tasks));
                       displayTasks();
                   } else if (event.target.classList.contains('cancelButton')) {
                       displayTasks();
                   }
               });
           }
       });

       // search task 
       searchItemInput.addEventListener('input', function() {
           displayTasks();
       });

       displayTasks();