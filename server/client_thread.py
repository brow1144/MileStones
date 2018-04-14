import threading

BUFSIZE = 10000 

class Error(Exception):
    pass

class ConnectionError(Error):
    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

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
                    raise ConnectionError('Client disconnect','message')
        except:
            client.close()
            return
            
    def handleRequest(self, client, addr, data):
        print(data)
        client.send(data)
