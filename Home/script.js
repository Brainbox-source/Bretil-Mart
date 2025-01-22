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
const heroSectionBtnCon = document.getElementById('heroSectionBtnCon');
const organicFoodBtnCon =  document.getElementById('organicFoodBtnCon');
const hurryUpBtnCon = document.getElementById('hurryUpBtnCon');
const cashBackSubscriptionBtnCon = document.getElementById('cashBackSubscriptionBtnCon');
const startShoppingBtnCon = document.getElementById('startShoppingBtnCon');
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
// console.log(searchInput);

// importing db and auth
import { db, doc, getDoc, setDoc, auth, signOut } from '../firebaseConfig.js';

// // adding the category buttons
import freshProduce from "../components/button.js";
freshProduceBtn.appendChild(freshProduce("Fresh Produce", 'darkorange', 'white'));

import bakedGoods from "../components/button.js";
bakedGoodsBtn.appendChild(bakedGoods("Baked Goods", '#013f01', 'white'));

import diaryProducts from "../components/button.js";
diaryProductsBtn.appendChild(diaryProducts("Diary Products", 'green', 'white'));

import meatAndSeafood from "../components/button.js";
meatAndSeafoodBtn.appendChild(meatAndSeafood("Meat and Seafood", '#460032', 'white'));

import cannedGoods from "../components/button.js";
cannedGoodsBtn.appendChild(cannedGoods("Canned Goods", '#7D1820', 'white'));

import frozenFoods from "../components/button.js";
frozenFoodsBtn.appendChild(frozenFoods("Frozen Foods", 'darkorange', 'white'));

import grainsAndPasta from "../components/button.js";
grainsAndPastaBtn.appendChild(grainsAndPasta("Grains and Pasta", '#7b7106', 'white'));

import snacks from "../components/button.js";
snacksBtn.appendChild(snacks("Snacks", '#013f01', 'white'));

import beverages from "../components/button.js";
beveragesBtn.appendChild(beverages("Beverages", '#460032', 'white'));

import condimentsAndSauces from "../components/button.js";
condimentsAndSaucesBtn.appendChild(condimentsAndSauces("Condiments", '#7D1820', 'white'));

import spicesAndHerbs from "../components/button.js";
spicesAndHerbsBtn.appendChild(spicesAndHerbs("Spices and Herbs", 'green', 'white'));

import sweetsAndDeserts from "../components/button.js";
sweetsAndDesertsBtn.appendChild(sweetsAndDeserts("Deserts", 'darkorange', 'white'));

// Adding "Shop Now" button to the hero section
import button from "../components/button.js";
heroSectionBtnCon.appendChild(button("Shop Now", 'darkorange', 'white', 'yes'));

// Adding "Shop Now" button to the organic food section
import secondButton from "../components/button.js";
organicFoodBtnCon.appendChild(secondButton("Shop Now", '#fff', 'darkgreen', 'yes'));

// Adding "Shop Now" button to the hurry up section
import thirdButton from "../components/button.js";
hurryUpBtnCon.appendChild(thirdButton("Shop Now", '#fff', 'darkgreen', 'yes'));

// Adding "Get Subscription" button to the Cash back section
import cashButton from "../components/button.js";
cashBackSubscriptionBtnCon.appendChild(cashButton("Get Subscription", 'darkorange', '#fff', 'yes'));

// Adding "Start Shopping" button to the Cash back section
import startShoppingButton from "../components/button.js";
startShoppingBtnCon.appendChild(startShoppingButton("Start Shopping", '#fff', 'darkgreen', 'yes'));

// Fetching products securely and logging them to the console
import { getAllProducts } from "../utils/products.js";
// import { displayfunction } from "../PRODUCT/DISPLAYPRODUCT.js";
// displayfunction('0lYUQd2K6zV3wf9Tul5Q');

let allProducts = [];


