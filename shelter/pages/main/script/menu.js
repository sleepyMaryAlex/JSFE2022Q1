// ====== Menu ======

const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const logoLink = document.querySelector(".logo-link");
const navLinks = document.querySelectorAll(".nav-link");
const lines = document.querySelectorAll(".line");

navLinks.forEach(link => link.addEventListener("click",  () => {
    if (link.classList.contains("menu-link")) {
        showMenu();
    }
}));

body.addEventListener("click", (e) => {
    lines.forEach(line => {
        if (e.target === burger || e.target === line) {
            showMenu();
        } else if (menu.classList.contains("menu-visible") && e.target === body) {
            showMenu();
        }
    })
});

function showMenu() {
    burger.classList.toggle("rotated");
    menu.classList.toggle("menu-visible");
    navLinks.forEach(link => link.classList.toggle("menu-link"));
    logoLink.classList.toggle("logo-invisible");
    body.classList.toggle("body-overflow");
    header.classList.toggle("header-darken");
    body.classList.toggle("body-overlay");
}