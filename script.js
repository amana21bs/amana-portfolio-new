/* =========================================================
   PORTFOLIO JAVASCRIPT
   ========================================================= */

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    const isOpen = navMenu.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});


/* Close mobile menu when a navigation link is clicked */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


/* Close mobile menu when clicking outside */

document.addEventListener("click", (event) => {
    const clickedInsideNav =
        navMenu.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clickedInsideNav && navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }
});


/* Close mobile menu with Escape key */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }
});


/* =========================================================
   DARK / LIGHT THEME
   ========================================================= */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLightTheme = document.body.classList.contains("light-theme");

    if (isLightTheme) {
        themeToggle.textContent = "☀";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.textContent = "☾";
        localStorage.setItem("theme", "dark");
    }
});


/* Load saved theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀";
} else {
    themeToggle.textContent = "☾";
}


/* =========================================================
   HEADER ON SCROLL
   ========================================================= */

const header = document.getElementById("header");

function updateHeader() {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("main section");

function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =========================================================
   HERO TYPING ANIMATION
   ========================================================= */

const typingText = document.getElementById("typing-text");
const typingPrefix = document.querySelector(".typing-prefix");

const typingRoles = [
    {
        prefix: "I'm a",
        role: "UI/UX Designer"
    },
    {
        prefix: "I'm a",
        role: "Front-End Developer"
    },
    {
        prefix: "I'm an",
        role: "Aspiring Project Manager"
    }
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = typingRoles[roleIndex];

    typingPrefix.textContent = currentRole.prefix;

    if (!isDeleting) {
        typingText.textContent =
            currentRole.role.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.role.length) {
            isDeleting = true;

            setTimeout(typeRole, 1700);

            return;
        }
    } else {
        typingText.textContent =
            currentRole.role.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            isDeleting = false;

            roleIndex++;

            if (roleIndex >= typingRoles.length) {
                roleIndex = 0;
            }
        }
    }

    const typingSpeed = isDeleting ? 55 : 95;

    setTimeout(typeRole, typingSpeed);
}

typeRole();


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .education-item, .certificate-item, .contact-content, .footer-content"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   PROJECT CARD STAGGER ANIMATION
   ========================================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
});


/* =========================================================
   SKILL CARD STAGGER ANIMATION
   ========================================================= */

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
});


/* =========================================================
   EDUCATION CARD STAGGER ANIMATION
   ========================================================= */

const educationItems = document.querySelectorAll(".education-item");

educationItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.08}s`;
});


/* =========================================================
   CERTIFICATE CARD STAGGER ANIMATION
   ========================================================= */

const certificateItems = document.querySelectorAll(".certificate-item");

certificateItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.08}s`;
});


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    backToTop.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (targetId === "#" || targetId === "") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* =========================================================
   REDUCE ANIMATIONS FOR USERS WHO PREFER IT
   ========================================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = "auto";
}


/* =========================
   CV MODAL
========================= */

const cvButton = document.getElementById("cv-button");
const cvModal = document.getElementById("cv-modal");
const cvModalClose = document.getElementById("cv-modal-close");

if (cvButton && cvModal && cvModalClose) {

    cvButton.addEventListener("click", () => {
        cvModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    cvModalClose.addEventListener("click", () => {
        cvModal.classList.remove("active");
        document.body.style.overflow = "";
    });

    cvModal.addEventListener("click", (event) => {
        if (event.target === cvModal) {
            cvModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

}