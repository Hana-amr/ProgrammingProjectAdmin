import { renderBedrijvenBeheer } from "./bedrijvenBeheer"

export function renderBedrijf(){
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
          <label for="Bedrijfsnaam">Bedrijfsnaam:</label><br>
          <input type="text" id="adres" name="adres" required><br>

          <label for="Vertegenwoordiger: ">Vertegenwoordiger:</label><br>
          <input type="text" id="Vertegenwoordiger" name="Vertegenwoordiger"><br>


          <h3>Bedrijfsgegevens</h3>
          <label for="adres">Adres:</label><br>
          <input type="text" id="adres" name="adres" required><br>

          <label for="ondernemingsnummer">Ondernemingsnummer:</label><br>
          <input type="text" id="ondernemingsnummer" name="ondernemingsnummer" required><br>

          <h3>Contactpersoon gegevens</h3>
          <label for="voornaam">Voornaam:</label><br>
          <input type="text" id="voornaam" name="voornaam" required><br>

          <label for="achternaam">Achternaam:</label><br>
          <input type="text" id="achternaam" name="achternaam" required><br>

          <label for="telefoon">Telefoonnummer:</label><br>
          <input type="tel" id="telefoon" name="telefoon" required><br>

          <h3>Account gegevens</h3>
          <label for="email">E-mailadres:</label><br>
          <input type="email" id="email" name="email" required><br>

          <label for="wachtwoord">Wachtwoord:</label><br>
          <input type="password" id="wachtwoord" name="wachtwoord" required><br>

          <button type="submit" class="submit">Registreren</button>
        </form>
      </div>
    </div>
  </section>`

  document.getElementById('backHome-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; 
  });
  document.getElementById('back-btn').addEventListener('click', () => {
    renderBedrijvenBeheer();
  });
};