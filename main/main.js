// Page load fade
window.addEventListener("load", () => {
  document.body.classList.add("visible");
});

// ==============================
// STAGGER OBSERVER (one-time)
// ==============================
const staggerObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(".stagger");

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("show");
          }, index * 150);
        });

        staggerObserver.unobserve(entry.target); // only once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".stagger-container").forEach(section => {
  staggerObserver.observe(section);
});

// ==============================
// FADE OBSERVER (scroll in + out)
// ==============================
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade").forEach(el => {
  fadeObserver.observe(el);
});

// ==============================
// MOBILE MENU (SAFE)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  if (menu && navLinks) {
    menu.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const popup = document.getElementById("thankYouPopup");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        popup.classList.add("show");
      } else {
        alert("Something went wrong.");
      }
    })
    .catch(() => {
      alert("Network error.");
    });
  });

});

function closePopup() {
  document.getElementById("thankYouPopup").classList.remove("show");
}