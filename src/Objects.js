// Milestone Object
export function MileStone(id, name, dueDate) {
    this.id = id;
    this.name = name;
    this.dueDate = dueDate; // date
    this.completed = completed; // boolean
}

// Project Object
export function Project(id, name, mileStones, dueDate, completed) {
    this.id = id;
    this.name = name;
    this.mileStones = mileStones; // Array of Milestones
    this.dueDate = dueDate; // date
    this.completed = completed; //boolean
}

// User Object
export function User(id, name, projects) {
    this.id;
    this.name = name;
    this.projects = projects; // Array of Projects
}