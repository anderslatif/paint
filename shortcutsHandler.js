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
                <p>
                    <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/color_value'>
                        [type a valid CSS color alias and Enter to clear]
                    </a> = Change selected color
                </p>
            `;
        }
    }
}

let isMuted = false;
let typedCharacters = "";

window.addEventListener('keydown', (event) => {
    // undo and redo logic
    if (event.key === 'z' && event.metaKey) {
        shortcutsHandler.undo();        
    }
    if (event.key === 'x' && event.metaKey) {
        shortcutsHandler.redo();        
    }

    // typing colors logic
    if (event.key.toLowerCase() === "m") {
        isMuted = !isMuted;
        if (isMuted) {
            document.getElementById("controls-typed-text").textContent = "";
        }
    }

    if (event.key === 'Enter') {
        typedCharacters = "";
    } else {
        typedCharacters += event.key;
    }
    if (!isMuted) {
        document.getElementById("controls-typed-text").textContent = typedCharacters;
    }
    changeColor(isColor(typedCharacters));
});

function isColor(typedCharacters) {
    if (typedCharacters === "") {
        return false;
    } 
    const style = new Option().style;
    style.color = typedCharacters;
    return style.color === typedCharacters;
}

function changeColor(willChange) {
    if (!willChange) {
        return;
    }
    document.getElementById("controls-color").value = typedCharacters;
}