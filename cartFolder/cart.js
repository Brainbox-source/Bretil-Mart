// DOM Elements
const freshProduceBtn = document.getElementById('freshProduceBtn');
const bakedGoodsBtn = document.getElementById('bakedGoodsBtn');
const diaryProductsBtn = document.getElementById('diaryProductsBtn');
const meatAndSeafoodBtn = document.getElementById('meatAndSeafoodBtn');
const cannedGoodsBtn = document.getElementById('cannedGoodsBtn');
const frozenFoodsBtn = document.getElementById('frozenFoodsBtn');
const grainsAndPastaBtn = document.getElementById('grainsAndPastaBtn');
const snacksBtn = document.getElementById('snacksBtn');
const beveragesBtn = document.getElementById('beveragesBtn');
const condimentsAndSaucesBtn = document.getElementById('condimentsAndSaucesBtn');
const spicesAndHerbsBtn = document.getElementById('spicesAndHerbsBtn');
const sweetsAndDesertsBtn = document.getElementById('sweetsAndDesertsBtn');
const locationParagraph = document.querySelector(".locationAbuDhabi");
const modal = document.getElementById("myModal");
const profileBtn = document.getElementById("ProfileBtn");
const closeBtn = document.getElementById("closeBtn");
const signOutBtn = document.getElementById("signOutBtn");
const changeProfileBtn = document.getElementById("changeProfileBtn");
const fileInput = document.getElementById("fileInput");
const profilePic = document.getElementById("profilePic");
const emailElement = document.getElementById("getEmail");
const nameElement = document.getElementById("userName");
const faqItems = document.querySelectorAll('.faq-item');
const searchInput = document.getElementById('searchInput');
console.log(searchInput);

// // adding the category buttons
import freshProduce from "../components/button.js";
freshProduceBtn.appendChild(freshProduce("Fresh Produce", 'darkorange', 'white'));

import bakedGoods from "../components/button.js";
bakedGoodsBtn.appendChild(bakedGoods("Baked Goods", '#013f01', 'white'));

import diaryProducts from "../components/button.js";
diaryProductsBtn.appendChild(diaryProducts("Diary Products", 'green', 'white'));

import meatAndSeafood from "../components/button.js";
meatAndSeafoodBtn.appendChild(meatAndSeafood("Meat and Seafood", '#920b92', 'white'));

import cannedGoods from "../components/button.js";
cannedGoodsBtn.appendChild(cannedGoods("Canned Goods", '#7D1820', 'white'));

import frozenFoods from "../components/button.js";
frozenFoodsBtn.appendChild(frozenFoods("Frozen Foods", '#2b2be8', 'white'));

import grainsAndPasta from "../components/button.js";
grainsAndPastaBtn.appendChild(grainsAndPasta("Grains and Pasta", '#7b7106', 'white'));

import snacks from "../components/button.js";
snacksBtn.appendChild(snacks("Snacks", '#013f01', 'white'));

import beverages from "../components/button.js";
beveragesBtn.appendChild(beverages("Beverages", '#920b92', 'white'));

import condimentsAndSauces from "../components/button.js";
condimentsAndSaucesBtn.appendChild(condimentsAndSauces("Condiments", '#7D1820', 'white'));

import spicesAndHerbs from "../components/button.js";
spicesAndHerbsBtn.appendChild(spicesAndHerbs("Spices and Herbs", 'green', 'white'));

import sweetsAndDeserts from "../components/button.js";
sweetsAndDesertsBtn.appendChild(sweetsAndDeserts("Deserts", 'darkorange', 'white'));

// Fetching products securely and logging them to the console
import { getAllProducts } from "../utils/products.js";

let allProducts = [];

