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

//fag
function toggleFaq(button) {
  const answer = button.parentElement.nextElementSibling;
  const img = button.querySelector("img");

  // Toggle the hidden class on the answer paragraph
  answer.classList.toggle("hidden");

  // Swap the image
  if (img.alt === "Open") {
    img.src = "./images/faq/close.png";
    img.alt = "Close";
  } else {
    img.src = "./images/faq/open.png";
    img.alt = "Open";
  }
}


// testimonial

let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial .individual');
const totalTestimonials = testimonials.length;

function updateTestimonialPosition() {
    const content = document.querySelector('.testimonial .content');
    const testimonialWidth = testimonials[0].offsetWidth;
    const offset = currentIndex * testimonialWidth;
    content.style.transform = `translateX(-${offset}px)`;
}

function nextTestimonial() {
    if (currentIndex < totalTestimonials - 1) {
        currentIndex++;
        updateTestimonialPosition();
    }
}

function prevTestimonial() {
    if (currentIndex > 0) {
        currentIndex--;
        updateTestimonialPosition();
    }
}

let startX, scrollLeft, isDown = false;
const slider = document.querySelector('.testimonial .content');

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});

window.addEventListener('resize', updateTestimonialPosition);

// Initial position
updateTestimonialPosition();
