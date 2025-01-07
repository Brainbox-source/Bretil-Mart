// DOM Elements
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
            productImage.src = product.pictures[0]; // Assuming the first image is the main one
            // productImage.alt = product.productName;
            productCard.appendChild(productImage);

            // Product name (Brand and Product Name)
            const productName = document.createElement('h3');
            productName.textContent = `${product.brand}`;
            productCard.appendChild(productName);

            // Product price
            const productPrice = document.createElement('p');
            productPrice.textContent = `${product.price}`;
            productCard.appendChild(productPrice);

            // Product rating
            const productRating = document.createElement('p');
            productRating.textContent = `${product.rating} stars`;
            productCard.appendChild(productRating);

            // Product quantity
            const productQuantity = document.createElement('p');
            productQuantity.textContent = `Available only: ${product.quantity}pc`;
            productCard.appendChild(productQuantity);

            // Append the product card to the container
            productContainer.appendChild(productCard);
        });
    } else {
        console.error('Product container (id="lowStockProductsContainer") not found.');
    }
}

getAllProducts()
    .then(products => {
        // Ensure the response is an array
        if (Array.isArray(products)) {
            // Store the products in session storage
            sessionStorage.setItem('products', JSON.stringify(products));
            console.log("Products fetched successfully:", products);

            // Retrieve from session storage
            const result = sessionStorage.getItem('products');
            allProducts = JSON.parse(result);

            console.log("Products retrieved from session storage:", allProducts);

            // Display the low stock products
            displayLowStockProducts();
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
searchInput.addEventListener('input', () => {
    const productList = document.getElementById('productList');
    const searchQuery = searchInput.value.toLowerCase();
    console.log(productList.value);

    // Retrieve products from sessionStorage
    const storedProducts = sessionStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    // Clear previous search results
    productList.innerHTML = '';

    // Filter products based on the search query
    const matchingProducts = products.filter(product => product.name.toLowerCase().startsWith(searchQuery));

    if (matchingProducts.length > 0 && searchQuery !== '') {
        // Display matching products
        productList.style.display = 'block';

        matchingProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('search-result-item');
            productItem.textContent = product.name;
            productList.appendChild(productItem);

            // Optional: Add click event to handle product selection
            productItem.addEventListener('click', () => {
                alert(`You selected: ${product.name}`);
                productList.style.display = 'none'; // Hide dropdown after selection
            });
        });
    } else {
        productList.style.display = 'none';
    }
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
        headerLogoAndLocationCon.style.display = 'none';
        headerCartandProfileCon.style.display = 'none';
    }, 100);
});

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    const productDropDownCon = document.getElementById('productDropDownCon');
    
    // If the clicked element is not the search input or inside the dropdown, hide it
    if (!searchInput.contains(event.target) && !productDropDownCon.contains(event.target)) {
        productDropDownCon.style.display = 'none';
    }
});


// FAQ functionality
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});
