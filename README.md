# ProgrammingProjectAdmin

**Career Launch Admin Platform**  
Webapplicatie voor het beheren van studenten- en bedrijfsaccounts, ontwikkeld door studenten van de Erasmushogeschool Brussel.

---

## Inhoudsopgave

- [Overzicht](#overzicht)
- [Belangrijkste Functionaliteiten](#belangrijkste-functionaliteiten)
- [Technologieën & Structuur](#technologieën--structuur)
- [Installatie & Gebruik](#installatie--gebruik)
- [Projectstructuur](#projectstructuur)
- [Team](#team)
- [Licentie](#licentie)

---

## Overzicht

Deze applicatie stelt beheerders in staat om:
- In te loggen als administrator
- Studenten en bedrijven te registreren (inclusief foto/logo upload)
- Accounts te beheren (bekijken, aanpassen, verwijderen)
- Te zoeken/filteren op studenten en bedrijven
- Gegevens veilig te beheren via Firebase Authentication, Firestore en Storage

---

## Belangrijkste Functionaliteiten

- **Beheerderslogin**  
  Alleen admins kunnen inloggen en accounts beheren.

- **Studentenbeheer**  
  Overzicht, zoeken, aanpassen, verwijderen van studenten.  
  Mogelijkheid om studenten te filteren op naam, e-mail of opleiding.

- **Bedrijvenbeheer**  
  Overzicht, zoeken, aanpassen, verwijderen van bedrijven.  
  Mogelijkheid om bedrijven te filteren op naam of e-mail.

- **Account aanmaken**  
  Studenten en bedrijven kunnen eenvoudig worden toegevoegd via aparte formulieren.  
  Foto/logo upload mogelijk bij registratie.

- **Instellingen**  
  Beheer van tijdsloten voor gesprekken via een centrale instellingenpagina.

---

## Technologieën & Structuur

- **Frontend:**  
  HTML, CSS (`style.css`, `style_bed_stu_forms.css`, `styleInstellingen.css`), JavaScript (ES6 modules)

- **Backend:**  
  Firebase (Authentication, Firestore, Storage)

- **Build Tool:**  
  Vite

- **Ontwikkelomgeving:**  
  Visual Studio Code

---

## Installatie & Gebruik

### 1. Repository klonen

```bash
git clone https://github.com/Hana-amr/ProgrammingProjectAdmin.git
cd ProgrammingProjectAdmin
```

### 2. Dependencies installeren

Zorg dat je [Node.js](https://nodejs.org/) geïnstalleerd hebt.
Zorg er ook voor dat je "Firebase" installeert in de terminal.

```bash
npm install
firebase install
```

### 4. Applicatie starten (lokale webserver)

```bash
npm run dev
```

- De app draait nu lokaal. Open de link die Vite toont in je terminal.

---

## Projectstructuur

```
src/
  scripts/
    AccountAanmakenHome.js      # Startscherm voor account aanmaken
    accountBeherenHome.js       # Startscherm voor accountbeheer
    BedrijfAanmaken.js          # Bedrijf registratieformulier + logica
    BedrijfBeheren.js           # Bedrijf beheren (aanpassen/verwijderen)
    bedrijvenBeheer.js          # Overzicht & zoeken bedrijven
    firebase.js                 # Firebase configuratie
    instellingen.js             # Instellingen voor tijdsloten
    login.js                    # Loginpagina logica
    main.js                     # Entry point, menu logica
    StudentAanmaak.js           # Student registratieformulier + logica
    studentBeheer.js            # Student beheren (aanpassen/verwijderen)
    studentenBeheer.js          # Overzicht & zoeken studenten
  style.css                     # Algemene styling
  style_bed_stu_forms.css       # Styling voor registratieformulieren
  styleInstellingen.css         # Styling voor instellingenpagina
index.html                      # Loginpagina
keuzeMenu.html                  # Hoofdmenu na inloggen
Student.html                    # Student registratieformulier
Bedrijf.html                    # Bedrijf registratieformulier
Instellingen.html               # Instellingenpagina
```

---

## Team

Dit project werd gemaakt door:
- Kainy Zafari
- Hana Amrani
- Adam Akkay
- Abdourahim Aboulkassimi
- Adam Jaidi
- Ilyas Fariss

---

## Licentie

Dit project is uitsluitend bedoeld voor educatieve doeleinden binnen de opleiding aan EhB.

---

Veel succes met het gebruik van onze applicatie!
