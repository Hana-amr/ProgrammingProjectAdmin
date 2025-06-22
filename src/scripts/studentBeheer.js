import { renderStudentenBeheer } from './studentenBeheer.js';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.js";


export function renderStudent(student) {

  document.getElementById('app').innerHTML = `
    <header id="StudentBeherenHeader">
        <button id="back-btn">←</button>
        <h2 class="titel4">Student Beheren</h2>
        <button id="backHome-btn">HOME</button>
    </header>

    <!--Studentenformulier-->
    <section class="beheer" id="beheer-studenten">
        <div class="beheer-container">

            <!--Profiel foto-->
            <div class="foto-upload-container">
                <div class="foto-upload" onclick="document.getElementById('foto').click();">
                    <img id="foto-label" src="images/Profile icon.jpg" alt="standaard foto" />
                    <img id="foto-preview" alt="fotovoorbeeld" />
                </div>
                <button id="delete-foto-btn" style="display: none;" onclick="deleteFoto()">Foto verwijderen</button>
            </div>
            <input type="file" id="foto" accept="image/*" style="display: none" onchange="previewFoto(event)">

            <!--Formulier studenten-->
            <div class="registratie-container">
            <form class="beheer-form" data-id="${student.id}">
            <h3>Opleiding</h3>
            <label for="opleiding">Kies een opleiding:</label><br>
            <select id="opleiding" name="opleiding">
              <optgroup label="Erasmus">
                <option value="">-- Kies een opleiding --</option>
                 <option value="Bachelor Multimedia & Creatieve Technologie" ${student?.opleiding === "Bachelor Multimedia & Creatieve Technologie" ? 'selected' : ''}>Bachelor Multimedia & Creatieve Technologie</option>
                 <option value="Bachelor Toegepaste Informatica" ${student?.opleiding === "Bachelor Toegepaste Informatica" ? 'selected' : ''}>Bachelor Toegepaste Informatica</option>
                 <option value="Graduaat Elektromechanische Systemen" ${student?.opleiding === "Graduaat Elektromechanische Systemen" ? 'selected' : ''}>Graduaat Elektromechanische Systemen</option>
                 <option value="Graduaat Programmeren" ${student?.opleiding === "Graduaat Programmeren" ? 'selected' : ''}>Graduaat Programmeren</option>
                 <option value="Graduaat Systeem- en Netwerkbeheer" ${student?.opleiding === "Graduaat Systeem- en Netwerkbeheer" ? 'selected' : ''}>Graduaat Systeem- en Netwerkbeheer</option>
                 <option value="Postgraduaat Coding (online)" ${student?.opleiding === "Postgraduaat Coding (online)" ? 'selected' : ''}>Postgraduaat Coding (online)</option>
                 <option value="Postgraduaat Toegepaste Artificial Intelligence" ${student?.opleiding === "Postgraduaat Toegepaste Artificial Intelligence" ? 'selected' : ''}>Postgraduaat Toegepaste Artificial Intelligence</option>
             </optgroup>
          </select>
                    <h3>Persoonsinformatie</h3>
                    <label for="voornaam">Voornaam:</label><br>
                    <input type="text" id="voornaam" name="firstname" value="${student?.firstname || ''}"><br>

                    <label for="achternaam">Achternaam:</label><br>
                    <input type="text" id="achternaam" name="surname" value="${student?.surname || ''}"><br>

                    <label for="gsm">Telefoonnummer:</label><br>
                    <span>+32</span>
                    <input type="tel" id="gsm" name="gsm" maxlength="9" placeholder="(4)41234567" value="${student?.gsm || ''}"><br>

                    <h3>Account gegevens</h3>
                    <label for="email">E-mailadres:</label><br>
                    <input type="email" id="email" name="email" value="${student?.email || ''}" readonly><br>

                    <button type="submit" class="submit">Pas aan</button>
                    <button type="button" id="verwijder-student" style="background: red; color: white;">Verwijder student</button>
                </form>
            </div>
        </div>
    </section>
  `;
  document.getElementById('back-btn').addEventListener('click', () => {
    renderStudentenBeheer();
  });
  document.getElementById('backHome-btn').addEventListener('click', () => {
    location.href = 'keuzeMenu.html';
  });


  //validatie voor telefoonnummer
  function validate() {
    const userInput = document.getElementById("gsm").value.trim();
  

    const regx = /\d{8,9}$/;

    if (regx.test(userInput)) {
      return true;
    } else {
      return false;
    }
  }

  //info bijwerken
  document.querySelector('.beheer-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Ongeldig telefoonnummer. Zorg ervoor dat het begint met +32 en 8 of 9 cijfers bevat.");
      return;
    }

    const form = e.target;
    const studentId = form.getAttribute('data-id');

    const updatedData = {
      firstname: form.firstname.value,
      surname: form.surname.value,
      opleiding: form.opleiding.value,
      gsm: form.gsm.value,
      email: form.email.value,

    };

    try {
      const docRef = doc(db, "user", studentId);
      await updateDoc(docRef, updatedData);
      alert("Student succesvol bijgewerkt.");
      renderStudentenBeheer(); // Terug naar overzicht
    } catch (error) {
      console.error("Fout bij updaten:", error);
      alert("Fout bij updaten: " + error.message);
    }
  });

  //student verwijderen
  document.getElementById('verwijder-student').addEventListener('click', async () => {
    const studentId = document.querySelector('.beheer-form').getAttribute('data-id');

    const bevestig = confirm("Weet je zeker dat je deze student wilt verwijderen?");
    if (!bevestig) return;

    try {
      await deleteDoc(doc(db, "user", studentId));
      alert("Student verwijderd.");
      renderStudentenBeheer(); // Terug naar overzicht
    } catch (error) {
      console.error("Fout bij verwijderen:", error);
      alert("Fout bij verwijderen: " + error.message);
    }
  });

  

}
