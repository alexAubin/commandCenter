
var unitSize    = 40;

var transparent = 'rgba(0,0,0,0)'

var white       = 'rgba(255,255,255,0.7)';

var darkGreen   = 'rgba(30,140,30,1)';
var auraGreen   = 'rgba(30,255,30,0.35)';
var midGreen    = 'rgba(110,180,110,1)';
var lightGreen  = 'rgba(160,250,160,1)';

var darkRed     = 'rgba(140,30,30,1)';
var auraRed     = 'rgba(255,30,30,0.35)';
var lightRed    = 'rgba(250,80,80,1)';

function Unit(name, x, y)
{
    this.name    = name;
    this.x       = x;
    this.y       = y;
    this.status  = "inactive";
    this.update  = unitUpdate;
    this.draw    = unitDraw;
    this.onclick = unitClick;
}

function unitUpdate(newStatus)
{
    this.status = newStatus;
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

    drawRing      (x, y, unitSize*0.5,  unitSize*0.4,  darkColor);
    drawRing      (x, y, unitSize*0.86,  unitSize*0.28, outerRingColor);
    drawRing      (x, y, unitSize*0.6,   unitSize*0.06, innerRingColor);
    drawArc       (x, y, unitSize*1.13,  1, white);
    drawAura      (x, y, unitSize*1.5,   auraColor);
}

function drawFullCircle(x, y, r, color)
{
    ctx.beginPath();
    //ctx.arc(x, y, r, 0.8 * Math.PI, 1.3 * Math.PI);
    ctx.arc(x, y, r, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawRing(x, y, r, w, color)
{
    ctx.beginPath();
    //ctx.arc(x, y, r, 0.9 * Math.PI, 2.1 * Math.PI);
    ctx.arc(x, y, r, 0 * Math.PI, 2 * Math.PI);
    ctx.lineWidth = w
    ctx.strokeStyle = color;
    ctx.stroke();
    //ctx.fill();
}

function drawAura(x, y, r, color)
{
    ctx.beginPath();
    var gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0,    color);
    gradient.addColorStop(0.3,  transparent);
    gradient.addColorStop(0.5,  transparent);
    gradient.addColorStop(0.75, color);
    gradient.addColorStop(1,    transparent);
    //ctx.arc(x, y, r, 0.9 * Math.PI, 2.1 * Math.PI);
    ctx.arc(x, y, r, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
}

function drawArc(x, y, r, w, color)
{
    var speed = 1000
    var offset = Math.round((new Date()).getTime() / 10) % speed / speed
    ctx.beginPath();
    ctx.arc(x, y, r, (0+offset*2) * Math.PI, (1.6+offset*2) * Math.PI);
    ctx.lineWidth = w
    ctx.strokeStyle = color;
    ctx.stroke();
}
