var units = [];

var canvas
var ctx

var date = new Date()

function init()
{
    canvas = document.getElementById('canvas');
    ctx    = canvas.getContext('2d');

    canvas.width = 1200;
    canvas.height = 600;

    var myUnit2 = new Unit("Test2",150,400);
    units.push(myUnit2);

    var myUnit = new Unit("Test",400,400);
    myUnit.update("ok")
    units.push(myUnit);

    var myUnit3 = new Unit("Test3",650,400);
    myUnit3.update("evil")
    units.push(myUnit3);

    // This starts the drawing loop
    draw()

    printDebug("Initialization complete.")

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

        if (d < unitSize)
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

