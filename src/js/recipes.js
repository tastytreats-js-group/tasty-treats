console.log('FILE IS RUNNING');
import { fetchFilteredRecipes } from '../api/tastyTreats-api.js';
import { openRecipeModal } from './recipeModal.js';
import { addFavorite, removeFavorite, isFavorite } from './local_favorites.js';

// API search parameters
export let params = {
  page: 1,
  limit: getlimit(),
};

// Number of cards that will show up regarding the page width
function getlimit() {
  const width = window.innerWidth;
  if (width >= 1280) return 9;
  if (width >= 768) return 8;
  else return 6;
}

export async function loadRecipes() {
    try {
        const data = await fetchFilteredRecipes(params);
        renderRecipes(data.results);
    } catch (error) {
        console.error('Recipes could not load', error);
    }
};

loadRecipes();

function renderStars(rating) {
  const fullStars = Math.round(rating);
  return Array.from(
    { length: 5 },
    (_, i) => `
        <svg class="star ${i < fullStars ? 'star-filled' : 'star-empty'}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `
  ).join('');
}

const recipeList = document.querySelector(".recipeList");
let currentRecipes = [];

async function renderRecipes(results) {
  currentRecipes = results;
  recipeList.innerHTML = results
    .map(
      result => `
            <li class="recipeCard" data-id="${result._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-${isFavorite(result._id) ? 'heart-filled' : 'heart-outline'}"></use>
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

  // The gradient overlay in front of the background image
  document.querySelectorAll('.recipeCard').forEach(card => {
    const id = card.dataset.id;
    const recipe = results.find(r => r._id === id);
    card.style.backgroundImage = `linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${recipe.preview})`;
  });

  // Check for already liked recipes
  const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || {};
  document.querySelectorAll('.recipeCard').forEach(card => {
    if (likedRecipes[card.dataset.id]) {
      card
        .querySelector('use')
        .setAttribute('href', '../img/sprite.svg#icon-heart-filled');
    }
  });
}

if (recipeList) {
  recipeList.addEventListener('click', async event => {
    const seeRecipeBtn = event.target.closest('.seeRecipe');

    if (seeRecipeBtn) {
      const recipeId = seeRecipeBtn.closest('.recipeCard').dataset.id;
      try {
        const { fetchRecipeDetails } =
          await import('../api/tastyTreats-api.js');
        const recipeData = await fetchRecipeDetails(recipeId);
        openRecipeModal(recipeData);
      } catch (error) {
        console.error('Tasty Error:', error);
      }
    }

    const likeButton = event.target.closest('.likeButton');
    if (likeButton) {
        const recipeId = likeButton.closest('.recipeCard').dataset.id;
            if (isFavorite(recipeId)) {
                removeFavorite(recipeId);
                useEl.setAttribute("href", "../img/sprite.svg#icon-heart-outline");
            } else {
                const recipe = currentRecipes.find(r => r._id === recipeId);
                addFavorite(recipe);
                useEl.setAttribute("href", "../img/sprite.svg#icon-heart-filled");
            }
        }
    });
    
}
window.addEventListener('favoritesUpdated', (event) => {
    const { recipeId, status } = event.detail;
    
    const card = document.querySelector(`.recipeCard[data-id="${recipeId}"]`);
    if (card) {
        const useEl = card.querySelector(".likeButton use");
        if (useEl) {
            const iconPath = status ? 'heart-filled' : 'heart-outline';
            useEl.setAttribute("href", `../img/sprite.svg#icon-${iconPath}`);
        }
    }
});