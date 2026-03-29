 
 
 
 const form = document.getElementById("inputForm");
   
   const taskList = document.getElementById("taskList");
   const addBtn = document.getElementById("add");

    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const markAsDoneBtn = document.createElement("button");

    const taskInputElement = document.getElementById("taskInput");
    const dateInputElement = document.getElementById("dateInput");

    const themeBtn = document.getElementById("togleTheme");

    const filterBtn = document.querySelectorAll(".filterBtn");

    let task = JSON.parse(localStorage.getItem('task'))||[];




    let currentFilter = 'all';



form.addEventListener("submit", function(e){
  e.preventDefault()
   const taskInput = taskInputElement.value;
    const dateInput = dateInputElement.value;

    if(taskInput === "" || dateInput === ""){
        alert("Please enter task and date");
        return;
    }

    const newTask = {
        id: Date.now(),
        taskInput: taskInput,
        dateInput: dateInput,
        completed: false
    }

    task.push(newTask);
    localStorage.setItem("task", JSON.stringify(task));
    taskInputElement.value = "";
    dateInputElement.value = "";
    showTasks();
});

themeBtn.addEventListener("click", function(){

    let currentTheme = document.documentElement.getAttribute("data-theme");
    if(currentTheme === "light"){
        document.documentElement.setAttribute("data-theme", "dark");
        currentTheme = "dark";
        localStorage.setItem("theme", "dark");
    }else{
        document.documentElement.setAttribute("data-theme", "light");
        currentTheme = "light";
        localStorage.setItem("theme", "light");
    }
});


filterBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
       
        currentFilter = btn.getAttribute("taskFilter");

        
        filterBtn.forEach(function(b) {
             b.classList.remove("active");
            
            });
        btn.classList.add("active");

       
        showTasks();
    });
});


function showTasks() {
    const taskList = document.getElementById("taskList");
    
    taskList.innerHTML = "";

    
    for (let i = 0; i < task.length; i++) {
        const currentTask = task[i];

      
        if (currentFilter === "pending" &&currentTask.completed === true) {
            continue; 
        }
       
        if (currentFilter ==="completed"&& currentTask.completed === false) {
            continue; 
        }

       
        const li = document.createElement("li");
        const completedBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        if (currentTask.completed === true) {
            li.classList.add("completed-task");
            completedBtn.textContent = "done";

        } else {
             completedBtn.textContent = "mark as done";
        }

        completedBtn.classList.add("complete-btn");

        completedBtn.addEventListener("click", function() {
            task[i].completed = !task[i].completed;
            localStorage.setItem("task", JSON.stringify(task));
            showTasks();
        });

     
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {
            task.splice(i, 1);                         
            localStorage.setItem("task", JSON.stringify(task));
            showTasks();
        });

        li.innerHTML = `
            <div class="task-info">
                <span class="task-text">${currentTask.taskInput}</span>
                <small>${currentTask.dateInput}</small>
            </div>
        `;

        li.appendChild(completedBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
}

 showTasks();