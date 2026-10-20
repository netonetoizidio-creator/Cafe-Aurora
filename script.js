const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    });
  });
}

const productData = [
  {
    name: "Expresso Aurora",
    category: "quentes",
    description: "Café intenso, aroma marcante e uma dose de energia para começar bem o dia.",
    price: 8,
    badge: "Clássico",
    emoji: "☕",
    type: "Café"
  },
  {
    name: "Cheesecake Solar",
    category: "salgados",
    description: "Uma sobremesa cremosa com toque delicado de baunilha e textura suave.",
    price: 16,
    badge: "Doce pausa",
    emoji: "🍰",
    type: "Doce"
  },
  {
    name: "Folhado Dourado",
    category: "salgados",
    description: "Massa leve, crocante e irresistível para acompanhar seu café da manhã.",
    price: 10,
    badge: "Recém-assado",
    emoji: "🥐",
    type: "Salgado"
  },
  {
    name: "Cappuccino Cremoso",
    category: "quentes",
    description: "Espuma sedosa, café equilibrado e um toque de chocolate para um momento acolhedor.",
    price: 18,
    badge: "Novidade",
    emoji: "🫖",
    type: "Café"
  },
  {
    name: "Mocha Aurora",
    category: "quentes",
    description: "Café com cacau suave e um final cremoso que lembra conforto em cada gole.",
    price: 20,
    badge: "Favorito",
    emoji: "🍫",
    type: "Café"
  },
  {
    name: "Latte de Baunilha",
    category: "quentes",
    description: "Uma bebida aromática e suave com notas delicadas de baunilha e leite cremoso.",
    price: 19,
    badge: "Especial",
    emoji: "🥛",
    type: "Café"
  },
  {
    name: "Café Gelado Dourado",
    category: "geladas",
    description: "Café refrescante com notas caramelizadas e uma textura suave, ideal para o calor.",
    price: 17,
    badge: "Gelado",
    emoji: "🧊",
    type: "Bebida"
  },
  {
    name: "Brownie da Casa",
    category: "salgados",
    description: "Brownie denso, com crosta levemente crocante e sabor intenso de chocolate.",
    price: 14,
    badge: "Queridinho",
    emoji: "🍫",
    type: "Doce"
  },
  {
    name: "Pão de Queijo Especial",
    category: "salgados",
    description: "Crosta dourada, interior macio e sabor irresistível para acompanhar qualquer bebida.",
    price: 12,
    badge: "Novo",
    emoji: "🧀",
    type: "Salgado"
  }
];

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-button");

function renderProducts(filter = "all") {
  if (!productGrid) return;

  const visibleProducts = filter === "all"
    ? productData
    : productData.filter((product) => product.category === filter);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card" data-category="${product.category}">
          <div class="product-visual" aria-hidden="true">${product.emoji}</div>
          <div class="product-topline">
            <span class="product-tag">${product.badge}</span>
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <span class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</span>
            <span class="product-category">${product.type}</span>
          </div>
        </article>
      `
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderProducts(filter);
  });
});

renderProducts();

const offerDetails = {
  "combo-aurora": {
    title: "Combo Aurora",
    description: "Café expresso e pão de queijo em uma combinação simples, quente e cheia de sabor.",
    original: 16,
    promo: 12.9,
    days: "Sábado e domingo",
    badge: "Economia: R$ 3,10"
  },
  "pausa-doce": {
    title: "Pausa Doce",
    description: "Um cappuccino cremoso acompanhado de brownie da casa para uma pausa acolhedora.",
    original: 22,
    promo: 17.5,
    days: "Sábado e domingo",
    badge: "Economia: R$ 4,50"
  },
  "dupla-perfeita": {
    title: "Dupla Perfeita",
    description: "Escolha duas bebidas da casa e aproveite a oferta especial de fim de semana.",
    original: 28,
    promo: 21,
    days: "Sábado e domingo",
    badge: "Economia: R$ 7,00"
  }
};

const modal = document.getElementById("offerModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalOriginal = document.getElementById("modalOriginal");
const modalPromo = document.getElementById("modalPromo");
const modalSavings = document.getElementById("modalSavings");
const modalDays = document.getElementById("modalDays");

function formatCurrency(value) {
  return `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
}

function openOfferModal(offerKey) {
  const offer = offerDetails[offerKey];
  if (!offer || !modal) return;

  modalTitle.textContent = offer.title;
  modalDescription.textContent = offer.description;
  modalOriginal.textContent = formatCurrency(offer.original);
  modalPromo.textContent = formatCurrency(offer.promo);
  modalSavings.textContent = offer.badge;
  modalDays.textContent = `Válido: ${offer.days}`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

document.querySelectorAll(".offer-button").forEach((button) => {
  button.addEventListener("click", () => openOfferModal(button.dataset.offer));
});

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close='true']") || event.target.matches(".modal-close")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