// Function to fetch and display the products with quantity less than 100
function displayLowStockProducts() {
    // Retrieve products from sessionStorage
    const products = JSON.parse(sessionStorage.getItem('products')) || [];

    // Filter products with quantity less than 100
    const lowStockProducts = products.filter(product => product.quantity < 100);

    // Sort the lowStockProducts by quantity in ascending order
    lowStockProducts.sort((a, b) => a.quantity - b.quantity);

    // Get the first container where the products will be displayed
    const productContainer = document.getElementById('lowStockProductsContainer');

    // Get the second container for the best-selling product
    const bestSellingContainer = document.getElementById('bestSellingProductsRightCon');

    // Check if the first container exists
    if (productContainer) {
        // Clear any existing content in the container
        productContainer.innerHTML = '';

        // Set the max capacity to 200 pcs
        const maxQuantity = 200;

        // Take the first four low-stock products
        const productsToDisplay = lowStockProducts.slice(0, 4);

        // Loop through the products to display in the first container
        productsToDisplay.forEach(product => {
            const limitedProductCard = createProductCard(product, maxQuantity);
            productContainer.appendChild(limitedProductCard);
        });
    } else {
        console.error('Product container (id="lowStockProductsContainer") not found.');
    }

    // Check if the second container exists
    if (bestSellingContainer) {
        // Clear any existing content in the container
        bestSellingContainer.innerHTML = '';

        // Select one random product from the low-stock list if available
        if (lowStockProducts.length > 0) {
            const randomProduct = lowStockProducts[Math.floor(Math.random() * lowStockProducts.length)];
            const limitedProductCard = createProductCard(randomProduct, 200, false); // No + button
            bestSellingContainer.appendChild(limitedProductCard);

            // Add quantity selector and "Add to Cart" button after the extra hr
            addQuantitySelectorAndCartButton(limitedProductCard);
        } else {
            console.warn('No low-stock products available for the best-selling container.');
        }
    } else {
        console.error('Product container (id="bestSellingProductsRightCon") not found.');
    }

    // Find the + buttons and add the necessary attributes
    const buttons = document.querySelectorAll('.low-stock-product button');

    buttons.forEach(button => {
        if (button.textContent.trim() === '+') {
            const parentCard = button.closest('.low-stock-product');
            if (parentCard) {
                const productId = parentCard.getAttribute('data-id');
                const productName = parentCard.getAttribute('data-name');
                const productPrice = parentCard.getAttribute('data-price');

                button.setAttribute('data-id', productId);
                button.setAttribute('data-name', productName);
                button.setAttribute('data-price', productPrice);
            }
        }
    });

    // Reattach Add to Cart functionality to + buttons
    attachCartButtons();
}

// Helper function to create a product card
// 🛠️ Updated Product Card Rendering Function
function createProductCard(product, maxQuantity = 200, showAddToCart = true) {
    // Create a product card
    const limitedProductCard = document.createElement('div');
    limitedProductCard.classList.add('limited-product-card');
    limitedProductCard.setAttribute('data-id', product.id);
    limitedProductCard.setAttribute('data-name', product.brand);
    limitedProductCard.setAttribute('data-price', product.price);

    // Create and add the "Limited" tagline to the top-right corner
    const tagline = document.createElement('span');
    tagline.classList.add('tagline');
    tagline.textContent = 'Limited';
    limitedProductCard.appendChild(tagline);

    // Product picture
    const productImage = document.createElement('img');
    productImage.src = product.pictures[0] || 'default-image.jpg';
    limitedProductCard.appendChild(productImage);

    // Product name (Brand and Product Name)
    const productName = document.createElement('h3');
    productName.textContent = `${product.brand}`;
    limitedProductCard.appendChild(productName);

    // Product price
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');
    const productPrice = document.createElement('p');
    productPrice.classList.add('price');
    productPrice.textContent = `${product.price.toLocaleString()}`;
    priceContainer.appendChild(productPrice);

    // Add to Cart Button
    if (showAddToCart) {
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = '+';
        addToCartButton.classList.add('add-button');
        addToCartButton.setAttribute('data-id', product.id);
        addToCartButton.setAttribute('data-name', product.brand);
        addToCartButton.setAttribute('data-price', product.price);
        priceContainer.appendChild(addToCartButton);
    }

    limitedProductCard.appendChild(priceContainer);

    // Separator hr
    const limitedHr = document.createElement('hr');
    limitedHr.style.borderTop = '1px solid gainsboro';
    limitedHr.style.marginTop = '0.5em';
    limitedHr.style.marginBottom = '1em';
    limitedProductCard.appendChild(limitedHr);

    const limitedQuantityText = document.createElement('p');
    limitedQuantityText.textContent = 'A limited quantity of this product is left';
    limitedQuantityText.style.fontSize = '14px';
    limitedQuantityText.style.color = '#999';
    limitedQuantityText.style.marginBottom = '0.5em';
    limitedProductCard.appendChild(limitedQuantityText);

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    const percentageFilled = Math.round((product.quantity / maxQuantity) * 20);

    for (let i = 0; i < 20; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        if (i < percentageFilled) {
            block.classList.add(product.quantity < 100 ? 'filled-red' : 'filled');
        }
        progressBar.appendChild(block);
    }

    limitedProductCard.appendChild(progressBar);

    const productQuantity = document.createElement('p');
    productQuantity.classList.add('quantity');
    productQuantity.textContent = `Available only: ${product.quantity}pcs`;
    limitedProductCard.appendChild(productQuantity);

    // Extra hr for bestSellingProductsRightCon
    if (!showAddToCart) {
        const afterQuantityHr = document.createElement('hr');
        afterQuantityHr.style.borderTop = '1px solid gainsboro';
        afterQuantityHr.style.marginTop = '0.5em';
        afterQuantityHr.style.marginBottom = '1em';
        limitedProductCard.appendChild(afterQuantityHr);
    }

    return limitedProductCard;
}


