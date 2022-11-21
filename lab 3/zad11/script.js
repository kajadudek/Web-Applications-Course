const url = "https://restcountries.com/v3.1/all"
const col = ["name", "capital", "population", "area"];
var counter = 1;
var nameC = 0,
    capC = 0,
    popC = 0,
    areaC = 0;

fetch(url)
.then((response) => {
    console.log("ok", response);
})
.catch((err) => {
    console.log("error",err);
})

async function getData() {
    var response = await fetch(url);
    var countries = await response.json();
    return countries;
}

var table = document.getElementById("table");
var rows;

let tr;

async function loadTable() {
    var data = await getData();

    for (let i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            if (j == 0){
                tabCell.innerHTML = data[i].name.common;
            }
            else{
                tabCell.innerHTML = data[i][col[j]];
            }
        }
    }


    function sortByCol(n, asc){
        rows = table.rows;

        var i, x, y, shouldSwitch, switchcount = 0;
        var switching = true;
        var direction = "asc";
        if (!asc){
            direction = "desc";
        }

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].cells[n].innerHTML;
                y = rows[i + 1].cells[n].innerHTML;

                if (direction == "asc") {
                    if (x.toLowerCase() > y.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                    }
                } else if (direction == "desc") {
                    if (x.toLowerCase() < y.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
                }
                

                if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;      
                }
        }
    }

    function sortByColNum(n, asc){
        rows = table.rows;

        var i, x, y, shouldSwitch, switchcount = 0;
        var switching = true;
        var direction = "asc";
        if (!asc){
            direction = "desc";
        }

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = Number(rows[i].cells[n].innerHTML);
                y = Number(rows[i + 1].cells[n].innerHTML);
                if (direction == "asc") {
                    if (x > y) {
                        shouldSwitch= true;
                        break;
                    }
                } else if (direction == "desc") {
                    if (x < y) {
                        shouldSwitch = true;
                        break;
                        }
                }
                }
                
                if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;      
                }
        }
    }



    nameCol.addEventListener('click',function() {
        nameC += 1;
        if (nameC % 2 == 1){
            sortByCol(0, true);
            nameCol.textContent = "NAME /\\ "
        }
        else {
            sortByCol(0, false);
            nameCol.textContent = "NAME \\/ "
        }
        capC = 0,
        popC = 0,
        areaC = 0;
    });

    capitalCol.addEventListener('click',function() {
        capC += 1;
        if (capC % 2 == 1){
            sortByCol(1,true);
            capitalCol.textContent = "CAPITAL /\\ "
        }
        else {
            sortByCol(1,false);
            capitalCol.textContent = "CAPITAL \\/ "
        }

        nameC = 0,
        popC = 0,
        areaC = 0;
    })

    populationCol.addEventListener('click',function(){
        popC += 1;
        if (popC % 2 == 1){
            sortByColNum(2, true);
            populationCol.textContent = "POPULATION /\\ "
        }
        else {
            sortByColNum(2, false);
            populationCol.textContent = "POPULATION \\/ "
        }

        nameC = 0,
        capC = 0,
        areaC = 0;
    })

    areaCol.addEventListener('click', function(){
        areaC += 1;
        if (areaC % 2 == 1){
            sortByColNum(3,true);
            areaCol.textContent = "AREA /\\ "
        }
        else {
            sortByColNum(3,false);
            areaCol.textContent = "AREA \\/ "
        }

        nameC = 0,
        capC = 0,
        popC = 0;
    })

    prevButton.addEventListener('click',function(){
        pagination(counter);
        
        counter -= 1;
        if (counter<0){
            counter = 0;
        }
    })

    nextButton.addEventListener('click', function(){
        pagination(counter);

        counter+=1
        if (counter >= 25){
            counter = 25;
        }
    })

    function pagination(counter){
        if(counter >=0 && counter<25){
            table.style.transform = `translateY(-` + counter * 660 + `px)`;
        }
    }
}



loadTable();

table = document.getElementById("table");
let nameCol = document.getElementById("name");
let capitalCol = document.getElementById("capital");
let populationCol = document.getElementById("population");
let areaCol = document.getElementById("area");
let prevButton = document.getElementById("left-arrow");
let nextButton = document.getElementById("right-arrow");

