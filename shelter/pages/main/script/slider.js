import pets from "./pets.js";

// ======= Slider =======

const cards = document.querySelectorAll(".card");
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
    for (let i = 0; i < indexes.length; i++) {
        cards[i].children[0].setAttribute("src", pets[indexes[i]].img);
        cards[i].children[1].textContent = pets[indexes[i]].name;
    }
}

function saveToLocalStorage(indexes) {
    localStorage.setItem("prevIndexes", JSON.stringify(indexes));
}

function getFromLocalStorage() {
    if (localStorage.getItem("prevIndexes")) {
        return JSON.parse(localStorage.getItem("prevIndexes"));
    }
}

