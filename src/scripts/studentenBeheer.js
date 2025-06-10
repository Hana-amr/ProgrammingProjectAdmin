import { renderAccountBeherenHome } from "./accountBeherenHome";
import { renderStudent } from "./studentBeheer";

export function renderStudentenBeheer() {
  // Voorbeeld data voor studenten
  const students = [
    { name: "AdamA", email: "AdamA@example.com" },
    { name: "Abdou", email: "Abdou@example.com" },
    { name: "Hana", email: "Hana@example.com" },
    { name: "Kainy", email: "kainy@example.com" },
    { name: "Adam", email: "Adam@example.com" },
    { name: "Ilyas", email: "Ilyas@example.com" },
    { name: "Sanne Smit", email: "sanne@example.com" }
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