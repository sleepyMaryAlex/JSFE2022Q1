import pets from "./pets.js";

// ======= Popup =======

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

let currentPet;

export function openPopup(e) {
  for (let pet of pets) {
    if (pet.name === e.target.parentElement.dataset.pet) {
      currentPet = pet;
    }
  }
  getInfo();
  showInfo();
}

function getInfo() {
  petImg.setAttribute("src", currentPet.img);
  petName.textContent = currentPet.name;
  petTypeBreed.textContent = currentPet.type + " - " + currentPet.breed;
  petDescription.textContent = currentPet.description;
  petAge.textContent = currentPet.age;
  petInoculation.textContent = currentPet.inoculations.join(", ");
  petDiseases.textContent = currentPet.diseases.join(", ");
  petParasites.textContent = currentPet.parasites.join(", ");
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
});
