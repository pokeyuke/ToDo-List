import manager from "./logic";

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
    });
}

renderProjects();


function renderTodos(){
    const currentProject = manager.getCurrentProject();
    const todos = currentProject.todos;

    currentProject.forEach(todos => {

        const todoDiv = document.createElement("div")
        todoDiv.setAttribute("class", "todos")
        todos.textContent =
        .appendChild(todos)
    })

}










