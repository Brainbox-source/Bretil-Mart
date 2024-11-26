  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCbu6MSaBPUSrdr4dXCY0xEQb9boiXnuq8",
    authDomain: "bretil-mart.firebaseapp.com",
    projectId: "bretil-mart",
    storageBucket: "bretil-mart.firebasestorage.app",
    messagingSenderId: "593899050111",
    appId: "1:593899050111:web:51bd3d4b61979f1f3b1b4a",
    measurementId: "G-19XZ82JMEM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);