// function displayLowStockProducts() {
//     // Your existing logic to display low stock products
  
//     // Reattach Add to Cart functionality to + buttons
//     attachCartButtons();
// }

// Helper function to add quantity selector and Add to Cart button
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

function displayLowestPriceProducts() {
    // Retrieve products from sessionStorage
    const products = JSON.parse(sessionStorage.getItem('products')) || [];

    // Check if there are products available
    if (products.length === 0) {
        console.warn('No products found in sessionStorage.');
        return;
    }

    const parsePrice = (price) => price.replace('₦', '').trim();

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
            displayLowStockProducts();
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

fileInput.onchange = async (event) => {
    const file = event.target.files[0]; // Get the file
    if (file) {
        const reader = new FileReader();

        // Temporarily display the selected file
        reader.onload = (e) => {
            profilePic.src = e.target.result; // Update the profile picture preview
        };
        reader.readAsDataURL(file);

        // Prepare the form data for the image upload
        const formData = new FormData();
        // Wrap the file in an array and append it to the form data at index 0
        formData.append('file[0]', file); // Append the file at index 0

        try {
            // Step 1: Send the file to the backend for processing
            const response = await fetch('https://bretil-mart-server.onrender.com/upload', {
                method: 'POST',
                body: formData, // Attach the form data (including the file)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Upload failed:', errorData);
                alert(`Error: ${errorData.message || 'Unknown error'}`);
                return; // Stop further execution
            }

            const data = await response.json(); // Parse the JSON response

            if (data.fileUrl) {
                // After successful upload, get the file URL from the backend
                const profilePicUrl = data.fileUrl;

                // Step 2: Get the authenticated user's ID from Firebase Auth
                const user = firebase.auth().currentUser;
                if (!user) {
                    alert('No authenticated user found. Please log in.');
                    return;
                }
                const userId = user.uid; // Get the unique user ID

                // Step 3: Store the profile picture URL in Firestore
                const userRef = firebase.firestore().collection('users').doc(userId);
                await userRef.set({ profilePicUrl }, { merge: true });

                // Step 4: Save the profile picture URL to sessionStorage
                sessionStorage.setItem('profilePicUrl', profilePicUrl);

                // Step 5: Update the profile picture on the UI with the uploaded file URL
                profilePic.src = profilePicUrl;

                console.log('Profile picture uploaded and saved successfully:', profilePicUrl);
                alert('Profile picture updated successfully!');
            } else {
                alert('Failed to upload the profile picture.');
            }
        } catch (error) {
            console.error('Error uploading the profile picture:', error);
            alert('An error occurred while uploading the profile picture.');
        }
    } else {
        alert('No file selected. Please choose a profile picture to upload.');
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
            updateDeliveryLocation("Location");
        }
    } catch (error) {
        console.error("Error fetching country data:", error.message);
        updateDeliveryLocation("Location");
    }
}

// Initialize location detection on page load
document.addEventListener("DOMContentLoaded", detectUserLocation);

// automatic scrolling for searchCatogoriesCardsCon
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".searchCatogoriesCardsCon");
    const scrollSpeed = 1; // Pixels to scroll per tick
    let scrollInterval; // Variable to hold the scroll interval

    // Duplicate the content for seamless scrolling
    const duplicateContent = () => {
        container.innerHTML += container.innerHTML;
    };

    // Start auto-scrolling
    const startScrolling = () => {
        scrollInterval = setInterval(() => {
            container.scrollLeft += scrollSpeed;

            // Reset the scroll position seamlessly when reaching halfway
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }
        }, 15); // Adjust the interval for smoothness
    };

    // Stop scrolling on hover
    const stopScrolling = () => {
        clearInterval(scrollInterval);
    };

    // Duplicate the content on page load
    duplicateContent();

    // Start auto-scrolling
    startScrolling();

    // Add hover listeners
    container.addEventListener("mouseenter", stopScrolling);
    container.addEventListener("mouseleave", startScrolling);
});

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
                // alert(`You selected: ${product.brand} - ${product.price}`);
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
    const originalParentId = document.getElementById('originalParentId');
    const headerLogoAndLocationCon = document.getElementById('headerLogoAndLocationCon');
    const headerCartandProfileCon = document.getElementById('headerCartandProfileCon');

    // Show dropdown after a slight delay
    setTimeout(() => {
        productDropDownCon.style.display = 'block';
        originalParentId.style.width = '100%';
        originalParentId.style.marginTop = '1.4em';
        originalParentId.style.marginBottom = '1em';
        headerLogoAndLocationCon.style.display = 'none';
        headerCartandProfileCon.style.display = 'none';
    }, 200);
});

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    const productDropDownCon = document.getElementById('productDropDownCon');
    const originalParentId = document.getElementById('originalParentId');
    const headerLogoAndLocationCon = document.getElementById('headerLogoAndLocationCon');
    const headerCartandProfileCon = document.getElementById('headerCartandProfileCon');

    // If the clicked element is not the search input, dropdown, or the elements we want to keep visible, hide the dropdown
    if (
        !searchInput.contains(event.target) && 
        !productDropDownCon.contains(event.target) &&
        !originalParentId.contains(event.target) // Prevent closing when clicking inside the search bar area
    ) {
        productDropDownCon.style.display = 'none';

        // Reset UI to default state
        originalParentId.style.width = '70%'; // Restore the original width of the search container
        originalParentId.style.marginTop = '0'; // Remove the margin
        headerLogoAndLocationCon.style.display = 'flex'; // Show the header logo and location
        headerCartandProfileCon.style.display = 'flex'; // Show the cart and profile section
    }
});

