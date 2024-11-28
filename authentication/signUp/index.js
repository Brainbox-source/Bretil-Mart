import { createUserWithEmailAndPassword, auth, doc, setDoc, db } from "../../firebaseConfig.js";

  
  // Add an event listener to the form's submit event
document.getElementById("signupForm").addEventListener('submit', function(event) {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();
  
    // Get the email, password, and other form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
  
    // Simple validation for required fields
    if (!email || !password || !firstName || !lastName || !phone) {
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
  
    // Firebase Authentication: Create a user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("User created: ", user);
  
        // Save the user data (without password) to Firestore
        try {
          // Store data in Firestore under the user's UID
          await setDoc(doc(db, "users", user.uid), {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            userId : user.uid
          });
          console.log("User data saved to Firestore");
        } catch (error) {
          console.error("Error saving user data to Firestore: ", error);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up: ", errorCode, errorMessage);
      });
  
    // Optionally, display the form data for debugging (ensure not to log sensitive info like password)
    console.log('Email:', email);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Phone:', phone);
    // Avoid logging passwords in production:

    setTimeout(()=>{
      window.location.href =  '../../public/index.html'

    }, 8000)
  });
  
  // Email validation function
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }