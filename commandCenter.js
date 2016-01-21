
var unitSize    = 100;

var transparent = 'rgba(0,0,0,0)'

var darkGreen   = 'rgba(30,140,30,1)';
var auraGreen   = 'rgba(30,255,30,0.35)';
var midGreen    = 'rgba(110,180,110,1)';
var lightGreen  = 'rgba(160,250,160,1)';

var darkRed     = 'rgba(140,30,30,1)';
var auraRed     = 'rgba(255,30,30,0.35)';
var lightRed    = 'rgba(250,80,80,1)';

var units = [];

var canvas
var ctx

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

    printDebug("Initialization complete.")

}

function Unit(name, x, y)
{
    this.name    = name;
    this.x       = x;
    this.y       = y;
    this.status  = "inactive";
    this.update  = unitUpdate;
    this.draw    = unitDraw;
    this.onclick = unitClick;

    this.draw()

}

function unitUpdate(newStatus)
{
    this.status = newStatus;
    this.draw();
}

function unitClick()
{
    this.update("ok");
}

function unitDraw()
{
    if (this.status == "ok")
    {
        var darkColor      = darkGreen;
        var outerRingColor = lightGreen;
        var innerRingColor = lightGreen;
        var auraColor      = auraGreen;
    }
    if (this.status == "inactive")
    {
        var darkColor      = darkGreen;
        var outerRingColor = midGreen;
        var innerRingColor = lightGreen;
        var auraColor      = transparent;
    }
    else if (this.status == "evil")
    {
        var darkColor      = darkRed;
        var outerRingColor = lightRed;
        var innerRingColor = lightRed;
        var auraColor      = auraRed;
    }

    var x = this.x
    var y = this.y

    drawFullCircle(ctx, x, y, unitSize,      darkColor);
    drawFullCircle(ctx, x, y, unitSize,      outerRingColor);
    drawFullCircle(ctx, x, y, unitSize*0.7,  darkColor);
    drawFullCircle(ctx, x, y, unitSize*0.6,  innerRingColor);
    drawFullCircle(ctx, x, y, unitSize*0.56, darkColor);
    drawAura      (ctx, x, y, unitSize*2,    auraColor);

}

function drawFullCircle(ctx, x, y, r, color)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawAura(ctx, x, y, r, color)
{
    ctx.beginPath();
    var gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0,    color);
    gradient.addColorStop(0.3,  transparent);
    gradient.addColorStop(0.49, transparent);
    gradient.addColorStop(0.5,  color);
    gradient.addColorStop(1,    transparent);
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
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