// Get the productBtns container
const productBtnsContainer = document.getElementById("productBtns");

// Button labels
const btnLabels = [
  "All Products",
  "Fresh Produce",
  "Grains & Pasta",
  "Beverages",
  "Snacks",
  "Meat & Seafood"
];

// Create buttons dynamically
btnLabels.forEach((label, index) => {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.classList.add("product-btn");

  // Highlight the first button by default
  if (index === 0) {
    btn.classList.add("active");
    displayRandomProducts();
  }

  // Add click event to each button
  btn.addEventListener("click", function () {
    // Reset loader whenever a new category is clicked
    const loader = document.getElementById("loader"); // Assuming the loader has this ID

    // Check if loader exists before modifying its style
    if (loader) {
      loader.style.display = "block"; // Show the loader
    }

    // If the clicked button is already active, don't deactivate it again
    if (this.classList.contains("active")) return;

    // Remove active class from all buttons
    document.querySelectorAll(".product-btn").forEach((button) => {
      button.classList.remove("active");
    });

    // Add active class to the clicked button
    this.classList.add("active");

    // Display products based on the button clicked
    if (label === "All Products") {
      displayRandomProducts();
    } else if (label === "Fresh Produce") {
      displayFreshProduceProducts();
    } else if (label === "Grains & Pasta") {
      displayGrainsPastaProducts();
    } else if (label === "Beverages") {
      displayBeveragesProducts();
    } else if (label === "Snacks") {
      displaySnacksProducts();
    } else if (label === "Meat & Seafood") {
      displayMeatSeafoodProducts();
    }

    // Hide loader once products are displayed
    setTimeout(() => {
      if (loader) {
        loader.style.display = "none"; // Hide the loader after products have been loaded
      }
    }, 500); // Adjust time as necessary depending on product load time
  });

  // Append button to the container
  productBtnsContainer.appendChild(btn);
});  

