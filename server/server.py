from flask import Flask, jsonify, request
import json
import fb_functions as fb
import objects as obj
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "Hello, World"

# get all users
@app.route("/users")
def get_users():
    usrs = fb.getUsers()
    # Build json response with users
    usrList = []
    for usr in usrs:
        d = usr.to_dict()
        usrList.append(d)
    respj = { 'users': usrList }
    return jsonify(respj)

# get a certain user
@app.route("/users/<id>")
def get_user_by_id(id):
    usr, projects = fb.getUserById(id)
    d = {}
    projectList = []
    for u in usr:
        d = u.to_dict()
        for p in projects:
            d2 = p.to_dict()
            projectList.append(d2)
    d['projects'] = projectList
    respj = { 'user': d }
    return jsonify(respj)

# add a new user
@app.route("/users", methods=['POST'])
def new_user():
    j = request.get_json()
    newUser = obj.User(j['id'], j['name'], [])
    fb.addUser(newUser)
    return '', 204

exampleJson = {
    'user': {
        'id': 1234,
        'name': 'Nick'
    },
    'project': {
        'name': 'Essay',
        'dueDate': '4/28/18',
        'mileStones': [
            {
                'name': 'Research'
            },
            {
                'name': 'Outline'
            },
            {
                'name': 'Rough Draft'
            }
        ]
    }
}

# add a new project
@app.route("/users/projects", methods=['POST'])
def new_project():
    j = request.get_json()
    usrJson = j['user']
    projectJson = j['project']
    newUser = obj.User(usrJson['id'], usrJson['name'], [])
    pId = fb.idGenerator()
    newProject = obj.Project(pId, projectJson['name'], projectJson['dueDate'], [], False)
    mileStones = projectJson['mileStones']
    for m in mileStones:
        mID = fb.idGenerator()
        ms = obj.MileStone(mID, m['name'], '', False)
        newProject.mileStones.append(ms)
    # fb.addProject(newUser, newProject)
    return '', 204

# update mileStone
@app.route("/users/projects/mileStone", methods=['PUT'])
def update_mileStone():
    j = request.get_json()
    mileJson = j['mileStone']
    ms = obj.MileStone(mileJson['id'], mileJson['json'], mileJson['completed'])
    fb.updateMilestone(j['uid'], j['pid'])
    return '', 204
