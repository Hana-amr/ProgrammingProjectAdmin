export function renderStudentenBeheer() {
  document.getElementById('app').innerHTML = `
    <h1 id='student-titel'>Studenten Beheer</h1>
    <input type="text" id="search-student" placeholder="Zoek student...">
    <button id='btn-studenten-toevoegen'>Student Toevoegen</button>
    <button id="back-btn"> > </button>
    <button id='btn-home'>Home</button>
  `;

  // Optional: Add a back button handler
  document.getElementById('back-btn').addEventListener('click', () => {
    location.reload(); // Reloads the page to go back to the original content
  });
  
  document.getElementById('btn-home').addEventListener('click', () => {
    location.href = '/'; // Redirects to the home page
  });
}