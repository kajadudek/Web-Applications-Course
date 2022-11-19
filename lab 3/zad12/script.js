var howManyZombies = 0;
var points = 0000;

//Cursor move
// const cursor = document.getElementById("cursor");

// const moveCursor = (e) => {
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     cursor.style.transform = `translate3d(${mouseX-35}px, ${mouseY-35}px, 0)`;
// }

// window.addEventListener('mousemove', moveCursor)


//Points change
function pointsChange(){
    var points4digits = "000" + points;
    document.getElementById("score").textContent = points4digits.slice(-4,points4digits.length);
}

//Zombie walk
const zombie = document.getElementById("zombie");
const zombieSteps = document.getElementById("zombie-steps")
var zombieWidth = zombie.clientWidth,           //200px
    zombieHeight = zombie.clientHeight;         //312px

//Zombie walk animation
var speed = 2;
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

// window.addEventListener('click',zombieWalk);
zombieWalk();

//Zombie kill
zombie.addEventListener('click',function(event){
    zombie.remove();
    points += 12;
    pointsChange();
    // clearInterval(func);
    event.stopPropagation();
    console.log('killed')
})

//Missing the shot
window.addEventListener('click', function() {
    points -= 6;
    pointsChange();
})