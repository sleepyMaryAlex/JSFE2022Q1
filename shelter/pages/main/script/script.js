import pets from "./pets.js";

function choosePets(pets) {
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

choosePets(pets);
