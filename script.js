// ================= SMOOTH SCROLLING =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

    });

});

// ================= TYPING EFFECT =================

const text = [
    "AI & ML Enthusiast",
    "Web Developer",
    "DSA Problem Solver",
    "Java Programmer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

    if (count === text.length) {
        count = 0;
    }

    currentText = text[count];

    letter = currentText.slice(0, ++index);

    document.querySelector(".typing").textContent = letter;

    if (letter.length === currentText.length) {

        count++;
        index = 0;

        setTimeout(type, 1200);

    } else {

        setTimeout(type, 100);

    }

})();

// ================= NAVBAR SHADOW ON SCROLL =================

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    header.classList.toggle("sticky", window.scrollY > 0);

});

// ================= SCROLL ANIMATION =================

const cards = document.querySelectorAll(
    ".skill-card, .project-card, .education-card, .cert-card"
);

window.addEventListener("scroll", reveal);

function reveal() {

    const triggerBottom = window.innerHeight / 1.2;

    cards.forEach(card => {

        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {

            card.classList.add("show");

        }

    });

}

reveal();
// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});
// ================= DARK LIGHT MODE =================

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    // Change icon
    if(document.body.classList.contains("light-mode")){
        themeToggle.textContent = "☀️";
    }else{
        themeToggle.textContent = "🌙";
    }

});
// ================= PARTICLES JS =================

particlesJS("particles-js", {

    particles: {

        number: {
            value: 80
        },

        color: {
            value: "#38bdf8"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.5
        },

        size: {
            value: 3
        },

        move: {
            enable: true,
            speed: 2
        },

        line_linked: {
            enable: true,
            color: "#38bdf8"
        }

    }

});
// ================= EMAIL JS =================

emailjs.init("3GmsXLw4v6OPNg6Kl");

document
.getElementById("contact-form")
.addEventListener("submit", function(event){

    event.preventDefault();

    emailjs.sendForm(
        "service_l3wvoih",
        "template_cxg7oii",
        this
    )

    .then(() => {

        alert("Message Sent Successfully!");

        this.reset();

    })

    .catch((error) => {

        alert("Failed to send message.");

        console.log(error);

    });

});