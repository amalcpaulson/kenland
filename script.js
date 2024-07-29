let currentSlide = 0;
const slides = document.querySelectorAll("#slider img");
const dots = document.querySelectorAll(".pagination .dot");

function showSlide(index) {
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  const offset = -currentSlide * 100;
  document.getElementById("slider").style.transform = `translateX(${offset}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function setSlide(index) {
  showSlide(index);
}

function rotateButton(element) {
  const button = element.querySelector("button img");
  button.classList.toggle("rotated");
}

function toggleMenu() {
  const popup = document.getElementById("popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}

function closeMenu(event) {
  const popupContent = document.querySelector(".popup-content");
  if (!popupContent.contains(event.target)) {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
});
