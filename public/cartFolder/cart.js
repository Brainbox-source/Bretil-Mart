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
const profileImg = document.getElementById("profileImg");
const uploadStatus = document.getElementById('upload-status');
const emailElement = document.getElementById("getEmail");
const nameElement = document.getElementById("userName");
const searchInput = document.getElementById('searchInput');
console.log(searchInput);

import { db, doc, getDoc, setDoc, arrayUnion, updateDoc, deleteDoc, onAuthStateChanged } from '../firebaseConfig.js';

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
                window.location.href = "../../index.html"; // Update this path based on your project structure
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
// Fetch and display the user's profile picture
const fetchAndDisplayProfilePic = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId); // Firestore document reference
        const userDoc = await getDoc(userRef); // Fetch the user's document

        if (userDoc.exists() && userDoc.data().profilePic) {
            const profilePictureUrl = userDoc.data().profilePic;

            // Update both profile image elements with the URL
            profileImg.src = profilePictureUrl;
            profilePic.src = profilePictureUrl;
        } else {
            // No profile picture in Firestore, fallback to default
            profileImg.src = '../img/profile.svg';
            profilePic.src = '../img/profile.svg';
        }
    } catch (error) {
        console.error('Error fetching profile picture from Firestore:', error);
    }
};

// Clear profile picture from UI on sign-out
// const handleSignOut = async () => {
//     profileImg.src = '../img/profile.svg'; // Reset to default
//     profilePic.src = '../img/profile.svg'; // Reset to default

//     await signOut(auth); // Sign out the user
// };

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Fetch and display the user's profile picture when signed in
        fetchAndDisplayProfilePic(user.uid);
    } else {
        // Reset profile picture to default when signed out
        profileImg.src = '../img/profile.svg';
        profilePic.src = '../img/profile.svg';
    }
});

// Event Listener to open file picker
changeProfileBtn.addEventListener('click', () => {
    fileInput.click(); // Trigger the hidden file input
});

// Handle file input change
fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0]; // Get the selected file

    if (file) {
        uploadStatus.textContent = 'Uploading...'; // Show status

        // Prepare FormData for the upload
        const formData = new FormData();
        formData.append('images[]', file);

        try {
            // Send the image to the backend for upload
            const response = await fetch('https://bretil-mart-server.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json(); // Parse the backend response
            if (data.urls && data.urls[0]) {
                const profilePictureUrl = data.urls[0]; // Extract uploaded picture URL

                // Update both profile image elements in the UI
                profileImg.src = profilePictureUrl;
                profilePic.src = profilePictureUrl;

                // Save the URL to Firestore under the current user's document
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    await setDoc(userRef, { profilePic: profilePictureUrl }, { merge: true });
                
                    // Update status immediately
                    uploadStatus.textContent = 'Update successful';
                
                    // Clear the status after 3 seconds
                    setTimeout(() => {
                        uploadStatus.textContent = ''; // Clear the message
                    }, 3000);
                } else {
                    uploadStatus.textContent = 'No authenticated user found.';
                }                
            } else {
                uploadStatus.textContent = 'Failed to upload profile picture.';
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            uploadStatus.textContent = 'Error uploading profile picture.';
        }
    } else {
        uploadStatus.textContent = 'No file selected.';
    }

    // Reset file input to allow re-selection of the same file
    fileInput.value = '';
});

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
                sessionStorage.setItem('singleProduct', JSON.stringify(product));
                window.location.href = '../PRODUCT/product.html'
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

