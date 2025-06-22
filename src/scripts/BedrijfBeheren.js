import { renderBedrijvenBeheer } from "./bedrijvenBeheer"
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.js";

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

          <label for="sector">Sector: (Selecteer de belangrijkste.)</label><br>
          <select id="sector" name="sector">
            <option value="ICT" ${bedrijf?.sector === 'ICT' ? 'selected' : ''}>ICT</option>
            <option value="Gezondheidszorg" ${bedrijf?.sector === 'Gezondheidszorg' ? 'selected' : ''}>Gezondheidszorg</option>
            <option value="Onderwijs" ${bedrijf?.sector === 'Onderwijs' ? 'selected' : ''}>Onderwijs</option>
            <option value="Logistiek" ${bedrijf?.sector === 'Logistiek' ? 'selected' : ''}>Logistiek</option>
            <option value="Energie" ${bedrijf?.sector === 'Energie' ? 'selected' : ''}>Energie</option>
            <option value="Telecommunicatie" ${bedrijf?.sector === 'Telecommunicatie' ? 'selected' : ''}>Telecommunicatie</option>
            <option value="Milieu" ${bedrijf?.sector === 'Milieu' ? 'selected' : ''}>Milieu</option>
            <option value="Wetenschap" ${bedrijf?.sector === 'Wetenschap' ? 'selected' : ''}>Wetenschap</option>
            <option value="Technologie" ${bedrijf?.sector === 'Technologie' ? 'selected' : ''}>Technologie</option>
            <option value="Televisie en film" ${bedrijf?.sector === 'Televisie en film' ? 'selected' : ''}>Televisie en film</option>
            <option value="Mode" ${bedrijf?.sector === 'Mode' ? 'selected' : ''}>Mode</option>
            <option value="Financiële technologie" ${bedrijf?.sector === 'Financiële technologie' ? 'selected' : ''}>Financiële technologie</option>
            <option value="Gaming" ${bedrijf?.sector === 'Gaming' ? 'selected' : ''}>Gaming</option>
            <option value="Financiën" ${bedrijf?.sector === 'Financiën' ? 'selected' : ''}>Financiën</option>
            <option value="Consultancy" ${bedrijf?.sector === 'Consultancy' ? 'selected' : ''}>Consultancy</option>
            <option value="Overheid" ${bedrijf?.sector === 'Overheid' ? 'selected' : ''}>Overheid</option>
            <option value="Industrie" ${bedrijf?.sector === 'Industrie' ? 'selected' : ''}>Industrie</option>
            <option value="Retail" ${bedrijf?.sector === 'Retail' ? 'selected' : ''}>Retail</option>
            <option value="Overig" ${bedrijf?.sector === 'Overig' ? 'selected' : ''}>Overig</option>
          </select><br>

          <h3>Persoonsinformatie</h3>
          <label for="contact">Contactpersoon:</label><br>
          <input type="text" id="contact" name="contact" value="${bedrijf?.contactpersoon || ''}"><br>

          <label for="emailcontact">Email Contactpersoon:</label><br>
          <input type="text" id="emailcontact" name="emailcontact" value="${bedrijf?.emailcontactpersoon || ''}"><br>

          <h3>Account gegevens</h3>
          <label for="email">E-mailadres Bedrijf:</label><br>
          <input type="email" id="email" name="email" value="${bedrijf?.email || ''}"><br>

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
    sector: form.sector.value,
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
    alert("Bedrijf verwijderd.");
    renderBedrijvenBeheer(); // Terug naar overzicht
  } catch (error) {
    console.error("Fout bij verwijderen:", error);
    alert("Fout bij verwijderen: " + error.message);
  }
});

};