import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
from datetime import datetime, timedelta
import sys
import math
import json

# initialize firebase
cred = credentials.Certificate('./milestones-firebase-sdk.json')
default_app = firebase_admin.initialize_app(cred) 
db = firestore.client()

#dueDate = datetime.strptime("4/28/2018", "%m/%d/%Y")
#dueDate = dueDate - timedelta(days=2)
#print(dueDate)
#dueDate = datetime.strptime("Mon, 23 Apr 2018 00:00:00 GMT", "%a, %d %b %Y %H:%M:%S %Z")
#dueDate = datetime.strptime("04/23/2018", "%m/%d/%Y")
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

def obj_dict(obj):
    return obj.__dict__

def addProject(user,project):

    dueDate = datetime.strptime(project.dueDate, "%m/%d/%Y")
    now = datetime.today()
    now = now.replace(hour=0, minute=0, second=0, microsecond=0)
    days = dueDate - now
    #print(days, file=sys.stdout)
    numMileStones = len(project.mileStones)

    usedDays = days.days - 1
    dayRatio = usedDays/numMileStones

    prevDate = dueDate
    dayDet = 0
    for i in range(numMileStones-1,-1,-1):
        if dayDet == 0:
            project.mileStones[i].dueDate = (dueDate - timedelta(days=round(1))).strftime('%m/%d/%Y')
            prevDate = prevDate - timedelta(days=round(1))
        else:
            if dayDet > round(dayDet + 0.000001):
                project.mileStones[i].dueDate = (prevDate - timedelta(days=round(dayDet))).strftime('%m/%d/%Y')
            elif dayDet < round(dayDet + 0.000001):
                project.mileStones[i].dueDate = (prevDate - timedelta(days=round(dayDet + 0.000001))).strftime('%m/%d/%Y')
            else:
                project.mileStones[i].dueDate = (prevDate - timedelta(days=round(dayDet))).strftime('%m/%d/%Y')
            #project.mileStones[i].dueDate = (prevDate - timedelta(days=round(dayDet))).strftime('%m/%d/%Y')
        #print(project.mileStones[i].dueDate, file=sys.stdout)
        dayDet += dayRatio

    #print(project.mileStones, file=sys.stdout)
    projectRef = db.collection('users').document(str(user.id)).collection('projects').document(str(project.id))
    projectRef.set({
        u'name': project.name,
        u'completed': False,
        u'id': project.id,
        u'dueDate': project.dueDate,
        u'mileStones': json.loads(json.dumps(project.mileStones,default=obj_dict)),
    })

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

def updateMilestone(uid,pid,mileStone):
    # TODO firebase call for updating milestones
    print(uid,pid,mileStone)
    
def updateProject(user,project):
    projectRef = db.collection('users').document(str(user.id)).collection('projects').document(str(project.id))
    print(user.id, file=sys.stdout)
    print(project.id, file=sys.stdout)
    print(project.mileStones, file=sys.stdout)
    projectRef.update({
        #u'name': project.name,
        u'completed': project.completed,
        #u'id': project.id,
        #u'dueDate': project.dueDate,
        u'mileStones': project.mileStones#json.loads(json.dumps(project.mileStones,default=obj_dict)),
    })