function displayLowestPriceProducts() {
  // Retrieve products from sessionStorage
  const products = JSON.parse(sessionStorage.getItem('products')) || [];

  // Check if there are products available
  if (products.length === 0) {
      console.warn('No products found in sessionStorage.');
      return;
  }

  // Helper function to parse price to a number
  const parsePrice = (price) => parseFloat(price.replace(/,/g, '').replace('₦', ''));

  // Sort products by price in ascending order
  const sortedProducts = products.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

  // Get the lowest 6 products
  const lowestPriceProducts = sortedProducts.slice(0, 6);

  // Get the container where the products will be displayed
  const productContainer = document.getElementById('lowestPriceProductsContainer');

  // Check if the container exists
  if (productContainer) {
      // Clear any existing content in the container
      productContainer.innerHTML = '';

      // Loop through the lowest price products to display
      lowestPriceProducts.forEach(product => {
          // Create a product card
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');

          // Product picture
          const productImage = document.createElement('img');
          productImage.src = product.pictures[0] || 'default-image.jpg';  // Fallback image
          productImage.alt = `${product.brand} image`;
          productCard.appendChild(productImage);

          // Product details container
          const productDetailsCon = document.createElement('div');
          productDetailsCon.classList.add('product-details-con');
          productCard.appendChild(productDetailsCon);
          
          // Product name (Brand)
          const productName = document.createElement('h3');
          productName.textContent = `${product.brand}`;
          productDetailsCon.appendChild(productName);

          // Product price
          const productPrice = document.createElement('p');
          productPrice.textContent = `${product.price}`;  // Price as a string (no conversion needed here)
          productDetailsCon.appendChild(productPrice);

          // Append the product card to the container
          productContainer.appendChild(productCard);
      });
  } else {
      console.error('Product container (id="lowestPriceProductsContainer") not found.');
  }
}

// Fetch products and set sessionStorage
getAllProducts()
    .then(products => {
        if (Array.isArray(products)) {
            sessionStorage.setItem('products', JSON.stringify(products));
            console.log("Products fetched successfully:", products);

            const result = sessionStorage.getItem('products');
            allProducts = JSON.parse(result);
            console.log("Products retrieved from session storage:", allProducts);

            // Display low stock products and lowest price products
            // displayLowStockProducts();
            displayLowestPriceProducts();
        } else {
            console.error("Unexpected response format. Expected an array of products.");
        }
    })
    .catch(error => {
        console.error("Error fetching products:", error.message);
    });

// Retrieve and display logged-in user data
const loggedInUser = () => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            if (user && typeof user.email === "string" && typeof user.firstName === "string") {
                return user;
            } else {
                throw new Error("Invalid user data format.");
            }
        } catch (error) {
            console.error('Error parsing user data:', error.message);
            alert('Error parsing user data!');
        }
    } else {
        alert('No user found!');
    }
    return null;
};

const user = loggedInUser();
if (user) {
    console.log('User details:', user.email, user.firstName);

    // Display email
    if (emailElement) {
        emailElement.textContent = user.email;
    } else {
        console.error('Element with id="getEmail" not found.');
    }

    // Display user's first name with a greeting
    if (nameElement) {
        nameElement.innerHTML = `<p>Hi, ${user.firstName}!</p>`;
    } else {
        console.error('Element with id="userName" not found.');
    }
}

// Dropdown Animation for Modal
profileBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent modal close if clicking the profile button
    modal.style.display = "flex";
    modal.classList.add("show");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Match animation duration
});

window.addEventListener("click", (event) => {
    // Close modal if clicked outside of the modal or trigger button
    if (event.target === modal || !modal.contains(event.target)) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
});

import { auth, signOut } from "../firebaseConfig.js"; // Ensure correct path to your Firebase config file

// Sign-out logic
if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful
                console.log("User signed out successfully.");

                // Clear session storage
                sessionStorage.removeItem("loggedInUser");
                sessionStorage.clear();

                // Redirect to the login page or homepage
                window.location.href = "../public/index.html"; // Update this path based on your project structure
            })
            .catch((error) => {
                console.error("Error during sign-out:", error.message);
                alert("An error occurred while signing out. Please try again.");
            });
    });
} else {
    console.error('Sign-out button (id="signOutBtn") not found. Make sure it is present in the DOM.');
}



// Profile Picture Upload
changeProfileBtn.onclick = () => fileInput.click();
fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// Update delivery location
function updateDeliveryLocation(location) {
    if (location && typeof location === "string") {
        const sanitizedLocation = location.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        locationParagraph.textContent = sanitizedLocation;
    } else {
        console.error("Invalid location data.");
    }
}

// Detect user's location
function detectUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Latitude:", latitude, "Longitude:", longitude);
                await fetchCountryFromCoordinates(latitude, longitude);
            },
            (error) => {
                console.error("Error getting location:", error.message);
                updateDeliveryLocation("Location");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        updateDeliveryLocation("Location not available");
    }
}

// Fetch country from coordinates
async function fetchCountryFromCoordinates(latitude, longitude) {
    const apiUrl = `https://geolocation-db.com/json/`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.country_name) {
            console.log("Detected Country:", data.country_name);
            updateDeliveryLocation(data.country_name);
        } else {
            console.error("No country data found or invalid response format.");
            updateDeliveryLocation("Unknown Location");
        }
    } catch (error) {
        console.error("Error fetching country data:", error.message);
        updateDeliveryLocation("Unknown Location");
    }
}

