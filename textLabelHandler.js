let isTextLabelMode = false;
let textLabelStartX = canvas.width / 2;
let textLabelStartY = canvas.height / 2;
let canvasRestoreImage;

// todo 
// let isTextLabelMode = false;

// let textLabelStartX = 0;
// let textLabelStartY = 0;
let letters = [];


function handleDoubleClick(event) {
    if (isTextLabelMode) {
        return;
    }

    isTextLabelMode = true;

    // to undo the dot painted from the first click and the double click
    dataPoints.pop();
    // shortcutsHandler.undo();
    // shortcutsHandler.undo();

    canvasRestoreImage = new Image();
    canvasRestoreImage.src = canvas.toDataURL();

    textLabelStartX = event.clientX || event.touches[0].clientX;
    textLabelStartY = event.clientY || event.touches[0].clientY;
    
    ctx.setLineDash([5, 10]);
    ctx.lineWidth = 1;
    
    // draw the initial border
    ctx.strokeRect(textLabelStartX-10, textLabelStartY-25, 40, 30);
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

function drawTextLabelBorder() {
    restorePreviousCanvas();

    ctx.fillStyle = document.getElementById("controls-color").value;

    if (letters.length === 0) {
        ctx.strokeRect(textLabelStartX-10, textLabelStartY-25, 40, 30);
    } else {
        const textDimensions = ctx.measureText(letters.join(""));
        ctx.strokeRect(textLabelStartX-10, textLabelStartY-25, textDimensions.width+25, textDimensions.actualBoundingBoxAscent+10);
    }
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

    letters = [];

    isTextLabelMode = false;
}