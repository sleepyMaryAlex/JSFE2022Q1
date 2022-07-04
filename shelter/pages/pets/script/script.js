import pets from "../../main/script/pets.js";
import { openPopup } from "../../main/script/popup.js";

const wrapper = document.querySelector(".wrapper");

// ======= Pagination =======

const firstPage = document.querySelector(".first-page");
const lastPage = document.querySelector(".last-page");
const prevPage = document.querySelector(".prev-page");
const nextPage = document.querySelector(".next-page");
const pageNumber = document.querySelector(".page-number");
const cardsContainer = document.querySelector(".cards-container");
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

// function initializeArray() {
//   for (let i = 0; i < 6; i++) {
//     for (let j = 0; j < 8; j++) {
//       array.push(j);
//     }
//   }

//   let pageSize = getPageSize();

//   for (let i = 0; i < array.length / pageSize; i++) {
//     shuffleArray(i * pageSize, (i + 1) * pageSize);
//   }

  // do {
  //   shuffleArray();
  // } while (!areElementsUnique(8));

//   showCards(pets, array, currentPage);
// }

// function shuffleArray(indexFrom, indexTo) {
//   let pageSize = indexTo - indexFrom;
//   for (let i = indexFrom; i < indexTo; i++) {
//     const j = indexFrom + Math.floor(Math.random() * pageSize);
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// function areElementsUnique(pageSize) {
//   for (let i = 0; i < array.length / pageSize; i++) {
//     if (!areSubarrayElementsUnique(pageSize * i, pageSize * (i + 1))) {
//       return false;
//     }
//   }
//   return true;
// }

// function areSubarrayElementsUnique(indexFrom, indexTo) {
//   for (let i = indexFrom; i < indexTo; i++) {
//     for (let j = i + 1; j < indexTo; j++) {
//       if (array[i] == array[j]) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

// initializeArray();

// function getPageSize() {
//   if (wrapper.clientWidth >= 1280) {
//     return 8
//   } else if (wrapper.clientWidth >= 768) {
//     return 6;
//   } else {
//     return 3;
//   }
// }

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
      //  8 or 6
      while (subArray.length < 8) {
        let n = Math.floor(Math.random() * 8);
        if (!subArray.includes(n)) {
          subArray.push(n);
        }
      }
      array.push(subArray);
    }
  } else if (wrapper.clientWidth < 768) {
    for (let i = 0; i < 16; i++) {
      let subArray = [];
      // 8 or 3
      while (subArray.length < 8) {
        let n = Math.floor(Math.random() * 8);
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
  cardsContainer.innerHTML = "";
  pageNumber.textContent = currentPage;
  // let pageSize = getPageSize();
  // for (let i = 0; i < pageSize; i++) {
  //   let index = array[(currentPage - 1) * pageSize + i];
  //   const card = `<div class="card" data-pet="${pets[index].name}">
  //                     <img src=${pets[index].img} alt="pet">
  //                     <h4>${pets[index].name}</h4>
  //                     <button class="button secondary">Learn more</button>
  //                 </div>`;
  //   cardsContainer.insertAdjacentHTML("beforeend", card);
  // }
  for (let i = 0; i < array[currentPage - 1].length; i++) {
    const card = `<div class="card" data-pet="${pets[array[currentPage - 1][i]].name}">
                      <img src=${pets[array[currentPage - 1][i]].img} alt="pet">
                      <h4>${pets[array[currentPage - 1][i]].name}</h4>
                      <button class="button secondary">Learn more</button>
                  </div>`;
    cardsContainer.insertAdjacentHTML("beforeend", card);
  }
  const cards = document.querySelectorAll(".card");
  if ((currentPage === 6 && wrapper.clientWidth >= 1280) || (currentPage === 8 && wrapper.clientWidth >= 768) || (currentPage === 16 && wrapper.clientWidth < 768)) {
    btnRound.forEach((btn) => btn.classList.remove("active"));
    btnRound.forEach((btn) => btn.classList.remove("inactive"));
    lastPage.removeAttribute("disabled");
    firstPage.removeAttribute("disabled");
    nextPage.classList.add("inactive");
    lastPage.classList.add("inactive");
    lastPage.setAttribute("disabled", "true");
    prevPage.classList.add("active");
    firstPage.classList.add("active");
  } else if (currentPage === 1) {
    btnRound.forEach((btn) => btn.classList.remove("active"));
    btnRound.forEach((btn) => btn.classList.remove("inactive"));
    lastPage.removeAttribute("disabled");
    firstPage.removeAttribute("disabled");
    prevPage.classList.add("inactive");
    firstPage.classList.add("inactive");
    firstPage.setAttribute("disabled", "true");
    nextPage.classList.add("active");
    lastPage.classList.add("active");
  } else {
    lastPage.removeAttribute("disabled");
    firstPage.removeAttribute("disabled");
    btnRound.forEach((btn) => btn.classList.add("active"));
  }
  cards.forEach(card => card.addEventListener("click", openPopup));
}

window.addEventListener("resize", () => {
  if (currentPage > 6 && wrapper.clientWidth >= 1280){
    currentPage = 6;
  } else if (currentPage > 8 && wrapper.clientWidth >= 768) {
    currentPage = 8;
  }
  createArray();
});

// window.addEventListener("resize", () => {
//   if (currentPage > 6 && wrapper.clientWidth >= 1280){
//     currentPage = 6;
//   } else if (currentPage > 8 && wrapper.clientWidth >= 768) {
//     currentPage = 8;
//   }
//   initializeArray();
// });

