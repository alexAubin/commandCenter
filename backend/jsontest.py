import json






def main() :


    dummyLogs = [ "this is a very long log", "this is another very long log"]

    nginx = { "status" : "ok",  "slot" : -1,"nNotifs" : 3,"logs" : dummyLogs }
    mail  = { "status" : "off", "slot" : 1, "nNotifs" : 0,"logs" : dummyLogs }
    sshd  = { "status" : "evil","slot" : 3, "nNotifs" : 5,"logs" : dummyLogs }

    units = { "nginx" : nginx, 
              "mail"  : mail, 
              "sshd"  : sshd 
            }

    services = { "x"        : 400, 
                 "y"        : 200, 
                 "size"     : 150, 
                 "nSlots"   : 6,
                 "units"    : units } 

    jsonData = { "services" : services } 

    with open("../monitorSummary.json", "w") as f :
        json.dump(jsonData, f, 
                  sort_keys=True, 
                  indent=4, 
                  separators=(',', ': '))






main();








