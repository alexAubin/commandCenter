

from datetime import datetime
import glob
import hashlib
import subprocess

#timeFilterTooOld = 3600 * 600

class Monitor :

    def __init__(self, conf) :

        print "init nginx stuff"

        self.filterOlderThan    = 3600 * conf["filterOlderThan"]
        self.accessLogfiles     = glob.glob(conf["accessLogs"])
        self.errorLogfiles      = glob.glob(conf["errorLogs"])
        self.failedAccessWeight = conf["failedAccessWeight"]
        self.errorWeight        = conf["errorWeight"]

        self.status             = "ok"


    def update(self) :


        ## Check logs
        self.parseLogs()

        ## Compute status level
        self.status = "ok"

        sumWeight = len(self.failedAccessLogs) * self.failedAccessWeight \
                  + len(self.errorLogs)        * self.errorWeight

        if (sumWeight > 1) :
            self.status = "warning"
        if (sumWeight > 2) :
            self.status = "error"

        # Check service is running
        output = subprocess.check_output(['ps', '-A'])
        if 'nginx' not in output:
            self.status = "alert"

    def getStatus(self) :

        status = { "status" : self.status,
                   "logs" : self.relevantLogs
                 } 
        
        return status


    ######################
    ###   Parse logs   ###
    ######################

    def parseLogs(self) :

        self.relevantLogs = []
        self.failedAccessLogs = []
        self.errorLogs = []

        # Parse access logs
        for fileName in self.accessLogfiles :
            self.failedAccessLogs.extend(self.parseAccessLog(fileName))
        
        # Parse error logs
        for fileName in self.errorLogfiles :
            self.errorLogs.extend(self.parseErrorLog(fileName))

        self.relevantLogs.extend(self.failedAccessLogs)
        self.relevantLogs.extend(self.errorLogs)
        self.relevantLogs.sort()

    def parseAccessLog(self, fileName) :

        relevantLogs = [ ]

        with open(fileName, 'r') as f:

            for line in f :

                userAndTimestamp, request, code, answer, _, userAgent, _ \
                        = line.split('"')
                code = code.split()[0]

                IP, _, user, timestamp, _ = userAndTimestamp.split()
        
                timestamp = datetime.strptime(timestamp[1:], '%d/%b/%Y:%X')

                # Filter results that are too old
                if (not self.isRecent(timestamp)) :
                    continue
                
                # Filter results that are not error
                if (int(code) < 400) :
                    continue

                userHash = IP+"/"+user+"/"+userAgent
                userHash = int(hashlib.sha1(userHash).hexdigest(), 16) % (10 ** 8)
                
                log = "["+str(timestamp)+"] ["+str(userHash)+"] "+request+" ["+code+"]"
                relevantLogs.append(log)

        return relevantLogs


    def parseErrorLog(self, fileName) :
        
        relevantLogs = [ ]

        with open(fileName, 'r') as f :

            for line in f :

                if (line.startswith("PHP message:")) :
                    continue

                lineSplit = line.split()
                timestamp = datetime.strptime(lineSplit[0]+" "+lineSplit[1],
                        '%Y/%m/%d %X')
                message = ' '.join(lineSplit[5:])
            
                # Filter results that are too old
                if (not self.isRecent(timestamp)) :
                    continue
                
                log = "["+str(timestamp)+"] [Error] "+message[:200]
                relevantLogs.append(log)

        return relevantLogs



    def isRecent(self,timestamp) :
        
        now = datetime.now()
        timeDiff = (now - timestamp).total_seconds()
        if (timeDiff > self.filterOlderThan) :
            return False
        else :
            return True



