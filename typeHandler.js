function typedTextEventHandler(event) {
    if (event.key.toLowerCase() === "m") {
        isMuted = !isMuted;
        if (isMuted) {
            document.getElementById("controls-typed-text").textContent = "";
        }
    }

    const currentColor = document.getElementById("controls-color").value;
    if (event.key === 'Enter') {
        typedCharacters = "";
        document.getElementById("controls-typed-text").textContent = typedCharacters;
    }

    if (!event.metaKey && !event.ctrlKey && event.key !== "Meta" && event.key !== "Control" 
        && event.key !== "Shift" && event.key !== "Alt" && event.key !== "Backspace" && event.key !== "Enter") {
        
        typedCharacters += event.key.toLowerCase();
        if (!isMuted) {
            document.getElementById("controls-typed-text").textContent = typedCharacters;
        }

        switch (typedCharacters) {
            case 'r':
                changeColorFromShorthand('#ff0000');
                break;
            case 'b':                 // black
                if (currentColor === "#000000") {
                    changeColorFromShorthand("#0000ff"); // blue
                } else {
                    changeColorFromShorthand("#000000"); // black
                }
                break;
            case 'p':                // pink
                if (currentColor === "#ffc0cb") {
                    changeColorFromShorthand("#800080"); // purple
                } else {
                    changeColorFromShorthand("#ffc0cb"); // pink
                }
                break;
            case 'g':
                if (currentColor === "#008000") {
                    changeColorFromShorthand("#808080"); // gray
                } else {
                    changeColorFromShorthand("#008000"); // green
                }
                break;
        }
    }
    
    changeCssValidColor(isColor(typedCharacters));
}

function isColor() {
    if (typedCharacters === "") {
        return false;
    } 
    const style = new Option().style;
    style.color = typedCharacters;
    return style.color === typedCharacters;
}

function changeCssValidColor(willChange) {
    if (!willChange) {
        return;
    }
    ctx.fillStyle = typedCharacters
    const colorAsHex = ctx.fillStyle;
    document.getElementById("controls-color").value = colorAsHex;
    resetTypedText();
}

function changeColorFromShorthand(color) {
    document.getElementById("controls-color").value = color;
    resetTypedText();
}

function resetTypedText() {
    typedCharacters = "";
    document.getElementById("controls-typed-text").textContent = "";
}
