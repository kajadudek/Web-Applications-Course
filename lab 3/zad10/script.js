var circle = document.getElementById("circle"),
    posX = 40,
    posY = 40,
    xp = 40,
    yp = 40;

var field = document.getElementById("field"),
fieldWidth = field.clientWidth,
fieldHeight = field.clientHeight;

var info = document.getElementById("komunikat");

field.addEventListener('click', function(event) {
    posX = event.pageX;
    posY = event.pageY;
    fieldWidth = field.clientWidth;
    fieldHeight = field.clientHeight;
    console.log(posX,' ',posY,' ',fieldWidth);
    info.textContent = "Naciśnij gdziekolwiek";
    event.stopPropagation();
})

window.addEventListener('click', function() {
    info.textContent = "Naciśnij na pole";
})

function followMouse() {
    requestAnimationFrame(followMouse);
    if (posX < 40) {
        posX = 40;
    }
    if (posX > fieldWidth-40){
        posX = fieldWidth-40;
    }
    if (posY < 40) {
        posY = 40;
    }
    if (posY > fieldHeight-40){
        posY = fieldHeight-40;
    }
    xp += (posX - xp) / 15;
    yp += (posY - yp) / 15;
    circle.style.left = xp - 40 + "px";
    circle.style.top = yp - 40 + "px";
}

followMouse();