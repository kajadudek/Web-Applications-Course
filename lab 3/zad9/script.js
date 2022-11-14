var cardsArray = document.getElementsByClassName("business-card-container"),
    buttonRight = document.getElementById("right-arrow"),
    buttonLeft = document.getElementById("left-arrow");

var cardIndex = 0,
    cardListLen = cardsArray.length;


var cardWidth = cardsArray[0].clientWidth;

slide(0)

function slide(){
    if (cardIndex >= cardListLen) {
        cardIndex = 0;
    }
    else if (cardIndex < 0){
        cardIndex = cardListLen-1;
    }

    for (let i = 0; i < cardListLen; i++){
        cardsArray[i].style.visibility = "hidden";
        cardsArray[i].classList.remove = "animatedRight";
    }

    cardsArray[cardIndex].style.visibility = "visible";
    cardsArray[cardIndex].classList.add = "animatedRight";
}

buttonRight.addEventListener('click',function() {
    cardIndex +=1;
    slide();
})

buttonLeft.addEventListener('click',function(){
    cardIndex -= 1;
    slide();
})