// Function to display random products
function displayRandomProducts() {
  const products = JSON.parse(sessionStorage.getItem('products')) || [];

  if (products.length === 0) {
    console.warn('No products found in sessionStorage.');
    return;
  }

  const randomProducts = getRandomItems(products, 8);
  displayProducts(randomProducts, 'Best Sale');
}

// Function to display random fresh produce products
function displayFreshProduceProducts() {
    const products = JSON.parse(sessionStorage.getItem('products')) || [];
  
    if (products.length === 0) {
      console.warn('No products found in sessionStorage.');
      return;
    }
  
    // Filter for Fresh Produce category and shuffle
    const freshProduceProducts = products.filter(product => product.category === 'fresh produce');
    const randomFreshProduce = getRandomItems(freshProduceProducts, 8);
  
    // Display the random Fresh Produce products with a custom tagline
    displayProducts(randomFreshProduce, 'Farm Fresh');
}

// Function to display random grains & pasta products
function displayGrainsPastaProducts() {
    const products = JSON.parse(sessionStorage.getItem('products')) || [];
  
    if (products.length === 0) {
      console.warn('No products found in sessionStorage.');
      return;
    }
  
    // Filter for Grains & Pasta category and shuffle
    const grainsPastaProducts = products.filter(product => product.category === 'grains & pasta');
    const randomGrainsPasta = getRandomItems(grainsPastaProducts, 8);
  
    // Display the random Grains & Pasta products with a custom tagline
    displayProducts(randomGrainsPasta, 'Healthy & Hearty');
  }
   
  // Function to display random beverages products
function displayBeveragesProducts() {
    const products = JSON.parse(sessionStorage.getItem('products')) || [];
  
    if (products.length === 0) {
      console.warn('No products found in sessionStorage.');
      return;
    }
  
    // Filter for Beverages category and shuffle
    const beveragesProducts = products.filter(product => product.category === 'beverages');
    const randomBeverages = getRandomItems(beveragesProducts, 8);
  
    // Display the random beverages products with a custom tagline
    displayProducts(randomBeverages, 'Refreshing Deals');
  }  

  // Function to display random snacks products
function displaySnacksProducts() {
    const products = JSON.parse(sessionStorage.getItem('products')) || [];
  
    if (products.length === 0) {
      console.warn('No products found in sessionStorage.');
      return;
    }
  
    // Filter for Snacks category and shuffle
    const snacksProducts = products.filter(product => product.category === 'snacks');
    const randomSnacks = getRandomItems(snacksProducts, 8);
  
    // Display the random snacks products with a custom tagline
    displayProducts(randomSnacks, 'Crunchy Bites');
  }
  
  // Function to display random meat & seafood products
function displayMeatSeafoodProducts() {
    const products = JSON.parse(sessionStorage.getItem('products')) || [];
  
    if (products.length === 0) {
      console.warn('No products found in sessionStorage.');
      return;
    }
  
    // Filter for Meat & Seafood category and shuffle
    const meatSeafoodProducts = products.filter(product => product.category === 'meat & seafood');
    const randomMeatSeafood = getRandomItems(meatSeafoodProducts, 8);
  
    // Display the random meat & seafood products with a custom tagline
    displayProducts(randomMeatSeafood, 'Fresh Cuts');
  }
  

