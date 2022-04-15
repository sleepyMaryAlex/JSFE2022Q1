const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const body = document.querySelector("body");
const logoLink = document.querySelector(".logo-link");
const navLinks = document.querySelectorAll(".nav-link");

burger.addEventListener("click", showMenu);
navLinks.forEach(link => link.addEventListener("click",  () => {
    if (link.classList.contains("menu-link")) {
        showMenu();
    }
}));

body.addEventListener("click", (e) => {
    if (menu.classList.contains("menu-visible")) {
        if (e.target === body || e.target === burger) {
            showMenu();
        }
    }
}, true);


function showMenu() {
    burger.classList.toggle("rotated");
    menu.classList.toggle("menu-visible");
    navLinks.forEach(link => link.classList.toggle("menu-link"));
    logoLink.classList.toggle("logo-invisible");
    body.classList.toggle("body-overflow");
    body.classList.toggle("body-overlay");
}