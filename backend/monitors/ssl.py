
class Monitor :

    def __init__(self, conf) :

        self.status             = "off"


    def update(self) :
        pass

    def getStatus(self) :

        status = { "status" : self.status,
                   "logs" : [ ]
                 } 
        
        return status


