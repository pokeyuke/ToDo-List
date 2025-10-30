import "./styles.css";


class ToDo{

    constructor(title,description,dueDate,priority, notes, completed){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed //bool

        }
}

class Project{
    static quantity = 0;


    constructor(name){
        this.name = name;
        this.todos = [];  // lista vuota di ToDos
        Project.quantity++; // quanti progetti ci sono 
    }
    

    addToDo(titles,description,dueDate,priority,notes,completed){
        const newToDo = new ToDo(titles,description,dueDate,priority,notes,completed)    
        this.todos.push(newToDo);
    }

    removeToDo(index){
        this.todos.splice(index, 1) // rimuove il toDo a partire dalla sua posizione
    }

    filterByDate(){

    }

    filterByPriority(){

    }

}





const project = new project();