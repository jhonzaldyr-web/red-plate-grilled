let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discountRate = 0;
let discountAmount = 0;
let selectedItem = null;

/* ================= MENU DATA ================= */
const menuData = [
  {
    name: "Grilled Chicken",
    price: 150,
    img: "images/pork.jpg",
    ingredients: ["Chicken", "Garlic", "Soy Sauce", "Pepper", "Oil"]
  },
  {
    name: "Beef Steak",
    price: 250,
    img: "images/bellyeef-steak.jpg",
    ingredients: ["Beef", "Salt", "Black Pepper", "Butter", "Herbs"]
  },
  {
    name: "Pork BBQ",
    price: 180,
    img: "images/pork-bbq.jpg",
    ingredients: ["Pork", "BBQ Sauce", "Sugar", "Garlic", "Soy Sauce"]
  },
  {
    name: "Fish Fillet",
    price: 200,
    img: "images/fish-fillet.jpg",
    ingredients: ["Fish", "Lemon", "Salt", "Pepper", "Oil"]
  },
  {
    name: "Vegetable Stir-Fry",
    price: 120,
    img: "images/vegetable-stirfry.jpg",
    ingredients: ["Broccoli", "Carrots", "Bell Pepper", "Soy Sauce", "Garlic"]
  }
];


/* ================= INIT ================= */
window.onload = () => {
  renderMenu(menuData);
  updateCart();
};

/* ================= MENU ================= */
function renderMenu(data) {
  const menu = document.getElementById("menu-list");
  menu.innerHTML = "";

  data.forEach((item, index) => {
    menu.innerHTML += `
      <div class="menu-item" onclick="openMenuModal(${index})">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p><strong>₱${item.price}</strong></p>
      </div>
    `;
  });
}

/* ================= MODAL ================= */
function openMenuModal(index) {
  selectedItem = menuData[index];

  document.getElementById("modalImg").src = selectedItem.img;
  document.getElementById("modalName").textContent = selectedItem.name;
  document.getElementById("modalPrice").textContent = selectedItem.price;

  document.getElementById("modalIngredients").innerHTML =
    selectedItem.ingredients.map(i => `<li>${i}</li>`).join("");

  const modal = document.getElementById("menuModal");
  modal.classList.add("show");
}

function closeMenuModal() {
  document.getElementById("menuModal").classList.remove("show");
}

function addModalToCart() {
  addToCart(selectedItem.name, selectedItem.price);
  closeMenuModal();
}

/* ================= CART ================= */
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  item ? item.qty++ : cart.push({ name, price, qty: 1 });
  saveCart();
}

function removeItem(name) {
  const index = cart.findIndex(i => i.name === name);
  if (cart[index].qty > 1) cart[index].qty--;
  else cart.splice(index, 1);
  saveCart();
}

function updateCart() {
  const cartBox = document.getElementById("cart-items");
  cartBox.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
    cartBox.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <div class="qty-controls">
          <button onclick="decreaseQty('${item.name}')">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty('${item.name}')">+</button>
        </div>
        <span>₱${item.price * item.qty}</span>
      </div>
    `;
  });

  discountAmount = subtotal * discountRate;
  document.getElementById("total").textContent =
    (subtotal - discountAmount).toFixed(2);
}

function increaseQty(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
    saveCart();
  }
}

function decreaseQty(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    if (item.qty > 1) item.qty--;
    else cart = cart.filter(i => i.name !== name);
    saveCart();
  }
}


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}
