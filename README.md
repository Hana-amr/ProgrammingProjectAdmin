# ProgrammingProjectAdmin

Dit project is ontwikkeld door studenten in het kader van het vak **Programming Project** aan de Erasmushogeschool Brussel. Het is een webapplicatie voor het beheren van studenten- en bedrijfsaccounts binnen het Career Launch-platform.

## Over het project

Met deze applicatie kunnen beheerders:
- Inloggen als administrator
- Studenten en bedrijven registreren (met foto/logo upload)
- Accounts beheren (bekijken, aanpassen, verwijderen)
- Zoeken/filteren op studenten en bedrijven
- Veilig wachtwoorden en gegevens beheren via Firebase Authentication en Firestore

## Functionaliteiten

- **Login voor beheerders**
- **Studentenbeheer:** Overzicht, zoeken, aanpassen, verwijderen
- **Bedrijvenbeheer:** Overzicht, zoeken, aanpassen, verwijderen
- **Account aanmaken:** Studenten en bedrijven kunnen eenvoudig worden toegevoegd
- **Foto/logo upload** bij registratie

## Gebruikte technologieën

- **HTML, CSS, JavaScript (ES6 modules)**
- **Vite**
- **Firebase** (Authentication, Firestore, Storage)
- **VS Code** als ontwikkelomgeving

## Installatie & Gebruik

1. **Clone deze repository:**
   ```bash
   git clone https://github.com/Hana-amr/ProgrammingProjectAdmin.git
   ```

3. **Start een lokale webserver** (aanbevolen):
   - via de terminal:
     ```bash
     npm run dev .
     ```

## Mappenstructuur

```
src/
  scripts/         # Alle JavaScript modules
  style.css        # Algemene styling
  style_bed_stu_forms.css # Styling voor registratieformulieren
index.html         # Loginpagina
keuzeMenu.html     # Hoofdmenu na inloggen
Student.html       # Student registratieformulier
Bedrijf.html       # Bedrijf registratieformulier
```

## Team

Dit project werd gemaakt door:
- Kainy Zafari
- Hana Amrani
- Adam Akkay
- Abdourahim Aboulkassimi
- Adam Jaidi
- Ilyas Fariss

## Licentie

Dit project is uitsluitend bedoeld voor educatieve doeleinden binnen de opleiding aan EhB.

---

Veel succes met het gebruik van onze applicatie!
