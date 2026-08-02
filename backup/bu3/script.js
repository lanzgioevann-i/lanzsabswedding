/* ==========================================
   WEDDING WEBSITE
   script.js
========================================== */

/* ==========================================
   HAMBURGER MENU
========================================== */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* ==========================================
   STICKY NAVBAR
========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* ==========================================
   COUNTDOWN
========================================== */

const weddingDate = new Date("February 27, 2027 10:00:00").getTime();

const countdown = () => {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").innerHTML = "0";
    document.getElementById("hours").innerHTML = "0";
    document.getElementById("minutes").innerHTML = "0";
    document.getElementById("seconds").innerHTML = "0";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
};

countdown();

setInterval(countdown, 1000);

/* ==========================================
   SCROLL REVEAL
========================================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll(".fade-up").forEach((el) => {
  observer.observe(el);
});

/* ==========================================
   GALLERY LIGHTBOX
========================================== */

const images = document.querySelectorAll(".gallery-grid img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML = "<img>";

document.body.appendChild(lightbox);

lightbox.style.position = "fixed";
lightbox.style.top = "0";
lightbox.style.left = "0";
lightbox.style.width = "100%";
lightbox.style.height = "100%";
lightbox.style.background = "rgba(0,0,0,.9)";
lightbox.style.display = "none";
lightbox.style.justifyContent = "center";
lightbox.style.alignItems = "center";
lightbox.style.zIndex = "9999";
lightbox.style.cursor = "zoom-out";

const lightboxImg = lightbox.querySelector("img");

lightboxImg.style.maxWidth = "90%";
lightboxImg.style.maxHeight = "90%";
lightboxImg.style.borderRadius = "12px";
lightboxImg.style.boxShadow = "0 20px 60px rgba(0,0,0,.4)";

images.forEach((image) => {
  image.addEventListener("click", () => {
    lightbox.style.display = "flex";

    lightboxImg.src = image.src;
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

/* ==========================================
   RSVP DEMO
========================================== */

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  alert(
    `Thank you for your RSVP!

This is currently a demo.

Later we can connect this form to:

• Google Forms
• Google Sheets
• Email
• Firebase
• Supabase

Your response would then be saved automatically.`,
  );

  form.reset();
});

/* ==========================================
   HERO FADE-IN
========================================== */

window.addEventListener("load", () => {
  const hero = document.querySelector(".hero-content");

  hero.style.opacity = "0";
  hero.style.transform = "translateY(30px)";
  hero.style.transition = "1.2s";

  setTimeout(() => {
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }, 200);
});
