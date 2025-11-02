import "./styles.css";

console.log("HIIIIIII")




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
            this.completed = true
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
                return this.todos.toSorted((a,b) => b.priority - a.priority)
            }

    }

    class ProjectManager{

        

        constructor(){
            this.projects = [];
        }

        addProject(name){
            const newProject = new Project(name);
            this.projects.push(newProject)
        }

        removeProject(index){
            this.projects.splice(index, 1);
        }

        getCurrentProject(){
            return
        }

        setCurrentProject(id){

        }



    }

        // ONLY ONE PROJECT MANAGER: SINGLETON PATTERN
        const manager = new ProjectManager()
        manager.addProject("Default");

        export default manager
    







