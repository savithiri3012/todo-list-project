let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

// Add new task
function addTask() {
    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task;

    // Complete task by clicking
    span.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";

    saveTasks();
}

// Save tasks in browser
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

// Load saved tasks
window.onload = function () {
    taskList.innerHTML = localStorage.getItem("tasks") || "";

    document.querySelectorAll("#taskList li").forEach(function (li) {
        li.querySelector("span").onclick = function () {
            li.classList.toggle("completed");
            saveTasks();
        };

        li.querySelector("button").onclick = function () {
            li.remove();
            saveTasks();
        };
    });
};

// Enter key support
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
