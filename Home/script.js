import button from "../components/button.js";
import { getItems } from "../apiCalls/products.js";

// DOM elements
const heroSectionBtnCon = document.getElementById('heroSectionBtnCon');
const locationParagraph = document.querySelector(".locationAbuDhabi");

// Adding "Shop Now" button to the hero section
heroSectionBtnCon.appendChild(button("Shop Now", 'darkorange', 'white', 'yes'));

// Fetching products securely and logging them to the console
getItems()
    .then(products => {
        if (Array.isArray(products)) {
            console.log(products); // Log the products
        } else {
            console.error("Unexpected response format.");
        }
    })
    .catch(error => {
        console.error("Error fetching products:", error.message);
    });

// Retrieve the logged-in user's information
const loggedInUser = () => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            if (user && typeof user.firstName === "string") {
                return user; // Return valid user object
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
    console.log('User details:', user.firstName); // Log user's first name
} else {
    console.log('No user logged in');
}

// Safely update the delivery location in the UI
function updateDeliveryLocation(location) {
    if (location && typeof location === "string") {
        // Sanitize location text to prevent XSS
        const sanitizedLocation = location.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        locationParagraph.textContent = sanitizedLocation;
    } else {
        console.error("Invalid location data.");
    }
}

// Get the user's current location using Geolocation API
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
                enableHighAccuracy: true, // Improve accuracy
                timeout: 10000,          // Timeout for location retrieval
                maximumAge: 300000       // Cache location for 5 minutes
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        updateDeliveryLocation("Location not available");
    }
}

// Fetch the country name securely using Geolocation DB API
async function fetchCountryFromCoordinates(latitude, longitude) {
    const apiUrl = `https://geolocation-db.com/json/`; // Secure and free API

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

// Detect user's location on page load
document.addEventListener("DOMContentLoaded", detectUserLocation);


// Profile
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("ProfileBtn");

// Get the <span> element that closes the modal
const closeBtn = document.getElementById("closeBtn");

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

  // Get the profile button, file input, and image element
  const profileBtn = document.getElementById('profileBtn');
  const fileInput = document.getElementById('fileInput');
  const profilePic = document.getElementById('profilePic');

  // Trigger the file input when the profile button is clicked
  profileBtn.onclick = function() {
      fileInput.click();  // This will open the file explorer
  };

  // When the user selects a file, update the profile picture
  fileInput.onchange = function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();

          // When the file is loaded, set the profile image source
          reader.onload = function(e) {
              profilePic.src = e.target.result;
          };

          // Read the file as a data URL
          reader.readAsDataURL(file);
      }
  };