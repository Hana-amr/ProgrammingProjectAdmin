import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#bedrijfForm");
 
  const backHomeBtn = document.getElementById("backHome-btn");
  const backBtn = document.getElementById("back-btn");
  const fotoInput = document.getElementById("foto");
  const deleteFotoBtn = document.getElementById("delete-foto-btn");
  const submitButton = document.querySelector(".submit");

  if (backHomeBtn) backHomeBtn.addEventListener("click", () => window.location.href = "index.html");
  if (backBtn) backBtn.addEventListener("click", () => window.location.href = "index.html");

  if (fotoInput) fotoInput.addEventListener("change", previewFoto);
  if (deleteFotoBtn) deleteFotoBtn.addEventListener("click", deleteFoto);

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const bedrijfsnaam = document.getElementById("bedrijfsnaam").value.trim();
      const adres = document.getElementById("adres").value.trim();
      const voornaam = document.getElementById("voornaam").value.trim();
      const achternaam = document.getElementById("achternaam").value.trim();
      const telefoon = document.getElementById("telefoon").value.trim();
      const email = document.getElementById("email").value.trim();
      const wachtwoord = document.getElementById("wachtwoord").value;
      const herhaalwachtwoord = document.getElementById("herhaalwachtwoord").value;
      const logoFile = fotoInput.files[0];

      if (wachtwoord !== herhaalwachtwoord) {
        alert("Wachtwoorden komen niet overeen!");
        return;
      }

      submitButton.disabled = true;
      document.getElementById("loadingText").style.display = "inline";
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, wachtwoord);
        const uid = userCredential.user.uid;

        let logoURL = "";
        if (logoFile) {
          const storage = getStorage();
          const storageRef = ref(storage, `bedrijfslogos/${uid}`);
          await uploadBytes(storageRef, logoFile);
          logoURL = await getDownloadURL(storageRef);
        }

        await setDoc(doc(db, "user", uid), {
          bedrijfs_id: uid,
          bedrijfsnaam: bedrijfsnaam,
          adres: adres,
          contactpersoon: `${voornaam} ${achternaam}`,
          email: email,
          emailcontactpersoon: email,
          gsm: telefoon,
          logoURL: logoURL || "",
          sector: [],
          websiteURL: "",
          bio: "",
          favorietenstudenten: [],
          role: "bedrijf"
        });

        alert("Bedrijf succesvol geregistreerd!");
        form.reset();
        deleteFoto();

      } catch (error) {
        console.error("Registratiefout:", error);
        if (error.code === "auth/email-already-in-use") {
          alert("Dit e-mailadres is al in gebruik.");
        } else {
          alert("Fout: " + error.message);
        }
      }finally {
        submitButton.disabled = false;
        document.getElementById("loadingText").style.display = "none";
}
    });
  }
});

function previewFoto(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("foto-preview");
  const label = document.getElementById("foto-label");
  const deleteBtn = document.getElementById("delete-foto-btn");

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
      label.style.display = "none";
      deleteBtn.style.display = "inline-block";
    };
    reader.readAsDataURL(file);
  } else {
    alert("Selecteer een geldig afbeeldingsbestand!");
  }
}

function deleteFoto() {
  const preview = document.getElementById("foto-preview");
  const label = document.getElementById("foto-label");
  const inputFile = document.getElementById("foto");
  const deleteBtn = document.getElementById("delete-foto-btn");

  if (preview) preview.src = "";
  if (preview) preview.style.display = "none";
  if (label) label.style.display = "block";
  if (inputFile) inputFile.value = "";
  if (deleteBtn) deleteBtn.style.display = "none";
}
