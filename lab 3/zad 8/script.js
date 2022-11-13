var pswd1 = document.getElementById("password1");
var pswd2 = document.getElementById("password2");
var paswordMatching = document.getElementById("password-match");

var characters = document.getElementById("characters");
var charactersIcon = document.getElementById("characters-i");

var specialChar = document.getElementById("special-char");
var specialCharIcon = document.getElementById("special-char-i");

var capitalLet = document.getElementById("capital-letter");
var capitalLetIcon = document.getElementById("capital-letter-i");

var digit = document.getElementById("digit");
var digitIcon = document.getElementById("digit-i");

pswd1.onkeyup = function() {
    var lengthPattern = 8;
    var uppercaseLettersPattern = /[A-Z]/g;
    var digitsPattern = /\d/g;
    var specialCharPattern = /\W/g;

    //checks length of password
    if(pswd1.value.length >= 8) {
        characters.style.color = "green";
        charactersIcon.style.color = "green";
        charactersIcon.className = "fa-solid fa-circle-check";
    }
    else {
        characters.style.color = "";
        charactersIcon.style.color = "";
        charactersIcon.className = "fa-solid fa-circle-xmark";
    }

    //checks occurence of uppercase letter
    if(pswd1.value.match(uppercaseLettersPattern)) {
        capitalLet.style.color = "green";
        capitalLetIcon.style.color = "green";
        capitalLetIcon.className = "fa-solid fa-circle-check";
    }
    else {
        capitalLet.style.color = "";
        capitalLetIcon.style.color = "";
        capitalLetIcon.className = "fa-solid fa-circle-xmark";
    }

    //checks occurence of digit
    if(pswd1.value.match(digitsPattern)) {
        digit.style.color = "green";
        digitIcon.style.color = "green";
        digitIcon.className = "fa-solid fa-circle-check";
    }
    else {
        digit.style.color = "";
        digitIcon.style.color = "";
        digitIcon.className = "fa-solid fa-circle-xmark";
    }

    //checks occurence of special character
    if(pswd1.value.match(specialCharPattern)) {
        specialChar.style.color = "green";
        specialCharIcon.style.color = "green";
        specialCharIcon.className = "fa-solid fa-circle-check";
    }
    else {
        specialChar.style.color = "";
        specialCharIcon.style.color = "";
        specialCharIcon.className = "fa-solid fa-circle-xmark";
    }

    //check password match while entering password1
    if(pswd1.value == pswd2.value){
        pswd2.style.borderColor = "rgb(193, 193, 193)"
        paswordMatching.style.opacity = "0";
        
    }
    else {
        pswd2.style.borderColor = "red";
        paswordMatching.style.opacity = "1";
    }
}


//check password match while entering password2
pswd2.onkeyup = function() {
    if(pswd1.value == pswd2.value){
        pswd2.style.borderColor = "rgb(193, 193, 193)"
        paswordMatching.style.opacity = "0";
    }
    else {
        pswd2.style.borderColor = "red";
        paswordMatching.style.opacity = "1";
    }
}


//visibility of passwords
document.getElementById("hide-psw1").addEventListener('click',function() {
    if (pswd1.type == "password"){
        pswd1.type = "text";
        document.getElementById("hide-psw1").classList = "fa-solid fa-eye-slash";
    }
    else {
        pswd1.type = "password";
        document.getElementById("hide-psw1").classList = "fa-solid fa-eye";
    }
})

document.getElementById("hide-psw2").addEventListener('click', function() {
    if (pswd2.type == "password") {
        pswd2.type = "text";
        document.getElementById("hide-psw2").classList = "fa-solid fa-eye-slash";
    }
    else {
        pswd2.type = "password";
        document.getElementById("hide-psw2").classList = "fa-solid fa-eye";
    }
})