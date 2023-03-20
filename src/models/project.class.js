import { STATUS } from './status.enum'
import { ACTIVE, PRIORITY }  from './priority.enum'

export class Project {
    constructor (title, description, dueDate, image) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.tasks = [];
        this.favorite = false;
        this.image = image;
    }
}

export class Task {
    constructor(title, description, dueDate){
        this.title = title;
        this.description = description;
        this.dueDate  = dueDate;
        this.status = STATUS.REQUEST;
        this.subtasks = [];
        this.members = [];
        this.tag = [];
    }
}

export class Subtask {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }
}