import pets from "./pets.js";

function choosePets() {
    let count;
    let indexes = [];
    if (body.clientWidth < 768) {
        count = 1;
    } else if (body.clientWidth < 1280) {
        count = 2;
    } else {
        count = 3;
    }

    while (indexes.length < count) {
        let n = Math.floor(Math.random() * 8); 
        if (!indexes.includes(n)) {
            indexes.push(n);
        }
    }
    return indexes;
}

const indexes = choosePets();

const img1 = document.querySelector(".card-1 img");
const img2 = document.querySelector(".card-2 img");
const img3 = document.querySelector(".card-3 img");
const name1 = document.querySelector(".card-1 h4");
const name2 = document.querySelector(".card-2 h4");
const name3 = document.querySelector(".card-3 h4");

function showPets(pets, indexes) {
    if (indexes.length === 1) {
        img1.setAttribute("src", pets[indexes[0]].img);
        name1.textContent = pets[indexes[0]].name;
    } else if (indexes.length === 2) {
        img1.setAttribute("src", pets[indexes[0]].img);
        img2.setAttribute("src", pets[indexes[1]].img);
        name1.textContent = pets[indexes[0]].name;
        name2.textContent = pets[indexes[1]].name;
    } else {
        img1.setAttribute("src", pets[indexes[0]].img);
        img2.setAttribute("src", pets[indexes[1]].img);
        img3.setAttribute("src", pets[indexes[2]].img);
        name1.textContent = pets[indexes[0]].name;
        name2.textContent = pets[indexes[1]].name;
        name3.textContent = pets[indexes[2]].name;
    }
}

showPets(pets, indexes);
