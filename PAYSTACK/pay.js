// Cart Data
const cartData = [
    {
        name: "Lay's Hot Tomato Ketchup Chips 12 Pack",
        price: 26.25,
        quantity: 1,
    },
];

const deliveryFee = 6.0;

// Load Cart Items Dynamically
function loadCartItems() {
    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    let subtotal = 0;
    cartContainer.innerHTML = ""; // Clear current cart items
    cartData.forEach((item) => {
        subtotal += item.price * item.quantity;
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
        `;
        cartContainer.appendChild(itemElement);
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
}

// Add New Item to Cart
document.getElementById("add-item").addEventListener("click", () => {
    const newItem = {
        name: "New Product",
        price: 15.99,
        quantity: 1,
    };
    cartData.push(newItem);
    loadCartItems();
});

// Display Overlay and Confirmation Modal
function showConfirmationModal() {
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    const modal = document.getElementById("confirmation-modal");
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.style.display = "block";

    // Close Modal on Clicking Overlay or Close Button
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay || e.target.id === "close-modal") {
            modal.style.display = "none";
            document.body.removeChild(overlay);
        }
    });
}

// Paystack Integration
document.getElementById("pay-now").addEventListener("click", function () {
    const total = parseFloat(document.getElementById("total").textContent.slice(1));

    const handler = PaystackPop.setup({
        key: "pk_test_e44b3641016f6f00d8790565fcc81ca7e333e2b4", // Replace with your Paystack public key
        email: "olajubutimothy8@gmail.com", // Replace with user's email
        amount: total * 100, // Convert to kobo
        currency: "NGN",
        ref: `TX-${Math.floor(Math.random() * 1000000000)}`,
        callback: function (response) {
            // Display overlay and confirmation modal
            showConfirmationModal();
        },
        onClose: function () {
            alert("Payment process was canceled.");
        },
    });
    handler.openIframe();
});

// Initial Load
loadCartItems();



// // Cart Data
// const cartData = [
//     {
//         name: "Lay's Hot Tomato Ketchup Chips 12 Pack",
//         price: 26.25,
//         quantity: 1,
//     },
// ];

// const deliveryFee = 6.0;

// // Load Cart Items Dynamically
// function loadCartItems() {
//     const cartContainer = document.getElementById("cart-items");
//     const subtotalElement = document.getElementById("subtotal");
//     const totalElement = document.getElementById("total");

//     let subtotal = 0;
//     cartContainer.innerHTML = ""; // Clear current cart items
//     cartData.forEach((item) => {
//         subtotal += item.price * item.quantity;
//         const itemElement = document.createElement("div");
//         itemElement.classList.add("cart-item");
//         itemElement.innerHTML = `
//             <p>${item.name}</p>
//             <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
//         `;
//         cartContainer.appendChild(itemElement);
//     });

//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
//     totalElement.textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
// }

// // Add New Item to Cart
// document.getElementById("add-item").addEventListener("click", () => {
//     const newItem = {
//         name: "New Product",
//         price: 15.99,
//         quantity: 1,
//     };
//     cartData.push(newItem);
//     loadCartItems();
// });

// // Paystack Integration
// document.getElementById("pay-now").addEventListener("click", function () {
//     const total = parseFloat(document.getElementById("total").textContent.slice(1));

//     const handler = PaystackPop.setup({
//         key: "pk_test_e44b3641016f6f00d8790565fcc81ca7e333e2b4", // Replace with your Paystack public key
//         email: "olajubutimothy8@gmail.com", // Replace with user's email
//         amount: total * 100, // Convert to kobo
//         currency: "NGN",
//         ref: `TX-${Math.floor(Math.random() * 1000000000)}`,
//         callback: function (response) {
//             // Display confirmation modal
//             document.getElementById("confirmation-modal").style.display = "block";
//         },
//         onClose: function () {
//             alert("Payment process was canceled.");
//         },
//     });
//     handler.openIframe();
// });

// // Close Modal
// document.getElementById("close-modal").addEventListener("click", function () {
//     document.getElementById("confirmation-modal").style.display = "none";
// });

// // Initial Load
// loadCartItems();




// // Sample Cart Data
// const cartData = [
//     { 
//         name: "Lay's Hot Tomato Ketchup Chips 12 Pack", 
//         price: 26.25, quantity: 1 
//     },
// ];

// // Load Cart Items Dynamically
// function loadCartItems() {
//     const cartContainer = document.getElementById("cart-items");
//     const subtotalElement = document.getElementById("subtotal");
//     const totalElement = document.getElementById("total");

//     let subtotal = 0;
//     cartData.forEach((item) => {
//         subtotal += item.price * item.quantity;
//         const itemElement = document.createElement("div");
//         itemElement.classList.add("cart-item");
//         itemElement.innerHTML = `
//             <p>${item.name}</p>
//             <p>$${item.price.toFixed(2)}</p>
//         `;
//         cartContainer.appendChild(itemElement);
//     });

//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
//     const deliveryFee = 6.0;
//     totalElement.textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
// }
// loadCartItems();

// // Paystack Integration
// document.getElementById("pay-now").addEventListener("click", function () {
//     const total = parseFloat(document.getElementById("total").textContent.slice(1));

//     const handler = PaystackPop.setup({
//         key: "pk_test_e44b3641016f6f00d8790565fcc81ca7e333e2b4", // Replace with your Paystack public key
//         email: "olajubutimothy8@gmail.com", // Replace with user's email
//         amount: total * 100, // Convert to kobo
//         currency: "NGN",
//         ref: `TX-${Math.floor(Math.random() * 1000000000)}`,
//         callback: function (response) {
//             // Display confirmation modal
//             document.getElementById("confirmation-modal").style.display = "block";
//         },
//         onClose: function () {
//             alert("Payment process was canceled.");
//         },
//     });
//     handler.openIframe();
// });

// // Close Modal
// document.getElementById("close-modal").addEventListener("click", function () {
//     document.getElementById("confirmation-modal").style.display = "none";
// });

