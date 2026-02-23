import { getFavorites } from './local_favorites.js';

const listEl = document.querySelector('.js-favorites-list');
const categoriesEl = document.querySelector('.js-favorites-categories');
const emptyEl = document.querySelector('.js-favorites-empty');

let favorites = [];
let currentCategory = 'All';

document.addEventListener('DOMContentLoaded', init);

function init() {
  favorites = getFavorites();

  if (!favorites.length) {
    showEmpty();
    return;
  }

  renderCategories();
  renderRecipes(favorites);
}

// ---------------- EMPTY ----------------

function showEmpty() {
  emptyEl.classList.remove('is-hidden');
  listEl.classList.add('is-hidden');
  categoriesEl.classList.add('is-hidden');
}

// ---------------- RENDER RECIPES ----------------

function renderRecipes(data) {
  listEl.innerHTML = data.map(createCard).join('');
}

// ---------------- CARD TEMPLATE ----------------

function createCard(recipe) {
  return `
    <li class="recipe-card">
      <img 
        src="${recipe.thumb}" 
        alt="${recipe.title}" 
        class="recipe-card-img"
      />

      <div class="recipe-card-content">
        <h3 class="recipe-card-title">${recipe.title}</h3>

        <div class="recipe-card-meta">
          <span>⭐ ${recipe.rating ?? 0}</span>
          <span>${recipe.time ?? 0} min</span>
        </div>
      </div>
    </li>
  `;
}

// ---------------- CATEGORIES ----------------

function renderCategories() {
  const uniqueCategories = [
    'All',
    ...new Set(favorites.map(item => item.category)),
  ];

  categoriesEl.innerHTML = uniqueCategories
    .map(
      category => `
      <button 
        class="category-btn ${category === currentCategory ? 'active' : ''}"
        data-category="${category}"
      >
        ${category}
      </button>
    `
    )
    .join('');

  addCategoryListeners();
}

function addCategoryListeners() {
  const buttons = categoriesEl.querySelectorAll('.category-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.category;

      const filtered =
        currentCategory === 'All'
          ? favorites
          : favorites.filter(item => item.category === currentCategory);

      renderCategories();
      renderRecipes(filtered);
    });
  });
}
