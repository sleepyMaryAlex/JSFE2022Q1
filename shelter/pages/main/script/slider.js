import pets from "./pets.js";

// ======= Slider =======

const img1 = document.querySelector(".card-1 img");
const img2 = document.querySelector(".card-2 img");
const img3 = document.querySelector(".card-3 img");
const name1 = document.querySelector(".card-1 h4");
const name2 = document.querySelector(".card-2 h4");
const name3 = document.querySelector(".card-3 h4");
const arrowButtons = document.querySelectorAll(".arrow");

arrowButtons.forEach(btn => btn.addEventListener("click", choosePets));

let indexes = [];

choosePets();

function choosePets() {
    let prevIndexes = getFromLocalStorage();
    indexes = [];

    while (indexes.length < 3) {
        let n = Math.floor(Math.random() * 8); 
        if (!indexes.includes(n) && (prevIndexes === undefined || !prevIndexes.includes(n))) {
            indexes.push(n);
            saveToLocalStorage(indexes);
        }
    }
    showPets(pets, indexes);
}

function showPets(pets, indexes) {
        img1.setAttribute("src", pets[indexes[0]].img);
        img2.setAttribute("src", pets[indexes[1]].img);
        img3.setAttribute("src", pets[indexes[2]].img);
        name1.textContent = pets[indexes[0]].name;
        name2.textContent = pets[indexes[1]].name;
        name3.textContent = pets[indexes[2]].name;
}

function saveToLocalStorage(indexes) {
    localStorage.setItem("prevIndexes", JSON.stringify(indexes));
}

function getFromLocalStorage() {
    if (localStorage.getItem("prevIndexes")) {
        return JSON.parse(localStorage.getItem("prevIndexes"));
    }
}