// Helper function to get random items
function getRandomItems(items, count = 8) {
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Universal function to display products
function displayProducts(productList, taglineText) {
    const itemsContainer = document.getElementById('randomProductsContainer');
  
    if (itemsContainer) {
      // Clear previous contents
      itemsContainer.innerHTML = '';
  
      // Add products
      productList.forEach(item => {
        const itemBox = document.createElement('div');
        itemBox.classList.add('item-box');
  
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');
  
        // Tagline
        const tagline = document.createElement('div');
        tagline.classList.add('best-sale-tag');
        tagline.textContent = taglineText;
        itemWrapper.appendChild(tagline);
  
        // Item picture
        const itemImage = document.createElement('img');
        itemImage.src = (item.pictures && item.pictures.length > 0) ? item.pictures[0] : 'default-image.jpg';
        itemImage.alt = `${item.brand} image`;
        itemWrapper.appendChild(itemImage);
  
        // Item details
        const itemDetailsCon = document.createElement('div');
        itemDetailsCon.classList.add('item-details-con');
        itemWrapper.appendChild(itemDetailsCon);
  
        // Item name
        const itemName = document.createElement('h3');
        itemName.textContent = `${item.brand}`;
        itemDetailsCon.appendChild(itemName);
  
        // Item price container
        const itemPriceContainer = document.createElement('div');
        itemPriceContainer.classList.add('item-price-container');
  
        // Item price (Assuming price is already formatted before being passed in)
        const itemPrice = document.createElement('p');
        itemPrice.textContent = item.price.toLocaleString();  // Do not add Naira sign here if it's already formatted
        itemPriceContainer.appendChild(itemPrice);
  
        // + Button
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.classList.add('add-button');
        addButton.setAttribute('data-id', item.id);       // Set data-id
        addButton.setAttribute('data-name', item.brand);   // Set data-name
        addButton.setAttribute('data-price', item.price);  // Set data-price
        itemPriceContainer.appendChild(addButton);
  
        // Append price container to wrapper
        itemWrapper.appendChild(itemPriceContainer);
  
        // Append wrapper to item box
        itemBox.appendChild(itemWrapper);
  
        // Append item box to container
        itemsContainer.appendChild(itemBox);
      });
  
      // Attach event listener for add-to-cart functionality using event delegation
      if (!itemsContainer.hasAttribute('data-listener')) {
        itemsContainer.addEventListener('click', function(event) {
          if (event.target && event.target.classList.contains('add-button')) {
            const button = event.target;
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            let productPrice = button.getAttribute('data-price');
  
            // Ensure productPrice does not have duplicate currency symbols
            if (typeof productPrice === 'string' && productPrice.includes('₦')) {
              productPrice = productPrice.replace(/₦/g, '').trim();
            }
  
            addToCart(productId, productName, `₦${productPrice}`, 1); // Default quantity is 1
          }
        });
  
        // Mark the listener as attached
        itemsContainer.setAttribute('data-listener', 'true');
      }
    } else {
      console.error('Container with id="randomProductsContainer" not found.');
    }
}

  function displayRandomHighestPriceProducts() {
    // Retrieve products from sessionStorage
    const products = JSON.parse(sessionStorage.getItem('products')) || [];

    // Check if there are products available
    if (products.length === 0) {
        console.warn('No products found in sessionStorage.');
        return;
    }

    const parsePrice = (price) => price.replace('₦', '').trim();

    // Filter out products with prices less than ₦2000
    const filteredProducts = products.filter(product => parsePrice(product.price) >= 2000);

    // Check if there are any valid products left after filtering
    if (filteredProducts.length < 4) {
        console.warn('Not enough products with prices above ₦2000 to display.');
        return;
    }

    // Sort products by price in descending order
    const sortedProducts = filteredProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    // Shuffle the sorted list to get random products
    const shuffledProducts = sortedProducts.sort(() => 0.5 - Math.random());

    // Get 4 random products from the shuffled list
    const highestPriceProducts = shuffledProducts.slice(0, 4);

    // Get the container where the products will be displayed
    const productContainer = document.getElementById('bestSellingProductsLeftCon');

    // Check if the container exists
    if (productContainer) {
        // Clear any existing content in the container
        productContainer.innerHTML = '';

        // Loop through the highest price products to display
        highestPriceProducts.forEach(product => {
            // Create a product card
            const productCard = document.createElement('div');
            productCard.classList.add('best-selling-product-card');

            // Add the Best Sale tagline badge
            const taglineBadge = document.createElement('div');
            taglineBadge.textContent = 'Mega Sale';
            taglineBadge.classList.add('best-sale-badge');
            productCard.appendChild(taglineBadge);

            // Product picture
            const productImage = document.createElement('img');
            productImage.src = product.pictures[0] || 'default-image.jpg';  // Fallback image
            productImage.alt = `${product.brand} image`;
            productCard.appendChild(productImage);

            // Product details container
            const productDetailsCon = document.createElement('div');
            productDetailsCon.classList.add('best-selling-product-details-con');
            productCard.appendChild(productDetailsCon);

            // Product name (Brand)
            const productName = document.createElement('h3');
            productName.textContent = `${product.brand}`;
            productDetailsCon.appendChild(productName);

            // Create price and + button container
            const priceButtonContainer = document.createElement('div');
            priceButtonContainer.classList.add('price-button-container');

            // Product price
            const productPrice = document.createElement('p');
            productPrice.textContent = `${product.price}`;
            priceButtonContainer.appendChild(productPrice);

            // + Button (Add to cart button)
            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.classList.add('add-button');
            addButton.setAttribute('data-id', product.id);        // Set data-id
            addButton.setAttribute('data-name', product.brand);    // Set data-name
            addButton.setAttribute('data-price', product.price);   // Set data-price
            priceButtonContainer.appendChild(addButton);

            // Append the price and button container to the product details container
            productDetailsCon.appendChild(priceButtonContainer);

            // Append the product card to the container
            productContainer.appendChild(productCard);
        });
    } else {
        console.error('Product container (id="bestSellingProductsLeftCon") not found.');
    }
}

displayRandomHighestPriceProducts();    

// FAQ functionality
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});


