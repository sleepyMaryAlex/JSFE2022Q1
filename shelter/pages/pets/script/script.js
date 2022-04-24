import pets from "../../main/script/pets.js";

// ======= Pagination =======

const firstPage = document.querySelector(".first-page");
const lastPage = document.querySelector(".last-page");
const prevPage = document.querySelector(".prev-page");
const nextPage = document.querySelector(".next-page");
const cards = document.querySelectorAll(".card");

let array = [];

function createArray() {
    for (let i = 0; i < 6; i++) {
        let subArray = [];
        while (subArray.length < 8) {
          let n = Math.floor(Math.random() * 8);
          if (!subArray.includes(n)) {
            subArray.push(n);
            // array.push(n);
          }
        }
        array.push(subArray);
    }
    showCards(pets, array);
}
createArray();

function showCards(pets, array) {
    for (let i = 0; i < array[0].length; i++) {
      cards[i].children[0].setAttribute("src", pets[array[0][i]].img);
      cards[i].children[1].textContent = pets[array[0][i]].name;
    }
}
