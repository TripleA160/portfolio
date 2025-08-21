import { TypeWriter } from "./type-writer.js";

function updateWindowHeight() {
    document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
    );
    updateScrollElements();
}
function updateScrollElements() {
    const currScroll = window.scrollY,
        scrollToTopPos =
            document.documentElement.scrollHeight - window.innerHeight - 80;

    currScroll > 1
        ? knowMoreButton.classList.add("toggled")
        : knowMoreButton.classList.remove("toggled");

    currScroll >= scrollToTopPos
        ? scrollToTopButton.classList.remove("hidden")
        : scrollToTopButton.classList.add("hidden");
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

typeWriter.write(heroTitle.children[0], 47, 15, 30);
typeWriter.write(heroTitle.children[1], 47);

updateWindowHeight();

window.addEventListener("scroll", () => {
    if (isMobile && window.scrollY < 10) updateWindowHeight();
    else updateScrollElements();
});
window.addEventListener("resize", () => {
    if (!isMobile) updateWindowHeight();
    else if (window.scrollY < 10) updateWindowHeight();
});

scrollToTopButton.addEventListener("click", () => {
    updateWindowHeight();
    window.scrollTo(0, 0);
});