// // Function to create and show a dynamic modal with a message
// function showCustomModal(message) {
//     // Check if modal already exists
//     let modal = document.getElementById('dynamic-custom-modal');
//     if (!modal) {
//         // Create the modal if it doesn't exist
//         modal = document.createElement('div');
//         modal.id = 'dynamic-custom-modal';
//         modal.classList.add('custom-modal');

//         // Create modal content container
//         const modalContent = document.createElement('div');
//         modalContent.classList.add('custom-modal-content');

//         // Create the close button
//         const closeBtn = document.createElement('span');
//         closeBtn.classList.add('close-btn');
//         closeBtn.innerHTML = '&times;';

//         // Create the modal message paragraph
//         const modalMessage = document.createElement('p');
//         modalMessage.id = 'custom-modal-message';

//         // Append close button and message to modal content
//         modalContent.appendChild(closeBtn);
//         modalContent.appendChild(modalMessage);

//         // Append modal content to modal
//         modal.appendChild(modalContent);

//         // Append modal to body
//         document.body.appendChild(modal);

//         // Add close functionality to close button
//         closeBtn.onclick = function () {
//             modal.style.display = 'none';
//         };

//         // Close the modal if the user clicks outside of it
//         window.onclick = function (event) {
//             if (event.target === modal) {
//                 modal.style.display = 'none';
//             }
//         };
//     }

//     // Set the modal message and display it
//     const modalMessage = document.getElementById('custom-modal-message');
//     modalMessage.textContent = message;
//     modal.style.display = 'block';
// }

// Function to show the modal
function showModal(message) {
    const modal = document.getElementById("productAddedModal");
    const modalContent = modal.querySelector(".product-added-modal-content p");
    modalContent.textContent = message;
    modal.style.display = "block";

    // Close the modal when the "Close" button is clicked
    const closeModalBtn = document.getElementById("closeModalBtn");
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Automatically hide the modal after 3 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000); // Adjust the time (in milliseconds) as needed (3000ms = 3 seconds)
}

// Function to update the cart item count in the UI
function updateCartItemCount(cartData) {
    const totalItems = cartData.reduce((total, item) => total + item.quantity, 0);
    const cartItemCountElement = document.getElementById("zero");

    if (cartItemCountElement) {
        cartItemCountElement.textContent = totalItems;
    }
}

// Function to add product to cart
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
                quantity: quantity,
                picture: product.pictures && product.pictures.length > 0 ? product.pictures[0] : 'default-image.jpg' // Add product picture
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


