import socket
import threading
import client_thread
import fb_functions
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

host = 'localhost'
portNum = 8080


# set up socket
serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.setsockopt(socket.SOL_SOCKET, socket.SOCK_STREAM, 1)

serverSocket.bind((host, portNum))
serverSocket.listen(1)

user = type('obj',(object,), {'name' : 'NIck', 'ID' : 123456789})
fb_functions.addUser(user)
'''
# initialize firebase
cred = credentials.Certificate('./milestones-firebase-sdk.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

'''


threadCount = 1
# Address requests
while 1:
    client, addr = serverSocket.accept()
    t = client_thread.clientThread(1, "Thread", 1)
    t.run(client, addr)
    threadCount = threadCount + 1
    