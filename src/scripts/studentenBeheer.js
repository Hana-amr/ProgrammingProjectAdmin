import { renderAccountBeherenHome } from "./accountBeherenHome";
import { renderStudent } from "./studentBeheer";
import { initializeApp } from "firebase/app";
import {getFirestore, collection, query, where, getDocs, deleteDoc, doc
} from "firebase/firestore";
import { firebaseConfig } from "./firebase";

export async function renderStudentenBeheer() {
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  let students = []; // <-- Maak een array aan die overal in de functie beschikbaar is

  // Zoek en toon studenten
  async function laadStudenten() {
    const q = query(collection(db, "user"), where("role", "==", "student"));
    const querySnapshot = await getDocs(q);

    students = []; // Leeg de array voor nieuwe data
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      students.push({
        id: docSnap.id,
        name: `${data.firstname} ${data.surname}`,
        email: data.email,
        opleiding: data.opleiding,
        gsm: data.gsm
      });
    });

    renderStudentTiles(students); // Render de tiles met de opgehaalde studenten
  }
  
  // Verwijder student
  window.verwijderStudent = async function (id) {
    if (confirm("Weet je zeker dat je deze student wil verwijderen?")) {
      await deleteDoc(doc(db, "user", id));
      laadStudenten();
    }
  };
  
  //logica voor een tile van een student
  function renderStudentTiles(studentsToRender) {
    const tilesHtml = studentsToRender.map((student, idx) => `
      <div class="student-tile" data-student-index="${idx}">
        <h3>${student.name}</h3>
        <p>${student.email}</p>
      </div>
    `).join('');
    document.getElementById('studenten-tiles').innerHTML = tilesHtml;
    addTileClickListeners(studentsToRender);
  }

  function addTileClickListeners(studentsToRender) {
    document.querySelectorAll('.student-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const idx = tile.getAttribute('data-student-index');
        const student = studentsToRender[idx];
        renderStudent(student, idx);
      });
    });
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

  //zoekfunctie voor studenten
  document.getElementById('search-student').addEventListener('input', (event) => {
    const searchStudent = event.target.value.toLowerCase();
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchStudent) ||
      student.email.toLowerCase().includes(searchStudent)
    );
    renderStudentTiles(filtered);
  });

  // Start met het ophalen en tonen van studenten
  await laadStudenten();
}
