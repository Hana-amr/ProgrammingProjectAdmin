import { renderAccountBeherenHome } from "./accountBeherenHome";
import { renderBedrijf } from "./BedrijfBeheren";

export function renderBedrijvenBeheer() {
// Voorbeeld data voor bedrijven
  const bedrijven =[
    { name: "Bedrijf A", email: "sdsadaaa" },
    { name: "Bedrijf B", email: "sdsadaaa" },
    { name: "Bedrijf C", email: "sdsadaaa" },
    { name: "Bedrijf D", email: "sdsadaaa" },
    { name: "Bedrijf E", email: "sdsadaaa" },
    { name: "Bedrijf F", email: "sdsadaaa" },
    { name: "Bedrijf G", email: "sdsadaaa" }
  ]

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
    location.href = '/';
  });

  //logica voor een tile van een bedrijf
function renderBedrijvenTiles(bedrijven, idx) {
    const tilesHtml = bedrijven.map(bedrijf => `
      <div class="bedrijf-tile" data-bedrijf-index="${idx}">
        <h3>${bedrijf.name}</h3>
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
      bedrijf.name.toLowerCase().includes(searchBedrijf) ||
      bedrijf.email.toLowerCase().includes(searchBedrijf)
    );
    renderBedrijvenTiles(filtered);
    });
}