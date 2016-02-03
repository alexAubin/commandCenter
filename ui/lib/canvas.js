
function draw() 
{
    // --- Call to itself => this creates a loop
    requestAnimationFrame(draw);
    


    // --- Clear canvas
    ctx.clearRect (0,0,canvas.width,canvas.height);


    // --- Actual drawing code

    // Draw polys
    for (var i = 0; i < groups.length; i++) 
    {
        groups[i].draw()
    }


    // Draw units
    for (var i = 0; i < units.length; i++) 
    {
        units[i].draw()
    }

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

function drawText(x, y, text)
{
    ctx.beginPath();
    ctx.font = "14px Hack";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y); 
}

function drawLine(x, y, x2, y2)
{
    ctx.beginPath();

    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    
    var white       = 'rgba(255,255,255,0.3)';
    ctx.strokeStyle = white;
    ctx.stroke();
}

