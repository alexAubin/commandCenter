var units  = [];
var groups = [];

var canvas
var ctx

function init()
{
    canvas = document.getElementById('canvas');
    ctx    = canvas.getContext('2d');

    canvas.width = 1200;
    canvas.height = 400;

    // This starts the drawing loop
    draw()

    printDebug("Initialization complete.")

    // Get the monitoring summary (json file) + update the view
    loadMonitoringSummary()

}

function loadMonitoringSummary() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            commandCenterUpdate(xhttp.responseText)
        }
        else
        {
            printDebug("Error while loading monitoring summary")
        }
    };
    xhttp.open("GET", "./monitorSummary.json", true);
    xhttp.send();
}

function commandCenterUpdate(rawJson)
{
    // FIXME : maybe first delete objects that were in the tabulars
    units = [];
    group = [];
           
    printDebug(rawJson)

    json = JSON.parse(rawJson)

    for (groupName in json) 
    {
        var x      = json[groupName].x
        var y      = json[groupName].y
        var size   = json[groupName].size
        var nSlots = json[groupName].nSlots

        var group = new PolyReg(groupName, x, y, size, nSlots)

        groups.push(group)

        var units_ = json[groupName].units
        
        for (unitName in units_)
        {
            var slot = group.getSlot(units_[unitName].slot);
            var unit = new Unit(unitName, slot[0], slot[1]);
            unit.status = units_[unitName].status;
            // + unit.nNotifs
            // + unit.log
            units.push(unit);
        }

    }


}

function clickHandler(event)
{
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    printDebug("in click")
    for (var i = 0; i < units.length; i++) 
    {
        unit = units[i]
        unitX = unit.x        
        unitY = unit.y        
        
        d = distance(mouseX,mouseY,unitX,unitY)

        if (d < unit.r)
        {
            printDebug("click detected on" + i)    
            unit.onclick()
        }
    }

}

function printDebug(msg)
{
    debug.innerHTML = msg
}

function distance(x1,y1,x2,y2)
{
    x = x2 - x1
    y = y2 - y1

    return Math.sqrt(x*x + y*y)
}