// Toggle loading indicator
function toggleLoading(isLoading) {
    const loadingIndicator = document.getElementById("loading");
    console.log(`Loader toggled: ${isLoading ? "ON" : "OFF"}`);
    if (loadingIndicator) {
        loadingIndicator.style.display = isLoading ? "flex" : "none";
    } else {
        console.error("Loading indicator element not found.");
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

// // Add event listeners for the cart buttons (if necessary)
// function attachCartButtonsWithFlyEffect() {
//     document.querySelectorAll('.add-to-cart-btn, .add-button').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const productId = button.getAttribute('data-id');
//             const productName = button.getAttribute('data-name');
//             const productPrice = button.getAttribute('data-price');

//             // Add product to cart
//             addToCart(productId, productName, productPrice, 1);
//         });
//     });
// }

// // Ensure the buttons are attached when the page loads
// document.addEventListener('DOMContentLoaded', attachCartButtonsWithFlyEffect);


// // Function to clear the cart after checkout
// async function clearCartAfterCheckout() {
//     const user = auth.currentUser;

//     if (!user) {
//         console.log("User is not logged in.");
//         return;
//     }

//     const cartRef = doc(db, "carts", user.uid);

//     try {
//         await deleteDoc(cartRef);
//         localStorage.removeItem("cart");
//         updateCartItemCount([]);
//         console.log("Cart cleared after checkout.");
//     } catch (error) {
//         console.error("Error clearing cart after checkout:", error);
//     }
// }

// Load the cart from Firestore or localStorage on page load
window.addEventListener('load', loadCart);




  
// Attach   to buttons with '+' as text content
function attachCartButtons() {
    const buttons = document.querySelectorAll('.add-button');

    buttons.forEach(button => {
        if (button.textContent.trim() === '+') {
            // Ensure all necessary attributes are present
            const parentCard = button.closest('.limited-product-card');
            if (parentCard) {
                const productId = parentCard.getAttribute('data-id');
                const productName = parentCard.getAttribute('data-name');
                const productPrice = parentCard.getAttribute('data-price');
                button.setAttribute('data-id', productId);
                button.setAttribute('data-name', productName);
                button.setAttribute('data-price', productPrice);
            }

            // Add event listener only once
            button.removeEventListener('click', addToCartHandler); // Remove any existing listeners
            button.addEventListener('click', addToCartHandler);
        }
    });
}

// Add-to-cart button handler with loading
function addToCartHandler(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price').replace(/[^0-9.]/g, ''));
    const quantity = 1;

    if (productId && productName && !isNaN(productPrice)) {
        toggleLoading(true); // Show the loading indicator
        addToCart(productId, productName, `₦${productPrice}`, quantity);
    } else {
        console.error('Error adding to cart. Missing product details or invalid price.');
    }
}

function moveSearchToMobile() {
    const headerSearchCon = document.getElementById("headerSearchCon");
    const mobileSearchInputCon = document.getElementById("mobileSearchInputCon");
  
    if (window.innerWidth <= 920) {
      if (mobileSearchInputCon && headerSearchCon && !mobileSearchInputCon.contains(headerSearchCon)) {
        mobileSearchInputCon.appendChild(headerSearchCon);
      }
    } else {
      // Optionally move it back to its original position if needed
      const originalParent = document.getElementById("originalParentId"); // Replace with the original parent's ID
      if (originalParent && headerSearchCon && !originalParent.contains(headerSearchCon)) {
        originalParent.appendChild(headerSearchCon);
      }
    }
  }
  
  // Listen for window resize events
  window.addEventListener("resize", moveSearchToMobile);
  
  // Call on page load to handle initial state
  document.addEventListener("DOMContentLoaded", moveSearchToMobile);  

// Hamburger menu and navigation container
const hamburgerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('headerNavigationCon');

// Toggle the menu when hamburger is clicked
hamburgerMenu.addEventListener('click', (e) => {
  e.stopPropagation();  // Prevent the click from bubbling up to the document
  menu.classList.toggle('menu-active'); // Show or hide the menu
  hamburgerMenu.classList.toggle('hamburger-active'); // Optional, add some active style to hamburger
});

// Close the menu when clicking outside of the hamburger or menu
document.addEventListener('click', (e) => {
  if (!hamburgerMenu.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('menu-active'); // Close the menu
    hamburgerMenu.classList.remove('hamburger-active'); // Optional, reset hamburger icon
  }
});



// function handleClick(event) {
//   const button = event.target;
//   const productId = button.getAttribute('data-id');
//   const productName = button.getAttribute('data-name');
//   const productPriceAttr = button.getAttribute('data-price');

//   // Ensure productPriceAttr exists before trying to parse it
//   if (!productPriceAttr) {
//     console.error('Missing data-price attribute on button:', button);
//     return;
//   }

//   const productPrice = parseFloat(productPriceAttr.replace(/[^0-9.]/g, ''));
//   const quantityInput = button.closest('.quantity-add-cart-container')?.querySelector('.quantity-input');
//   const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

//   if (productId && productName && !isNaN(productPrice)) {
//     addToCart(productId, productName, productPrice, quantity);
//   } else {
//     console.error('Missing product details on button:', button);
//     console.error('Ensure your button has data-id, data-name, and data-price attributes.');
//   }
// }

  

// Ensure cart buttons are attached when products are loaded
// document.addEventListener('DOMContentLoaded', attachCartButtons);


// api key
// 782373725154486

// api secret 
// 4gD3zr00kcNM4v_pqxpbvMdW7D4