// Initialize location detection on page load
document.addEventListener("DOMContentLoaded", detectUserLocation);

// automatic scrolling for searchCatogoriesCardsCon
// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.querySelector(".searchCatogoriesCardsCon");
//     const scrollSpeed = 1; // Pixels to scroll per tick
//     let scrollInterval; // Variable to hold the scroll interval

//     // Duplicate the content for seamless scrolling
//     const duplicateContent = () => {
//         container.innerHTML += container.innerHTML;
//     };

//     // Start auto-scrolling
//     const startScrolling = () => {
//         scrollInterval = setInterval(() => {
//             container.scrollLeft += scrollSpeed;

//             // Reset the scroll position seamlessly when reaching halfway
//             if (container.scrollLeft >= container.scrollWidth / 2) {
//                 container.scrollLeft = 0;
//             }
//         }, 15); // Adjust the interval for smoothness
//     };

//     // Stop scrolling on hover
//     const stopScrolling = () => {
//         clearInterval(scrollInterval);
//     };

//     // Duplicate the content on page load
//     duplicateContent();

//     // Start auto-scrolling
//     startScrolling();

//     // Add hover listeners
//     container.addEventListener("mouseenter", stopScrolling);
//     container.addEventListener("mouseleave", startScrolling);
// });

// Product Search Functionality with Click-Away Feature
// Function to save recent searches
function saveRecentSearch(query) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    // Remove duplicates
    recentSearches = recentSearches.filter(search => search !== query);

    // Add the new search query to the beginning
    recentSearches.unshift(query);

    // Limit to 5 recent searches
    if (recentSearches.length > 20) {
        recentSearches.pop();
    }

    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Function to display recent searches
function displayRecentSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const recentSearchesContainer = document.getElementById('recentSearchesContainer');

    if (recentSearchesContainer) {
        recentSearchesContainer.innerHTML = '';

        // Display recent searches
        if (recentSearches.length > 0) {
            recentSearches.forEach(search => {
                const searchItem = document.createElement('div');
                searchItem.classList.add('search-result-item');
                searchItem.textContent = search;
                recentSearchesContainer.appendChild(searchItem);

                // Click event for recent searches
                searchItem.addEventListener('click', () => {
                    searchInput.value = search;
                    performProductSearch(search);
                });
            });
        }
    } else {
        console.error('recentSearchesContainer not found');
    }
}

// Function to perform product search
function performProductSearch(query) {
    const productList = document.getElementById('productList');
    const searchQuery = query.toLowerCase();
    const storedProducts = sessionStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    productList.innerHTML = '';

    // Filter products based on the query
    const matchingProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery)
    );

    if (matchingProducts.length > 0) {
        productList.style.display = 'block';

        // Create the productHeadingCon
        const productHeadingCon = document.createElement('div');
        productHeadingCon.classList.add('product-heading-con');

        // Create the h3 element with text and style
        const productHeading = document.createElement('h3');
        productHeading.textContent = 'Products';
        productHeading.style.color = '#013a01';

        // Create the hr element with styles
        const hr = document.createElement('hr');
        hr.style.borderTop = '1px solid gainsboro';
        hr.style.marginTop = '0.5em';

        // Append h3 and hr to the div container
        productHeadingCon.appendChild(productHeading);
        productHeadingCon.appendChild(hr);

        // Append the heading container to the product list
        productList.appendChild(productHeadingCon);

        // Create a container for product items
        const productGridContainer = document.createElement('div');
        productGridContainer.classList.add('product-grid-container');
        productList.appendChild(productGridContainer);

        matchingProducts.forEach(product => {
            // Create a product card Con
            const productItemCon = document.createElement('div');
            productItemCon.classList.add('search-result-item-con');

            // Create a product card
            const productItem = document.createElement('div');
            productItem.classList.add('product-search-result-item');

            // Product picture
            const productImage = document.createElement('img');
            productImage.src = product.pictures[0] || 'default-image.jpg';
            productImage.alt = `${product.brand} image`;
            productItem.appendChild(productImage);

            // Product details container
            const productDetailsCon = document.createElement('div');
            productDetailsCon.classList.add('product-details-con');
            productItem.appendChild(productDetailsCon);

            // Product brand
            const productBrand = document.createElement('h3');
            productBrand.textContent = `${product.brand}`;
            productDetailsCon.appendChild(productBrand);

            // Product price
            const productPrice = document.createElement('p');
            productPrice.textContent = `${product.price}`;
            productDetailsCon.appendChild(productPrice);

            // Append the product item to the container
            productItemCon.appendChild(productItem);

            // Append the product item container to the grid
            productGridContainer.appendChild(productItemCon);

            // Handle product selection
            productItem.addEventListener('click', () => {
                alert(`You selected: ${product.brand} - ${product.price}`);
                saveRecentSearch(product.brand);
                productList.style.display = 'none';
                displayRecentSearches();
            });
        });
    } else {
        productList.style.display = 'none';
    }
}


