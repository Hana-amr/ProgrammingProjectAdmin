import { renderAccountBeherenHome } from './accountBeherenHome'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-account-beheren');
  if (btn) {
    btn.addEventListener('click', () => {
      renderAccountBeherenHome();
    });
  }
});
