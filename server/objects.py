class MileStone:
    def __init__ (self, id, name, dueDate, completed):
        self.id = id
        self.name = name
        self.dueDate = dueDate
        self.completed = completed

class Project:
    def __init__ (self, id, name, dueDate, mileStones, completed):
        self.id = id
        self.name = name
        self.dueDate = dueDate
        self.mileStones = mileStones
        self.completed = completed

class MileStone:
    def __init__ (self, id, name, dueDate, completed):
        self.id = id
        self.name = name
        self.projects = projects
