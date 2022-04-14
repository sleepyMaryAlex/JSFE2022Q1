const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const logoLink = document.querySelector(".logo-link");
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
    logoLink.classList.toggle("logo-invisible");
    body.classList.toggle("body-overflow");
    header.classList.toggle("header-position");
    body.classList.toggle("body-overlay");
}