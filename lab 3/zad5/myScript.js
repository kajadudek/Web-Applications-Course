var points = 0;
var counter = 0;
var order = false;
var propagation = true;
var blue_clicked = false;
var red_clicked = false;
var yellow_clicked = false;

function pointsChange(points) {
    document.getElementById("points").textContent = "punkty: " + points;
}

function squareReset(){
    blue_clicked = false;
    red_clicked = false;
    yellow_clicked = false;
}

function printPoints() {
    document.getElementById("test").textContent="";
}

function blueClicked(event) {
    points += 1;
    pointsChange(points);
    blue_clicked = true;
    console.log(blue_clicked, "niebieski");
    document.getElementById("test").innerHTML += " Nacisnąłeś niebieski o wartości 1" + "<br />";
    if (!propagation) {
        event.stopPropagation();
        clickHandler();
    }
}

function redClicked(event) {
    if (!document.getElementById("sq2").classList.contains("deactivated")){
        points += 2;
        pointsChange(points);
        red_clicked = true;
        console.log(red_clicked, "czerwony");
        document.getElementById("test").innerHTML += "Nacisnąłeś czerwony o wartości 2" + "<br />";
    }
    if (!propagation && !document.getElementById("sq2").classList.contains("deactivated")) {
        event.stopPropagation();
        clickHandler();
    }
}

function yellowClicked(event) {
    if (!document.getElementById("sq3").classList.contains("deactivated")){
        points += 5;
        pointsChange(points);
        yellow_clicked = true;
        console.log(yellow_clicked, "zolty")
        document.getElementById("test").innerHTML += "Nacisnąłeś żółty o wartości 5" + "<br />";
    }
    if (!propagation && !document.getElementById("sq3").classList.contains("deactivated")) {
        event.stopPropagation();
        clickHandler();
    }
}

function clickHandler() {
    squareReset();

    if (points > 30) {
        document.getElementById("sq2").classList.add("deactivated");
        document.getElementById("sq2").style.backgroundColor = "rgba(255,0,0,0.5)";
    }
    if (points > 50) {
        document.getElementById("sq3").classList.add("deactivated");
        document.getElementById("sq3").style.backgroundColor = "rgba(255,255,0,0.5)"
    }
}


function blue(event) {
    blueClicked(event);
}

function yellow(event) {
    yellowClicked(event);
}

function red(event) {
    redClicked(event);
}

document.getElementById("sq1").addEventListener('click', blue);

document.getElementById("sq2").addEventListener('click', red);

document.getElementById("sq3").addEventListener('click', yellow);


document.getElementById("sq-container").addEventListener('click', function() {
    clickHandler();
     printPoints();
},true);


document.getElementById("order-change").addEventListener('click',function() {
        order = !order;
        if (order) {
            document.getElementById("sq1").removeEventListener('click',blue);
            document.getElementById("sq1").addEventListener('click',blue,true);

            document.getElementById("sq2").removeEventListener('click',red);
            document.getElementById("sq2").addEventListener('click',red,true);

            document.getElementById("sq3").removeEventListener('click',yellow);
            document.getElementById("sq3").addEventListener('click',yellow,true);
        }
        else{
            document.getElementById("sq1").removeEventListener('click',blue,true);
            document.getElementById("sq1").addEventListener('click',blue);

            document.getElementById("sq2").removeEventListener('click',red,true);
            document.getElementById("sq2").addEventListener('click',red);

            document.getElementById("sq3").removeEventListener('click',yellow,true);
            document.getElementById("sq3").addEventListener('click',yellow);
        }
});

function reset(){
    points = 0;
    propagation = true;
    order = false;
    pointsChange(0);
    printPoints();
    document.getElementById("sq3").classList.remove("deactivated");
    document.getElementById("sq2").classList.remove("deactivated");
    document.getElementById("sq2").style.backgroundColor = "";
    document.getElementById("sq3").style.backgroundColor = "";
    document.getElementById("propagation-button").textContent = "STOP PROPAGATION";
}

document.getElementById("reset-button").addEventListener('click', function() {
    reset();
})

function propagationInvoke() {
    propagation = !propagation;
    if (propagation) {
        document.getElementById("propagation-button").textContent = "STOP PROPAGATION";
    }
    else{
        document.getElementById("propagation-button").textContent = "START PROPAGATION";
    }
}

document.getElementById("propagation-button").addEventListener('click', function() {
    propagationInvoke();
})