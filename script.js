// ---------- BASIC DATA (YOU CAN EDIT THIS EASILY) ----------
const products = [
  {
    id: 1,
    title: "Rose Pink Jaipuri Block Print Kurti",
    tag: "Best Seller",
    category: "casual",
    price: 799,
    mrp: 1299,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/6311573/pexels-photo-6311573.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Indigo Cotton Straight Kurti",
    tag: "Office",
    category: "office",
    price: 899,
    mrp: 1399,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/6311574/pexels-photo-6311574.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Festive Gota Patti Kurti",
    tag: "Festive",
    category: "festive",
    price: 1199,
    mrp: 1799,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/6311572/pexels-photo-6311572.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    title: "Mustard Handblock A-line Kurti",
    tag: "Casual",
    category: "casual",
    price: 749,
    mrp: 1199,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/6311566/pexels-photo-6311566.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    title: "Navy Blue Rayon Kurti",
    tag: "Office",
    category: "office",
    price: 899,
    mrp: 1499,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/6311569/pexels-photo-6311569.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    title: "Maroon Anarkali Kurti",
    tag: "Festive",
    category: "festive",
    price: 1399,
    mrp: 1999,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/6311565/pexels-photo-6311565.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

// ---------- RENDER HELPERS ----------
const featuredRow = document.getElementById("featured-row");
const productGrid = document.getElementById("product-grid");
const cartCountEl = document.getElementById("cart-count");
const toastEl = document.getElementById("toast");

let cartCount = 0;
let currentFilter = "all";

function createProductCard(product, compact = false) {
  const card = document.createElement("article");
  card.className = "product-card";

  const img = document.createElement("div");
  img.className = "product-img";
  img.style.backgroundImage = `url("${product.image}")`;

  const tag = document.createElement("div");
  tag.className = "product-tag";
  tag.textContent = product.tag;

  const title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.title;

  const metaRow = document.createElement("div");
  metaRow.className = "product-meta";

  const rating = document.createElement("div");
  rating.className = "product-rating";
  rating.innerHTML = `<i class="fa-solid fa-star"></i> <span>${product.rating}</span>`;

  const priceWrap = document.createElement("div");
  priceWrap.className = "product-price";
  priceWrap.innerHTML = `
    <span class="product-price-main">₹${product.price}</span>
    <span class="product-price-cut">₹${product.mrp}</span>
  `;

  metaRow.appendChild(rating);
  metaRow.appendChild(priceWrap);

  const actions = document.createElement("div");
  actions.className = "product-actions";

  const addBtn = document.createElement("button");
  addBtn.className = "btn-mini-primary";
  addBtn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Add to bag`;
  addBtn.addEventListener("click", () => {
    cartCount++;
    cartCountEl.textContent = cartCount;
    showToast("Added to bag 🛍️");
  });

  const wishBtn = document.createElement("button");
  wishBtn.className = "btn-mini-ghost";
  wishBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  wishBtn.addEventListener("click", () => {
    showToast("Added to wishlist ❤️");
  });

  actions.appendChild(addBtn);
  actions.appendChild(wishBtn);

  card.appendChild(img);
  card.appendChild(tag);
  card.appendChild(title);
  card.appendChild(metaRow);
  card.appendChild(actions);

  return card;
}

function renderFeatured() {
  featuredRow.innerHTML = "";
  products.forEach((p) => {
    const card = createProductCard(p, true);
    featuredRow.appendChild(card);
  });
}

function renderGrid() {
  productGrid.innerHTML = "";
  const filtered =
    currentFilter === "all"
      ? products
      : products.filter((p) => p.category === currentFilter);

  filtered.forEach((p) => {
    const card = createProductCard(p, false);
    productGrid.appendChild(card);
  });

  if (!filtered.length) {
    const msg = document.createElement("p");
    msg.style.fontSize = "0.9rem";
    msg.style.opacity = "0.7";
    msg.textContent = "No kurtis in this category yet. New styles coming soon!";
    productGrid.appendChild(msg);
  }
}

// ---------- TOAST ----------
let toastTimeout;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 1600);
}

// ---------- FILTER BUTTONS ----------
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderGrid();
  });
});

// ---------- DRAG TO SCROLL FEATURED ROW ----------
const dragWrapper = document.getElementById("drag-wrapper");

let isDown = false;
let startX;
let scrollLeft;

dragWrapper.addEventListener("mousedown", (e) => {
  isDown = true;
  dragWrapper.classList.add("is-dragging");
  startX = e.pageX - featuredRow.offsetLeft;
  scrollLeft = featuredRow.scrollLeft;
});

dragWrapper.addEventListener("mouseleave", () => {
  isDown = false;
  dragWrapper.classList.remove("is-dragging");
});

dragWrapper.addEventListener("mouseup", () => {
  isDown = false;
  dragWrapper.classList.remove("is-dragging");
});

dragWrapper.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - featuredRow.offsetLeft;
  const walk = (x - startX) * 1.5; //scroll-fast
  featuredRow.scrollLeft = scrollLeft - walk;
});

// Touch support
dragWrapper.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - featuredRow.offsetLeft;
  scrollLeft = featuredRow.scrollLeft;
});

dragWrapper.addEventListener("touchend", () => {
  isDown = false;
});

dragWrapper.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - featuredRow.offsetLeft;
  const walk = (x - startX) * 1.5;
  featuredRow.scrollLeft = scrollLeft - walk;
});

// ---------- HERO "SHOP NOW" BUTTON ----------
const shopBtn = document.getElementById("shop-now-btn");
shopBtn.addEventListener("click", () => {
  document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
});

// ---------- FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- INIT ----------
renderFeatured();
renderGrid();
