import { renderStudentenBeheer } from './studentenBeheer.js';
  import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.js";

export function renderStudent(student) {
  document.getElementById('app').innerHTML = `
    <header id="StudentBeherenHeader">
        <button id="back-btn">←</button>
        <h2 class="titel">Student Beheren</h2>
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

                    <h3>Studiekeuze</h3>
                    <label for="richting">Richting:</label><br>
                    <input type="text" id="richting" name="opleiding" value="${student?.opleiding || ''}"><br>

                    <h3>Persoonsinformatie</h3>
                    <label for="voornaam">Voornaam:</label><br>
                    <input type="text" id="voornaam" name="firstname" value="${student?.firstname || ''}"><br>

                    <label for="achternaam">Achternaam:</label><br>
                    <input type="text" id="achternaam" name="surname" value="${student?.surname || ''}"><br>

                    <label for="telefoon">Telefoonnummer:</label><br>
                    <input type="tel" id="telefoon" name="gsm" value="${student?.gsm || ''}"><br>

                    <h3>Account gegevens</h3>
                    <label for="email">E-mailadres:</label><br>
                    <input type="email" id="email" name="email" value="${student?.email || ''}"><br>

                    <label for="wachtwoord">Wachtwoord:</label><br>
                    <input type="password" id="wachtwoord" name="wachtwoord" ><br>

                    <label for="herhaalwachtwoord">Herhaal wachtwoord:</label><br>
                    <input type="password" id="herhaalwachtwoord" name="herhaalwachtwoord" ><br>

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


  //info aanpassen
document.querySelector('.beheer-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const studentId = form.getAttribute('data-id');

  const updatedData = {
    firstname: form.firstname.value,
    surname: form.surname.value,
    richting: form.richting.value,
    gsm: form.gsm.value,
    email: form.email.value,
    wachtwoord: form.wachtwoord.value,
    herhaalwachtwoord: form.herhaalwachtwoord.value,

  };

  //wachtwoord meer beveiligen
  if(wachtwoord){
    updatedData.wachtwoord = wachtwoord.value;
  }

  if (updatedData.wachtwoord !== updatedData.herhaalwachtwoord) {
    alert("Wachtwoorden komen niet overeen!");
    return;
  }
  

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