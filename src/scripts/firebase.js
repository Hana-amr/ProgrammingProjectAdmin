// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; // Uncomment if you need Firebase Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyCVhKoO4m5MZX9gQixIF3RiAGeBAzKF8",
  authDomain: "ehb-project-7cfd5.firebaseapp.com",
  projectId: "ehb-project-7cfd5",
  storageBucket: "ehb-project-7cfd5.firebasestorage.app",
  messagingSenderId: "356587109366",
  appId: "1:356587109366:web:fd25b2b38c1d43c19ae5d7",
  measurementId: "G-HCRCY64YSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app); // Uncomment if you need Firebase Analytics
const auth = getAuth(app); // Uncomment if you need Firebase Authentication

// 📤 Export zodat andere bestanden het kunnen gebruiken
export { db };
export { auth }; // Export auth if you need Firebase Authentication

