import { auth, db } from "../scripts/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("errorDiv");

  if (!form || !errorDiv) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorDiv.textContent = "";
    errorDiv.style.color = "red";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Log in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Haal Firestore document op
      const userDoc = await getDoc(doc(db, "user", uid));

      if (!userDoc.exists()) {
        errorDiv.textContent = "Gebruiker bestaat niet in Firestore.";
        await auth.signOut();
        return;
      }

      const userData = userDoc.data();

      if (userData.role === "admin") {
        window.location.href = "keuzeMenu.html";
      } else {
        errorDiv.textContent = "Je hebt geen toegang tot dit platform.";
        await auth.signOut();
      }

    } catch (error) {
      console.error("Inloggen mislukt:", error.message);
      errorDiv.textContent = "Inloggen mislukt";
    }
  });
});
