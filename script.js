import { TypeWriter } from "./type-writer.js";

function setWindowHeight() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
}

const isMobile =
  ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
  window.innerWidth < 768;

const typeWriter = new TypeWriter();
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("revealed");
  });
});

const scrollHiddenElements = document.querySelectorAll(".scroll-hidden");
const knowMoreButton = document.querySelector(".hero-know-more-btn");
const scrollToTopButton = document.querySelector(".scroll-to-top-btn");
const heroTitle = document.querySelector(".hero-title");

scrollHiddenElements.forEach((el) => observer.observe(el));

typeWriter.write(heroTitle.children[0], 50, 15, 30);
typeWriter.write(heroTitle.children[1], 50);

setWindowHeight();

window.addEventListener("scroll", () => {
  const currScroll = window.scrollY,
    scrollToTopPos =
      document.documentElement.scrollHeight - window.innerHeight - 40;

  currScroll > 1
    ? knowMoreButton.classList.add("toggled")
    : knowMoreButton.classList.remove("toggled");

  currScroll >= scrollToTopPos
    ? scrollToTopButton.classList.remove("hidden")
    : scrollToTopButton.classList.add("hidden");
});
window.addEventListener("resize", () => {
  if (!isMobile) setWindowHeight();
  else if (window.scrollY < 1) setWindowHeight();
});

scrollToTopButton.addEventListener("click", () => window.scrollTo(0, 0));
