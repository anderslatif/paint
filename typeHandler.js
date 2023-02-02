function typedTextEventHandler(event) {


    if (!event.metaKey && !event.ctrlKey && event.key !== "Meta" && event.key !== "Control" 
        && event.key !== "Shift" && event.key !== "Alt" && event.key !== "Backspace" && event.key !== "Enter" && event.key !== "Escape") {

        const currentColor = document.getElementById("controls-color").value;

        
        typedCharacters += event.key.toLowerCase();


        switch (typedCharacters) {
            case 'w':
                changeColorFromShorthand('#ffffff');
                break;
            case 'r':
                changeColorFromShorthand('#ff0000');
                break;
            case 'b':                 
                if (currentColor === "#000000") {
                    changeColorFromShorthand("#0000ff"); // blue
                } else {
                    changeColorFromShorthand("#000000"); // black
                }
                break;
            case 'p':               
                if (currentColor === "#ff8da1") {
                    changeColorFromShorthand("#800080"); // purple
                } else {
                    changeColorFromShorthand("#ff8da1"); // pink
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
