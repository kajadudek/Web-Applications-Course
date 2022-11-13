function podajImie() {
    let namePrompt = prompt("Wprowadz swoje imie: ");
    lastLetter = namePrompt.slice(-1);
    if (lastLetter == 'a') {
        document.getElementById("powitanie").textContent = "Witam pania: " + namePrompt;
    }
    else {
        document.getElementById("powitanie").innerText = "Witam pana: " + namePrompt;
    }
}