// Optimized Function to check if the cart is empty
async function checkCartStatus() {
    const cartContainer = document.getElementById("cart-container");
    const deliveryPaymentAndOrderCon = document.getElementById("deliveryPaymentAndOrderCon");

    // Get the cart data from localStorage
    const localCartData = localStorage.getItem("cart");
    const hasLocalCartItems = localCartData && JSON.parse(localCartData).length > 0;

    // Check Firestore cart data
    let hasFirestoreCartItems = false;

    const user = auth.currentUser;
    if (user) {
        const cartRef = doc(db, "carts", user.uid);

        try {
            const cartDoc = await getDoc(cartRef);
            if (cartDoc.exists()) {
                const firestoreCartData = cartDoc.data().items;
                hasFirestoreCartItems = firestoreCartData && firestoreCartData.length > 0;

                // Sync Firestore cart with localStorage
                localStorage.setItem("cart", JSON.stringify(firestoreCartData));
                updateCartItemCount(firestoreCartData);

                console.log("Cart synced from Firestore.");
            } else {
                console.log("No cart found in Firestore. Clearing localStorage...");
                localStorage.removeItem("cart");
                updateCartItemCount([]);
            }
        } catch (error) {
            console.error("Error checking Firestore cart:", error);
        }
    }

    // Determine the final cart status based on localStorage or Firestore
    const hasCartItems = hasLocalCartItems || hasFirestoreCartItems;

    if (cartContainer) {
        cartContainer.style.display = hasCartItems ? "none" : "block";
    }

    if (deliveryPaymentAndOrderCon) {
        deliveryPaymentAndOrderCon.style.display = hasCartItems ? "flex" : "none";
    }
}

// Call checkCartStatus initially to set the correct state on page load
checkCartStatus();

// Setup Firestore sync to poll every 10 seconds
setupCartSyncPoll();

// Function to enable and style textarea when edit is clicked
function enableAddressEdit() {
    const addressInput = document.getElementById("address");
    const editButton = document.getElementById("edit");

    if (!addressInput || !editButton) {
        console.error("Address input or edit button not found.");
        return;
    }

    // Initially disable textarea and hide border
    addressInput.disabled = true;
    addressInput.style.border = "none";
    addressInput.style.outline = "none";
    addressInput.style.backgroundColor = "#fff"; // Light gray background to indicate disabled
    addressInput.style.color = "#003a00"; 
    // addressInput.style.border = "1px solid gainsboro"; 
    addressInput.style.fontSize = "1.2em"; 
    addressInput.style.resize = "none"; // Disable resizing
    addressInput.style.width = "500px"; // Set default width
    addressInput.style.height = "40px"; // Set default height
    addressInput.style.placeContent = "center";

    // Add click event listener to enable editing
    editButton.addEventListener("click", () => {
        addressInput.disabled = false;
        // addressInput.style.border = "1"; // Show border when enabled
        addressInput.style.backgroundColor = "#fff"; // Change background to white
        addressInput.focus(); // Automatically focus on the textarea

        // Add click-away event
        document.addEventListener("click", function handleClickAway(event) {
            if (!addressInput.contains(event.target) && event.target !== editButton) {
                addressInput.disabled = true;
                addressInput.style.border = "none";
                // addressInput.style.backgroundColor = "#f9f9f9"; // Revert background to indicate disabled
                document.removeEventListener("click", handleClickAway); // Remove the event listener after execution
            }
        });
    });
}

enableAddressEdit();

// function getDeliveryAddress() {
//     const addressInput = document.getElementById("address");
//     if (!addressInput) {
//         console.error("Address input element not found.");
//         return null;
//     }

//     const address = addressInput.value.trim();
//     if (!address) {
//         alert("Please enter your delivery address.");
//         return null;
//     }

//     return address;
// }

