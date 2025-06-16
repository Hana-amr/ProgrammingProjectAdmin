import { renderBedrijvenBeheer } from "./bedrijvenBeheer"

export function renderBedrijf(bedrijf){
    document.getElementById('app').innerHTML = `
  <header>
    <button id="back-btn">←</button>
    <h2 class="titel">Bedrijf Beheren</h2>
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
      <form class="beheer-form">
          <h3>Bedrijfsgegevens</h3>
          <label for="Bedrijfsnaam">Bedrijfsnaam:</label><br>
          <input type="text" id="Bedrijfsnaam" name="Bedrijfsnaam" value="${bedrijf?.naam || ''}"><br>

          <label for="adres">Adres:</label><br>
          <input type="text" id="adres" name="adres" value="${bedrijf?.adres || ''}"><br>

          <h3>Persoonsinformatie</h3>
          <label for="voornaam">Voornaam:</label><br>
          <input type="text" id="voornaam" name="voornaam" value="${bedrijf?.voornaam || ''}"><br>

          <label for="achternaam">Achternaam:</label><br>
          <input type="text" id="achternaam" name="achternaam" value="${bedrijf?.achternaam || ''}"><br>

          <label for="telefoon">Telefoonnummer:</label><br>
          <input type="tel" id="telefoon" name="telefoon" value="${bedrijf?.telefoon || ''}"><br>

          <h3>Account gegevens</h3>
          <label for="email">E-mailadres:</label><br>
          <input type="email" id="email" name="email" value="${bedrijf?.email || ''}"><br>

          <label for="wachtwoord">Wachtwoord:</label><br>
          <input type="password" id="wachtwoord" name="wachtwoord" required><br>

          <label for="herhaalwachtwoord">Herhaal wachtwoord:</label><br>
          <input type="password" id="herhaalwachtwoord" name="herhaalwachtwoord" required><br>

          <button type="submit" class="submit">Pas aan</button>
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
};