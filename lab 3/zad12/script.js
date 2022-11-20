var howManyZombies = 0;
var points = 0000;
var zombieNumber = 1;
var speed = 2;
const game = document.getElementById("game");
const newGameButton = document.getElementById("new-game-button");
var zombieWalk = {};
var generateZombies = {};
var screenWidth = game.clientWidth;

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
var zombie = document.getElementById("zombie");
var zombieSteps = document.getElementById("zombie-steps")
var zombieWidth = zombie.clientWidth,           //200px
    zombieHeight = zombie.clientHeight;         //312px
var stepCounter = 0;


//Zombie walk through the screen
var position = zombie.getBoundingClientRect();
const endPosition = -zombieWidth;       //-200px
var zombieWalkSpeed = (position.x-endPosition)/((1/speed)*150);

//Generating zombie
function zombieSpawner(){
    var speed = Math.round(Math.random()*5);
    var posY = Math.round(Math.random()*200); //px
    var size = (0.9 + (Math.round(Math.random()*40)/100)); 

    console.log(posY, size)
    var zombie2 = zombie.cloneNode(true);
    zombie2.id = "zombie " + zombieNumber;
    zombie2.classList = "zombie";
    zombie2.addEventListener('click', zombieKill);
    zombie2.style.bottom = posY - 50 + "px";
    zombie2.style.left = screenWidth - 100 + "px";
    zombie2.style.transform = "scale("+size+")";
    game.appendChild(zombie2);

    zombieNumber += 1;

    makeZombieAlive(zombie2, speed);
    console.log(zombie2.style.right);
}

//Zombie kill
function zombieKill(event){
    this.remove();
    points += 12;
    pointsChange();
    console.log('killed');
    clearInterval(zombieWalk[this.id])
    event.stopPropagation();
}

//Making zombie alive
function makeZombieAlive(el, speed){
    var interval;

    switch(speed){
        case 1:
            interval=70;
            break;
        case 2:
            interval=60;
            break;
        case 3:
            interval=55;
            break;
        case 4:
            interval=50;
            break;
        case 5:
            interval=45;
            break;
        default:
            interval=70;
            break;
    }

    el.addEventListener('click', zombieKill);

    zombieWalk[el.id] = setInterval ( () => {
        zombieSteps = el.firstElementChild;
        if (stepCounter > 9) {
            stepCounter = 0;
        }
        zombieSteps.style.transform = `translateX(-${zombieWidth * stepCounter}px)`;
        stepCounter += 1;

        zombie = el;
        position = zombie.getBoundingClientRect();
        zombie.style.left = position.x - zombieWalkSpeed + "px";
        if (zombie.style.left < (endPosition + "px")){
            howManyZombies += 1;
            clearInterval(zombieWalk[zombie.id]);
            console.log('removed', zombie)
            zombie.remove();
        }

        if (howManyZombies >= 3){
            endOfGame();
        }
    }, interval );
}

//Start of game
function startOfGame(){
    points = 0;
    howManyZombies = 0;
    makeZombieAlive(zombie, 2);

    generateZombies = setInterval( function() {
        zombieSpawner();
    }, 1000)
}

newGameButton.addEventListener('click',function(event){
    startOfGame();
    event.stopPropagation();
    newGameButton.style.display = "none";
});

//End of game 
function endOfGame(){
    clearInterval(generateZombies);
    points = 0;

    
    let zombies = document.getElementsByClassName("zombie");
    for (let zombie of zombies){
        zombie.remove();
    }

    newGameButton.style.display = "block";
}

//Missing the shot
window.addEventListener('click', function() {
    points -= 6;
    pointsChange();
})
