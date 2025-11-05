import manager from "./logic";

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
    todosList.textContent = "";


    todos.forEach(todo => {

        const todoDiv = document.createElement("div")
        todoDiv.setAttribute("class", "todos")
        todo.textContent = todo.title
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






