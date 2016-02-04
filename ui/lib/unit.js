
var transparent = 'rgba(0,0,0,0)'

var white       = 'rgba(255,255,255,0.7)';

var darkGray    = 'rgba(60, 60, 60, 1)';
var midGray     = 'rgba(130,130,130,1)';
var lightGray   = 'rgba(180,180,180,1)';

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
    this.status  = "off";
    this.update  = unitUpdate;
    this.draw    = unitDraw;
    this.onclick = unitClick;

    this.r       = 15;
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
    if (this.status == "off")
    {
        var darkColor      = darkGray;
        var outerRingColor = midGray;
        var innerRingColor = lightGray;
        var auraColor      = transparent;
    }
    else if (this.status == "alert")
    {
        var darkColor      = darkRed;
        var outerRingColor = lightRed;
        var innerRingColor = lightRed;
        var auraColor      = auraRed;
    }

    var x = this.x
    var y = this.y
    var r = this.r

    drawRing(x, y, r * 0.5,   r * 0.4,   darkColor);
    drawRing(x, y, r * 0.86,  r * 0.28,  outerRingColor);
    drawRing(x, y, r * 0.6,   r * 0.06,  innerRingColor);

    if (this.status != "off")
    {
        drawArc (x, y, r * 1.13,  1,     white);
        drawAura(x, y, r * 1.5,          auraColor);
    }
    
    drawText(x, y + r*2, this.name)

}

