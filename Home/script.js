// DOM Elements
const heroSectionBtnCon = document.getElementById('heroSectionBtnCon');
const locationParagraph = document.querySelector(".locationAbuDhabi");
const modal = document.getElementById("myModal");
const profileBtn = document.getElementById("ProfileBtn");
const closeBtn = document.getElementById("closeBtn");
const changeProfileBtn = document.getElementById("changeProfileBtn");
const fileInput = document.getElementById("fileInput");
const profilePic = document.getElementById("profilePic");
const emailElement = document.getElementById("getEmail");
const nameElement = document.getElementById("userName");
const searchInput = document.getElementById('searchInput');
console.log(searchInput)


// Adding "Shop Now" button to the hero section
import button from "../components/button.js";
heroSectionBtnCon.appendChild(button("Shop Now", 'darkorange', 'white', 'yes'));

// Fetching products securely and logging them to the console
import { getAllProducts } from "../utils/products.js";


let allProducts = [];

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
                updateDeliveryLocation("Location not available");
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


//product search functionality

searchInput.addEventListener('input', () => {
    const searchContainer = document.createElement('div');
    const productList = document.getElementById('productList');
    productList.style.position = 'relative';


    if(searchInput.value.length > 0){
        productList.style.display = 'block';
        searchContainer.classList.add('searchContainer');
        searchContainer.style.position ='absolute'
        searchContainer.innerHTML = `<p> testing search functionality </p>`
        productList.appendChild(searchContainer);

    }else{
        productList.style.display = 'none';
    };
});

// 
searchInput.addEventListener('click', () => {
    const productDropDownCon = document.getElementById('productDropDownCon');

    setTimeout(() => {
        productDropDownCon.style.display = 'block';
    }, 300);
})