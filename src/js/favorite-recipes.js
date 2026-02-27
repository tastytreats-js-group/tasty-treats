import { getFavorites, removeFavorite } from './local_favorites.js';
import { openRecipeModal } from './recipeModal.js';
import { fetchRecipeDetails } from '../api/tastyTreats-api.js';
import spriteUrl from '../img/sprite.svg';

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

  listEl.querySelectorAll('.recipeCard').forEach(card => {
    const id = card.dataset.id;
    const recipe = favorites.find(r => r._id === id);
    card.style.backgroundImage = `linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%), url(${recipe.preview})`;
  });

  addRemoveListeners();
  addSeeRecipeListeners();
}

// ---------------- STARS ----------------

function renderStars(rating) {
  const fullStars = Math.round(rating);
  return Array.from(
    { length: 5 },
    (_, i) => `
      <svg class="star ${i < fullStars ? 'star-filled' : 'star-empty'}">
        <use href="${spriteUrl}#icon-star"></use>
      </svg>
    `
  ).join('');
}

// ---------------- CARD TEMPLATE ----------------

function createCard(recipe) {
  return `
    <li class="recipeCard" data-id="${recipe._id}">
      <div class="likeButton" data-id="${recipe._id}">
        <svg class="like-icon">
          <use href="${spriteUrl}#icon-heart-filled"></use>
        </svg>
      </div>
      <div class="rest">
        <p class="recipeTitle">${recipe.title}</p>
        <p class="recipeDescription">${recipe.description ?? ''}</p>
        <div class="ratingandbutton">
          <div class="recipeRating">
            <p class="rating">${recipe.rating ?? 0}</p>
            <div class="stars">${renderStars(recipe.rating ?? 0)}</div>
          </div>
          <button class="seeRecipe">See recipe</button>
        </div>
      </div>
    </li>
  `;
}

// ---------------- REMOVE LISTENER ----------------

function addRemoveListeners() {
  listEl.querySelectorAll('.likeButton').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      removeFavorite(id);
      favorites = getFavorites();

      if (!favorites.length) {
        showEmpty();
        return;
      }

      const filtered =
        currentCategory === 'All'
          ? favorites
          : favorites.filter(item => item.category === currentCategory);

      renderCategories();
      renderRecipes(filtered);
    });
  });
}

// ---------------- SEE RECIPE LISTENER ----------------

function addSeeRecipeListeners() {
  listEl.querySelectorAll('.seeRecipe').forEach(btn => {
    btn.addEventListener('click', async () => {
      const recipeId = btn.closest('.recipeCard').dataset.id;
      try {
        const recipeData = await fetchRecipeDetails(recipeId);
        openRecipeModal(recipeData);
      } catch (error) {
        console.error('Tasty Error:', error);
      }
    });
  });
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