// Function to fetch and display products in the cart
function displayCartProducts() {
    const productDetailsCon = document.getElementById("productDetailsCon");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const deliveryFee = 500; // Default delivery fee

    // Ensure the container exists
    if (!productDetailsCon) {
        console.error("Container with id='productDetailsCon' not found.");
        return;
    }

    // Get cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear the container before adding products
    productDetailsCon.innerHTML = "";

    // If no products are in the cart, do not display anything
    if (cartData.length === 0) {
        productDetailsCon.style.display = "none";
        if (subtotalElement) subtotalElement.textContent = "₦0.00";
        if (totalElement) totalElement.textContent = `₦${deliveryFee.toLocaleString()}.00`;
        return;
    }

    // Ensure the container is visible
    productDetailsCon.style.display = "grid";

    let subtotal = 0;

    // Loop through the cart data and display each product
    cartData.forEach(product => {
        // Create a product card
        const productCard = document.createElement("div");
        productCard.classList.add("product-cart-card");

        // Add product image
        const productImage = document.createElement("img");
        productImage.src = product.picture || "default-image.jpg"; // Use default image if none exists
        productImage.alt = product.name;
        productImage.classList.add("product-image");
        productCard.appendChild(productImage);

        // Add product details container
        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        // Add product brand/name
        const productName = document.createElement("h3");
        productName.textContent = product.name;
        productDetails.appendChild(productName);

        // Add product price and quantity controls
        const priceQuantityContainer = document.createElement("div");
        priceQuantityContainer.classList.add("price-quantity-container");

        const productPrice = document.createElement("p");
        productPrice.textContent = product.price;
        productPrice.classList.add("product-price");

        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("quantity-btn");
        minusButton.addEventListener("click", () => updateQuantity(product.id, -1));

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = product.quantity;
        quantityInput.min = 1;
        quantityInput.readOnly = true;
        quantityInput.classList.add("quantity-input");

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("quantity-btn");
        plusButton.addEventListener("click", () => updateQuantity(product.id, 1));

        quantityContainer.appendChild(minusButton);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(plusButton);

        priceQuantityContainer.appendChild(productPrice);
        priceQuantityContainer.appendChild(quantityContainer);
        productDetails.appendChild(priceQuantityContainer);

        // Append details to the product card
        productCard.appendChild(productDetails);

        // Append product card to the container
        productDetailsCon.appendChild(productCard);

        // Calculate subtotal
        const productPriceValue = parseFloat(product.price.replace(/[^0-9.]/g, ""));
        subtotal += productPriceValue * product.quantity;
    });

    // Update the subtotal display
    if (subtotalElement) subtotalElement.textContent = `₦${subtotal.toLocaleString()}.00`;

    // Calculate and update the total display
    const total = subtotal + deliveryFee;
    if (totalElement) totalElement.textContent = `₦${total.toLocaleString()}.00`;
}

// Function to update product quantity
async function updateQuantity(productId, change) {
    toggleLoading(true); // Show loading indicator

    try {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = cartData.findIndex(product => product.id === productId);

        if (productIndex > -1) {
            const product = cartData[productIndex];
            const newQuantity = product.quantity + change;

            if (newQuantity <= 0) {
                // Remove product from cart if quantity is 0 or less
                cartData.splice(productIndex, 1);
                await updateCartAndShowModal(cartData, `${product.name} has been removed from your cart.`);
            } else {
                // Update quantity in the cart
                product.quantity = newQuantity;
                await updateCartAndShowModal(cartData, `Updated ${product.name} quantity to ${newQuantity}.`);
            }

            // Update Firestore if user is logged in
            const user = auth.currentUser;
            if (user) {
                const cartRef = doc(db, "carts", user.uid);
                await setDoc(cartRef, { items: cartData });
            }

            // Refresh the cart display
            displayCartProducts();
            checkCartStatus();
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
    } finally {
        toggleLoading(false); // Hide loading indicator
    }
}

// Function to update the cart and show the modal after loading
async function updateCartAndShowModal(cartData, message) {
    // Simulate some processing delay if needed (optional)
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulates delay

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cartData));

    // Ensure the modal only appears after loader finishes
    toggleLoading(false); // Hide loading indicator
    showModal(message); // Show modal
}

// Function to show a modal with a custom message
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

    // Automatically hide the modal after 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 25000);
}

// Function to toggle loading indicator
function toggleLoading(isLoading) {
    const loadingIndicator = document.getElementById("loading");
    console.log(`Loader toggled: ${isLoading ? "ON" : "OFF"}`);
    if (loadingIndicator) {
        loadingIndicator.style.display = isLoading ? "flex" : "none";
    } else {
        console.error("Loading indicator element not found.");
    }
}

// Call the function to display cart products
displayCartProducts(); // Uncomment to run it immediately

function getDeliveryAddress() {
    const addressInput = document.getElementById("address");
    if (!addressInput) {
        console.error("Address input element not found.");
        return null;
    }

    const address = addressInput.value.trim();
    // if (!address) {
    //     alert("Please enter your delivery address.");
    //     return null;
    // }

    return address;
}

