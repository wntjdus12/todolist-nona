let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode='all';
let filterList=[];

document.getElementById("task-input").addEventListener("focus", function() {
    document.querySelector(".input-area").classList.add("active");
});

document.getElementById("task-input").addEventListener("blur", function() {
    document.querySelector(".input-area").classList.remove("active");
});


for (let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",(event)=> filter(event))
}




addButton.addEventListener("click", (event)=> addTask(event));
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
        event.target.value = ""; // 입력 필드 초기화
    }
});

function addTask() {
    let taskValue = taskInput.value; 
    if (taskValue === "") return; // 공백만 입력된 경우 무시
    
    let task = {
        id: randomIDGenerate(),
        taskContent: taskValue,
        isComplete: false,
    };
    taskList.push(task);
   
    render();
    taskInput.value = ""; 
}

function render() {
    let list=[];
    if(mode ==="all"){
        list = taskList
    }else if(mode ==="ongoing" || mode === "done"){
        list = filterList
    }

    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        resultHTML += `
            <div class="task ${list[i].isComplete ? 'task-done' : ''}">
                <div >
                    ${list[i].taskContent}
                </div>
                <div>
                    ${list[i].isComplete ? `
                        <button class="rotate-btn" onclick="toggleComplete('${list[i].id}')">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    ` : `
                        <button class="check-btn" onclick="toggleComplete('${list[i].id}')">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    `}
                    <button class="delete-btn" onclick="deleteTask('${list[i].id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`
    }
    document.getElementById("task-board").innerHTML = resultHTML;
    addAnimation();
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    updateFilterList(); // 버튼을 클릭할때 filterList 를 갱신해주고 다시 render()을 실행
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    updateFilterList(); // 버튼을 클릭할때 filterList 를 갱신해주고 다시 render()을 실행
    render();
}
function updateFilterList(){
    filterList=[];
    if ( mode === "ongoing"){
        filterList = taskList.filter(task => !task.isComplete); //isComplete = false
    } else if (mode === "done"){
        filterList = taskList.filter(task => task.isComplete) //isComplete = false
    }
}

function filter(event) {
    mode = event.target.id;
     filterList = [];
    if(mode ==="all"){
        //전체
        render();
    }else if(mode === "ongoing"){
        //진행중
        //task.isCompleted = false
        for (let i=0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        console.log("진행",filterList)
        render();
    } else if(mode === "done"){
        //끝남
        //task.isCompleted = true
        for (let i=0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();

    }
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addAnimation() {
    document.querySelectorAll(".check-btn").forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.2)";
            button.style.transition = "transform 0.2s";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.2)";
            button.style.transition = "transform 0.2s";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });
}

