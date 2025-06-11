import { renderAccountBeherenHome } from "./accountBeherenHome";
import { renderStudent } from "./studentBeheer";

export function renderStudentenBeheer() {
  // Voorbeeld data voor studenten
  const students = [
    {
      name: "AdamA",
      email: "AdamA@example.com",
      richting: "Informatica",
      voornaam: "Adam",
      achternaam: "A.",
      telefoon: "0612345678"
    },
    {
      name: "Abdou",
      email: "Abdou@example.com",
      richting: "ICT",
      voornaam: "Abdou",
      achternaam: "B.",
      telefoon: "0687654321"
    },
    {
      name: "Hana",
      email: "Hana@example.com",
      richting: "",
      voornaam: "Hana",
      achternaam: "C.",
      telefoon: "0611122233"
    },
    {
      name: "Kainy",
      email: "kainy@example.com",
      richting: "Toegepaste Informatica",
      voornaam: "Kainy",
      achternaam: "D.",
      telefoon: "0622233344"
    }
  ];

  //logica voor een tile van een student
  function renderStudentTiles(students) {
    const tilesHtml = students.map((student, idx) => `
      <div class="student-tile" data-student-index="${idx}">
        <h3>${student.name}</h3>
        <p>${student.email}</p>
      </div>
    `).join('');
    document.getElementById('studenten-tiles').innerHTML = tilesHtml;
    addTileClickListeners(students);
  }

  document.getElementById('app').innerHTML = `
    <h1 id='student-titel'>Studenten Beheer</h1>
    <input type="text" id="search-student" placeholder="Zoek student...">
    <button id="back-btn"> > </button>
    <button id='btn-home'>Home</button>
    <div id="studenten-tiles"></div>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    renderAccountBeherenHome();
  });

  document.getElementById('btn-home').addEventListener('click', () => {
    location.href = 'index.html';
  });

  //initiele render van de student tiles
  renderStudentTiles(students);

  function addTileClickListeners(students) {
    document.querySelectorAll('.student-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const idx = tile.getAttribute('data-student-index');
        const student = students[idx];
        renderStudent(student, idx);
      });
    });
  }

  //zoekfunctie voor studenten
  document.getElementById('search-student').addEventListener('input', (event) => {
    const searchStudent = event.target.value.toLowerCase();
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchStudent) ||
      student.email.toLowerCase().includes(searchStudent)
    );
    renderStudentTiles(filtered);
  });
}