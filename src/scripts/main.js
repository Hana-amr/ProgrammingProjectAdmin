import { renderAccountBeherenHome } from './accountBeherenHome'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-account-beheren');
  if (btn) {
    btn.addEventListener('click', () => {
      renderAccountBeherenHome();
    });
  }
});

import { renderAccountAanmakenHome } from './accountAanmakenHome'

document.addEventListener('DOMContentLoaded', () => {
  const btnAanmaken = document.getElementById('btn-account-aanmaken');
   if(btnAanmaken){
    btnAanmaken.addEventListener('click', () => {
      renderAccountAanmakenHome();
    } );
  }
  });
