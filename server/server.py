import socket
import threading
import client_thread

host = 'localhost'
portNum = 8080

# set up socket
serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.setsockopt(socket.SOL_SOCKET, socket.SOCK_STREAM, 1)

serverSocket.bind((host, portNum))
serverSocket.listen(1)

threadCount = 1
# Address requests
while 1:
    client, addr = serverSocket.accept()
    t = client_thread.clientThread(1, "Thread", 1)
    t.run(client, addr)
    threadCount = threadCount + 1
    