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
            `;
        }
    }
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'z' && event.metaKey) {
        shortcutsHandler.undo();        
    }
    if (event.key === 'x' && event.metaKey) {
        shortcutsHandler.redo();        
    }
})
