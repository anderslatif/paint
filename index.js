const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isPainting = false;
const dataPoints = [];
const deletedDataPoints = [];

window.addEventListener('load', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

function startPosition(event) {
    isPainting = true;
    dataPoints.push([]);

    ctx.beginPath();
    // to support dots call paint at least once
    paint(event);
}


function paint(event) {
    if (!isPainting) return;

    const color = document.getElementById("controls-color").value;
    const lineWidth = document.getElementById("controls-stroke-width").value;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round"
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();

    dataPoints[dataPoints.length-1].push({
        color,
        lineWidth,
        x: event.clientX,
        y: event.clientY
    });

    // this will ensure a smoother line (anti-aliasing) because of the lineCap = "round"
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
}

function endPosition() {
    isPainting = false;
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mousemove', paint);
canvas.addEventListener('mouseup', endPosition);

canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchmove', paint);
canvas.addEventListener('touchend', endPosition);
