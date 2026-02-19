import { getFavorites, toggleFavorite } from './local_favorites.js';

const grid = document.querySelector('.favorites-grid');
const empty = document.querySelector('.favorites-empty');
const categoriesContainer = document.querySelector('.favorites-categories');

function renderCategories(favorites) {
  const uniqueCategories = [...new Set(favorites.map(item => item.category))];

  categoriesContainer.innerHTML = uniqueCategories
    .map(
      cat => `
    <button class="category-btn" data-category="${cat}">
      ${cat}
    </button>
  `
    )
    .join('');
}

function renderCards(recipes) {
  grid.innerHTML = recipes
    .map(
      recipe => `
    <div class="recipe-card" data-id="${recipe._id}">
      <img src="${recipe.thumb}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description || ''}</p>
      <p>⭐ ${recipe.rating}</p>
      <p>⏱ ${recipe.time || ''}</p>
      <button class="favorite-btn">❤</button>
    </div>
  `
    )
    .join('');
}

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    empty.style.display = 'block';
    grid.style.display = 'none';
    categoriesContainer.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  grid.style.display = 'grid';
  categoriesContainer.style.display = 'flex';

  renderCategories(favorites);
  renderCards(favorites);
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('favorite-btn')) {
    const card = e.target.closest('.recipe-card');
    const id = card.dataset.id;

    const favorites = getFavorites();
    const recipe = favorites.find(item => item._id === id);

    toggleFavorite(recipe);
    renderFavorites();
  }

  if (e.target.classList.contains('category-btn')) {
    const category = e.target.dataset.category;
    const favorites = getFavorites();
    const filtered = favorites.filter(item => item.category === category);
    renderCards(filtered);
  }
});

renderFavorites();
