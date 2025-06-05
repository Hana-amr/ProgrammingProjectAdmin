import { renderBedrijvenBeheer } from './bedrijvenBeheer';
import { renderStudentenBeheer } from './studentenBeheer';

export function renderAccountBeherenHome() {
  document.getElementById('app').innerHTML = `
    <h1>Account Beheren</h1>
    <button id='btn-studenten-beheer'>Studenten</button>
    <button id='btn-bedrijven-beheer'>Bedrijven</button>
    <button id="back-btn"> > </button>
  `;

  // Voeg eventlistener toe aan de nieuwe studenten-knop
  document.getElementById('btn-studenten-beheer').addEventListener('click', () => {
    renderStudentenBeheer();
  });

  document.getElementById('btn-bedrijven-beheer').addEventListener('click', () => (
    renderBedrijvenBeheer()
  ));

  // Terug-knop handler
  document.getElementById('back-btn').addEventListener('click', () => {
    location.reload();
  });
}
