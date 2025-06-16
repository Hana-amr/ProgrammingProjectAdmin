import { renderAccountBeherenHome } from "./accountBeherenHome";
import { renderBedrijf } from "./BedrijfBeheren";

export function renderBedrijvenBeheer() {
  // Voorbeeld data voor bedrijven
  const bedrijven = [
    {
      naam: "Bedrijf A",
      vertegenwoordiger: "Jan Jansen",
      adres: "Straat 1, 1234 AB Utrecht",
      ondernemingsnummer: "12345678",
      voornaam: "Jan",
      achternaam: "Jansen",
      telefoon: "0301234567",
      email: "info@bedrijfA.nl"
    },
    {
      naam: "Bedrijf B",
      vertegenwoordiger: "Piet Pietersen",
      adres: "Laan 2, 2345 BC Amsterdam",
      ondernemingsnummer: "87654321",
      voornaam: "Piet",
      achternaam: "Pietersen",
      telefoon: "0207654321",
      email: "contact@bedrijfB.nl"
    },
    {
      naam: "Bedrijf C",
      vertegenwoordiger: "Sanne de Vries",
      adres: "Dreef 3, 3456 CD Rotterdam",
      ondernemingsnummer: "11223344",
      voornaam: "Sanne",
      achternaam: "de Vries",
      telefoon: "0101122334",
      email: "mail@bedrijfC.nl"
    }
  ];

  document.getElementById('app').innerHTML = `
    <h1 id='bedrijven-titel'>Bedrijven Beheer</h1>
    <input type="text" id="search-bedrijf" placeholder="Zoek bedrijf...">
    <button id='btn-bedrijven-toevoegen'>Bedrijf Toevoegen</button>
    <div id="bedrijven-tiles">
    </div>
    <button id="back-btn"> > </button>
    <button id='btn-home'>Home</button>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    renderAccountBeherenHome();
  });

  document.getElementById('btn-home').addEventListener('click', () => {
    window.location.href = 'keuzeMenu.html';
  });

  //logica voor een tile van een bedrijf
  function renderBedrijvenTiles(bedrijven, idx) {
    const tilesHtml = bedrijven.map((bedrijf, idx) => `
      <div class="bedrijf-tile" data-bedrijf-index="${idx}">
        <h3>${bedrijf.naam}</h3>
        <p>${bedrijf.email}</p>
      </div>
    `).join('');
    document.getElementById('bedrijven-tiles').innerHTML = tilesHtml;
    addTileClickListeners(bedrijven);
  }

  //initele render van de bedrijven tiles
  renderBedrijvenTiles(bedrijven);

  function addTileClickListeners(bedrijven) {
    document.querySelectorAll('.bedrijf-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const idx = tile.getAttribute('data-bedrijf-index');
        const bedrijf = bedrijven[idx];
        renderBedrijf(bedrijf, idx);
      });
    });
  }

  //zoekfunctie voor bedrijven
  document.getElementById('search-bedrijf').addEventListener('input', (event) => {
    const searchBedrijf = event.target.value.toLowerCase();
    const filtered = bedrijven.filter(bedrijf =>
      bedrijf.naam.toLowerCase().includes(searchBedrijf) ||
      bedrijf.email.toLowerCase().includes(searchBedrijf)
    );
    renderBedrijvenTiles(filtered);
  });
}