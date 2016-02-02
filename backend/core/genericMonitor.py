

class Monitor :

    def __init__(self, 
                 tag="default",
                 name="Default monitor", 
                 category="others") :
    
        self.tag      = tag
        self.name     = name
        self.category = category
        self.status   = "inactive"

        self.logs = []




    def writeToTxt() :

        with open("monitor"+self.tag, 'w') as f:
            
            f.write(self.name+"\n")
            f.write(self.hoverText+"\n")
            f.write(self.displayX+","+self.displayY+"\n")
            f.write(self.status+"\n")

            for line in logs :
                f.write(self.logs+"\n")





