from flask import Flask, jsonify, request
import json
import fb_functions as fb
import objects as obj

app = Flask(__name__)

users = [
    {
        'id':       1234,
        'name':     'Nick',
        'projects': 4321
    }
]

@app.route("/")
def hello_world():
    return "Hello, World"

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

@app.route("/users/<id>")
def get_user_by_id(id):
    usr, projects = fb.getUserById(id);
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

@app.route("/users", methods=['POST'])
def new_user(id):
    j = request.get_json()
    newUser = obj.User(j['id'], j['name'], [])
    fb.addUser(newUser)
    return '', 204

@app.route("/users", methods=['POST'])
def add_user():
    users.append(request.get_json())
    return '', 204