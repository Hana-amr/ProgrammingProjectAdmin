import { renderAccountBeherenHome } from './accountBeherenHome'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-account-beheren');
  if (btn) {
    btn.addEventListener('click', () => {
      renderAccountBeherenHome();
    });
  }
});

import { renderAccountAanmakenHome } from './AccountAanmakenHome'

document.addEventListener('DOMContentLoaded', () => {
  const btnAanmaken = document.getElementById('btn-account-aanmaken');
   if(btnAanmaken){
    btnAanmaken.addEventListener('click', () => {
      renderAccountAanmakenHome();
    } );
  }
  });

 document.getElementById('btn-logout').addEventListener('click', () => {
    window.location.href = 'index.html'; 
   });
