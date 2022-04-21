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

// ======= Popup =======

const cards = document.querySelectorAll(".card");
const petImg = document.querySelector(".pet-img");
const petName = document.querySelector(".pet-name");
const petTypeBreed = document.querySelector(".pet-type-breed");
const petDescription = document.querySelector(".pet-description");
const petAge = document.querySelector(".pet-age");
const petInoculation = document.querySelector(".pet-inoculation");
const petDiseases = document.querySelector(".pet-diseases");
const petParasites = document.querySelector(".pet-parasites");
const closeBtn = document.querySelector(".close-btn");
const closeBtnImg = document.querySelector(".close-btn-img");
const modal = document.querySelector(".modal");

let index;

cards.forEach(card => card.addEventListener("click", () => {
    if (card.classList.contains("card-1")) {
        index = indexes[0];
    } else if (card.classList.contains("card-2")) {
        index = indexes[1];
    } else if (card.classList.contains("card-3")) {
        index = indexes[2];
    }
    getInfo(pets, index);
}));

function getInfo(pets, index) {
    petImg.setAttribute("src", pets[index].img);
    petName.textContent = pets[index].name;
    petTypeBreed.textContent = pets[index].type + " - " + pets[index].breed;
    petDescription.textContent = pets[index].description;
    petAge.textContent = pets[index].age;
    petInoculation.textContent = pets[index].inoculations.join(", ");
    petDiseases.textContent = pets[index].diseases.join(", ");
    petParasites.textContent = pets[index].parasites.join(", ");
    showInfo();
}

function showInfo() {
    body.classList.toggle("overflow");
    body.classList.toggle("overlay");
    modal.classList.toggle("modal-active");
    closeBtn.classList.toggle("close-btn-active");
}

body.addEventListener("click", (e) => {
    if (e.target === closeBtn || e.target === closeBtnImg) {
        showInfo();
    } else if (modal.classList.contains("modal-active") && e.target === body) {
        showInfo();
    }
})