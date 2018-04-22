import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
from datetime import datetime

# initialize firebase
cred = credentials.Certificate('./milestones-firebase-sdk.json')
default_app = firebase_admin.initialize_app(cred) 
db = firestore.client()



def addUser(user):
    userRef = db.collection('users').document(str(user.id))
    userRef.set({
        u'name': user.name,
        u'id': user.id
    })

def getUsers():
    usersRef = db.collection('users').get()
    return usersRef

def getUserById(userId):
    userRef = db.collection('users').where(u'id', u'==', str(userId))
    return (userRef.get(), getAllProjects(userId))
    
def idGenerator():
    id = ""
    for i in range(6):
        id += random.randint(1,10)
    return id

def addProject(user,project):
    #print(project)
    project.dueDate = "Tue, 22 Nov 2011"
    #print(time.strptime("Tue, 22 Nov 2011", "%a, %d %b %Y"))
    dueDate = datetime.strptime(project.dueDate, "%a, %d %b %Y")
    now = datetime.now()
    days = dueDate - now
    print(days)
    numMileStones = len(project.mileStones)
    print(numMileStones)



'''    projectRef = db.collection('users').document(str(user.ID)).collection('projects').document(str(project.ID))
    projectRef.set({
        u'name': project.name,
        u'completed': False,
        u'dueDate': project.dueDate,
        u'mileStones': [],
    }) '''

def getAllProjects(uid):
    projectsRef = db.collection('users').document(uid).collection('projects').get()
    return projectsRef

def addMileStone(uid,pid,mileStone):
    print('yes')

def getMilestones(uid):
    projectRef = db.collection('users').document(uid).collection('projects').get()
    stones = []
    for doc in projectRef:
        for ms in doc.mileStones:
            stones.append(ms) 
    return stones

def getMilestonesByProject(uid,pid):
    milesRef = db.collection('users').document(uid).collection('project').document(pid)
    return milesRef

