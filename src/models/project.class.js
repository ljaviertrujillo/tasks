import { STATUS } from './status.enum';
import { PRIORITY }  from './priority.enum';
import { ACTIVE } from './active.enum';


export class Project {
    constructor (title, description, dueDate, lastUpdate, image) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.lastUpdate = lastUpdate
        this.priority = PRIORITY.LOW
        this.active = ACTIVE.ACTIVE
        this.favorite = false;
        this.image = image;
        this.tasks = [];
        this.tags = [];
        this.members = [];
    }
}

export class Task {
    constructor(title, dueDate, lastUpdate){
        this.title = title;
        this.startDate = ''
        this.dueDate  = dueDate;
        this.lastUpdate = lastUpdate;
        this.status = STATUS.INQUEUE;
        this.priority = PRIORITY.LOW;
        this.subtasks = [];
        this.member = ''
        this.isExpanded = false
    }
}

export class Subtask {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }
}