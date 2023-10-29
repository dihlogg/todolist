       // Lấy dl Local Storage
       let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

       const todoForm = document.getElementById('todoForm');
       const addItemInput = document.getElementById('addItem');
       const searchItemInput = document.getElementById('searchItem');
       const itemContainer = document.getElementById('itemContainer');

       // danh sách task
       function displayTasks() {
           itemContainer.innerHTML = '';
           const searchKeyword = searchItemInput.value.toLowerCase();

           tasks.forEach((task, index) => {
               const taskStatusClass = task.completed ? 'completed' : '';
               if (task.task.toLowerCase().includes(searchKeyword)) {
                   const taskItem = document.createElement('div');
                   taskItem.className = 'col-sm-10 offset-sm-1';
                   taskItem.innerHTML = `
                        <div class="input-group mb-3">
                            <input type="text" class="form-control ${taskStatusClass}" value="${task.task}" readonly>
                            <input type="hidden" class="taskId" value="${index}">
                            <div class="input-group-append">
                                <button class="btn btn-danger deleteButton">Delete</button>
                                <button class="btn btn-primary editButton">Edit</button>
                            </div>
                        </div>
                    `;
                   itemContainer.appendChild(taskItem);
               }
           });
       }

       // Thêm task
       todoForm.addEventListener('submit', function(event) {
           event.preventDefault();
           const newTask = addItemInput.value.trim();
           if (newTask) {
               tasks.push({
                   task: newTask,
                   completed: false
               });
               localStorage.setItem('tasks', JSON.stringify(tasks));
               addItemInput.value = '';
               displayTasks();
           }
       });

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
               editForm.className = 'col-sm-10 offset-sm-1';
               editForm.innerHTML = `
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="editedTaskName" value="${tasks[taskId].task}">
                        <input type="hidden" class="taskId" value="${taskId}">
                        <div class="input-group-append">
                            <button class="btn btn-success saveButton">Save</button>
                            <button class="btn btn-danger cancelButton">Cancel</button>
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

       searchButton.addEventListener('click', function() {
           displayTasks();
       });

       displayTasks();