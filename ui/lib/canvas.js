
function draw() 
{
    // --- Call to itself => this creates a loop
    requestAnimationFrame(draw);
    


    // --- Clear canvas
    ctx.clearRect (0,0,canvas.width,canvas.height);


    // --- Actual drawing code


    // Draw units
    for (var i = 0; i < units.length; i++) 
    {
        units[i].draw()
    }


}


