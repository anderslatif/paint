const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isPainting = false;
const dataPoints = [];
const deletedDataPoints = [];
const canvases = [];

window.addEventListener('load', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

function startPosition(event) {
    if (isTextLabelMode) return;

    isPainting = true;
    dataPoints.push([]);

    ctx.beginPath();
    // to support dots call paint at least once
    paint(event);
}


function paint(event) {
    if (isTextLabelMode) return;

    const x = event.clientX || event.touches[0].clientX;
    const y = event.clientY || event.touches[0].clientY;

    if (!isPainting) return;

    const color = document.getElementById("controls-color").value;
    const lineWidth = document.getElementById("controls-stroke-width").value;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round"
    ctx.lineTo(x, y);
    ctx.stroke();

    dataPoints[dataPoints.length-1].push({
        color,
        lineWidth,
        x,
        y
    });

    // this will ensure a smoother line (anti-aliasing) because of the lineCap = "round"
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function endPosition() {
    if (isTextLabelMode) return;

    isPainting = false;
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mousemove', paint);
canvas.addEventListener('mouseup', endPosition);

canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchmove', paint);
canvas.addEventListener('touchend', endPosition);

// text label handler
// Escape and Enter are handled in the shortcutsHandler
canvas.addEventListener('dblclick', handleDoubleClick);
// IE9, Chrome, Safari, Opera
canvas.addEventListener('mousewheel', handleMouseWheel);
// Firefox
canvas.addEventListener('DOMMouseScroll', handleMouseWheel);
