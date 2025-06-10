export function renderStudent(){
document.getElementById('app').innerHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Registratieformulier</title>
    <link rel="stylesheet" type="text/css" href="src/styleStudentenEnBedrijvenAanmaken.css">
</head>

<body>
    <header id="AccountAanmakenTitel">
        <button id="back-btn">←</button>
        <h2 class="titel">Student Beheren</h2>
        <button id="backHome-btn">HOME</button>
    </header>

    <!--Studentenformulier-->
    <section class="registratie" id="registreerEenStudent">
        <div class="registratie-container">

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
            <div class="registratie-form">
                <form action="">
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

</body>

</html>
`
document.getElementById('back-btn').addEventListener('click', () => {
  renderStudentenBeheer();
})
};