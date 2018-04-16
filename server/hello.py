from flask import Flask, jsonify, request
import json
import fb_functions as fb

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
    usr = fb.getUserById(id);
    d = {}
    for u in usr:
        d = u.to_dict()
    respj = { 'user': d }
    return jsonify(respj)

@app.route("/users/<id>", methods=['POST'])
def new_user(id):
    return '', 204

@app.route("/users", methods=['POST'])
def add_user():
    users.append(request.get_json())
    return '', 204