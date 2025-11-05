import manager from "./logic";
import { format } from "date-fns";

const ToDoForm = document.getElementById("ToDoForm")
const app = document.getElementById("app")
const sidebar = document.getElementById("sidebar")
const addNewProject = document.getElementById("add-new-project");
const projectList = document.getElementById("projects-list")
const mainContent = document.getElementById("main-content")
const projectHeader = document.getElementById("project-header")
const currentProjectName = document.getElementById("current-project-name")
const addToDoButton = document.getElementById("add-todo-btn")
const todosList = document.getElementById("todos-list")
const toDoFormModal = document.getElementById("todo-form-modal")
const completed = document.getElementById("completed")

//Phase 1: Just display the Default project and any todos (even if empty)
//Phase 2: Add ability to create a new todo
//Phase 3: Add ability to mark todos complete
//Phase 4: Add project switching
//Phase 5: Add all the other features

function renderProjects(){
    var renderedProjects = manager.projects
    projectList.textContent = "";

    renderedProjects.forEach(project => {
        
        const projectDiv = document.createElement("div")
        projectDiv.setAttribute("class", "projs")
        projectDiv.textContent = project.name
        projectList.appendChild(projectDiv)

        //fa diventare "cliccabile" il progetto
         projectDiv.addEventListener("click", () => {
            manager.setCurrentProject(project.id);
            renderTodos();
        });
    });
}

renderProjects();


function renderTodos(){
    const currentProject = manager.getCurrentProject();
    const todos = currentProject.todos;
    todosList.textContent = "";


    todos.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todos");

    if (todo.priority >= 8) todoDiv.classList.add("high");
    else if (todo.priority >= 4) todoDiv.classList.add("medium");
    else todoDiv.classList.add("low");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;

    checkBox.addEventListener("change", () => {
        todo.toggleComplete();
        renderTodos();
    });

        let formattedDate = "";
        if (todo.dueDate) {
            try {
                formattedDate = format(new Date(todo.dueDate), "MMM d, yyyy");
            } catch {
                formattedDate = todo.dueDate; // fallback if invalid
            }
        }


        todoDiv.appendChild(checkBox);
         todoDiv.appendChild(document.createTextNode(todo.title));

           //  colore per priorità
        if (todo.priority >= 8) todoDiv.style.backgroundColor = "#ffb3b3";
        else if (todo.priority >= 4) todoDiv.style.backgroundColor = "#ffe680";
        else todoDiv.style.backgroundColor = "#b3ffb3";
        // 

        //   Tasto per vedere i dettagli
        const expandBtn = document.createElement("button");
        expandBtn.textContent = "🔽";
        todoDiv.appendChild(expandBtn);

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("hidden");
        detailsDiv.innerHTML = `
            <p><strong>Description:</strong> ${todo.description || ""}</p>
            <p><strong>Priority:</strong> ${todo.priority}</p>
            <p><strong>Notes:</strong> ${todo.notes || ""}</p>
            <button class="edit-todo">Edit</button>
            <button class="delete-todo">🗑️ Delete</button>
        `;
        todoDiv.appendChild(detailsDiv);

        expandBtn.addEventListener("click", () => {
            detailsDiv.classList.toggle("hidden");
        });

        // Rimuove todo
               (() => {
            const i = index; //

            //
            detailsDiv.querySelector(".delete-todo").addEventListener("click", () => {
        currentProject.removeToDo(index);
        renderTodos();
    });

            // Edit todo
            detailsDiv.querySelector(".edit-todo").addEventListener("click", () => {
                const newDesc = prompt("Edit description:", todo.description);
                const newDate = prompt("Edit due date (YYYY-MM-DD):", todo.dueDate);
                const newPriority = prompt("Edit priority (1-10):", todo.priority);
                const newNotes = prompt("Edit notes:", todo.notes);

                currentProject.editToDo(
                    todo.title,
                    newDesc,
                    newDate,
                    parseInt(newPriority),
                    newNotes,
                    todo.completed
                );
                renderTodos();
            });
        })();
        

        todosList.appendChild(todoDiv)
    })
    
}


    addToDoButton.addEventListener("click", () => {
        ToDoForm.classList.remove("hidden")
    });


    ToDoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        
        const titles = ToDoForm.name.value.trim();
            const description = ToDoForm.description.value.trim()
            const dueDate = ToDoForm.dueDate.value.trim()
            const priority = ToDoForm.priority.value.trim()
            const notes = ToDoForm.notes.value.trim();
            const completed = ToDoForm.completed.checked
        
        
        manager.getCurrentProject().addToDo(titles,description,dueDate,priority,notes,completed);
        
        renderTodos();
        
        ToDoForm.reset();
        ToDoForm.classList.add("hidden")
    });

    const cancelButton = document.getElementById("cancel");

    cancelButton.addEventListener("click", () => {
        ToDoForm.reset();  
        ToDoForm.classList.add("hidden");  
    });

document.getElementById("year").textContent = new Date().getFullYear();
    

addNewProject.addEventListener("click", () => {
    const projectName = prompt("Enter new project name:");
    if (projectName && projectName.trim() !== "") {
        manager.addProject(projectName.trim());

        //cambia il progetto nuovo a quello attuale
        const newProject = manager.projects[manager.projects.length - 1];
        manager.setCurrentProject(newProject.id);

        renderProjects();
        renderTodos();
    }
});