// Function to handle Paystack payment
async function initiatePayment() {
    // Get delivery address before proceeding
    const address = getDeliveryAddress();
    if (!address) {
        showModal("Please provide a delivery address before proceeding.");
        return;
    }

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartData.length === 0) {
        showModal("Your cart is empty. Please add items to proceed.");
        return;
    }

    const deliveryFee = 500; // Default delivery fee
    const subtotal = cartData.reduce((sum, product) => {
        const price = parseFloat(product.price.replace(/[^0-9.]/g, ""));
        return sum + price * product.quantity;
    }, 0);
    const totalAmount = subtotal + deliveryFee;

    // Get logged-in user from sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (!loggedInUser || !loggedInUser.email) {
        alert("You need to be logged in to make a payment.");
        return;
    }

    const userEmail = loggedInUser.email; // Dynamic user email from sessionStorage

    const handler = PaystackPop.setup({
        key: "pk_test_b5aae19a97e711a2ce65cab0f906378951264e57", // Replace with your Paystack public key
        email: userEmail, // Dynamic user email from sessionStorage
        amount: totalAmount * 100, // Paystack requires amount in kobo
        currency: "NGN", // Currency code
        callback: function (response) {
            // Ensure that response is available
            if (response && response.reference) {
                // alert(`Payment successful! Transaction reference: ${response.reference}`);
        
                // Call a separate async function to handle the rest
                handleSuccessfulPayment(response.reference, address, cartData, subtotal, deliveryFee, totalAmount);
            } else {
                showModal("Error: No transaction reference found.");
            }
        },
        onClose: function () {
            showModal("Payment process was closed.");
        },
        error: function () {
            showModal("There was an error processing your payment. Please try again.");
        }
    });

    handler.openIframe(); // Open Paystack payment modal
}

// Separate async function for handling successful payment
async function handleSuccessfulPayment(transactionReference, address, cartData, subtotal, deliveryFee, totalAmount) {
    const transactionData = {
        deliveryAddress: address,
        transactionId: transactionReference,
        items: cartData,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        totalAmount: totalAmount,
        paymentMethod: "Card", // Example payment method
        orderDateTime: new Date().toLocaleString(), // Add formatted Order Date and Time
    };

    try {
        // Generate receipt
        await generateReceipt(transactionData);

        // Update cart and Firestore
        await updateCartAndFirestore(transactionData.items);

        // Save transaction history
        const userUID = auth.currentUser.uid;
        await saveTransactionHistory(userUID, transactionData);

        // Store the delivery address in sessionStorage
        sessionStorage.setItem("deliveryAddress", address);

        // Show confirmation modal
        showModal("Order placed successfully!");

        // Show the 'Track Order' button after successful payment
        document.getElementById("trackBtn").style.display = "block"; // Display the button
        document.getElementById("startShoppingBtn").style.display = "none"; // Display the button

        // Make the redirect function available after successful payment
        window.redirectToTrackOrder = function () {
            window.location.href = "../trackFolder/trackDelivery.html"; // Replace with your tracking page path
        };

    } catch (error) {
        console.error("Error handling payment success:", error);
        alert("An error occurred while processing your order. Please contact support.");
    }
}

// Function to save transaction history to Firestore
async function saveTransactionHistory(userUID, transactionData) {
    try {
        // Reference to the user's transaction history document
        const transactionHistoryRef = doc(db, "transactionHistory", userUID);

        // Create/Update transactionHistory with user's UID
        await updateDoc(transactionHistoryRef, {
            transactions: arrayUnion(transactionData),
        }, { merge: true });

        console.log("Transaction history updated successfully.");
    } catch (error) {
        // console.error("Error saving transaction history:", error);

        // Handle if document does not exist (for the first-time write)
        if (error.code === "not-found") {
            const transactionHistoryRef = doc(db, "transactionHistory", userUID);
            await setDoc(transactionHistoryRef, {
                transactions: [transactionData],
            });
            console.log("Transaction history document created and updated successfully.");
        } else {
            throw new Error("Failed to save transaction history.");
        }
    }
}

