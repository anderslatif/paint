let isTextLabelMode = false;
let textLabelStartX = canvas.width / 2;
let textLabelStartY = canvas.height / 2;
let canvasRestoreImage;
let fontSize = 30;

let letters = [];


function handleDoubleClick(event) {
    if (isTextLabelMode) {
        restorePreviousCanvas();
        commitCanvas(true);
        return;
    }

    isTextLabelMode = true;

    // to undo the dot painted from the first click and the double click
    dataPoints.pop();
    dataPoints.pop();

    canvasRestoreImage = new Image();
    canvasRestoreImage.src = canvas.toDataURL();

    textLabelStartX = event.clientX || event.touches[0].clientX;
    textLabelStartY = event.clientY || event.touches[0].clientY;
    
    ctx.setLineDash([5, 10]);
    ctx.lineWidth = 1;
    
    // draw the initial border
    drawTextLabelBorder(true);
    // ctx.strokeRect(textLabelStartX-10, textLabelStartY-25, 40, 30);

    ctx.font = `${fontSize}px Arial`;
}

function handleAddLetter(letter) {
    letters.push(letter);

    drawTextLabelBorder();
    drawTextLabel();
}

function handleDeleteLetter() {
    letters.pop();

    drawTextLabelBorder();
    drawTextLabel();
}

function drawTextLabel() {
    ctx.fillText(letters.join(""), textLabelStartX, textLabelStartY);
}

function drawTextLabelFromDataPoints(dataPoint) {
    ctx.fillStyle = dataPoint.fillStyleColor;
    ctx.fillText(dataPoint.letters.join(""), dataPoint.textLabelStartX, dataPoint.textLabelStartY);
    // solid line
    ctx.setLineDash([]);
}

function drawTextLabelBorder(isFirstTime) {
    if (!isFirstTime) {
        restorePreviousCanvas();
    }

    ctx.fillStyle = document.getElementById("controls-color").value;


    const padding = 10;


    let textMetrics = letters.length === 0 ? 
        ctx.measureText("X") : ctx.measureText(letters.join(""));

    ctx.beginPath();
    ctx.moveTo(
        textLabelStartX - padding - textMetrics.actualBoundingBoxLeft,
        textLabelStartY - padding - textMetrics.actualBoundingBoxAscent
    );
    ctx.lineTo(
        textLabelStartX + padding + textMetrics.actualBoundingBoxRight, 
        textLabelStartY - padding - textMetrics.actualBoundingBoxAscent
    );
    ctx.lineTo(
        textLabelStartX + padding + textMetrics.actualBoundingBoxRight, 
        textLabelStartY + padding + textMetrics.actualBoundingBoxDescent
    );
    ctx.lineTo(
        textLabelStartX - padding - textMetrics.actualBoundingBoxLeft,
        textLabelStartY + padding + textMetrics.actualBoundingBoxDescent
    );
    ctx.closePath();
    ctx.stroke();
    
}

function handleMouseWheel(event) {
    if (!isTextLabelMode) return;

    // detail is 1 if you scroll down and -1 if you scroll up
    fontSize -= event.detail;

    ctx.font = `${fontSize}px Arial`;

    drawTextLabelBorder();
    drawTextLabel();
}

function handleEscapeKeyDown() {
    restorePreviousCanvas();
    commitCanvas(false);
}

function handleEnterKeyDown() {
    restorePreviousCanvas();
    commitCanvas(true);
}

function restorePreviousCanvas() {
    if (!isTextLabelMode) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasRestoreImage, 0, 0);
}

function commitCanvas(willCommit) {
    if (willCommit) {
        drawTextLabel();
    }

    dataPoints.push({
        type: "textLabel",
        fillStyleColor: document.getElementById("controls-color").value,
        textLabelStartX,
        textLabelStartY,
        letters
    });

    // solid line
    ctx.setLineDash([]);

    fontSize = 30;
    ctx.font = `${fontSize}px Arial`;

    letters = [];

    isTextLabelMode = false;
}