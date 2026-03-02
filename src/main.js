import PopularRecipesApp from './js/popular-recipes.js';

window.addEventListener('load', () => {
  PopularRecipesApp.init();
});

import './js/recipes.js';
import './js/recipes-filter.js';
import './js/recipes-categories.js';

// ---------------- SCROLL UP ----------------

const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-up-btn';
scrollBtn.innerHTML = '↑';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

