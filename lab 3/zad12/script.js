var howManyZombies = 0;
var points = 0000;
var zombieNumber = 0;
var speed = 2;
const game = document.getElementById("game");

//Cursor move
const cursor = document.getElementById("cursor");

function moveCursor(e){
    cursor.style.top = e.pageY - 35 + "px";
    cursor.style.left = e.pageX - 35 + "px";
}
window.addEventListener('mousemove', moveCursor)


//Points change
function pointsChange(){
    var points4digits = "000" + points;
    document.getElementById("score").textContent = points4digits.slice(-4, points4digits.length);
}

//Zombie walk animation
const zombie = document.getElementById("zombie");
const zombieSteps = document.getElementById("zombie-steps")
var zombieWidth = zombie.clientWidth,           //200px
    zombieHeight = zombie.clientHeight;         //312px
var stepCounter = 0;

function zombieWalkAnimation(){
    setTimeout(function() {
        requestAnimationFrame(zombieWalkAnimation);
        if (stepCounter > 9) {
            stepCounter = 0;
        }
        zombieSteps.style.transform = `translateX(-${zombieWidth * stepCounter}px)`;
        stepCounter += 1;
    }, (60/speed) + 30);
}
zombieWalkAnimation();


//Zombie walk through the screen
var position = zombie.getBoundingClientRect();
const endPosition = -zombieWidth;       //-200px
var zombieWalkSpeed = (position.x-endPosition)/((1/speed)*150);
console.log()

var flag = false;

function zombieWalk() {
    console.log(zombie,'x');
    // var id = document.getElementById(id);
    position = zombie.getBoundingClientRect();
    const func = setTimeout(function() {
        requestAnimationFrame(zombieWalk);
        zombie.style.left = position.x - zombieWalkSpeed + "px";
        if (zombie.style.left < (endPosition + "px")){
            howManyZombies += 1;
            zombie.remove();
            flag = true;
        }
    },60);

    if (flag){ clearTimeout(func)}
}

//Generating zombie
function zombieSpawner(){
    var speed = Math.round(Math.random()*5);
    var posY = Math.round(Math.random()*200); //px
    var size = (0.9 + (Math.round(Math.random()*40)/100)); 
    console.log(posY, size)
    var zombie2 = zombie.cloneNode(true);
    zombie2.classList.add("zombie");
    zombie2.setAttribute('no', zombieNumber);
    zombie2.addEventListener('click', zombieKill);
    zombie2.style.bottom += posY + "px";
    zombie2.style.transform = "scale("+size+")";
    game.appendChild(zombie2);

    zombieNumber += 1;
}

zombieSpawner();
zombieSpawner();


// window.addEventListener('click',zombieWalk);
zombieWalk();

//Zombie kill
function zombieKill(event){
    zombie.remove();
    points += 12;
    pointsChange();
    console.log('killed');
    event.stopPropagation();
}

zombie.addEventListener('click', zombieKill);
// zombie.addEventListener('click',function(event){
//     zombie.remove();
//     points += 12;
//     pointsChange();
//     // clearInterval(func);
//     // event.stopPropagation();
//     console.log('killed')
// })

//Missing the shot
window.addEventListener('click', function() {
    points -= 6;
    pointsChange();
})