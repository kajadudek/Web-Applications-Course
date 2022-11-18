fetch("cities.json")
.then((response) => {
    console.log("ok", response);
})
.catch((err) => {
    console.log("error",err);
})

async function getData() {
    var response = await fetch("cities.json");
    var cities = await response.json();
    return cities;
}

async function A(data) {
    let cities = data.cities;
    // console.log(cities);

    let resultList = cities.filter(function (elem) {
        return elem.province == "małopolskie";
    });


    // console.log('tu',resultList) - lista obiektow
    let answer = "";

    for (id in resultList) {

        if (id == resultList.length-1){
            answer+=resultList[id].name +".";
            break;
        }
        answer += resultList[id].name + ", "
    }

    // console.log(answer) - lista stringow
    document.getElementById("a1").textContent = answer;
}


async function B(data){
    let cities = data.cities;
    var counter = 0;

    // console.log(cities)

    let resultList = cities.filter(function (elem) {
        return elem.province == "małopolskie";
    });

    let answer = "";

    for (id in resultList) {
        counter = 0;
        for (let i = 0; i < resultList[id].name.length; i ++) {
            if (resultList[id].name.charAt(i) == 'a' || resultList[id].name.charAt(i) == 'A') {
                counter += 1;
            }
        }
        if (counter >= 2) {
            answer += resultList[id].name + ", ";
        }
        counter = 0;
    }

    answer = answer.slice(0, answer.length-2);

    document.getElementById("b1").textContent = answer + ".";
}


async function C(data){
    let cities = data.cities;
    let resultList = new Array;

    for (id in cities){
        resultList.push([cities[id].name, cities[id].dentensity]);
    }

    resultList.sort(function(a,b){
        if (a[1] < b[1]){return 1}      //wartosc dodatnia - a jest sortowane przed b
        else if (a[1]==b[1]){return 0}
        else {return -1};               //wartosc ujemna - b przed a
    })
    
    // console.log(resultList)

    if (resultList.length <= 4){
        document.getElementById("c1").textContent = "Nie ma takiego miasta";
    }
    else{
        let answer = "To miasto to: " + resultList[4][0] + ", a jej gęstość zaludnienia: " + resultList[4][1];
        document.getElementById("c1").textContent = answer;
    }   
}

async function D(data){
    let cities = data.cities;

    let resultList = cities.filter(function (elem) {
        if (elem.people > 100000) {
            elem.name += " city";
            return elem.name;
        }
    })

    resultList.forEach(element => {
        if (element === resultList[resultList.length-1]){
            document.getElementById("d1").textContent += element.name + ".";
        }
        else {
        document.getElementById("d1").textContent += element.name + ", ";
        }
    });
}

async function E(data){
    let cities = data.cities;

    let habitantsOverTheLimit = cities.filter( function (elem) {
        return elem.people > 80000;
    })

    let habitantsUnderTheLimit = cities.filter( function (elem) {
        return elem.people < 80000;
    })

    document.getElementById("e1").textContent += habitantsOverTheLimit.length;
    document.getElementById("e2").textContent += habitantsUnderTheLimit.length;

    if (habitantsOverTheLimit > habitantsUnderTheLimit) {
        document.getElementById("e3").textContent = "Więcej jest miast powyżej 80000 mieszkańców";
    }
    else {
        document.getElementById("e3").textContent = "Więcej jest miast poniżej 80000 mieszkańców";
    }
}

async function F(data){
    let cities = data.cities;

    let pLetterCities = cities.filter( function (elem){
        return elem.township.charAt(0) == 'p';
    })

    let avgArea = 0;

    pLetterCities.forEach(element => {
        avgArea += element.area;
    });

    document.getElementById("f1").textContent = (avgArea/pLetterCities.length).toFixed(4);   
}

async function G(data){
    let cities = data.cities;
    var counter = 0;

    let pomeranianCities = cities.filter( function (elem){
        if (elem.province == "pomorskie"){
            if (elem.people > 5000) {
                counter +=1;
            }
            return elem;
        }
    })

    if (pomeranianCities.length > counter) {
        document.getElementById("g1").textContent = "Nie,";
    }
    else {
        document.getElementById("g1").textContent = "Tak,";
    }

    document.getElementById("g1").textContent += " jest ich: " + counter;
    
}

async function loadSite() {
    var json = await getData();
    A(json);
    B(json);
    C(json);
    D(json);
    E(json);
    F(json);
    G(json);
}

loadSite();