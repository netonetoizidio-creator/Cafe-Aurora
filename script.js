
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const year = document.getElementById("year");

// Atualiza o ano automaticamente.
year.textContent = new Date().getFullYear();

// Abre e fecha o menu em telas pequenas.
menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu depois que um link é selecionado.
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  });
});
