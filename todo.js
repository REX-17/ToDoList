
let taskCount = 0;
let remainingTasks = 0;
const taskHistory = [];


function addTask() {
    taskCount++;
    remainingTasks++;
    const taskTableBody = document.getElementById('taskTableBody');

    const newRow = document.createElement('tr');
    newRow.id = `taskRow${taskCount}`;
    newRow.innerHTML = `<td><input type="text" class="form-control task-input" placeholder="Enter task"></td><td>
            <select class="form-select" id="progressSelect${taskCount}">
                <option value="notStarted" selected>Not Started Yet</option>
                <option value="inProgress">In Progress</option>
            </select>
        </td>
        <td><input type="checkbox" id="doneCheck${taskCount}"></td>
        <td class="date-completed" id="dateCompleted${taskCount}"></td>`;
        
    // Event listeners for the new input
    const taskInput = newRow.querySelector('.task-input');
    taskInput.addEventListener('focus', function() {
        this.classList.add('expanded');
    });

    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            this.classList.remove('expanded');
            this.blur(); // Optionally blur the input to lose focus
        }
    });

    const doneCheckbox = newRow.querySelector(`#doneCheck${taskCount}`);
    doneCheckbox.addEventListener('change', function() {
        if (doneCheckbox.checked) {
            const dateCompletedCell = newRow.querySelector('.date-completed');
            const currentDate = new Date();
            const completedDay = String(currentDate.getDate()).padStart(2, '0');
            const completedMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
            const completedYear = currentDate.getFullYear();
            dateCompletedCell.textContent = `${completedDay}-${completedMonth}-${completedYear}`;
            disableTaskRow(newRow);
        }
    });

    taskTableBody.appendChild(newRow);
    taskHistory.push(newRow);
    document.getElementById('undoBtn').disabled = false;
    document.getElementById('removeDoneBtn').disabled = false;
    updateTaskCounter();
}


function disableTaskRow(row) {
    row.classList.add('disabled-row');
    row.querySelectorAll('input, select').forEach(element => element.disabled = true);
    if (remainingTasks > 0) {
        remainingTasks--;
    }
    updateTaskCounter();
}

function undoTask() {
    if (taskHistory.length > 0) {
        const lastTask = taskHistory.pop();
        lastTask.remove();
        taskCount--;
        remainingTasks = Math.max(0, remainingTasks - 1);
    }
    if (taskHistory.length === 0) {
        document.getElementById('undoBtn').disabled = true;
    }
    updateTaskCounter();
}

function removeDoneTasks() {
    const rows = document.querySelectorAll('#taskTableBody tr');
    rows.forEach(row => {
        const doneCheckbox = row.querySelector('input[type="checkbox"]');
        if (doneCheckbox && doneCheckbox.checked) {
            row.remove();
        }
    });
    remainingTasks = document.querySelectorAll('#taskTableBody tr').length;
    updateTaskCounter();
    if (remainingTasks === 0) {
        document.getElementById('removeDoneBtn').disabled = true;
    }
}

function updateTaskCounter() {
    document.getElementById('taskCounter').textContent = remainingTasks;
}

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('undoBtn').addEventListener('click', undoTask);
document.getElementById('removeDoneBtn').addEventListener('click', removeDoneTasks);

// Trigger login modal on button click

document.getElementById('loginBtn').addEventListener('click', function() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
});


function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = currentDate.toLocaleDateString(undefined, options);
}

displayCurrentDate();

document.querySelector('.btn.bg-info.text-white.m-2:nth-of-type(1)').addEventListener('click', function() {
    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.show();
});

