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
    // counter +=1 ;
    // console.log("-------new click------", counter)
    squareReset();
    pointsChange(points);

    if (points > 30) {
        document.getElementById("sq2").classList.add("deactivated");
    }
    if (points > 50) {
        document.getElementById("sq3").classList.add("deactivated");
    }
}


document.getElementById("sq1").addEventListener('click', function(event) {
    if (!order){
        blueClicked(event);
    }
});

document.getElementById("sq2").addEventListener('click', function(event) {
    if (!order){
        redClicked(event);
    }
});

document.getElementById("sq3").addEventListener('click', function(event) {
    if (!order){
        yellowClicked(event);
    }
});

document.getElementById("order-change").addEventListener('click',function() {
    order = !order;
    console.log('order clicked ', order);

    if (order) {
        document.getElementById("sq1").addEventListener('click', function(event) {
            if (order){
                console.log(blue_clicked,' ','pierwszy handler ',order,' counter ');
                blueClicked(event);
            }
        }, true);
        
        document.getElementById("sq2").addEventListener('click', function(event) {
            if (order){
                redClicked(event);
            }
        }, true);
        
        document.getElementById("sq3").addEventListener('click', function(event) {
            if (order){
                yellowClicked(event);
            }
        }, true);

    }
});


document.getElementById("sq-container").addEventListener('click', function() {
    if (!order) {
        console.log('drugi handler')
        clickHandler();
    }
 
    printPoints();
},true);


function reset(){
    points = 0;
    propagation = true;
    pointsChange(0);
    printPoints();
    document.getElementById("sq3").classList.remove("deactivated");
    document.getElementById("sq2").classList.remove("deactivated");
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