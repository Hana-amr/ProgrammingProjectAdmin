import { auth } from "../scripts/firebase"; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
// renderStudentenBeheer is niet meer nodig als je gaat navigeren

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("errorDiv");

  if (!form) {
    console.error("login-form niet gevonden in de DOM");
    return;
  }

  if (!errorDiv) {
    console.error("❌ errorDiv niet gevonden in de DOM!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    errorDiv.textContent = "";
    errorDiv.style.color = "red";

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Ingelogd als:", userCredential.user.email);
      errorDiv.style.color = "green";
      errorDiv.textContent = "✅ Inloggen gelukt!";

      // ✅ Stuur gebruiker door naar adminpagina
      window.location.href = "keuzeMenu.html"; // ← pas dit pad aan indien nodig
    } catch (error) {
      console.error("❌ Inloggen mislukt:", error.message);
      errorDiv.textContent = "❌ Inloggen mislukt";
    }
  });
});
