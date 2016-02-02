


#
#class NginxMonitor(Monitor) :
#
#
#    def parseLogs() :
#
#        
#        logFile = "./access.log"
#        
#        with open(logFile, 'r') as f:
# 
#             userAndTimestamp, request, code, answer, _, userAgent = line.split('"')
#
#    
#


from datetime import datetime

timeFilterTooOld = 3600 * 6

def parseAccessLog(fileName) :

    with open(fileName, 'r') as f:

        for line in f :

            userAndTimestamp, request, code, answer, _, userAgent, _ \
                    = line.split('"')
            code = code.split()[0]

            IP, _, user, timestamp, _ = userAndTimestamp.split()
    
            timestamp = datetime.strptime(timestamp[1:], '%d/%b/%Y:%X')

            # Filter results that are too old
            if (not isRecent(timestamp)) :
                continue
            
            # Filter results that are not error
            if (int(code) < 400) :
                continue

            print IP+"/"+user
            print str(timestamp)
            print request
            print code
            print answer
            print userAgent
            print "-----------"


def parseErrorLog(fileName) :

    with open(fileName, 'r') as f :

        for line in f :
        
            if (line.startswith("PHP message:")) :
                continue

            lineSplit = line.split()
            timestamp = datetime.strptime(lineSplit[0]+" "+lineSplit[1],
                    '%Y/%m/%d %X')
            message = ' '.join(lineSplit[5:])

            # Filter results that are too old
            if (not isRecent(timestamp)) :
                continue
            
            print str(timestamp)
            print message


def isRecent(timestamp) :
    
    now = datetime.now()
    timeDiff = (now - timestamp).total_seconds()
    if (timeDiff > timeFilterTooOld) :
        return False
    else :
        return True



parseAccessLog("./access.log")
parseErrorLog("./error.log")

