import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
from datetime import datetime, timedelta

# initialize firebase
cred = credentials.Certificate('./milestones-firebase-sdk.json')
default_app = firebase_admin.initialize_app(cred) 
db = firestore.client()

#dueDate = datetime.strptime("Tue, 2 Nov 2011", "%a, %d %b %Y")
#dueDate = dueDate - timedelta(days=3)
#print(dueDate)

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
    for i in range(16):
        id += str(random.randint(1,9))
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

    dayRatio = days/numMileStones

    prevDate = dueDate
    dayDet = 0
    for i in numMileStones:
        if dayDet == 0:
            project.mileStones[i].dueDate = (dueDate.days - 1).strftime('%a, %d %b %Y')
        else:
            if dayDet > round(dayDet,0):
                print('greater')
                prevDate = prevDate - timedelta(day=round(dayDet))
            elif dayDet < round(dayDet,0):
                print('lesser')
            else:
                print('equal')
        dayDet += dayRatio
        



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

