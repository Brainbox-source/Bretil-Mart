// Import Firebase services from the firebase-config.js
import { auth, sendPasswordResetEmail } from '../../firebaseConfig.js';

// Function to handle password reset
async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    setTimeout(() => {
      showMessage('✅ Password reset link sent to ' + email, 'success');
    }, 300)
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    showMessage('Error: ' + errorMessage, 'error');  // Show appropriate error message
  }
}

// Function to show messages on the page
function showMessage(message, type) {
  const messageContainer = document.getElementById('message-container');
  
  // Clear any previous messages
  messageContainer.innerHTML = '';

  // Create a new message element
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  
  // Style based on message type (success or error)
  if (type === 'success') {
    messageElement.style.color = 'darkgreen';
    messageElement.style.fontWeight = 'bold';
  } else if (type === 'error') {
    messageElement.style.color = '#b52e31';
    messageElement.style.fontWeight = 'bold';
  }

  // Append the message to the container
  messageContainer.appendChild(messageElement);
}

// Add event listener for reset password form
document.getElementById('forgot-password-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get the email entered by the user
  const email = document.getElementById('email').value;

  // Validate if email is empty or not a valid format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Show the loading spinner for invalid input
  document.getElementById("loading").style.display = "flex"; // Show loading spinner
  document.querySelector(".resetPasswordBtn").classList.add("loading"); // Disable the reset password button

  // If email is invalid, show error message
  if (!email || !emailPattern.test(email)) {
    setTimeout(() => {
      showMessage('❌ Please enter a valid email address.', 'error');
      
      // Remove the error message after 10 seconds
      setTimeout(() => {
        showMessage('', 'error');  // Clear the error message
      }, 5000);  // 5 seconds delay
    }, 2100);  // 2.1 second delay

    // Hide the loading indicator and re-enable the button after a brief period
    setTimeout(() => {
      document.getElementById("loading").style.display = "none"; // Hide loading spinner
      document.querySelector(".resetPasswordBtn").classList.remove("loading"); // Enable button again
    }, 2000);  // After 2 seconds to show the error message
  } else {
    // If the email is valid, proceed with the password reset process
    setTimeout(async () => {
      await resetPassword(email);
      setTimeout(() => {
        showMessage('✅ Please check your email for a password reset link.', 'success');
      }, 8000); // Delay to display success message for better UX
      
      // Clear the input field after success message
      document.getElementById('email').value = '';  

      // Remove the success message after 20 seconds
      setTimeout(() => {
        showMessage('', 'success');  // Clear the success message
      }, 20000);  // 20 seconds delay

      // Hide the loading indicator after the process is done
        document.getElementById("loading").style.display = "none"; // Hide the loading spinner

      // Re-enable the reset password button after the process
      setTimeout(() => {
        document.querySelector(".resetPasswordBtn").classList.remove("loading"); // Enable button again
      }, 200);  // After 0.2 seconds delay to reset button state

    }, 500);  // 0.5 second delay before starting the reset password process
  }
});

// Get all input elements on the page
const inputs = document.querySelectorAll('input');

// Loop through each input and add event listeners for focus and blur
inputs.forEach(input => {
    // Change border color when focused
    input.addEventListener('focus', () => {
        input.style.borderColor = '#fba100';  // Change the border color to blue on focus
    });

    // Revert the border color when the input loses focus
    input.addEventListener('blur', () => {
        input.style.borderColor = '#000';  // Change the border color back to the default
    });
});

// SLIDE SHOW
let currentSlide = 0; // Define the current slide variable

const slides = document.querySelectorAll('.slideShowImg'); // Get all slide images
const totalSlides = slides.length; // Get the total number of slides

// Function to change the current slide based on the direction.
const changeSlide = (direction) => {
    // Hide the current slide
    slides[currentSlide].style.opacity = 0;
    
    // Update the current slide index based on the direction
    currentSlide += direction;

    // If we're at the end or beginning of the slides, reset to loop
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    // Show the new current slide by setting opacity to 1
    slides[currentSlide].style.opacity = 1;
};

// Automatically slide every 3 seconds
setInterval(() => changeSlide(1), 3000);

// Initially, set the opacity of all slides to 0 (hidden) except the first one
slides.forEach((slide, index) => {
    if (index !== 0) {
        slide.style.opacity = 0;
    } else {
        slide.style.opacity = 1; // Show the first image
    }
});