async function generateReceipt(transactionData) {
    try {
        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        // Styles
        const titleFontSize = 16;
        const sectionFontSize = 12;
        const normalFontSize = 10;
        const lineHeight = 8;
        const margin = 10;
        const pageWidth = doc.internal.pageSize.getWidth();
        const sectionWidth = pageWidth - margin * 2;

        // Set text color to #003a00 (green)
        doc.setTextColor(0, 58, 0);

        // Header Title
        doc.setFontSize(titleFontSize);
        doc.setFont("helvetica", "bold");
        doc.text("Receipt for Your Bretil Mart Purchase", margin + sectionWidth / 2, 20, { align: "center" });

        // Merchant Info
        doc.setFontSize(sectionFontSize);
        doc.setFont("helvetica", "normal");
        doc.text("Merchant: Bretil Mart", margin, 30);

        // Customer Info
        doc.text(`Customer Address: ${transactionData.deliveryAddress}`, margin, 50);

        // Transaction Info
        doc.text(`Transaction ID: ${transactionData.transactionId}`, margin, 70);
        doc.text(`Order Date: ${new Date().toLocaleString()}`, margin, 80);

        // Items List Header
        doc.setFontSize(sectionFontSize);
        doc.setFont("helvetica", "bold");
        doc.text("Items:", margin, 100);

        // Items List
        let yPosition = 105;
        doc.setFontSize(normalFontSize);
        doc.setFont("helvetica", "normal");

        transactionData.items.forEach(item => {
            doc.text(
                `• ${item.name} (Qty: ${item.quantity}) - ₦${item.price}`,
                margin + 5,
                yPosition
            );
            yPosition += lineHeight;
        });

        // Subtotal, Delivery Fee, and Total
        yPosition += 10;
        doc.setFont("helvetica", "bold");
        doc.text(`Subtotal: ₦${transactionData.subtotal}`, margin, yPosition);
        doc.text(`Delivery Fee: ₦${transactionData.deliveryFee}`, margin, yPosition + lineHeight);

        // Highlight Total Amount
        doc.setFontSize(sectionFontSize + 2);
        doc.text(
            `Total Amount: ₦${transactionData.totalAmount}`,
            margin,
            yPosition + lineHeight * 2
        );

        // Payment Method
        yPosition += lineHeight * 4;
        doc.setFontSize(sectionFontSize);
        doc.setFont("helvetica", "normal");
        doc.text(`Payment Method: ${transactionData.paymentMethod}`, margin, yPosition);

        // Footer - Support Info
        yPosition += lineHeight * 2;
        doc.setFontSize(normalFontSize);
        doc.setFont("helvetica", "italic");
        doc.text("Support Contact: bretilmart@gmail.com", margin, yPosition);
        doc.text("Call: 07037154085", margin, yPosition + lineHeight);

        // Generate Blob URL
        const pdfBlob = doc.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Dynamically create a link for the user
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `bretil_mart_order_receipt_${transactionData.transactionId}.pdf`;
        link.click();

        console.log("Styled receipt generated successfully.");
    } catch (error) {
        console.error("Error generating styled receipt:", error);
        alert("Failed to generate styled receipt. Please try again.");
    }
}

// Function to update cart and Firestore after payment
async function updateCartAndFirestore(cartData) {
    try {
        // Remove purchased items from localStorage
        localStorage.setItem("cart", JSON.stringify([])); // Empty the cart

        // Update Firestore to decrease product quantities
        const user = auth.currentUser;
        if (user) {
            // Loop through cartData to update each product
            for (let product of cartData) {
                const productRef = doc(db, "products", product.id); // Assuming you store products in Firestore with a unique ID
                const productDoc = await getDoc(productRef);
                if (productDoc.exists()) {
                    const currentQuantity = productDoc.data().quantity;
                    const newQuantity = currentQuantity - product.quantity;

                    if (newQuantity < 0) {
                        alert("Insufficient stock for product: " + product.name);
                        continue; // Skip updating this product if stock is insufficient
                    }

                    // Update the product quantity in Firestore
                    await updateDoc(productRef, {
                        quantity: newQuantity
                    });
                }
            }

            // Clear the cart from Firestore (assuming the user's cart is stored under 'carts' collection)
            const userCartRef = doc(db, "carts", user.uid); // Assuming the cart is stored with the user's UID as the document ID
            await deleteDoc(userCartRef); // Delete the user's cart from Firestore

            console.log("Cart cleared from Firestore.");
        }

        // After clearing the cart in Firestore and localStorage, call checkCartStatus to update UI
        checkCartStatus();
    } catch (error) {
        console.error("Error updating cart and Firestore:", error);
    }
}

// Attach payment function to the button
document.getElementById("pay-now").addEventListener("click", initiatePayment);

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

// Select the arrow-left container
const arrowLeftCon = document.querySelector('.arrow-left-con');

// Add click event listener to redirect
if (arrowLeftCon) {
  arrowLeftCon.addEventListener('click', () => {
    window.location.href = '../Home/index.html'; // Redirect to home.html
  });
} else {
  console.error('Arrow left container not found.');
}   