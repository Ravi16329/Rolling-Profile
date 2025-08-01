const sections = document.querySelectorAll(".section");
let current = 0;
let autoScroll;

// Apply 3D perspective to body
document.body.style.perspective = "1000px";

// Initial load
showSection(current, true);

// Button navigation
document.getElementById("nextBtn").addEventListener("click", () => {
  if (current < sections.length - 1) {
    showSection(++current);
    restartAutoScroll();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (current > 0) {
    showSection(--current);
    restartAutoScroll();
  }
});

// Scroll navigation
let scrollTimeout;
window.addEventListener("wheel", (e) => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (e.deltaY > 0 && current < sections.length - 1) {
      showSection(++current);
    } else if (e.deltaY < 0 && current > 0) {
      showSection(--current);
    }
    restartAutoScroll();
  }, 200);
});

// Rolling animation
function showSection(index, instant = false) {
  sections.forEach((sec, i) => {
    if (i === index) {
      gsap.fromTo(
        sec,
        {
          rotationX: -120,
          opacity: 0,
          transformOrigin: "top center",
          y: -200,
          display: "block"
        },
        {
          duration: instant ? 0 : 2.5,
          rotationX: 0,
          opacity: 1,
          y: 0,
          ease: "back.out(1.7)",
          onStart: () => {
            sec.style.display = "block";
            sec.style.zIndex = 1;
          }
        }
      );
    } else {
      sec.style.zIndex = 0;
      sec.style.opacity = 0;
      sec.style.display = "none";
    }
  });
}

// Auto-scroll every 5 seconds
function startAutoScroll() {
  autoScroll = setInterval(() => {
    current = (current + 1) % sections.length;
    showSection(current);
  }, 5000);
}

function restartAutoScroll() {
  clearInterval(autoScroll);
  startAutoScroll();
}

startAutoScroll();
