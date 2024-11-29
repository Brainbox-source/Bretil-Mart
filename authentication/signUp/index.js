import { createUserWithEmailAndPassword, auth, doc, setDoc, db } from "../../firebaseConfig.js";

// Fetch countries and populate the dropdown
const countrySelect = document.getElementById('country');

// Function to fetch country data and populate the dropdown
async function loadCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        // Clear existing options (if any)
        countrySelect.innerHTML = '<option value="">Select your country</option>';

        countries.forEach(country => {
            const countryName = country.name.common;
            // Ensure phone code is formatted correctly
            const phoneCode = country.idd && country.idd.root ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '') : '';
            
            // Only include countries with a valid phone code
            if (phoneCode && phoneCode !== '+') {
                const option = document.createElement('option');
                option.value = phoneCode.replace('+', ''); // Remove the leading "+" for simplicity
                option.textContent = `${countryName} (+${phoneCode.replace('+', '')})`; // Add + back for display
                countrySelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error fetching country data:", error);
        alert("Could not load country data. Please try again later.");
    }
}

// Call the function to load countries when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCountries();

    // Listen for the form submission
    document.getElementById("signupForm").addEventListener('submit', async function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the selected country code and the phone number
        const countryCode = countrySelect.value;
        const phoneNumber = document.getElementById('phone').value;

        // Ensure country code and phone number are provided
        if (!countryCode || !phoneNumber) {
            alert("Please select a country and enter your phone number.");
            return;
        }

        // Phone number validation: Ensure it matches the expected pattern for the country code
        const phone = await validatePhoneNumber(phoneNumber, countryCode);
        if (!phone) {
            alert("Please enter a valid phone number.");
            return;
        }

        // Get the email, password, confirm password, and other form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;

        // Simple validation for required fields
        if (!email || !password || !confirmPassword || !firstName || !lastName || !phone || !countryCode) {
            console.error("All fields are required!");
            return; // Prevent form submission if any required fields are missing
        }

        // Optional: More validation on email and password (e.g., email format, password length)
        if (!validateEmail(email)) {
            console.error("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            console.error("Password should be at least 6 characters long.");
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            console.error("Password and confirm password do not match.");
            return;
        }

        // Password Strength Validation: Check for at least one uppercase letter, one special character, and one digit
        if (!hasUppercase(password) || !hasDigit(password) || !hasSpecialCharacter(password)) {
            alert("Password must contain at least one uppercase letter, one special character, and one digit.");
            return;
        }

        try {
            // Firebase Authentication: Create a user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User created: ", user);

            // Save the user data (without password) to Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                userId: user.uid
            });

            console.log("User data saved to Firestore");

            // Optionally, display the form data for debugging (ensure not to log sensitive info like password)
            console.log('Email:', email);
            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Phone:', phone);

            // Redirect to the specified page after successful sign-up
            window.location.href = '../../public/index.html';

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing up: ", errorCode, errorMessage);
            alert("There was an error creating your account. Please try again.");
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
            alert(`Phone number cannot have more than ${maxPhoneLength} digits.`);
            return null;
        }

        // Prepend the selected country code to the phone number
        phone = `+${countryCode}${cleanedPhone}`;

        // Validate if the phone number is in the correct format (e.g., +1XXXXXXXXXX)
        const phoneRegex = /^\+?\d{1,4}\d{10}$/; // Allow a country code and 10-digit number
        if (!phoneRegex.test(phone)) {
            alert("Invalid phone number format.");
            return null;
        }

        return phone; // Return the properly formatted phone number
    }

    // Get the maximum phone number length for the selected country
    async function getMaxPhoneLengthForCountry(countryCode) {
        // Here, you can define the maximum phone number length for various country codes
        const countryMaxLengths = {
            '1': 11, // USA/Canada
            '44': 10, // UK
            '91': 10, // India
            // Add other country codes and their max lengths here...
        };

        return countryMaxLengths[countryCode] || 15; // Default max length is 15 digits
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Password validation functions
    function hasUppercase(password) {
        return /[A-Z]/.test(password); // Checks if the password contains at least one uppercase letter
    }

    function hasDigit(password) {
        return /\d/.test(password); // Checks if the password contains at least one digit
    }

    function hasSpecialCharacter(password) {
        return /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks if the password contains at least one special character
    }
});
