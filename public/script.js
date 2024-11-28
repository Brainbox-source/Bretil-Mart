// Importing all the necessary functions
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { auth, db } from "../firebaseConfig.js";

// Check if user is already authenticated and fetch the "Remember Me" status
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, check the "Remember Me" flag in Firestore
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    console.log("User data:", userData);  // Log user data to see if rememberMe is set
                    if (userData.rememberMe) {
                        console.log("User is remembered. Redirecting to Home.");
                        window.location.href = "../Home/index.html";  // Redirect to Home
                    } else {
                        console.log("User is not remembered.");
                    }
                } else {
                    console.log("No user data found in Firestore.");
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    } else {
        console.log("No user signed in.");
    }
});


// Handle the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember").checked; // Get "Remember Me" value

    // Simple validation for email and password
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        return;
    }

    // Show loading indicator
    document.getElementById("loading").style.display = "flex";
    document.querySelector(".loginBtn").classList.add("loading"); // Disable login button

    const authInstance = getAuth();

    // Sanitize email by trimming spaces and converting to lowercase
    const sanitizedEmail = email.trim().toLowerCase();

    // Sign in with Firebase Authentication
    signInWithEmailAndPassword(authInstance, sanitizedEmail, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);

        // Store "Remember Me" status in Firestore
        const userDocRef = doc(db, "users", user.uid);
        setDoc(userDocRef, {
            rememberMe: rememberMe // Store the "Remember Me" state in Firestore
        }, { merge: true }) // Use merge to only update the rememberMe field without overwriting the entire user data
        .then(() => {
            console.log("Remember Me status saved to Firestore");
        })
        .catch((error) => {
            console.error("Error saving Remember Me status to Firestore:", error);
        });

        // Fetch user data from Firestore
        const userCollectionRef = collection(db, "users");
        const emailQuery = query(userCollectionRef, where("email", "==", sanitizedEmail));

        getDocs(emailQuery)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                sessionStorage.setItem("loggedInUser", JSON.stringify(userData) );
                console.log("User data from Firestore:", userData);

                // alert("You have successfully logged in!");
                window.location.href = "../Home/index.html"; // Redirect to Home
            } else {
                alert("User data not found in the database.");
                // Sign out the user if the data isn't found
                signOut(authInstance).then(() => {
                    console.log("User signed out due to no matching data.");
                }).catch((error) => {
                    console.error("Error signing out:", error);
                });
            }
        })
        .catch((error) => {
            console.error("Error querying Firestore:", error);
            alert("Error querying user data. Please try again.");
        });

    })

    .catch((error) => {
        console.error("Error during sign-in: ", error.code, error.message);
    
        // Get the error message container and set its text
        const errorMessageContainer = document.getElementById("errorMessageContainer");
        const errorMessage = document.getElementById("errorMessage");
    
        // Set the error message to be shown on the page
        errorMessage.textContent = "Invalid credentials. Please try again.";
    
        // Display the error message container
        setTimeout(() => {
            errorMessageContainer.style.display = "flex";
        }, 2100)

        setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 5500)
    })   
     
    .finally(() => {
        // Hide loading indicator after the process is done
        setTimeout(() => {
            document.getElementById("loading").style.display = "none";
        }, 2000)

        setTimeout(() => {
            document.querySelector(".loginBtn").classList.remove("loading");
        }, 2100) // Enable login button again
    });
});

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Handle Google login
document.getElementById("btn").addEventListener("click", function () {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        console.log("Google user signed in:", user);

        // Reference to the Firestore document for the user
        const userDocRef = doc(db, "users", user.uid);

        // Check if the user exists in Firestore
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (!docSnapshot.exists()) {
                    // If the user does not exist, create a new document with user data
                    setDoc(userDocRef, {
                        firstName: user.displayName.split(" ")[0],
                        lastName: user.displayName.split(" ")[1] || "",
                        email: user.email,
                        phone: "",
                        userId: user.uid,
                        rememberMe: true // Automatically remember the user after Google login
                    })
                    .then(() => {
                        console.log("User data saved to Firestore with rememberMe");
                    })
                    .catch((error) => {
                        console.error("Error saving user data to Firestore:", error);
                        alert("Error saving user data. Please try again.");
                    });
                } else {
                    console.log("User already exists in Firestore.");
                    // Set rememberMe flag to true if not already
                    setDoc(userDocRef, { rememberMe: true }, { merge: true })
                    .then(() => {
                        console.log("Remember Me flag set to true for existing user.");
                    })
                    .catch((error) => {
                        console.error("Error updating user data in Firestore:", error);
                    });
                }
            })
            .catch((error) => {
                console.error("Error checking Firestore for user:", error);
                alert("Error checking Firestore. Please try again.");
            });

        // Successful Google login
        setTimeout(()=>{
            window.location.href =  '../Home/index.html' // Redirect to Home
      
          }, 6000);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Google login error:", errorCode, errorMessage);

        // Handle Firebase Authentication error messages    
        // Get the error message container and set its text
        const googleErrorMessageCon = document.getElementById("googleErrorMessageContainer");
        const googleErrorMsg = document.getElementById("googleErrorMessage");
    
        // Set the error message to be shown on the page
        googleErrorMsg.textContent = "An error occurred during Google login. Please try again.";
    
        // Display the error message container
        setTimeout(() => {
            googleErrorMessageCon.style.display = "flex";
        }, 500)

        setTimeout(() => {
            googleErrorMessageCon.style.display = "none";
        }, 3000)
    });

});


// Get the password input and eye icon elements
const passwordField = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

// Add an event listener for the click event on the eye icon
togglePassword.addEventListener('click', () => {
    // Check the current type of the input field and toggle it
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;

    // Toggle the eye icon between 'fa-eye' and 'fa-eye-slash'
    const icon = type === 'password' ? 'fa-eye-slash' : 'fa-eye';
    togglePassword.innerHTML = `<i class="fa ${icon}" aria-hidden="true"></i>`;
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
