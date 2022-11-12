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
    document.getElementById("first-sq-info").textContent= "";
    document.getElementById("second-sq-info").textContent= "";
    document.getElementById("third-sq-info").textContent= "";

    if (yellow_clicked){
        // document.getElementById("third-sq-info").textContent = "Nacisnąłeś żółty o wartości 5";
    }

    if (red_clicked){
        // document.getElementById("second-sq-info").textContent= "Nacisnąłeś czerwony o wartości 2";
    }

    if (blue_clicked){
        // document.getElementById("first-sq-info").textContent= "Nacisnąłeś niebieski o wartości 1";
    }
}

function blueClicked(event) {
    points += 1;
    blue_clicked = true;
    console.log(blue_clicked, "niebieski");
    document.getElementById("test").textContent += "\n Nacisnąłeś niebieski o wartości 1";

    if (!propagation) {
        event.stopPropagation();
        clickHandler();
    }
}

function redClicked(event) {
    if (!document.getElementById("sq2").classList.contains("deactivated")){
        points += 2;
        red_clicked = true;
        console.log(red_clicked, "czerwony");
        document.getElementById("test").textContent += "\n Nacisnąłeś czerwony o wartości 2";
    }
    if (!propagation && !document.getElementById("sq2").classList.contains("deactivated")) {
        event.stopPropagation();
        clickHandler();
    }
}

function yellowClicked(event) {
    if (!document.getElementById("sq3").classList.contains("deactivated")){
        points += 5;
        yellow_clicked = true;
        console.log(yellow_clicked, "zolty")
        document.getElementById("test").textContent += "Nacisnąłeś żółty o wartości 5";;
    }
    if (!propagation && !document.getElementById("sq3").classList.contains("deactivated")) {
        event.stopPropagation();
        clickHandler();
    }
}

function clickHandler() {
    counter +=1 ;
    console.log("-------new click------", counter)
    pointsChange(points);
    printPoints();
    squareReset();

    if (points > 30) {
        document.getElementById("sq2").classList.add("deactivated");
    }
    if (points > 50) {
        document.getElementById("sq3").classList.add("deactivated");
    }
}

console.log(order, "tutaj");
        
document.getElementById("sq1").addEventListener('click', function(event) {
    blueClicked(event);
},false);

document.getElementById("sq2").addEventListener('click', function(event) {
    redClicked(event);
},false);

document.getElementById("sq3").addEventListener('click', function(event) {
    yellowClicked(event);
},false);

document.getElementById("sq-container").addEventListener('click', function() {
    clickHandler();
});

// document.getElementById("order-change").addEventListener('click',function() {
//     order = !order;
//     console.log(order);

//     if (order){
//         console.log(order, "tutaaaj");
        
//         document.getElementById("sq1").addEventListener('click', function(event) {
//             blueClicked(event);
//         },true);
        
//         document.getElementById("sq2").addEventListener('click', function(event) {
//             redClicked(event);
//         },true);
        
//         document.getElementById("sq3").addEventListener('click', function(event) {
//             yellowClicked(event);
//         },true);
//     }

//     if (!order) {
//         console.log(order, "tutaj");
        
//         document.getElementById("sq1").addEventListener('click', function(event) {
//             blueClicked(event);
//         },false);
        
//         document.getElementById("sq2").addEventListener('click', function(event) {
//             redClicked(event);
//         },false);
        
//         document.getElementById("sq3").addEventListener('click', function(event) {
//             yellowClicked(event);
//         },false);
//     }

//     document.getElementById("sq-container").addEventListener('click', function() {
//         clickHandler();
//     });
// })


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
    console.log(propagation);
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