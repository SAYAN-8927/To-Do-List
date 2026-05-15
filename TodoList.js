// js file of todo list project
const TaskInput = document.getElementById("taskInput");
const TaskList = document.getElementById("taskList");
const TaskAddButton = document.getElementById("addBtn");
const totalTask = document.getElementById("totalCount");
const doneTask = document.getElementById("doneCount");
const leftTask = document.getElementById("leftCount");
const clearCompleted = document.getElementById("clearBtn");
const taskActive = document.querySelector('[data-filter = "active"]');
const taskDone = document.querySelector('[data-filter = "completed"]');
const taskAll = document.querySelector('[data-filter = "all"]');
const datePrint = document.getElementById("dateDisplay");

TaskAddButton.addEventListener("click", function () {
  let task = TaskInput.value.trim();

  if (task === "") {
    return;
  }

  // create li
  let li = document.createElement("li");
  li.classList.add("task-item");

  // create checkbox
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  // create task text
  let taskText = document.createElement("span");
  taskText.innerText = task;
  taskText.classList.add("task-text");

  // create delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  // checkbox functionality
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed");
    updateStats();
  });

  // delete functionality
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateStats();
  });

  // append elements inside li
  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);

  // append li inside ul
  TaskList.appendChild(li);
  updateStats();

  // clear input
  TaskInput.value = "";
});

TaskInput.addEventListener("keydown",function(event){
    if(event.key === 'Enter'){
        TaskAddButton.click();
    }
})

//update the tasks value
function updateStats(){
    let total = document.querySelectorAll(".task-item").length;
    let done = document.querySelectorAll(".task-item.completed").length;
    let left = total - done;
    totalTask.innerText = total;
    doneTask.innerText = done;
    leftTask.innerText = left;

    const emptyState = document.getElementById("emptyState");
    const visible = document.querySelectorAll(".task-item:not([style*='none'])").length === 0;
    emptyState.classList.toggle("visible", visible);
}
// all clear complted button function
clearCompleted.addEventListener("click",function(){
    let completedTasks = document.querySelectorAll(".task-item.completed");
    completedTasks.forEach(function(item){
        item.remove();
    });
    updateStats();
})

function setActiveFilter(btn) {
    document.querySelectorAll(".filter-btn").forEach(function(b) {
        b.classList.remove("active");
    });
    btn.classList.add("active");
}

// all filter button functions
taskActive.addEventListener("click",function(){
    setActiveFilter(taskActive);
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(function(task){
        if(task.classList.contains("completed")){
            task.style.display = "none";
        }else{
            task.style.display = "flex";
        }
    })
})


taskDone.addEventListener("click",function(){
    setActiveFilter(taskDone);
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(function(task){
        if(task.classList.contains("completed")){
            task.style.display = "flex";
        }else{
            task.style.display = "none";
        }
    })
})


taskAll.addEventListener("click",function(){
    setActiveFilter(taskAll);
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(function(task){ 
            task.style.display = "flex";
    })
})


// display date
document.addEventListener("DOMContentLoaded",function(){
const today = new Date();
  let formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
datePrint.innerText = formattedDate;     
})

