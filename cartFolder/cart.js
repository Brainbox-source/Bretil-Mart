const cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage or initialize as empty array

function updateCartUI() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartItemsSection = document.getElementById('cart-items');
  const cartIcon = document.getElementById('cart-icon'); // Assuming you have a cart icon element
  
  // Clear the current list
  cartList.innerHTML = '';
  let total = 0;

  if (cart.length > 0) {
    cartItemsSection.style.display = 'block';
    emptyCartMessage.style.display = 'none';

    // Add items to the cart display
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${item.name} - ₦${item.price.toFixed(2)} <button class="remove-btn" onclick="removeItem(${index})">Remove</button>`;
      cartList.appendChild(listItem);
      total += item.price;
    });
  } else {
    cartItemsSection.style.display = 'none';
    emptyCartMessage.style.display = 'block';
  }

  // Update the total price
  cartTotal.innerHTML = `Total: ₦${total.toFixed(2)}`;

  // Update cart icon with item count
  cartIcon.innerHTML = cart.length > 0 ? `Cart (${cart.length})` : 'Cart';
}

function addItemToCart(name, price) {
  cart.push({ name, price });
  updateCartStorage();
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartStorage();
  updateCartUI();
}

function startShopping() {
  alert("Redirecting to the shopping page...");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to your cart first!");
  } else {
    alert("Proceeding to checkout...");
  }
}

function openModal() {
  const modal = document.getElementById("cartModal");
  modal.style.display = "flex";
  updateModalCart(); // Ensure the modal shows updated cart content
}

function closeModal() {
  const modal = document.getElementById("cartModal");
  modal.style.display = "none";
}

function updateModalCart() {
  const modalCartList = document.getElementById("modal-cart-list");
  const modalCartTotal = document.getElementById("modal-cart-total");

  modalCartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${item.name} - ₦${item.price.toFixed(2)}`;
    modalCartList.appendChild(listItem);
    total += item.price;
  });

  modalCartTotal.innerHTML = `Total: ₦${total.toFixed(2)}`;
}

// Update cart in localStorage
function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Open modal when the page loads (optional)
window.onload = function() {
  openModal();
  updateCartUI(); // Ensure the cart is loaded from localStorage and displayed properly
};

// Event listener to open cart modal when the cart icon is clicked
document.getElementById('cart-icon').addEventListener('click', openModal);
