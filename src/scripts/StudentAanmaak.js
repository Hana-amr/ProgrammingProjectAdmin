import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#studentForm");

  const backHomeBtn = document.getElementById('backHome-btn');
  const backBtn = document.getElementById('back-btn');
  const fotoInput = document.getElementById("foto");
  const fotoUploadDiv = document.querySelector(".foto-upload");
  const deleteFotoBtn = document.getElementById("delete-foto-btn");
  const submitButton = document.querySelector(".submit");

  if (backHomeBtn) backHomeBtn.addEventListener('click', () => window.location.href = 'keuzeMenu.html');
  if (backBtn) backBtn.addEventListener('click', () => window.location.href = 'keuzeMenu.html');
  if (fotoUploadDiv && fotoInput) fotoUploadDiv.addEventListener("click", () => fotoInput.click());
  if (fotoInput) fotoInput.addEventListener("change", previewFoto);
  if (deleteFotoBtn) deleteFotoBtn.addEventListener("click", deleteFoto);

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const voornaam = document.getElementById("voornaam").value.trim();
      const achternaam = document.getElementById("achternaam").value.trim();
      const email = document.getElementById("email").value.trim();
      const gsm = document.getElementById("telefoon").value.trim();
      const opleiding = document.getElementById("opleiding").value.trim();
      const wachtwoord = document.getElementById("wachtwoord").value;
      const herhaalwachtwoord = document.getElementById("herhaalwachtwoord").value;
      const fotoFile = fotoInput.files[0];

      if (wachtwoord !== herhaalwachtwoord) {
        alert("Wachtwoorden komen niet overeen!");
        return;
      }

        function validate() {
    const userInput = document.getElementById("telefoon").value.trim();
  

    const regx = /\d{8,9}$/;

    if (regx.test(userInput)) {
      return true;
    } else {
      return false;
    }
  }

      if (!validate()) {
      alert("Ongeldig telefoonnummer. Zorg ervoor dat het begint met +32 en 8 of 9 cijfers bevat.");
      return;
    }
      
      submitButton.disabled = true;
      document.getElementById("loadingText").style.display = "inline";
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, wachtwoord);
        const uid = userCredential.user.uid;

        let pictureURL = "";
        if (fotoFile) {
          const storage = getStorage();
          const storageRef = ref(storage, `studenten_fotos/${uid}`);
          await uploadBytes(storageRef, fotoFile);
          pictureURL = await getDownloadURL(storageRef);
        }

        // Data opslaan in collectie "user"
        await setDoc(doc(db, "user", uid), {
          stud_id: uid,
          firstname: voornaam,
          surname: achternaam,
          gsm: gsm,
          opleiding: opleiding,
          email: email,
          pictureURL: pictureURL || "",
          favorietenBedrijven: [""],
          registraties: [""],
          deelinfo: true,
          role: "student"
        });

        alert("Student succesvol geregistreerd!");
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
    alert("Selecteer een geldige afbeelding!");
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
