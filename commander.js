

function init()
{

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var x = 100,
        y = 75,
        // Radii of the white glow.
        innerRadius = 0,
        outerRadius = 70,
        // Radius of the entire circle.
        radius = 50;

    darkGreen = '#228822';
    lightGreen = '#99ff99';

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = darkGreen;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = lightGreen;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius*0.7, 0, 2 * Math.PI);
    ctx.fillStyle = darkGreen;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius*0.6, 0, 2 * Math.PI);
    ctx.fillStyle = lightGreen;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius*0.56, 0, 2 * Math.PI);
    ctx.fillStyle = darkGreen;
    ctx.fill();

    ctx.beginPath();
    var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius*2);
    gradient.addColorStop(0,    "rgba(30,255,30,0.3)");
    gradient.addColorStop(0.3,  "rgba(0,0,0,0)");
    gradient.addColorStop(0.49,  "rgba(0,0,0,0)");
    gradient.addColorStop(0.5,  "rgba(30,255,30,0.4)");
    gradient.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.arc(x, y, radius*2, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();


}
