/* ==========================================
   WEDDING WEBSITE
   script.js
========================================== */

/* ==========================================
   HAMBURGER MENU
========================================== */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Toggle menu
hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevents the document click from firing
  navLinks.classList.toggle("active");
});

// Close menu when clicking a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking anywhere outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove("active");
  }
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

/* ==========================================
   RSVP GoogleScripts
========================================== */

const rsvpForm = document.getElementById("rsvp-form");

rsvpForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitButton = rsvpForm.querySelector("button");

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const formData = new FormData();

  formData.append("name", document.getElementById("name").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("attendance", document.getElementById("attendance").value);
  formData.append("message", document.getElementById("message").value);

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbxXiwxDp3dwBDFIBkIgND1rai5UwI3fFbSXPHebMK1r9DdH_izTWd88bHV9PqlJruuUqQ/exec",
      {
        method: "POST",
        body: formData,
      },
    );

    rsvpForm.reset();

    alert("Thank you! Your RSVP has been received.");
  } catch (err) {
    console.error(err);
    alert("Sorry, something went wrong. Please try again.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Confirm Attendance";
  }
});

/* ==========================================
   HERO HEADER
========================================== */

window.addEventListener("DOMContentLoaded", () => {
  // Get the actual inner height of the device screen once
  const vh = window.innerHeight;
  // Apply that exact pixel height as a custom CSS variable
  document.documentElement.style.setProperty("--fixed-vh", `${vh}px`);
});
