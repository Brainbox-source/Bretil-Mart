import { database, ref, onValue } from '../firebaseConfig.js';

// Initialize Leaflet.js Map
const map = L.map('map').setView([6.5244, 3.3792], 13); // Set initial view to Lagos, Nigeria

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Custom Driver Icon
const driverIcon = L.icon({
  iconUrl: '../img/locationTruck.svg', // Replace with your custom driver icon
  iconSize: [32, 32], // Icon size
});

// Add Driver Marker at Lagos, Nigeria
const driverMarker = L.marker([6.5244, 3.3792], { icon: driverIcon }) // Starting point in Lagos, Nigeria
  .addTo(map)
  .bindPopup('Driver Location');

// Set a tooltip for the driver marker that will display dynamic messages
const driverTooltip = L.tooltip({ permanent: true, direction: 'top' }).setContent('Delivery Approaching');
driverMarker.bindTooltip(driverTooltip);

// Track Order Updates in Realtime from Firebase
const orderId = "YOUR_ORDER_ID"; // Replace with the specific order ID
const locationRef = ref(database, `orders/${orderId}/location`);

onValue(locationRef, (snapshot) => {
  const location = snapshot.val();
  if (location) {
    // Update the driver location based on Firebase data
    driverMarker.setLatLng([location.lat, location.lng]);
    map.flyTo([location.lat, location.lng], 13, {
      animate: true,  // Smooth transition
      duration: 1     // Duration of transition (1 second)
    });
  }
});

// Function to get the delivery address from sessionStorage
function getDeliveryAddress() {
  const address = sessionStorage.getItem('deliveryAddress');
  if (!address) {
    console.error('Delivery address not found in sessionStorage.');
    return null;
  }
  return address;
}

// Function to geocode the delivery address (using OpenStreetMap Nominatim API)
async function geocodeAddress(address) {
  const geocodeApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
  const response = await fetch(geocodeApiUrl);
  const data = await response.json();
  if (data.length > 0) {
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    return { lat, lon };
  }
  console.error("Address not found or geocoding failed.");
  return null;
}

// Function to add a destination marker based on the delivery address
async function setDestination() {
  const address = getDeliveryAddress();
  if (address) {
    const { lat, lon } = await geocodeAddress(address);
    if (lat && lon) {
      // Add a destination marker
      const destinationMarker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup('Delivery Destination');
      
      map.flyTo([lat, lon], 13, {
        animate: true,  // Smooth transition
        duration: 1     // Duration of transition (1 second)
      });

      // Simulate driver moving to destination
      moveDriverToAddress(lat, lon);
    }
  }
}

function moveDriverToAddress(destinationLat, destinationLon) {
    const startLat = driverMarker.getLatLng().lat;
    const startLon = driverMarker.getLatLng().lng;
  
    const steps = 30; // Number of steps for 30 seconds of animation
    let stepCount = 0;
  
    const interval = setInterval(() => {
      stepCount++;
      const lat = startLat + (destinationLat - startLat) * (stepCount / steps);
      const lon = startLon + (destinationLon - startLon) * (stepCount / steps);
  
      driverMarker.setLatLng([lat, lon]); // Move driver marker
      map.setView([lat, lon], 13); // Re-center map
  
      // Update the tooltip message during movement
      if (stepCount <= steps / 2) {
        driverTooltip.setContent('Delivery Approaching');
      } else {
        driverTooltip.setContent('Delivery Approaching');
      }
  
      // End the animation and show final message when the driver reaches the destination
      if (stepCount >= steps) {
        driverTooltip.setContent('Delivery Delivered');  // Display "Delivery Delivered" when the marker reaches the destination
        clearInterval(interval); // Stop animation
  
        // Set a timeout to redirect after 10 seconds
        setTimeout(() => {
          window.location.href = "../cartFolder/cart.html"; // Redirect after 10 seconds
        }, 3000); // 3 seconds delay
      }
    }, 1000); // Update every 1 second
  }
  
  

// Wait for 1 minute before starting the process of setting the delivery address
setTimeout(async () => {
  await setDestination();
}, 1500); // 1 and half minute delay before getting the delivery address and starting the process
