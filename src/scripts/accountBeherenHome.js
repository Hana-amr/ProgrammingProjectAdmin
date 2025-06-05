export function renderAccountBeherenHome() {
  console.log('renderAccountBeherenHome called');

  document.getElementById('app').innerHTML = `
    <h1>Nieuwe Pagina</h1>
    <p>De inhoud is succesvol vervangen!</p>
    <button id="back-btn">Terug</button>
  `;

  console.log('Account Beheren Home rendered');

  // Optional: Add a back button handler
  document.getElementById('back-btn').addEventListener('click', () => {
    location.reload(); // Reloads the page to go back to the original content
  });
}