// Input event listener for search input

searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query !== '') {
        performProductSearch(query);
    }
});

// Focus event listener to display recent searches
searchInput.addEventListener('focus', () => {
    displayRecentSearches();
});

// On page load, display recent searches
document.addEventListener('DOMContentLoaded', () => {
    displayRecentSearches();
});

const productList = document.getElementById('productList');

// Hide productList when clicking outside or when searchInput is empty
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !productList.contains(event.target)) {
        productList.style.display = 'none';
    }
});

// Listen for input change to show/hide productList and hide productDropDownCon
searchInput.addEventListener('input', () => {
    const productDropDown = document.getElementById('productDropDown');

    if (searchInput.value.trim() === '') {
        productList.style.display = 'none';
        productDropDown.style.display = 'flex'; // Show dropdown if input is empty
    } else {
        productList.style.display = 'flex';
        productList.style.flexDirection = 'column';
        productList.style.gap = '1em';
        productDropDown.style.display = 'none'; // Hide dropdown when typing
    }
});

// Handle blur event to hide productList when searchInput loses focus
searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        if (searchInput.value.trim() === '') {
            productList.style.display = 'none';
        }
    }, 200);  // Timeout to allow click event to register before hiding
});

// Display dropdown when clicking the search input
searchInput.addEventListener('click', () => {
    const productDropDownCon = document.getElementById('productDropDownCon');
    const headerSearchCon = document.getElementById('headerSearchCon');
    const headerLogoAndLocationCon = document.getElementById('headerLogoAndLocationCon');
    const headerCartandProfileCon = document.getElementById('headerCartandProfileCon');

    // Show dropdown after a slight delay
    setTimeout(() => {
        productDropDownCon.style.display = 'block';
        headerSearchCon.style.width = '100%';
        headerSearchCon.style.marginTop = '1.4em';
        headerSearchCon.style.marginBottom = '1em';
        headerLogoAndLocationCon.style.display = 'none';
        headerCartandProfileCon.style.display = 'none';
    }, 200);
});

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    const productDropDownCon = document.getElementById('productDropDownCon');
    const headerSearchCon = document.getElementById('headerSearchCon');
    const headerLogoAndLocationCon = document.getElementById('headerLogoAndLocationCon');
    const headerCartandProfileCon = document.getElementById('headerCartandProfileCon');

    // If the clicked element is not the search input, dropdown, or the elements we want to keep visible, hide the dropdown
    if (
        !searchInput.contains(event.target) && 
        !productDropDownCon.contains(event.target) &&
        !headerSearchCon.contains(event.target) // Prevent closing when clicking inside the search bar area
    ) {
        productDropDownCon.style.display = 'none';

        // Reset UI to default state
        headerSearchCon.style.width = '70%'; // Restore the original width of the search container
        headerSearchCon.style.marginTop = '0'; // Remove the margin
        headerLogoAndLocationCon.style.display = 'flex'; // Show the header logo and location
        headerCartandProfileCon.style.display = 'flex'; // Show the cart and profile section
    }
});

document.getElementById('startShoppingBtn').onclick = function() {
  window.location.href = '../Home/index.html'; // Change 'index.html' to your homepage URL
};

// Function to update the cart item count in the UI
function updateCartItemCount(cartData) {
    const totalItems = cartData.reduce((total, item) => total + item.quantity, 0);
    const cartItemCountElement = document.getElementById("zero");

    if (cartItemCountElement) {
        cartItemCountElement.textContent = totalItems;
    }
}

