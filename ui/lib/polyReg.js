
function PolyReg(name, x, y, r, n)
{
    this.name    = name;
    this.x       = x;
    this.y       = y;
    this.r       = r;
    this.n       = n;
    this.draw    = polyregDraw;
    this.getSlot = polyregGetSlot;
}

function polyregDraw()
{
    var xcenter = this.x
    var ycenter = this.y
    var r = this.r
    var n = this.n

    if (n % 2 == 0)
    {
        var theta  = 0;
    }
    else
    {
        var theta  = -Math.PI / 2;
    }
    var thetaEnd = theta + 2 * Math.PI;

    var dtheta = 2 * Math.PI / n
    while (theta < thetaEnd)
    {
        var x  = xcenter + r * Math.cos(theta)
        var y  = ycenter + r * Math.sin(theta)
        
        theta += dtheta;
        
        var x2 = xcenter + r * Math.cos(theta)
        var y2 = ycenter + r * Math.sin(theta)

        drawLine      (x, y, x2, y2);
    }
    
    drawText(xcenter, ycenter, this.name)
}

function polyregGetSlot(i)
{
    var theta = i * 2 * Math.PI / this.n
    if (this.n % 2 != 0)
    {
        theta = theta - Math.PI / 2
    }

    var x  = Math.round(this.x + this.r * Math.cos(theta))
    var y  = Math.round(this.y + this.r * Math.sin(theta))

    return [ x, y ]

}
