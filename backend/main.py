


import json
import time
from pprint import pprint

monitors = { }

def main() :

    # Get general configuration
    with open("conf.json") as f :

        conf = json.load(f)

    refresh = conf["refresh"]



    # Load all monitors
    for group in conf["groups"] :
        
        print group
           
        print conf["groups"][group]["monitors"]

        for monitor in conf["groups"][group]["monitors"] :
            
            print "Loading monitor for " + monitor + " in group " + group

            loadMonitor(monitor)

    # Create monitor summary
    while True :

        # Update/refresh monitor
        for (name, monitor) in monitors.iteritems() :

            print "Updating", name, "..."

            monitor.update()

        # Create status summary
        jsonData = makeMonitoringSummary(conf)

        with open("./monitorSummary.json", "w") as f :
            json.dump(jsonData, f, 
                      indent=4, 
                      separators=(',', ': '))

        time.sleep(refresh)


def loadMonitor(monitorName) :

    # Load monitor package
    package = __import__("monitors."+monitorName, fromlist=[''])

    # Load monitor configuration
    with open("conf/"+monitorName+".json") as f :

        packageConf = json.load(f)

    # Init monitor
    monitors[monitorName] = package.Monitor(packageConf)



def makeMonitoringSummary(conf) :

    jsonData = { }

    for group in conf["groups"] :
    
        groupMonitors = {} 
        currentSlot = 0

        for monitorName in conf["groups"][group]["monitors"] :
            monitor = monitors[monitorName]
            status = monitor.getStatus()
            status["slot"] = currentSlot
            currentSlot = currentSlot + 1
        
            groupMonitors[monitorName] = status;

        jsonData[group] = { "x"      : conf["groups"][group]["x"],
                             "y"      : conf["groups"][group]["y"], 
                             "size"   : conf["groups"][group]["size"], 
                             "nSlots" : conf["groups"][group]["nSlots"], 
                             "units"  : groupMonitors
                          }

    
    return jsonData


    
main()