async function addToCart(productId, productName, productPrice, quantity) {
    const loader = document.getElementById("loader"); // Assuming loader has this ID

    // Check if loader exists before trying to manipulate its style
    if (loader) {
        loader.style.display = "block"; // Show the loader before starting the cart update
    }

    try {
        const user = auth.currentUser;

        if (!user) {
            console.log("User is not logged in. Redirect to login page.");
            return;
        }

        // Reference to the user's cart in Firestore
        const cartRef = doc(db, "carts", user.uid);

        // Get the current cart
        const cartDoc = await getDoc(cartRef);

        let cartData = cartDoc.exists() ? cartDoc.data().items : [];

        // Get the product details from session storage
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const product = products.find(item => item.id === productId);

        if (!product) {
            console.error('Product not found!');
            return;
        }

        // Check if the quantity to add exceeds the available stock
        if (quantity > product.quantity) {
            showModal(`Sorry! Only ${product.quantity} of this product is available.`);
            return;
        }

        // Check if product already exists in the cart
        const productIndex = cartData.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            // Product exists, update quantity
            const currentQuantityInCart = cartData[productIndex].quantity;
            const newQuantity = currentQuantityInCart + quantity;

            if (newQuantity > product.quantity) {
                showModal(`You can only add ${product.quantity - currentQuantityInCart} more of this product.`);
                return;
            }

            cartData[productIndex].quantity = newQuantity;
        } else {
            // Product doesn't exist, add new product to the cart
            cartData.push({
                id: productId,
                name: productName,
                price: `${productPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                quantity: quantity
            });
        }

        // Update Firestore with the new cart data
        await setDoc(cartRef, { items: cartData });

        // Save to localStorage for faster UI updates
        localStorage.setItem("cart", JSON.stringify(cartData));

        // Update the cart item count in the UI
        updateCartItemCount(cartData);

        // Show modal that the product has been added
        showModal("Product Added Successfully!");

        console.log("Product added to cart!", cartData);
    } catch (error) {
        console.error("Error adding product to cart:", error);

        // Hide the loader in case of error
        if (loader) {
            loader.style.display = "none";
        }
    } finally {
        // Ensure the loader is hidden in case of any issues
        if (loader) {
            loader.style.display = "none"; // Hide the loading indicator
        }

        toggleLoading(false); // If you're using a custom function for this
    }
}

// Real-time listener to sync Firestore changes with localStorage
function setupCartSyncPoll() {
    const user = auth.currentUser;

    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    // Poll Firestore every 10 seconds
    setInterval(async () => {
        try {
            const cartDoc = await getDoc(cartRef);
            if (cartDoc.exists()) {
                const cartData = cartDoc.data().items;

                // Sync Firestore cart with localStorage
                localStorage.setItem("cart", JSON.stringify(cartData));
                updateCartItemCount(cartData);

                console.log("Cart synced from Firestore.");
            } else {
                console.log("No cart found. Clearing localStorage...");
                localStorage.removeItem("cart");
                updateCartItemCount([]);
            }
        } catch (error) {
            console.error("Error polling Firestore for cart updates:", error);
        }
    }, 10000); // Poll every 10 seconds
}

// Function to load cart data from Firestore or localStorage
async function loadCart() {
    const user = auth.currentUser;

    if (user) {
        // Load cart from Firestore and set up polling
        await loadCartFromFirestore();
        setupCartSyncPoll();
    } else {
        // Load cart from localStorage if user is not logged in
        loadCartFromLocalStorage();
    }
}

// Function to load the cart from Firestore
async function loadCartFromFirestore() {
    const user = auth.currentUser;

    if (!user) {
        console.log("User is not logged in.");
        return;
    }

    const cartRef = doc(db, "carts", user.uid);

    try {
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
            const cartData = cartDoc.data().items;
            updateCartItemCount(cartData);
            localStorage.setItem("cart", JSON.stringify(cartData));
        } else {
            console.log("No cart found for this user.");
        }
    } catch (error) {
        console.error("Error loading cart from Firestore:", error);
    }
}

// Function to load cart from localStorage (if available)
function loadCartFromLocalStorage() {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartItemCount(cartData);
}

window.addEventListener('load', loadCart);

async function clearCartAfterCheckout() {
    const user = auth.currentUser;

    if (!user) {
        console.log("User is not logged in.");
        return;
    }

    const cartRef = doc(db, "carts", user.uid);

    try {
        await deleteDoc(cartRef);
        localStorage.removeItem("cart");
        updateCartItemCount([]);
        console.log("Cart cleared after checkout.");
    } catch (error) {
        console.error("Error clearing cart after checkout:", error);
    }
}

function addQuantitySelectorAndCartButton(container) {
    // Create the main container for the quantity selector and add-to-cart button
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('quantity-add-cart-container');

    // Quantity selector container
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-selector');

    // Minus button
    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.classList.add('quantity-btn');
    minusButton.addEventListener('click', () => {
        const quantityInput = quantityContainer.querySelector('.quantity-input');
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = Math.max(1, currentValue - 1);
    });
    quantityContainer.appendChild(minusButton);

    // Quantity input
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.classList.add('quantity-input');
    quantityContainer.appendChild(quantityInput);

    // Plus button
    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.classList.add('quantity-btn');
    plusButton.addEventListener('click', () => {
        const quantityInput = quantityContainer.querySelector('.quantity-input');
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
    quantityContainer.appendChild(plusButton);

    // Add to Cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-btn');
    addToCartButton.addEventListener('click', () => {
        const productId = container.getAttribute('data-id');
        const productName = container.getAttribute('data-name');
        const productPrice = container.getAttribute('data-price');
        const quantity = parseInt(quantityInput.value);

        if (productId && productName && !isNaN(quantity) && quantity > 0) {
            toggleLoading(true); // Show the loading indicator
            addToCart(productId, productName, productPrice, quantity);
            quantityInput.value = 1;
        } else {
            console.error('Error adding to cart. Missing product details or invalid quantity.');
        }
    });

    // Append both containers to the main container
    mainContainer.appendChild(quantityContainer);
    mainContainer.appendChild(addToCartButton);

    // Append the main container to the product card
    container.appendChild(mainContainer);
}


// const cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage or initialize as empty array

// function updateCartUI() {
//   const cartList = document.getElementById('cart-list');
//   const cartTotal = document.getElementById('cart-total');
//   const emptyCartMessage = document.getElementById('empty-cart-message');
//   const cartItemsSection = document.getElementById('cart-items');
//   const cartIcon = document.getElementById('cart-icon'); // Assuming you have a cart icon element
  
//   // Clear the current list
//   cartList.innerHTML = '';
//   let total = 0;

//   if (cart.length > 0) {
//     cartItemsSection.style.display = 'block';
//     emptyCartMessage.style.display = 'none';

//     // Add items to the cart display
//     cart.forEach((item, index) => {
//       const listItem = document.createElement('li');
//       listItem.innerHTML = `${item.name} - ₦${item.price.toFixed(2)} <button class="remove-btn" onclick="removeItem(${index})">Remove</button>`;
//       cartList.appendChild(listItem);
//       total += item.price;
//     });
//   } else {
//     cartItemsSection.style.display = 'none';
//     emptyCartMessage.style.display = 'block';
//   }

//   // Update the total price
//   cartTotal.innerHTML = `Total: ₦${total.toFixed(2)}`;

//   // Update cart icon with item count
//   cartIcon.innerHTML = cart.length > 0 ? `Cart (${cart.length})` : 'Cart';
// }

// function addItemToCart(name, price) {
//   cart.push({ name, price });
//   updateCartStorage();
//   updateCartUI();
// }

// function removeItem(index) {
//   cart.splice(index, 1);
//   updateCartStorage();
//   updateCartUI();
// }

// function startShopping() {
//   alert("Redirecting to the shopping page...");
// }

// function checkout() {
//   if (cart.length === 0) {
//     alert("Your cart is empty. Please add items to your cart first!");
//   } else {
//     alert("Proceeding to checkout...");
//   }
// }

// function openModal() {
//   const modal = document.getElementById("cartModal");
//   modal.style.display = "flex";
//   updateModalCart(); // Ensure the modal shows updated cart content
// }

// function closeModal() {
//   const modal = document.getElementById("cartModal");
//   modal.style.display = "none";
// }

// function updateModalCart() {
//   const modalCartList = document.getElementById("modal-cart-list");
//   const modalCartTotal = document.getElementById("modal-cart-total");

//   modalCartList.innerHTML = "";
//   let total = 0;

//   cart.forEach(item => {
//     const listItem = document.createElement("li");
//     listItem.innerHTML = `${item.name} - ₦${item.price.toFixed(2)}`;
//     modalCartList.appendChild(listItem);
//     total += item.price;
//   });

//   modalCartTotal.innerHTML = `Total: ₦${total.toFixed(2)}`;
// }

// // Update cart in localStorage
// function updateCartStorage() {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Open modal when the page loads (optional)
// window.onload = function() {
//   openModal();
//   updateCartUI(); // Ensure the cart is loaded from localStorage and displayed properly
// };

// // Event listener to open cart modal when the cart icon is clicked
// document.getElementById('cart-icon').addEventListener('click', openModal);
