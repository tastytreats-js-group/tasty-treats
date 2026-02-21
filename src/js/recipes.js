console.log('FILE IS RUNNING'); //filecheck
import { fetchFilteredRecipes } from '../api/tastyTreats-api.js';

// API search parameters
import { openRecipeModal } from './recipeModal.js';
let params = {
    page: 1,
    limit: getlimit()
};


// Number of cards that will show up regarding the page width
function getlimit() {
    const width = window.innerWidth;
    if (width >= 1280) return 9;
    if (width >= 768) return 8;
    else return 6;
};

// Get recipes from API
async function loadRecipes() {
    try {
        const data = await fetchFilteredRecipes(params);
        console.log(data);
        renderRecipes(data.results)
    } catch (error) {}
};

loadRecipes();

// Number of stars that will show up regarding the rating
function renderStars(rating) {
    const fullStars = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => `
        <svg class="star ${i < fullStars ? 'star-filled' : 'star-empty'}">
            <use href="../img/sprite.svg#icon-star"></use>
        </svg>
    `).join('');
}

// Render recipes on page
async function renderRecipes(results) {
    const recipeList = document.querySelector(".recipeList")
    recipeList.innerHTML = results
        .map(result => `
            <li class="recipeCard" data-id="${result._id}">
                <div class="likeButton">
                    <svg class="like-icon">
                        <use href="../img/sprite.svg#icon-heart-outline"></use>
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
    document.querySelectorAll(".recipeCard").forEach(card => {
        const id = card.dataset.id;
        const recipe = results.find(r => r._id === id);
        card.style.backgroundImage = `linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${recipe.preview})`;
    });
};
const recipeList = document.querySelector(".recipeList");

if (recipeList) {
    recipeList.addEventListener("click", async (event) => {
        const seeRecipeBtn = event.target.closest(".seeRecipe");
        if (seeRecipeBtn) {
            const recipeId = seeRecipeBtn.closest(".recipeCard").dataset.id;
            try {
                const { fetchRecipeDetails } = await import('../api/tastyTreats-api.js');
                const recipeData = await fetchRecipeDetails(recipeId);
                openRecipeModal(recipeData);
            } catch (error) {
                console.error("Tasty Error:", error);
            }
        }
    });
}