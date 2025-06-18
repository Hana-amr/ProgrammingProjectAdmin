import { renderAccountBeherenHome } from "./accountBeherenHome";
import { renderBedrijf } from "./BedrijfBeheren";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase.js';

export async function renderBedrijvenBeheer() {
  const usersRef = collection(db, "user");
  const bedrijvenQuery = query(usersRef, where("role", "==", "bedrijf"));
  const querySnapshot = await getDocs(bedrijvenQuery);

  const bedrijven = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  document.getElementById('app').innerHTML = `
    <h1 id='bedrijven-titel'>Bedrijven Beheer</h1>
    <input type="text" id="search-bedrijf" placeholder="Zoek bedrijf...">
    <div id="bedrijven-tiles">
    </div>
    <button id="back-btn">←</button>
    <button id='backHome-btn'>HOME</button>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    renderAccountBeherenHome();
  });

  document.getElementById('backHome-btn').addEventListener('click', () => {
    window.location.href = 'keuzeMenu.html';
  });

  //logica voor een tile van een bedrijf
  function renderBedrijvenTiles(bedrijven) {
    const tilesHtml = bedrijven.map((bedrijf, idx) => `
      <div class="bedrijf-tile" data-bedrijf-index="${idx}">
        <h3>${bedrijf.bedrijfsnaam}</h3>
        <p>${bedrijf.contactpersoon}</p>
        <p>${bedrijf.email}</p>
        <p>${bedrijf.sector}</p>
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
      bedrijf.bedrijfsnaam.toLowerCase().includes(searchBedrijf) ||
      bedrijf.email.toLowerCase().includes(searchBedrijf)
    );
    renderBedrijvenTiles(filtered);
  });
}