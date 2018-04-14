
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# initialize firebase
cred = credentials.Certificate('./milestones-firebase-sdk.json')
default_app = firebase_admin.initialize_app(cred) 
db = firestore.client()

def addUser(user):
    userRef = db.collection('users').document(str(user.ID))
    userRef.set({
        u'name': user.name
    })

def getUsers():
    usersRef = db.collection('users').get()
    return usersRef
    
def addProject(user,project):
    projectRef = db.collection('users').document(str(user.ID)).collection('projects').document(str(project.ID))