const prizeData = [
  { label: "5% de desconto", description: "Desconto demonstrativo de 5% para a sua próxima pausa." },
  { label: "10% de desconto", description: "Desconto demonstrativo de 10% para experimentar um novo sabor." },
  { label: "15% de desconto", description: "Desconto demonstrativo de 15% oferecido na roleta de demonstração." },
  { label: "Café expresso grátis", description: "Uma xícara de café expresso, ilustrativa e sem valor comercial." },
  { label: "Desconto em um doce", description: "Oferta demonstrativa para acompanhar seu doce favorito." },
  { label: "Desconto em bebida gelada", description: "Uma bebida gelada em destaque para o seu momento de descanso." },
  { label: "Oferta especial de fim de semana", description: "Uma promoção ilustrativa para aproveitar os dias mais especiais." },
  { label: "Tente novamente", description: "A roleta gira de novo e a próxima tentativa permanece demonstrativa." }
];

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const retryButton = document.getElementById("retryButton");
const wheelStatus = document.getElementById("wheelStatus");

const storageKey = "cafeAuroraRouletteAttempt";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentRotation = 0;
let lastWinningIndex = -1;
let isSpinning = false;

function setWheelLabels() {
  if (!wheel) return;

  const total = prizeData.length;
  wheel.innerHTML = "";

  prizeData.forEach((prize, index) => {
    const label = document.createElement("span");
    label.className = "wheel-label";
    label.textContent = prize.label;

    const angle = (index * 360) / total + 22.5;
    const radians = ((angle - 90) * Math.PI) / 180;
    const x = 50 + Math.cos(radians) * 33;
    const y = 50 + Math.sin(radians) * 33;
    label.style.left = `${x}%`;
    label.style.top = `${y}%`;
    label.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px) rotate(${-angle}deg)`;
    wheel.appendChild(label);
  });
}

function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function canUseWheel() {
  try {
    const storedDate = window.localStorage.getItem(storageKey);
    return storedDate !== getTodayKey();
  } catch (error) {
    return false;
  }
}

function updateWheelState() {
  if (!wheelStatus) return;

  try {
    const storedDate = window.localStorage.getItem(storageKey);
    if (storedDate === getTodayKey()) {
      wheelStatus.textContent = `Você já girou hoje. Nova tentativa disponível em ${new Date(Date.now() + 86400000).toLocaleDateString("pt-BR")}.`;
      wheelStatus.classList.add("is-disabled");
      spinButton.disabled = true;
      retryButton.classList.add("hidden");
      return;
    }

    wheelStatus.textContent = "Você ainda pode tentar hoje.";
    wheelStatus.classList.remove("is-disabled");
    spinButton.disabled = false;
  } catch (error) {
    wheelStatus.textContent = "Seu navegador não permite usar armazenamento local. A roleta continuará como demonstração sem limitar tentativas.";
    wheelStatus.classList.add("is-disabled");
    spinButton.disabled = false;
  }
}

function storeTry() {
  try {
    window.localStorage.setItem(storageKey, getTodayKey());
  } catch (error) {
    wheelStatus.textContent = "Seu navegador bloqueou o uso de armazenamento local. A roleta continua em modo demonstrativo.";
    wheelStatus.classList.add("is-disabled");
  }
}

function finishSpin(index, isTryAgain = false) {
  const prize = prizeData[index];

  if (wheelStatus) {
    wheelStatus.textContent = `Resultado: ${prize.label}. ${prize.description}`;
  }

  if (!isTryAgain) {
    storeTry();
  }

  retryButton.classList.remove("hidden");
  retryButton.disabled = false;
  spinButton.disabled = true;
  isSpinning = false;

  if (canUseWheel() === false) {
    updateWheelState();
  }
}

function spinWheel() {
  if (!wheel || isSpinning) return;

  if (!canUseWheel()) {
    updateWheelState();
    return;
  }

  isSpinning = true;
  spinButton.disabled = true;
  retryButton.classList.add("hidden");

  const total = prizeData.length;
  const selectedIndex = Math.floor(Math.random() * total);
  lastWinningIndex = selectedIndex;

  const segmentAngle = 360 / total;
  const pointerOffset = 22.5;
  const finalRotation = currentRotation + 360 * (reduceMotion ? 4 : 6) + (360 - ((selectedIndex * segmentAngle) + pointerOffset));

  wheel.style.transform = `rotate(${finalRotation}deg)`;
  currentRotation = finalRotation;

  const delay = reduceMotion ? 300 : 4200;

  setTimeout(() => {
    finishSpin(selectedIndex);
  }, delay);
}

if (spinButton) {
  spinButton.addEventListener("click", spinWheel);
}

if (retryButton) {
  retryButton.addEventListener("click", () => {
    if (isSpinning) return;
    retryButton.classList.add("hidden");
    spinButton.disabled = false;
    if (wheelStatus) {
      wheelStatus.textContent = "Você ainda pode tentar hoje.";
      wheelStatus.classList.remove("is-disabled");
    }
  });
}

setWheelLabels();
updateWheelState();
