// app.js

// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

// Loader Fade Out with animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const loaderProgress = document.querySelector(".loader-progress");
  const loaderText = document.querySelector(".loader-text");
  const nav = document.querySelector("nav");

  nav.style.display = "none";
  loaderText.style.opacity = 1;

  gsap.to(loaderProgress, {
    width: "100%",
    duration: 0.4,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          loader.style.display = "none";
          nav.style.display = "block";
          gsap.fromTo(nav, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });

          const heroItems = document.querySelectorAll(".hero-title, .hero-subtitle, .hero-description, .cta-button");
          heroItems.forEach(item => {
            item.style.opacity = 1;
            item.style.filter = "none";
            item.style.transform = "none";
          });

          gsap.from(".hero-title", { opacity: 0, y: 30, duration: 0.3 });
          gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.3, delay: 0.1 });
          gsap.from(".hero-description", { opacity: 0, y: 30, duration: 0.3, delay: 0.2 });
          gsap.from(".cta-button", { opacity: 0, scale: 0.9, duration: 0.3, delay: 0.3 });
        }
      });
    }
  });
});

// Cursor Movement
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  follower.style.left = `${e.clientX}px`;
  follower.style.top = `${e.clientY}px`;
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.querySelector(".theme-toggle-icon.sun");
const moonIcon = document.querySelector(".theme-toggle-icon.moon");
const body = document.body;

const updateTheme = () => {
  const isDark = body.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  sunIcon.style.opacity = newTheme === "dark" ? 1 : 0;
  moonIcon.style.opacity = newTheme === "dark" ? 0 : 1;
};

themeToggle.addEventListener("click", updateTheme);

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", savedTheme);
  sunIcon.style.opacity = savedTheme === "dark" ? 1 : 0;
  moonIcon.style.opacity = savedTheme === "dark" ? 0 : 1;
});

// Projects Slider
const slider = document.querySelector(".slider");
let scrollAmount = 0;
function autoSlide() {
  if (slider) {
    scrollAmount += 1;
    if (scrollAmount >= slider.scrollWidth / 4) scrollAmount = 0;
    slider.scrollTo({ left: scrollAmount * 4, behavior: "smooth" });
  }
}
setInterval(autoSlide, 2500);

// Smooth scroll for nav links
const navLinks = document.querySelectorAll("nav a, .mobile-menu a, .cta-button");
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Contact Form Submission
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("https://formspree.io/f/your_form_id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Error sending message. Please try again later.");
      }
    } catch (err) {
      alert("An error occurred while submitting the form.");
    }
  });
}
