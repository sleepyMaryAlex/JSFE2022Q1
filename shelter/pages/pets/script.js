const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");

burger.addEventListener("click", showMenu);

function showMenu() {
    burger.classList.toggle("rotated");
    menu.classList.toggle("menu-visible");
}