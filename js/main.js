// Desert Rose Restaurant — shared interactions

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Category chip filter (menu / shop pages)
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("[data-category]");
  if (chips.length && cards.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const cat = chip.dataset.filter;
        cards.forEach((card) => {
          card.style.display = cat === "all" || card.dataset.category === cat ? "" : "none";
        });
      });
    });
  }

  // Quantity stepper (product / cart pages)
  document.querySelectorAll(".qty-box").forEach((box) => {
    const input = box.querySelector("input");
    box.querySelector(".qty-minus")?.addEventListener("click", () => {
      input.value = Math.max(1, parseInt(input.value || "1", 10) - 1);
    });
    box.querySelector(".qty-plus")?.addEventListener("click", () => {
      input.value = parseInt(input.value || "1", 10) + 1;
    });
  });

  // Testimonial carousel (home page)
  const carousel = document.querySelector(".testi-carousel");
  if (carousel) {
    const cards2 = carousel.querySelectorAll(".testi-card");
    const dotsWrap = carousel.querySelector(".testi-dots");
    let index = 0;

    cards2.forEach((card, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => show(i));
      dotsWrap.appendChild(dot);
    });

    function show(i) {
      cards2[index].classList.remove("active");
      dotsWrap.children[index].classList.remove("active");
      index = (i + cards2.length) % cards2.length;
      cards2[index].classList.add("active");
      dotsWrap.children[index].classList.add("active");
    }

    carousel.querySelector(".testi-prev")?.addEventListener("click", () => show(index - 1));
    carousel.querySelector(".testi-next")?.addEventListener("click", () => show(index + 1));
  }

  // Checkout: block Place Order until the form is actually filled in
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (checkoutForm.checkValidity()) {
        window.location.href = "thank-you.html";
      } else {
        checkoutForm.reportValidity();
      }
    });
  }
});
