import threading
import errno

BUFSIZE = 10000 

class clientThread (threading.Thread):
    def __init__(self, threadID, name, counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter = counter
    def run(self, client, addr):
        print("Hello World")
        try:
            while True:
                data = client.recv(BUFSIZE)
                if data:
                    # handle request
                    self.handleRequest(client, addr, data)
                else:
                    raise Error('Client dissconnect')
        except:
            client.close()
            return
    def handleRequest(self, client, addr, data):
        client.send(data)
