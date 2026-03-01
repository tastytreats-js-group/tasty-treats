import { fetchFilteredRecipes, fetchRecipeDetails } from '../api/tastyTreats-api.js';
import { openRecipeModal } from './recipeModal.js';

const popularRecipesList = document.querySelector('.recipe-list');

const PopularRecipesUI = {
  render(recipes) {
    if (!popularRecipesList) return;

    popularRecipesList.innerHTML = recipes
      .map(
        recipe => `
          <li class="recipe-list-item" data-id="${recipe._id}">
            <img 
              class="recipe-box-img" 
              src="${recipe.preview}" 
              alt="${recipe.title}" 
            />
            <div class="recipe-box">
              <h3 class="recipe-box-title">${recipe.title}</h3>
              <p class="recipe-box-text">
                ${recipe.description?.slice(0, 90) || ''}...
              </p>
            </div>
          </li>
        `
      )
      .join('');
  },
};
const PopularRecipesApp = {
  async init() {
    try {
      const data = await fetchFilteredRecipes({ popular: true });
      if (data) {
       
        const recipes = Array.isArray(data) ? data : data.results;
        PopularRecipesUI.render(recipes);
      }
    } catch (error) {
      console.error('Popüler tarifler yüklenemedi:', error);
    }
  },
};
if (popularRecipesList) {
  popularRecipesList.addEventListener('click', async event => {
    const clickedItem = event.target.closest('.recipe-list-item');
    if (!clickedItem) return;

    const recipeId = clickedItem.dataset.id;

    try {
      const recipeData = await fetchRecipeDetails(recipeId);
      openRecipeModal(recipeData);
    } catch (error) {
      console.error('Modal açılırken hata:', error);
    }
  });
}
export default PopularRecipesApp;