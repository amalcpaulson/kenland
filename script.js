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


document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("playButton");
  const videoIframe = document.getElementById("videoIframe");

  playButton.addEventListener("click", function () {
    videoIframe.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
    playButton.style.display = "none";
  });

  window.addEventListener("message", function (event) {
    if (event.origin !== "https://www.youtube.com") {
      return;
    }

    const data = JSON.parse(event.data);
    if (data.event === "onStateChange") {
      if (data.info === 2) {
        // Video is paused
        playButton.style.display = "block";
      }
    }
  });

  // Initialize the YouTube player API
  videoIframe.src +=
    (videoIframe.src.includes("?") ? "&" : "?") + "enablejsapi=1";
});