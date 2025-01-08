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
// const percentBtn = document.getElementById('percentBtn');
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

// Adding the percent button
// import percentbutton from "../components/percentage.js";
// percentBtn.appendChild(percentbutton('15% OFF', 'darkorange', '#fff'));

// Fetching products securely and logging them to the console
import { getAllProducts } from "../utils/products.js";

let allProducts = [];



// Function to fetch and display the products with quantity less than 50
function displayLowStockProducts() {
    // Retrieve products from sessionStorage
    const products = JSON.parse(sessionStorage.getItem('products')) || [];

    // Filter products with quantity less than 50
    const lowStockProducts = products.filter(product => product.quantity < 50);

    // Sort the lowStockProducts if needed (optional)
    lowStockProducts.sort((a, b) => a.quantity - b.quantity);  // Sorting by quantity in ascending order

    // Take the first 4 products if available
    const productsToDisplay = lowStockProducts.slice(0, 4);

    // Get the container where the products will be displayed
    const productContainer = document.getElementById('lowStockProductsContainer');

    // Check if the container exists
    if (productContainer) {
        // Clear any existing content in the container
        productContainer.innerHTML = '';

        // Loop through the products to display
        productsToDisplay.forEach(product => {
            // Create a product card
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Product picture
            const productImage = document.createElement('img');
            productImage.src = product.pictures[0] || 'default-image.jpg';  // Fallback image
            productCard.appendChild(productImage);

            // Product name (Brand and Product Name)
            const productName = document.createElement('h3');
            productName.textContent = `${product.brand} ${product.name}`;
            productCard.appendChild(productName);

            // Product price
            const productPrice = document.createElement('p');
            productPrice.textContent = `${product.price.toLocaleString()}`;
            productCard.appendChild(productPrice);

            // Product rating
            const productRating = document.createElement('p');
            productRating.textContent = `${product.rating} stars`;
            productCard.appendChild(productRating);

            // Product quantity
            const productQuantity = document.createElement('p');
            productQuantity.textContent = `Available only: ${product.quantity}pcs`;
            productCard.appendChild(productQuantity);

            // Append the product card to the container
            productContainer.appendChild(productCard);
        });
    } else {
        console.error('Product container (id="lowStockProductsContainer") not found.');
    }
}

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
    if (recentSearches.length > 10) {
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
    const matchingProducts = products.filter(product => product.name.toLowerCase().startsWith(searchQuery));

    if (matchingProducts.length > 0) {
        productList.style.display = 'block';

        matchingProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('search-result-item');
            productItem.textContent = product.name;
            productList.appendChild(productItem);

            // Handle product selection
            productItem.addEventListener('click', () => {
                alert(`You selected: ${product.name}`);

                // Save the selected product to recent searches
                saveRecentSearch(product.name);

                // Hide the dropdown and update recent searches
                productList.style.display = 'none';
                displayRecentSearches();
            });
        });
    } else {
        productList.style.display = 'none';
    }
}

// Input event listener for search input
// const searchInput = document.getElementById('searchInput');

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


// Hide productList when clicking outside or when searchInput is empty
document.addEventListener('click', (event) => {
    const productList = document.getElementById('productList');
    if (!searchInput.contains(event.target) && !productList.contains(event.target)) {
        productList.style.display = 'none';
    }
});

searchInput.addEventListener('blur', () => {
    const productList = document.getElementById('productList');
    if (searchInput.value.trim() === '') {
        productList.style.display = 'none';
    }
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
    }, 100);
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

// FAQ functionality
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});
