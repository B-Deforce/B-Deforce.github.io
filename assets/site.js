document.documentElement.classList.add("js");

const mobileMenuQuery = window.matchMedia("(max-width: 720px)");

function setupMobileMenu(header) {
  const button = header.querySelector(".menu-toggle");
  const menu = header.querySelector("nav");

  if (!button || !menu) return;

  function closeMenu() {
    button.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }

  function syncMenu() {
    if (mobileMenuQuery.matches) {
      closeMenu();
    } else {
      menu.hidden = false;
      button.setAttribute("aria-expanded", "false");
    }
  }

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileMenuQuery.matches) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenuQuery.matches) closeMenu();
  });

  mobileMenuQuery.addEventListener("change", syncMenu);
  syncMenu();
}

document.querySelectorAll(".site-header").forEach(setupMobileMenu);
