// Project Object
export class Project {
    constructor(id, name, mileStones, dueDate, completed) {
        this.id = id;
        this.name = name;
        this.mileStones = mileStones; // Array of Milestones
        this.dueDate = dueDate; // date
        this.completed = completed; //boolean
    }
}

// Milestone Object
export class MileStone {
    constructor(id, name, dueDate, completed) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate; // date
        this.completed = completed; // boolean
    }
}

// User Object
export class User {
    constructor(id, name, projects) {
        this.id;
        this.name = name;
        this.projects = projects; // Array of Projects
    }
}