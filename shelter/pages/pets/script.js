const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

burger.addEventListener("click", showMenu);
navLinks.forEach(link => link.addEventListener("click",  () => {
    if (link.classList.contains("menu-link")) {
        showMenu();
    }
}));

function showMenu() {
    burger.classList.toggle("rotated");
    menu.classList.toggle("menu-visible");
    navLinks.forEach(link => link.classList.toggle("menu-link"));
}