// Import Firebase services from the firebase-config.js
import { auth, sendPasswordResetEmail } from '../../firebaseConfig.js';

// Function to handle password reset
async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent to ' + email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Error: ' + errorMessage);  // Show appropriate error message
  }
}

// Add event listener for reset password form
document.getElementById('forgot-password-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get the email entered by the user
  const email = document.getElementById('email').value;

  // Validate if email is empty or not a valid format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    console.log('email test failed')
    alert('Please enter a valid email address.');
    }else{
    await resetPassword(email);
    alert('Please check your email for a password reset link.');
    document.getElementById('email').value = '';
  };
  // Send password reset email using Firebase
  // Optionally, clear the input field after submission
});

//SLIDE SHOW
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
