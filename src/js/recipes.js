console.log('FILE IS RUNNING'); //filecheck
import { fetchFilteredRecipes } from '../api/tastyTreats-api.js';

let params = {
    page: 1,
    perPage: 6
};

async function loadRecipes() {
    try {
        const data = await fetchFilteredRecipes(params);
        console.log(data);
        renderRecipes(data.results)
    } catch (error) {}
};

loadRecipes();

async function renderRecipes(results) {
    const recipeList = document.querySelector(".recipeList")
    recipeList.innerHTML = results
        .map(result => `
            <li class="recipeCard" data-id="${result._id}">
                <div class="likeButton"></div>
                <div class="rest">
                    <p class="recipeTitle">${result.title}</p>
                    <p class="recipeDescription">${result.description}</p>
                    <div class="ratingandbutton">
                        <div class="recipeRating">
                            <p class="rating">${result.rating}</p>
                            <div class="stars"></div>
                        </div>
                        <button class="seeRecipe">See recipe</button>
                    </div>
                </div>
            </li>
            `
    )
        .join('');
    
    document.querySelectorAll(".recipeCard").forEach(card => {
        const id = card.dataset.id;
        const recipe = results.find(r => r._id === id);
        card.style.backgroundImage = `linear-gradient(0.936deg, rgba(5, 5, 5, 60%) 0%, rgba(5, 5, 5, 0%) 100%),url(${recipe.preview})`;
    });
};