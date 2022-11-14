var cardsArray = document.getElementsByClassName("business-card-container"),
    buttonRight = document.getElementById("right-arrow"),
    buttonLeft = document.getElementById("left-arrow");

var cardIndex = 0,
    cardListLen = cardsArray.length;

var cont = document.getElementById("test");

function slide(){
    var cardWidth = cardsArray[0].clientWidth;
    if (cardIndex >= cardListLen) {
        cardIndex = 0;
    }
    else if (cardIndex < 0){
        cardIndex = cardListLen-1;
    }

    cont.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
}

buttonRight.addEventListener('click',function() {
    cardIndex +=1;
    slide();
})

buttonLeft.addEventListener('click',function(){
    cardIndex -= 1;
    slide();
})