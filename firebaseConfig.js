import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    collection, 
    arrayUnion,
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Import Realtime Database
import { 
    getDatabase, 
    ref, 
    onValue, 
    set, 
    update 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbu6MSaBPUSrdr4dXCY0xEQb9boiXnuq8", 
    authDomain: "bretil-mart.firebaseapp.com",
    projectId: "bretil-mart",
    storageBucket: "bretil-mart.appspot.com", // Corrected bucket URL
    messagingSenderId: "593899050111",
    appId: "1:593899050111:web:51bd3d4b61979f1f3b1b4a",
    measurementId: "G-19XZ82JMEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Firebase Analytics (if you need it)
const analytics = getAnalytics(app);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

const realtimeDB = getDatabase(app);
const database = getDatabase(app);

// Exporting all necessary Firebase utilities for use in other parts of the application
export {
    auth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut, // Exporting signOut for logout functionality
    onAuthStateChanged,
    getAuth,
    db, 
    doc, 
    setDoc, 
    collection, 
    arrayUnion,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query, 
    where,
    getDoc,
    database,
    ref,
    onValue
};
