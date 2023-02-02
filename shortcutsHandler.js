const shortcutsHandler = {
    undo: () => {    
        // remove last nested array
                                    // start position, count
        const deletedArray = dataPoints.splice(-1, 1);
        deletedDataPoints.push(deletedArray);
            
        shortcutsHandler.redraw();
    },
    
    redo: () =>  {
        const arrayToRedo = deletedDataPoints.splice(-1, 1)[0];

        if (arrayToRedo && arrayToRedo[0]) {
            dataPoints.push(arrayToRedo[0]);
    
            shortcutsHandler.redraw();
        }
    },

    redraw: () => {
        // clear the canvas before redrawing it entirely
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
    
        dataPoints.map(lineArray => {
            if (lineArray.type === "textLabel") {
                drawTextLabelFromDataPoints(lineArray);
                return;
            }

            const firstPointInLineArray = lineArray[0];
            ctx.moveTo(firstPointInLineArray.x, firstPointInLineArray.y);
    
            lineArray.map(point => {
                ctx.strokeStyle = point.color;
                ctx.lineWidth = point.lineWidth;
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
            });
        });
    },
    
    showAbout: () =>  {
        const display = document.getElementById("controls-display-about");
        if (display.innerHTML) {
            display.innerHTML = "";
        } else {
            display.innerHTML = `
                <p>CMD-Z / CTRL-Z = UNDO</p>
                <p>CMD-X / CTRL-X = REDO</p>
                <br>
                
                <p>Color code shorthands</p>
                <p>r = [red]</p>
                <p>g = [green | grey]</p>
                <p>b = [blue | black]</p>
                <p>p = [pink | purple]</p>
                <p>w = [white]</p>
                <br>

                <p>Text labels</p>
                <p>Double click = add text label</p>
                <p>Backspace = delete letter</p>
                <p>Enter = save text label</p>
                <p>Escape = cancel text label</p>
            `;
        }
    }
}

let isMuted = false;
let typedCharacters = "";

window.addEventListener('keydown', (event) => {
    // undo and redo logic
    if (event.key === 'z' && (event.metaKey || event.ctrlKey)) {
        shortcutsHandler.undo();
    }
    if (event.key === 'x' && (event.metaKey || event.ctrlKey)) {
        shortcutsHandler.redo();
    }

    // text label logic
    if (event.key === 'Enter') {
        handleEnterKeyDown();
    }
    if (event.key === 'Escape') {
        handleEscapeKeyDown();
    }
    if (event.key === "Backspace") {
        handleDeleteLetter();
    }


    if (isTextLabelMode && !(event.metaKey || event.ctrlKey || event.key === "Backspace" || event.key === "Enter")) {
        handleAddLetter(event.key);
    } else {
        // typing colors logic
        typedTextEventHandler(event);
    }


});

// disables going back on backspace
window.onbeforeunload = () => {};
