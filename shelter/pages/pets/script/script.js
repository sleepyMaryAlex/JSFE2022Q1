import pets from "../../main/script/pets.js";

const wrapper = document.querySelector(".wrapper");

// ======= Pagination =======

const firstPage = document.querySelector(".first-page");
const lastPage = document.querySelector(".last-page");
const prevPage = document.querySelector(".prev-page");
const nextPage = document.querySelector(".next-page");
const pageNumber = document.querySelector(".page-number");
const cards = document.querySelectorAll(".card");
const btnRound = document.querySelectorAll(".button-round");

let currentPage = 1;

nextPage.addEventListener("click", () => {
  if (wrapper.clientWidth >= 1280) {
    if (currentPage < 6) {
      currentPage += 1;
      showCards(pets, array, currentPage);
    }
  } else if (wrapper.clientWidth >= 768) {
    if (currentPage < 8) {
      currentPage += 1;
      showCards(pets, array, currentPage);
    }
  } else if (wrapper.clientWidth < 768) {
    if (currentPage < 16) {
      currentPage += 1;
      showCards(pets, array, currentPage);
    }
  }
});

lastPage.addEventListener("click", () => {
  if (wrapper.clientWidth >= 1280) {
    currentPage = 6;
    showCards(pets, array, currentPage);
  } else if (wrapper.clientWidth >= 768) {
    currentPage = 8;
    showCards(pets, array, currentPage);
  } else if (wrapper.clientWidth < 768) {
    currentPage = 16;
    showCards(pets, array, currentPage);
  }
});

prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    showCards(pets, array, currentPage);
  }
});

firstPage.addEventListener("click", () => {
  currentPage = 1;
  showCards(pets, array, currentPage);
});

let array = [];

function createArray() {
  if (wrapper.clientWidth >= 1280) {
    for (let i = 0; i < 6; i++) {
      let subArray = [];
      while (subArray.length < 8) {
        let n = Math.floor(Math.random() * 8);
        if (!subArray.includes(n)) {
          subArray.push(n);
        }
      }
      array.push(subArray);
    }
  } else if (wrapper.clientWidth >= 768) {
    for (let i = 0; i < 8; i++) {
      let subArray = [];
      while (subArray.length < 6) {
        let n = Math.floor(Math.random() * 6);
        if (!subArray.includes(n)) {
          subArray.push(n);
        }
      }
      array.push(subArray);
    }
  } else if (wrapper.clientWidth < 768) {
    for (let i = 0; i < 16; i++) {
      let subArray = [];
      while (subArray.length < 3) {
        let n = Math.floor(Math.random() * 3);
        if (!subArray.includes(n)) {
          subArray.push(n);
        }
      }
      array.push(subArray);
    }
  }

  showCards(pets, array, currentPage);
}
createArray();

function showCards(pets, array, currentPage) {
  pageNumber.textContent = currentPage;
  for (let i = 0; i < array[currentPage - 1].length; i++) {
    cards[i].children[0].setAttribute(
      "src",
      pets[array[currentPage - 1][i]].img
    );
    cards[i].children[1].textContent = pets[array[currentPage - 1][i]].name;
  }
  if (currentPage === 6 && wrapper.clientWidth >= 1280) {
    btnRound.forEach((btn) => btn.classList.remove("active"));
    btnRound.forEach((btn) => btn.classList.remove("inactive"));
    nextPage.classList.add("inactive");
    lastPage.classList.add("inactive");
    prevPage.classList.add("active");
    firstPage.classList.add("active");
  } else if (currentPage === 8 && wrapper.clientWidth >= 768) {
    btnRound.forEach((btn) => btn.classList.remove("active"));
    btnRound.forEach((btn) => btn.classList.remove("inactive"));
    nextPage.classList.add("inactive");
    lastPage.classList.add("inactive");
    prevPage.classList.add("active");
    firstPage.classList.add("active");
  } else if (currentPage === 16 && wrapper.clientWidth < 768) {
    btnRound.forEach((btn) => btn.classList.remove("active"));
    btnRound.forEach((btn) => btn.classList.remove("inactive"));
    nextPage.classList.add("inactive");
    lastPage.classList.add("inactive");
    prevPage.classList.add("active");
    firstPage.classList.add("active");
  } else if (currentPage === 1) {
    btnRound.forEach((btn) => btn.classList.remove("active"));
    btnRound.forEach((btn) => btn.classList.remove("inactive"));
    prevPage.classList.add("inactive");
    firstPage.classList.add("inactive");
    nextPage.classList.add("active");
    lastPage.classList.add("active");
  } else {
    btnRound.forEach((btn) => btn.classList.add("active"));
  }
}
