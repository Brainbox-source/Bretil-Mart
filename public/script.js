// Importing necessary Firebase functions
import { 
    getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, signOut 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { 
    doc, getDoc, setDoc, collection, query, where, getDocs 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { auth, db } from "./firebaseConfig.js"; // Firebase configuration file

// Handle Authentication State
auth.onAuthStateChanged((user) => {
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    if (userData.rememberMe) {
                        console.log("User is remembered. Redirecting to Home.");
                        window.location.href = "./Home/index.html";
                    }
                }
            })
            .catch((error) => console.error("Error fetching user data:", error));
    } else {
        console.log("No user signed in.");
    }
});

// Login Form Submission Handler
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember").checked;

    // Simple validation
    if (!validateEmail(email) || password.length < 6) {
        showErrorMessage("Invalid credentials. Please try again.");
        return;
    }

    toggleLoading(true);

    // Authenticate the user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);

            // Update Firestore with the "Remember Me" state
            return setDoc(userDocRef, { rememberMe }, { merge: true })
                .then(() => userDocRef);
        })
        .then((userDocRef) => getDoc(userDocRef))
        .then((userDoc) => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
                window.location.href = "./Home/index.html";
            } else {
                throw new Error("User data not found in Firestore.");
            }
        })
        .catch((error) => {
            console.error("Error during login:", error.message);
            showErrorMessage("Login failed. Please try again.");
        })
        .finally(() => toggleLoading(false));
});

// Google Login Handler
// document.getElementById("btn").addEventListener("click", () => {
//     const provider = new GoogleAuthProvider();

//     signInWithPopup(auth, provider)
//         .then((result) => {
//             const user = result.user;
//             const userDocRef = doc(db, "users", user.uid);

//             return getDoc(userDocRef)
//                 .then((docSnapshot) => {
//                     if (!docSnapshot.exists()) {
//                         return setDoc(userDocRef, {
//                             firstName: user.displayName.split(" ")[0],
//                             lastName: user.displayName.split(" ")[1] || "",
//                             email: user.email,
//                             phone: "",
//                             userId: user.uid,
//                             rememberMe: true
//                         });
//                     }
//                 });
//         })
//         .then(() => {
//             window.location.href = "../Home/index.html";
//         })
//         .catch((error) => {
//             console.error("Google login error:", error.message);
//             showErrorMessage("An error occurred during Google login. Please try again.");
//         });
// });

// Helper Function: Validate Email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Helper Function: Show Error Message
function showErrorMessage(message) {
    const errorMessageContainer = document.getElementById("errorMessageContainer");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessageContainer.style.display = "flex";

    setTimeout(() => errorMessageContainer.style.display = "none", 6000);
}

// Helper Function: Toggle Loading State
function toggleLoading(isLoading) {
    const loadingIndicator = document.getElementById("loading");
    const loginButton = document.querySelector(".loginBtn");

    if (isLoading) {
        loadingIndicator.style.display = "flex";
        loginButton.classList.add("loading");
    } else {
        loadingIndicator.style.display = "none";
        loginButton.classList.remove("loading");
    }
}

// Password Toggle Visibility
document.getElementById("togglePassword").addEventListener("click", () => {
    const passwordField = document.getElementById("password");
    const isPasswordVisible = passwordField.type === "password";
    passwordField.type = isPasswordVisible ? "text" : "password";

    const iconClass = isPasswordVisible ? "fa-eye" : "fa-eye-slash";
    document.getElementById("togglePassword").innerHTML = `<i class="fa ${iconClass}" aria-hidden="true"></i>`;
});

// Input Focus Effects
document.querySelectorAll('input').forEach((input) => {
    input.addEventListener("focus", () => (input.style.borderColor = "#fba100"));
    input.addEventListener("blur", () => (input.style.borderColor = "#000"));
});

// Desktop Image Slider
setupSlider(".slideShowImg", 3000);

// Mobile Image Slider
setupSlider(".mobileSlideShowImg", 2500, true);

// Helper Function: Setup Image Slider
function setupSlider(selector, interval, hideAfterComplete = false) {
    const slides = document.querySelectorAll(selector);
    let currentSlide = 0;
    let slideCount = 0;

    const updateSlide = () => {
        slides[currentSlide].style.opacity = 0;
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = 1;

        if (hideAfterComplete && ++slideCount >= slides.length) {
            clearInterval(autoSlideInterval);
            document.querySelector(".mobileDeliveryPicsContainer").style.display = "none";
        }
    };

    const autoSlideInterval = setInterval(updateSlide, interval);

    slides.forEach((slide, index) => (slide.style.opacity = index === 0 ? 1 : 0));
}
