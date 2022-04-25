import pets from "./pets.js";

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
        if (card.children[0].getAttribute("src") === "../../assets/images/pets-jennifer.png") {
            index = 0;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-sophia.png") {
            index = 1;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-woody.png") {
            index = 2;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-scarlett.png") {
            index = 3;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-katrine.png") {
            index = 4;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-timmy.png") {
            index = 5;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-freddie.png") {
            index = 6;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-charly.png") {
            index = 7;
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

window.addEventListener("animationend", () => {
    cards.forEach(card => card.addEventListener("click", () => {
        if (card.children[0].getAttribute("src") === "../../assets/images/pets-jennifer.png") {
            index = 0;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-sophia.png") {
            index = 1;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-woody.png") {
            index = 2;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-scarlett.png") {
            index = 3;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-katrine.png") {
            index = 4;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-timmy.png") {
            index = 5;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-freddie.png") {
            index = 6;
        } else if (card.children[0].getAttribute("src") === "../../assets/images/pets-charly.png") {
            index = 7;
        }
        getInfo(pets, index);
    }));
});