import { renderBedrijvenBeheer } from "./bedrijvenBeheer"
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import { getAuth, deleteUser } from "firebase/auth";


export function renderBedrijf(bedrijf){
    document.getElementById('app').innerHTML = `
  <header>
    <button id="back-btn">←</button>
    <h2 class="titel5">Bedrijf Beheren</h2>
    <button id="backHome-btn">HOME</button>
  </header>

  <!--Bedrijvenformulier-->
  <section class="beheer" id="beheer-bedrijven">
    <div class="beheer-container">
      <!--logo-->
      <div class="foto-section">
        <div class="foto-upload" onclick="document.getElementById('foto').click();">
          <span id="foto-label">Logo</span>
          <img id="foto-preview" alt="fotovoorbeeld" />
        </div>
        <input type="file" id="foto" accept="image/*" style="display: none" onchange="previewFoto(event)">
        <button id="delete-foto-btn" onclick="deleteFoto()">Logo verwijderen</button>
      </div>

      <!--Formulier bedrijven-->
      <div class="registratie-container">
      <form class="beheer-form" data-id="${bedrijf.id}">
          <h3>Bedrijfsgegevens</h3>
          <label for="Bedrijfsnaam">Bedrijfsnaam:</label><br>
          <input type="text" id="bedrijfsnaam" name="bedrijfsnaam" value="${bedrijf?.bedrijfsnaam || ''}"><br>

    <label for="sector">Sector(en): (Je mag meerdere kiezen met Ctrl of Cmd)</label><br>
<select id="sector" name="sector" multiple size="6">
  ${[
    "ICT", "Gezondheidszorg", "Onderwijs", "Logistiek", "Energie", "Telecommunicatie", "Milieu",
    "Wetenschap", "Technologie", "Televisie en film", "Mode", "Financiële technologie",
    "Gaming", "Financiën", "Consultancy", "Overheid", "Industrie", "Retail", "Overig"
  ].map(sectorOpt => `
    <option value="${sectorOpt}" 
      ${Array.isArray(bedrijf?.sector) && bedrijf.sector.includes(sectorOpt) ? 'selected' : ''}>
      ${sectorOpt}
    </option>
  `).join('')}
</select><br>
<small style="font-size: 0.85rem; color: gray;">Houd Ctrl (of Cmd) ingedrukt om meerdere sectoren te selecteren.</small><br>


          <h3>Persoonsinformatie</h3>
          <label for="contact">Contactpersoon:</label><br>
          <input type="text" id="contact" name="contact" value="${bedrijf?.contactpersoon || ''}"><br>

          <label for="emailcontact">Email Contactpersoon:</label><br>
          <input type="text" id="emailcontact" name="emailcontact" value="${bedrijf?.emailcontactpersoon || ''}"><br>

          <h3>Account gegevens</h3>
          <label for="email">E-mailadres Bedrijf:</label><br>
          <input type="email" id="email" name="email" value="${bedrijf?.email || ''}" readonly><br>

          <button type="submit" class="submit">Pas aan</button>
          <button type="button" id="verwijder-bedrijf">Verwijder bedrijf</button>
        </form>
      </div>
    </div>
  </section>`

  document.getElementById('backHome-btn').addEventListener('click', () => {
    window.location.href = 'keuzeMenu.html'; 
  });
  document.getElementById('back-btn').addEventListener('click', () => {
    renderBedrijvenBeheer();
  });

  //info aanpassen
  document.querySelector('.beheer-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const bedrijfId = form.getAttribute('data-id');

  const updatedData = {
    bedrijfsnaam: form.bedrijfsnaam.value,
    contactpersoon: form.contact.value,
    emailcontactpersoon: form.emailcontact.value,
    email: form.email.value,
    sector: Array.from(form.sector.selectedOptions).map(opt => opt.value),
  };  

  try {
    const docRef = doc(db, "user", bedrijfId);
    await updateDoc(docRef, updatedData);
    alert("Bedrijf succesvol bijgewerkt.");
    renderBedrijvenBeheer(); // Terug naar overzicht
  } catch (error) {
    console.error("Fout bij updaten:", error);
    alert("Fout bij updaten: " + error.message);
  }
});

//student verwijderen
document.getElementById('verwijder-bedrijf').addEventListener('click', async () => {
  const bedrijfId = document.querySelector('.beheer-form').getAttribute('data-id');

  const bevestig = confirm("Weet je zeker dat je dit bedrijf wilt verwijderen?");
  if (!bevestig) return;

  try {
    await deleteDoc(doc(db, "user", bedrijfId));
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.uid === bedrijfId) {
      await deleteUser(user);
    }
    alert("Bedrijf verwijderd.");
    renderBedrijvenBeheer(); // Terug naar overzicht
  } catch (error) {
    console.error("Fout bij verwijderen:", error);
    alert("Fout bij verwijderen: " + error.message);
  }
});

};