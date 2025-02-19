let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
        event.target.value = ""; // 입력 필드 초기화
    }
});

function addTask() {
    let taskValue = taskInput.value; // 입력값에서 앞뒤 공백 제거
    if (taskValue === "") return; // 공백만 입력된 경우 무시

    let task = {
        id: randomIDGenerate(),
        taskContent: taskValue,
        isComplete: false,
    };
    taskList.push(task);
    render();
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `
            <div class="task ${taskList[i].isComplete ? 'task-done' : ''}">
                <div >
                    ${taskList[i].taskContent}
                </div>
                <div>
                    ${taskList[i].isComplete ? `
                        <button class="rotate-btn" onclick="toggleComplete('${taskList[i].id}')">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    ` : `
                        <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    `}
                    <button class="delete-btn" onclick="deleteTask('${taskList[i].id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`;
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
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
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

