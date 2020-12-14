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
    
    showShortcuts: () =>  {
        const display = document.getElementById("controls-display-shortcuts");
        if (display.innerHTML) {
            display.innerHTML = "";
        } else {
            display.innerHTML = `
                <p>CTRL-Z = UNDO</p>
                <p>CTRL-X = REDO</p>
                <p>M = Mute text on screen</p>
                                <p>Enter = Clear text</p>
                <p>
                    <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/color_value'>
                        [type a valid CSS color (name, RGBA, Hex etc.)]
                    </a> = Change selected color
                </p>
                <p>Additional color code shorthands</p>
                <p>r = red</p>
                <p>b = [blue, black]</p>
                <p>p = [pink, purple]</p>
                <p>g = [green, grey]</p>
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

    // typing colors logic
    typedTextEventHandler(event);
});

// disables going back on backspace
window.onbeforeunload = () => {};
