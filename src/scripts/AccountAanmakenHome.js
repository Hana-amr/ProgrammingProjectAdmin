export function renderAccountAanmakenHome() {
   document.getElementById('app').innerHTML = `
    <h1>Account Aanmaken</h1>
    <button id="btn-student">Student</button>
    <button id="btn-bedrijf">Bedrijf</button>
    <button id="backhome-btn"> < </button>
  `;

  document.getElementById('btn-student').addEventListener('click', () => {
    window.location.href = 'student.html'; 
  });

  document.getElementById('btn-bedrijf').addEventListener('click', () => {
    window.location.href = 'bedrijf.html'; 
})

   document.getElementById('backhome-btn').addEventListener('click', () => {
     location.reload(); 
   });
}
