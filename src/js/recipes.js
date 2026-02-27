console.log('FILE IS RUNNING');
import { fetchFilteredRecipes } from '../api/tastyTreats-api.js';
import { openRecipeModal } from './recipeModal.js';
import { addFavorite, removeFavorite, isFavorite } from './local_favorites.js';
import spriteUrl from '../img/sprite.svg';

export let params = {
  page: 1,
  limit: getlimit(),
};

function getlimit() {
  const width = window.innerWidth;
  if (width >= 1280) return 15;
  if (width >= 768) return 10;
  else return 8;
}

// Get recipes from API
export async function loadRecipes() {
    try {
        const data = await fetchFilteredRecipes(params);
        renderRecipes(data.results);
        renderPagination(data.totalPages, params.page);
    } catch (error) {
        console.error('Recipes could not load', error);
    }
};

// Pagination
function renderPagination(totalPages, page) {
  const paginations = document.querySelectorAll(".pagination");
  if (!paginations.length) return;

  function getPageNumbers() {
    const isMobile = window.innerWidth < 768;
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (page === 1) {
        pages.push(1, 2);
        if (!isMobile) pages.push(3);
        pages.push('...');
      } else {
        for (let i = page - 1; i <= Math.min(totalPages - 1, page + (isMobile ? 1 : 2)); i++) {
        pages.push(i);
        }
      }
    }
    return pages;
  }

  const pageNumbers = getPageNumbers();

  paginations.forEach(pagination => {
    pagination.innerHTML = `
      <div class="firstandprev">
        <button class="firstpage" ${page <= 1 ? 'disabled' : ''}><<</button>
        <button class="previouspage" ${page <= 1 ? 'disabled' : ''}><</button>
      </div>

      <div class="pagenumbers">
        ${pageNumbers.map(p => p === '...'
      ? `<button class="restdots">...</button>`
      : `<button class="pagenumber ${p === page ? 'pagenumber--active' : ''}" data-page="${p}">${p}</button>`
    ).join('')}
      </div>

      <div class="nextandlast">
        <button class="nextpage" ${page >= totalPages ? 'disabled' : ''}>></button>
        <button class="lastpage" ${page >= totalPages ? 'disabled' : ''}>>></button>
      </div>
  `;

    // First and last pages
    pagination.querySelector('.firstpage').addEventListener('click', () => {
      if (params.page > 1) { params.page = 1; loadRecipes(); }
    });
    pagination.querySelector('.lastpage').addEventListener('click', () => {
      if (params.page < totalPages) { params.page = totalPages; loadRecipes(); }
    });

    // Previous and next pages
    pagination.querySelector('.previouspage').addEventListener('click', () => {
      if (params.page > 1) { params.page -= 1; loadRecipes(); }
    });
    pagination.querySelector('.nextpage').addEventListener('click', () => {
      if (params.page < totalPages) { params.page += 1; loadRecipes(); }
    });

    // Page Numbers
    pagination.querySelectorAll('.pagenumber').forEach(btn => {
      btn.addEventListener('click', () => {
        params.page = parseInt(btn.dataset.page);
        loadRecipes();
        document.querySelector('.recipeList').scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
}

loadRecipes();

// Number of stars that will show up regarding the rating
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

const recipeList = document.querySelector('.recipeList');
let currentRecipes = [];

async function renderRecipes(results) {
  currentRecipes = results;
  recipeList.innerHTML = results
    .map(
      result => `
        <li class="recipeCard" data-id="${result._id}">
          <div class="likeButton">
            <svg class="like-icon">
              <use href="${spriteUrl}#icon-${isFavorite(result._id) ? 'heart-filled' : 'heart-outline'}"></use>
            </svg>
          </div>
          <div class="rest">
            <p class="recipeTitle">${result.title}</p>
            <p class="recipeDescription">${result.description}</p>
            <div class="ratingandbutton">
              <div class="recipeRating">
                <p class="rating">${result.rating}</p>
                <div class="stars">${renderStars(result.rating)}</div>
              </div>
              <button class="seeRecipe">See recipe</button>
            </div>
          </div>
        </li>
      `
    )
    .join('');

  document.querySelectorAll('.recipeCard').forEach(card => {
    const id = card.dataset.id;
    const recipe = results.find(r => r._id === id);
    card.style.backgroundImage = `linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${recipe.preview})`;
  });
}

if (recipeList) {
  recipeList.addEventListener('click', async event => {

    const seeRecipeBtn = event.target.closest('.seeRecipe');
    if (seeRecipeBtn) {
      const recipeId = seeRecipeBtn.closest('.recipeCard').dataset.id;
      try {
        const { fetchRecipeDetails } = await import('../api/tastyTreats-api.js');
        const recipeData = await fetchRecipeDetails(recipeId);
        openRecipeModal(recipeData);
      } catch (error) {
        console.error('Tasty Error:', error);
      }
    }

    const likeButton = event.target.closest('.likeButton');
    if (likeButton) {
      const card = likeButton.closest('.recipeCard');
      const recipeId = card.dataset.id;
      const useEl = likeButton.querySelector('use');

      if (isFavorite(recipeId)) {
        removeFavorite(recipeId);
        useEl.setAttribute('href', `${spriteUrl}#icon-heart-outline`);
      } else {
        const recipe = currentRecipes.find(r => r._id === recipeId);
        addFavorite(recipe);
        useEl.setAttribute('href', `${spriteUrl}#icon-heart-filled`);
      }
    }
  });
}


window.addEventListener('favoritesUpdated', event => {
  const { recipeId, status } = event.detail;
  const card = document.querySelector(`.recipeCard[data-id="${recipeId}"]`);
  if (card) {
    const useEl = card.querySelector('.likeButton use');
    if (useEl) {
      useEl.setAttribute('href', `${spriteUrl}#icon-${status ? 'heart-filled' : 'heart-outline'}`);
    }
  }
});