import pets from "./pets.js";
import { openPopup } from "./popup.js";

// ======= Slider =======

const prevContainer = document.querySelector(".prev-container");
const currContainer = document.querySelector(".curr-container");
const nextContainer = document.querySelector(".next-container");
const cardContainer = document.querySelector(".card-container");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

arrowLeft.addEventListener("click", moveLeft);
arrowRight.addEventListener("click", moveRight);

let indexArray = [];

function chooseIndexes() {
  let isUnique = false;
  while (isUnique === false && indexArray.length < 3) {
    isUnique = true;
    let subArray = [];
    while (subArray.length < 3) {
      let randomNumber = Math.floor(Math.random() * pets.length);
      if (!subArray.includes(randomNumber)) {
        subArray.push(randomNumber);
      }
    }
    for (let n of subArray) {
      if (indexArray.length === 0) {
        indexArray.push(subArray);
        isUnique = false;
      } else if (indexArray[indexArray.length - 1].includes(n)) {
        isUnique = false;
      }
    }
    if (isUnique === true) {
      indexArray.push(subArray);
      isUnique = false;
    }
  }
}
chooseIndexes();

showPets();

function getUniqueSubArray(index) {
  let isUnique = false;
  let uniqueSubArray = [];
  while (isUnique === false) {
    isUnique = true;
    let subArray = [];
    while (subArray.length < 3) {
      let randomNumber = Math.floor(Math.random() * pets.length);
      if (!subArray.includes(randomNumber)) {
        subArray.push(randomNumber);
      }
    }
    for (let n of subArray) {
      if (indexArray[index].includes(n)) {
        isUnique = false;
      }
    }
    uniqueSubArray = subArray;
  }
  return uniqueSubArray;
}

function moveLeft() {
  indexArray.splice(0, 0, getUniqueSubArray(0));
  indexArray.pop();
  cardContainer.classList.add("animation-left");
}

function moveRight() {
  indexArray.splice(
    indexArray.length,
    0,
    getUniqueSubArray(indexArray.length - 1)
  );
  indexArray.shift();
  cardContainer.classList.add("animation-right");
}

cardContainer.addEventListener("animationstart", () => {
  arrowLeft.removeEventListener("click", moveLeft);
  arrowRight.removeEventListener("click", moveRight);
});

cardContainer.addEventListener("animationend", () => {
  arrowLeft.addEventListener("click", moveLeft);
  arrowRight.addEventListener("click", moveRight);
  cardContainer.classList.remove("animation-right");
  cardContainer.classList.remove("animation-left");
  showPets();
  
});

function showPets() {
  prevContainer.innerHTML = "";
  currContainer.innerHTML = "";
  nextContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      const card = `<div class="card" data-pet="${pets[indexArray[i][k]].name}">
            <img src=${pets[indexArray[i][k]].img} alt="pet">
            <h4>${pets[indexArray[i][k]].name}</h4>
            <button class="button secondary">Learn more</button>
        </div>`;
      if (i === 0) {
        prevContainer.insertAdjacentHTML("beforeend", card);
      }
      if (i === 1) {
        currContainer.insertAdjacentHTML("beforeend", card);
      }
      if (i === 2) {
        nextContainer.insertAdjacentHTML("beforeend", card);
      }
    }
  }
  currContainer.childNodes.forEach(card => card.addEventListener('click', openPopup));
}
