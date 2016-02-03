
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

    var theta  = 0;
    var dtheta = 2 * Math.PI / n
    while (theta < 2 * Math.PI)
    {
        var x  = xcenter + r * Math.cos(theta)
        var y  = ycenter + r * Math.sin(theta)
        
        theta += dtheta;
        
        var x2 = xcenter + r * Math.cos(theta)
        var y2 = ycenter + r * Math.sin(theta)

        drawLine      (x, y, x2, y2);
    }
    
    drawText(xcenter, ycenter-r, this.name)
}

function polyregGetSlot(i)
{
    var theta = i * 2 * Math.PI / this.n

    var x  = Math.round(this.x + this.r * Math.cos(theta))
    var y  = Math.round(this.y + this.r * Math.sin(theta))

    return [ x, y ]

}
