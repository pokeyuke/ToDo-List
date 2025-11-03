   /* This is the class responsable for all the logic behing this project */


        class ToDo{

            constructor(title,description,dueDate,priority, notes, completed){
                this.title = title;
                this.description = description;
                this.dueDate = dueDate;
                this.priority = priority;  //   0 <= i <= 10
                this.notes = notes;
                this.completed = completed //bool

                }

                toggleComplete(completed){
                this.completed = !this.completed
                }

        }

        class Project{
            // quanti progetti ci sono inizialmente
            static idCounter = 0;

            constructor(name){
                this.name = name;
                this.todos = [];  // lista vuota di ToDos
                this.id = Project.idCounter++
               
            }

        

            addToDo(titles,description,dueDate,priority,notes,completed){
                const newToDo = new ToDo(titles,description,dueDate,priority,notes,completed)    
                this.todos.push(newToDo);  // quanti t
            }

            removeToDo(index){
                this.todos.splice(index, 1) // rimuove il toDo a partire dalla sua posizione
            }
        
                
                sortByMaxPriority(){    //sort the array by decresing priority
                    return this.todos.toSorted((a,b) => b.priority - a.priority);
                        
                }

                sortByMinPriority(){
                    return this.todos.toSorted((a,b) => a.priority - b.priority)
                }

            searchToDo(name){
                return this.todos.find(todo => todo.title === name)
            }

            getCompleteToDo(){
                return this.todos.filter(todo => todo.completed)
            }

            getIncompleteToDo(){
                return this.todos.filter(todo => !todo.completed)
            }

            editToDo(todoTitle,newDescription,newDueDate,newPriority,newNotes,newCompleted){

                const todo = this.searchToDo(todoTitle)

              
                 if (todo) {  // Make sure the todo exists
                todo.title = todoTitle
                todo.description = newDescription;
                todo.dueDate = newDueDate;
                todo.priority = newPriority;
                todo.notes = newNotes;
                todo.completed = newCompleted;
                 }
                }
            

        }

        class ProjectManager{

            

            constructor(){
                this.projects = [];
                this.currentProject = null;
            }

            addProject(name){
                const newProject = new Project(name);
                this.projects.push(newProject)
            }

            removeProject(index){
                this.projects.splice(index, 1);
            }

            getCurrentProject(){
                return this.currentProject;
            }

            setCurrentProject(id){ // seach a project with that ID and set it as the current. If make sure the project exists
                const project = this.projects.find(p => p.id === id);
                if(project){
                    this.currentProject = project;
                }
            }

            searchProject(name){
                return this.projects.find(p => p.name === name)
            }



        }

            // ONLY ONE PROJECT MANAGER: SINGLETON PATTERN
            const manager = new ProjectManager()
            manager.addProject("Default");
            manager.setCurrentProject(0);  //id 0 since it's the first project.

            export default manager
        







