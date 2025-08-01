const sections = document.querySelectorAll('.section');
let current = 0;

function showSection(index) {
  if (index < 0 || index >= sections.length) return;
  
  sections.forEach((sec, i) => {
    sec.classList.remove('show');
    sec.style.zIndex = i === index ? 1 : 0;
  });

  sections[index].classList.add('show');
  current = index;
}

// Button controls
document.getElementById("nextBtn").addEventListener("click", () => showSection(current + 1));
document.getElementById("prevBtn").addEventListener("click", () => showSection(current - 1));

// Scroll wheel
let scrollTimeout;
window.addEventListener("wheel", (e) => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (e.deltaY > 0) showSection(current + 1);
    else showSection(current - 1);
  }, 100);
});

// Touch support (optional)
let touchStartY = 0;
window.addEventListener("touchstart", e => touchStartY = e.touches[0].clientY);
window.addEventListener("touchend", e => {
  const delta = e.changedTouches[0].clientY - touchStartY;
  if (delta > 50) showSection(current - 1);
  if (delta < -50) showSection(current + 1);
});
