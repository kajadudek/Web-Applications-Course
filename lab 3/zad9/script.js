var cardsArray = document.getElementsByClassName("business-card-container"),
    buttonRight = document.getElementById("right-arrow"),
    buttonLeft = document.getElementById("left-arrow"),
    cardWidth = cardsArray[0].clientWidth,
    container = document.getElementById("test");

var cardIndex = 1,
    cardListLen = cardsArray.length - 2;


buttonRight.addEventListener('click',function() {
    container.style.transition = "transform 0.4s ease";
    cardIndex +=1;
    container.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
})

buttonLeft.addEventListener('click',function(){
    container.style.transition = "transform 0.4s ease";
    cardIndex -= 1;
    container.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
})

document.getElementById("random").addEventListener('click',function(){
    cardIndex = Math.floor(Math.random() * cardListLen);
    container.style.transition = "transform 0.4s ease";
    container.style.transform = `translateX(-${cardWidth * cardIndex}px)`
})

container.addEventListener('transitionend', slide);

function slide(){

    if (cardsArray[cardIndex].id === 'last-card'){
        container.style.transition = "none";
        container.style.transform = `translateX(-${cardWidth * cardListLen}px)`
        cardIndex = cardListLen;
    }

    if (cardsArray[cardIndex].id === 'first-card'){
        container.style.transition = "none";
        container.style.transform = `translateX(-${cardWidth}px)`
        cardIndex = 1;
    }
}