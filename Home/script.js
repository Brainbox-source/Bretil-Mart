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

// Adding "Shop Now" button to the hero section
import button from "../components/button.js";
heroSectionBtnCon.appendChild(button("Shop Now", 'darkorange', 'white', 'yes'));

// Fetching products securely and logging them to the console
import { getItems } from "../apiCalls/products.js";
getItems()
    .then(products => {
        if (Array.isArray(products)) {
            console.log(products); // Log products
        } else {
            console.error("Unexpected response format.");
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
profileBtn.addEventListener("click", () => {
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
    if (event.target === modal) {
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
