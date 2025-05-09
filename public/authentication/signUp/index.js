import {
    createUserWithEmailAndPassword,
    auth,
    doc,
    setDoc,
    db,
  } from "../../firebaseConfig.js";
  import modal from "../../components/modal.js";
  
  // Utility function to show messages on the page
  function showMessage(message, isError = false) {
    const notificationContainer = document.getElementById(
      "notification-container",
    );
    const messageElement = document.createElement("div");
    messageElement.classList.add("notification");
    messageElement.textContent = message;
  
    if (isError) {
      messageElement.classList.add("error");
    } else {
      messageElement.classList.add("success");
    }
  
    notificationContainer.appendChild(messageElement);
  
    // Remove the message after 10 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 10000);
  }
  
  // Fetch countries and populate the dropdown
  const countrySelect = document.getElementById("country");
  
  // Utility to fetch data with timeout
  async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(url, { ...options, signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  // Function to fetch country data with retries
  async function fetchCountryDataWithRetries(url, retries = 3, timeout = 5000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetchWithTimeout(url, {}, timeout);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.warn(`Attempt ${attempt} failed:`, error);
        if (attempt === retries) {
          throw new Error(
            "Failed to fetch country data after multiple attempts.",
          );
        }
      }
    }
  }
  
  // Function to populate country dropdown
  async function loadCountries() {
    try {
      const countries = await fetchCountryDataWithRetries(
        "https://restcountries.com/v3.1/all",
        3,
        7000,
      );
  
      // Sort countries alphabetically by their common name
      countries.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return nameA.localeCompare(nameB);
      });
  
      // Clear existing options (if any)
      countrySelect.innerHTML = '<option value="">Select your country</option>';
  
      // Populate sorted countries
      countries.forEach((country) => {
        const countryName = country.name.common;
        const phoneCode = country.idd?.root
          ? country.idd.root +
            (country.idd.suffixes ? country.idd.suffixes[0] : "")
          : "";
  
        if (phoneCode && phoneCode !== "+") {
          const option = document.createElement("option");
          option.value = phoneCode.replace("+", ""); // Remove the leading "+" for simplicity
          option.textContent = `${countryName} (+${phoneCode.replace("+", "")})`; // Add + back for display
          countrySelect.appendChild(option);
        }
      });
  
      console.log("✅ Countries loaded and sorted successfully.");
    } catch (error) {
      console.error("Error fetching country data:", error);
      showMessage(
        "❌ Could not load country data. Please refresh the page.",
        true,
      );
    }
  }
  
  // // Load countries on page load
  // document.addEventListener('DOMContentLoaded', () => {
  //     loadCountries();
  // });
  
  // Call the function to load countries when the page loads
  document.addEventListener("DOMContentLoaded", function () {
    loadCountries();
  
    // Listen for the form submission
    document
      .getElementById("signupForm")
      .addEventListener("submit", async function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
  
        // Show the loading spinner
        document.getElementById("loading").style.display = "flex"; // Show loading spinner
        document.querySelector(".btn").classList.add("loading"); // Disable the reset password button
  
        // Get the selected country code and the phone number
        const countryCode = countrySelect.value;
        const phoneNumber = document.getElementById("phone").value;
  
        // Ensure country code and phone number are provided
        if (!countryCode || !phoneNumber) {
          showMessage(
            "❌ Please select a country and enter your phone number.",
            true,
          );
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
          return;
        }
  
        // Phone number validation: Ensure it matches the expected pattern for the country code
        const phone = await validatePhoneNumber(phoneNumber, countryCode);
        if (!phone) {
          showMessage("❌ Please enter a valid phone number.", true);
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
          return;
        }
  
        // Get the email, password, confirm password, and other form values
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
  
        // Simple validation for required fields
        if (
          !email ||
          !password ||
          !confirmPassword ||
          !firstName ||
          !lastName ||
          !phone ||
          !countryCode
        ) {
          showMessage("❌ All fields are required!", true);
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
          return; // Prevent form submission if any required fields are missing
        }
  
        // Optional: More validation on email and password (e.g., email format, password length)
        if (!validateEmail(email)) {
          showMessage("❌ Please enter a valid email address.", true);
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
          return;
        }
  
        if (password.length < 6) {
          showMessage("❌ Password should be at least 6 characters long.", true);
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
          return;
        }
  
        // Check if password and confirm password match
        if (password !== confirmPassword) {
          showMessage("❌ Password and confirm password do not match.", true);
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
          return;
        }
  
        // Password Strength Validation: Check for at least one uppercase letter, one special character, and one digit
        if (
          !hasUppercase(password) ||
          !hasDigit(password) ||
          !hasSpecialCharacter(password)
        ) {
          showMessage(
            "❌ Password must contain at least one uppercase letter, one special character, and one digit.",
            true,
          );
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
          return;
        }
  
        try {
          // Firebase Authentication: Create a user with email and password
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;
          console.log("User created: ", user);
  
          // Save the user data (without password) to Firestore
          await setDoc(doc(db, "users", user.uid), {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            userId: user.uid,
          });
  
          console.log("User data saved to Firestore");
  
          // Redirect to the specified page after successful sign-up
          showMessage("✅ Account created successfully!", false);
          setTimeout(() => {
            window.location.href = "../../index.html";
          }, 2000);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing up: ", errorCode, errorMessage);
          showMessage(
            "❌ There was an error creating your account. Please try again.",
            true,
          );
        } finally {
          // Hide the loading spinner after the process is complete
          document.getElementById("loading").style.display = "none"; // Hide loading spinner
          document.querySelector(".btn").classList.remove("loading"); // Enable the button
        }
      });
  
    // Phone number validation and formatting
    async function validatePhoneNumber(phone, countryCode) {
      // Remove non-numeric characters (if any)
      const cleanedPhone = phone.replace(/\D/g, "");
  
      // Get the expected phone number length for the selected country code
      const maxPhoneLength = await getMaxPhoneLengthForCountry(countryCode);
  
      // Check if the phone number exceeds the expected length
      if (cleanedPhone.length > maxPhoneLength) {
        showMessage(
          `❌ Phone number cannot have more than ${maxPhoneLength} digits.`,
          true,
        );
        return null;
      }
  
      // Prepend the selected country code to the phone number
      phone = `+${countryCode}${cleanedPhone}`;
  
      // Validate if the phone number is in the correct format (e.g., +1XXXXXXXXXX)
      const phoneRegex = /^\+?\d{1,4}\d{10}$/; // Allow a country code and 10-digit number
      if (!phoneRegex.test(phone)) {
        showMessage("❌ Invalid phone number format.", true);
        return null;
      }
  
      return phone; // Return the properly formatted phone number
    }
  
    // Get the maximum phone number length for the selected country
    async function getMaxPhoneLengthForCountry(countryCode) {
      // Here, you can define the maximum phone number length for various country codes
      const countryMaxLengths = {
        1: 11, // USA/Canada
        44: 10, // UK
        91: 10, // India
        // Add other country codes and their max lengths here...
      };
  
      return countryMaxLengths[countryCode] || 15; // Default max length is 15 digits
    }
  
    // Email validation function
    function validateEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    }
  
    // Password strength validators
    function hasUppercase(str) {
      return /[A-Z]/.test(str);
    }
  
    function hasDigit(str) {
      return /\d/.test(str);
    }
  
    function hasSpecialCharacter(str) {
      return /[!@#$%^&*(),.?":{}|<>]/.test(str);
    }
  });
  
  let currentSlide = 0; // Define the current slide variable
  
  const slides = document.querySelectorAll(".slideShowImg"); // Get all slide images
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
  
  setInterval(() => changeSlide(1), 3000);
  
  slides.forEach((slide, index) => {
    if (index !== 0) {
      slide.style.opacity = 0;
    } else {
      slide.style.opacity = 1; // Show the first image
    }
  });
  
  const passwordField = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  
  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    // Add event listener to open modal when the button is clicked
    // document.getElementById('openModalBtn').onclick = openProfileModal;
  
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
    const icon = type === "password" ? "fa-eye-slash" : "fa-eye";
    togglePassword.innerHTML = `<i class="fa ${icon}" aria-hidden="true"></i>`;
  });
  
  const confirmPasswordField = document.getElementById("confirm-password");
  const toggleConfirmPassword = document.getElementById("toggleConPassword");
  
  // Toggle confirm password visibility
  toggleConfirmPassword.addEventListener("click", () => {
    const currentType =
      confirmPasswordField.type === "password" ? "text" : "password";
    confirmPasswordField.type = currentType;
    const iconClass = currentType === "password" ? "fa-eye-slash" : "fa-eye";
    toggleConfirmPassword.innerHTML = `<i class="fa ${iconClass}" aria-hidden="true"></i>`;
  });
  
  window.addEventListener("load", () => {
    const initialIconClass =
      confirmPasswordField.type === "password" ? "fa-eye-slash" : "fa-eye";
    toggleConfirmPassword.innerHTML = `<i class="fa ${initialIconClass}" aria-hidden="true"></i>`;
  });
  
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.borderColor = "#fba100";
    });
  
    input.addEventListener("blur", () => {
      input.style.borderColor = "#000";
    });
  });
  