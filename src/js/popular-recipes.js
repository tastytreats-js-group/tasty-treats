import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'https://tasty-treats-backend.p.goit.global/api',
  ENDPOINTS: {
    POPULAR: '/recipes/popular',
  },
};

const handleError = (error, context = '') => {
  console.error(`[${context}] Hata:`, error);

  const errorContainer = document.querySelector('.error-message');
  if (errorContainer) {
    errorContainer.textContent = `Veri yüklenirken hata oluştu: ${error.message}`;
    errorContainer.style.display = 'block';
  }

  return null;
};

const PopularRecipesAPI = {
  async getPopularRecipes() {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POPULAR}`
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'getPopularRecipes');
    }
  },
};

const PopularRecipesUI = {
  displayPopularRecipes(recipes) {
    const PopularRecipesList = document.querySelector('.recipe-list');
    if (!PopularRecipesList) return;

    PopularRecipesList.innerHTML = '';

    recipes.forEach(recipe => {
      const recipeList = document.createElement('li');
      recipeList.classList.add('recipe-list-item');
      recipeList.dataset.id = recipe._id;

      recipeList.dataset.popup = 'popup-food';
      

      recipeList.dataset.recipe_name = recipe.title;


      recipeList.innerHTML = `
        <img class="recipe-box-img" src="${recipe.preview}" alt="${
        recipe.title
      }" />
        <div class="recipe-box">
          <h3 class="recipe-box-title">${recipe.title}</h3>
          <p class="recipe-box-text">${recipe.description?.slice(0, 90)}...</p>

        </div>
      `;

      PopularRecipesList.appendChild(recipeList);
    });

    


    PopularRecipesList.addEventListener('click', event => {
      const onClickList = event.target.closest('.recipe-list-item');
      if (!onClickList) return;

      const recipeListName = onClickList.dataset.recipe_name;
      console.log('Tıklanan data-recipe_name:', recipeListName);
    });

  },
};

const PopularRecipesApp = {
  async init() {
    try {
      const popular = await PopularRecipesAPI.getPopularRecipes();
      if (popular) {
        PopularRecipesUI.displayPopularRecipes(popular);
      }
    } catch (error) {
      console.error('Uygulama başlatılırken bir hata oluştu:', error);
    }
  },
};

export default PopularRecipesApp;

