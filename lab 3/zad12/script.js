var howManyZombies = 0;
var points = 0000;
var zombieNumber = 1;
var speed = 2;
const game = document.getElementById("game");
const newGameButton = document.getElementById("new-game-button");
var zombieWalk = {};
var generateZombies = {};
var screenWidth = game.clientWidth;
var nick = "Kaja";

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
var zombie = document.querySelector("#zombie");
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
    var newZombie = zombie.cloneNode(true);

    newZombie.id = "zombie " + zombieNumber;
    newZombie.classList = "zombie";
    newZombie.addEventListener('click', zombieKill);
    newZombie.style.bottom = posY - 100 + "px";
    newZombie.style.left = screenWidth - 100 + "px";
    newZombie.style.transform = "scale("+size+")";
    game.appendChild(newZombie);

    zombieNumber += 1;

    makeZombieAlive(newZombie, speed);
}

//Zombie kill
function zombieKill(event){
    this.remove();
    points += 12;
    pointsChange();
    clearInterval(zombieWalk[this.id])
    event.stopPropagation();
}
zombie.remove();

//Making zombie alive
function makeZombieAlive(elem, speed){
    switch(speed){
        case 1:
            speed=70;
            break;
        case 2:
            speed=60;
            break;
        case 3:
            speed=55;
            break;
        case 4:
            speed=50;
            break;
        case 5:
            speed=45;
            break;
        default:
            speed=70;
            break;
    }

    elem.addEventListener('click', zombieKill);

    zombieWalk[elem.id] = setInterval ( () => {
        zombieSteps = elem.firstElementChild;
        if (stepCounter > 9) {
            stepCounter = 0;
        }
        zombieSteps.style.transform = `translateX(-${zombieWidth * stepCounter}px)`;
        stepCounter += 1;

        zombie = elem;
        position = zombie.getBoundingClientRect();
        zombie.style.left = position.x - zombieWalkSpeed + "px";
        if (zombie.style.left < (endPosition + "px")){
            howManyZombies += 1;
            if (howManyZombies<=3){
                document.getElementById("live-" + howManyZombies).className = "fa-regular fa-heart";
            }
            clearInterval(zombieWalk[zombie.id]);
            zombie.remove();
        }

        if (howManyZombies >= 3){
            endOfGame();
        }
    }, speed );
}

//Start of game
function startOfGame(){
    points = 0;
    pointsChange();
    howManyZombies = 0;

    window.addEventListener('click', missTheShot);

    document.getElementById("live-1").className = "fa-solid fa-heart";
    document.getElementById("live-2").className = "fa-solid fa-heart";
    document.getElementById("live-3").className = "fa-solid fa-heart";

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

    window.removeEventListener('click', missTheShot);
    
    let zombies = document.getElementsByClassName("zombie");
    for (let zombie of zombies){
        zombie.remove();
    }

    newGameButton.style.display = "block";

    // leaderboard.style.display = "block";
    // getData();
}

//Missing the shot
function missTheShot() {
    points -= 6;
    pointsChange();
}

//Leaderboard
// const exitHsButton = document.getElementById("hs-exit-button");
// const leaderboard = document.getElementById("highscores");
// exitHsButton.addEventListener('click', function(){
//     leaderboard.style.display = "none";
// })



//Nieudana próba tablicy wyników
// var url = "https://mocki.io/v1/aff8f5e9-c36a-4bfb-906a-9284716adcd4"

// async function getData(){
//     var data = await fetch(url);
//     var json = await data.json();
//     console.log(json);
//     updateScore(json);
// }


// var todayDate = new Date();
// async function updateScore(data){
//     // var todayDate = new Date();
//     var day = String(todayDate.getDate()).padStart(2, '0');
//     var month = String(todayDate.getMonth() + 1).padStart(2, '0');
//     var year = todayDate.getFullYear();
//     todayDate = day + '.' + month + '.' + year;

//     console.log(todayDate);

//     var scores = data;
//     console.log(scores)

//     scores.push({"name": nick, "score": points, "date": todayDate})
//     await pushScore(url, data);
// }

// fetch(url)
// .then((response) => {
//     console.log("ok", response);
// })
// .catch((err) => {
//     console.log("error",err);
// })

// getData();

// async function pushScore(url = '', data = {}) {
//     const response = await fetch(url, {
//       method: 'POST', 
//       mode: 'cors', 
//       headers: {
//         'Content-type': 'application/json',

//       },
//       body: JSON.stringify(data)
//     });
//     return response.json();
// }
