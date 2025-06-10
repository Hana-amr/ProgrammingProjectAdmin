import { renderStudentenBeheer } from './studentenBeheer.js';

export function renderStudent(){
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
            <form class="beheer-form">
                    <h3>Onderwijsgegevens</h3>
                    <label for="school">Naam school:</label><br>
                    <input type="text" id="school" name="school" required><br>

                    <label for="richting">Richting:</label><br>
                    <input type="text" id="richting" name="richting" required><br>

                    <h3>Contactpersoongegevens</h3>
                    <label for="voornaam">Voornaam:</label><br>
                    <input type="text" id="voornaam" name="voornaam" required><br>

                    <label for="achternaam">Achternaam:</label><br>
                    <input type="text" id="achternaam" name="achternaam" required><br>

                    <label for="telefoon">Telefoonnummer:</label><br>
                    <input type="tel" id="telefoon" name="telefoon" required><br>

                    <h3>Accountgegevens</h3>
                    <label for="email">E-mailadres:</label><br>
                    <input type="email" id="email" name="email" required><br>

                    <label for="wachtwoord">Wachtwoord:</label><br>
                    <input type="password" id="wachtwoord" name="wachtwoord" required><br>

                    <label for="herhaalwachtwoord">Herhaal wachtwoord:</label><br>
                    <input type="password" id="herhaalwachtwoord" name="herhaalwachtwoord" required><br>

                    <button type="submit" class="submit">Pas aan</button>
                </form>
            </div>
        </div>
    </section>
`
document.getElementById('back-btn').addEventListener('click', () => {
  renderStudentenBeheer();
})
document.getElementById('backHome-btn').addEventListener('click', () => {
  location.href = 'index.html';
});
};