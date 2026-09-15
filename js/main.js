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
});
