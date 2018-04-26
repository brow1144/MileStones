class MileStone:
    def __init__ (self, id, name, dueDate, completed):
        self.id = id
        self.name = name
        self.dueDate = dueDate
        self.completed = completed

class Project:
    def __init__ (self, id, name, dueDate, mileStones, completed, hidden):
        self.id = id
        self.name = name
        self.dueDate = dueDate
        self.mileStones = mileStones
        self.completed = completed
        self.hidden = hidden

class User:
    def __init__ (self, id, name, projects):
        self.id = id
        self.name = name
        self.projects = projects
