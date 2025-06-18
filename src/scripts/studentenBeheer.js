import { renderAccountBeherenHome } from "./accountBeherenHome";
import { renderStudent } from "./studentBeheer.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase.js';

export async function renderStudentenBeheer() {
  const usersRef = collection(db, "user");
  const studentenQuery = query(usersRef, where("role", "==", "student"));
  const querySnapshot = await getDocs(studentenQuery);

  const students = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
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
    <input type="text" id="search-student" placeholder="Zoek student of richting...">
    <button id="back-btn"> ← </button>
    <button id='backHome-btn'>HOME</button>
    <div id="studenten-tiles"></div>
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    renderAccountBeherenHome();
  });

  document.getElementById('backHome-btn').addEventListener('click', () => {
    location.href = 'keuzeMenu.html';
  });

  renderStudentTiles(students);

  // Zoekfunctie
  document.getElementById('search-student').addEventListener('input', (event) => {
    const searchStudent = event.target.value.toLowerCase();
    const filtered = students.filter(student =>
      student.firstname.toLowerCase().includes(searchStudent) ||
      student.surname.toLowerCase().includes(searchStudent) ||
      student.email.toLowerCase().includes(searchStudent) ||
      student.opleiding.toLowerCase().includes(searchStudent)
    );
    renderStudentTiles(filtered);
  });

  function renderStudentTiles(students) {
    const tilesHtml = students.map((student, idx) => `
      <div class="student-tile" data-student-index="${idx}">
        <h3>${student.firstname}</h3>
        <p>${student.surname}</p>
        <p>${student.email}</p>
        <p>${student.opleiding}</p>
      </div>
    `).join('');
    document.getElementById('studenten-tiles').innerHTML = tilesHtml;
    addTileClickListeners(students);
  }

  function addTileClickListeners(students) {
    document.querySelectorAll('.student-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const idx = tile.getAttribute('data-student-index');
        const student = students[idx];
        renderStudent(student, idx);
      });
    });
  }
}