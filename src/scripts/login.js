import { auth } from "../scripts/firebase"; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { renderStudentenBeheer } from "../scripts/studentenBeheer.js";



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (!form) {
      console.error("login-form niet gevonden in de DOM");
      return;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Ingelogd:", userCredential.user);
        errorDiv.textContent = "Inloggen gelukt!";
        renderStudentenBeheer(); // Render studenten na inloggen
      } catch (error) {
        
      }
    });
  });