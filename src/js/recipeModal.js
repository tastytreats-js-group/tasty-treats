import { openRatingModal } from './rating-popup.js';
import { isFavorite, addFavorite, removeFavorite } from './local_favorites.js';

export function openRecipeModal(recipe) {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return;

    const isFav = isFavorite(recipe._id);
    const buttonText = isFav ? "Remove favorite" : "Add to favorite";

    modalRoot.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button type="button" class="close-btn" id="closeModal">&times;</button>
                <div class="modal-info-wrapper">    
                    <h2 class="modal-title">${recipe.title.toUpperCase()}</h2>
                    <div class="media-container">
                        ${recipe.youtube 
                            ? `<iframe class="modal-video" src="${recipe.youtube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>`
                            : `<img class="modal-img" src="${recipe.preview}" alt="${recipe.title}">`
                        }
                    </div>
                    <div class="modal-info">
                        <div class="modal-tags">
                            ${recipe.tags ? recipe.tags.map(tag => `<span class="tag">#${tag}</span>`).join('') : ''}
                            <div class="modal-rating">
                                <span>${recipe.rating}</span> 
                                <span style="color: #f8a33f;">★★★★☆</span> <span class="modal-time">| ${recipe.time} min</span>
                            </div>    
                        </div>
                        <ul class="modal-ingredients">
                            ${recipe.ingredients.map(ing => `
                                <li><span>${ing.name}</span> <span class="measure">${ing.measure}</span></li>
                            `).join('')}
                        </ul>
                        <p class="modal-description">${recipe.instructions}</p>
                    </div>
                </div>                
                <div class="modal-actions">
                    <button class="btn-favorite" id="favBtn">${buttonText}</button>
                    <button class="btn-rating-open" data-id="${recipe._id}">Give a rating</button>
                </div>
            </div>
        </div>
    `;

    modalRoot.style.display = "flex";
    document.body.style.overflow = "hidden";

    bindModalEvents(modalRoot, recipe);
}

function bindModalEvents(modalRoot, recipe) {
    const closeBtn = modalRoot.querySelector("#closeModal");
    const overlay = modalRoot.querySelector(".modal-overlay");
    const ratingBtn = modalRoot.querySelector(".btn-rating-open");
    const favBtn = modalRoot.querySelector("#favBtn");

    favBtn.onclick = () => {
        if (isFavorite(recipe._id)) {
            removeFavorite(recipe._id);
        } else {
            addFavorite(recipe);
        }
    };
    const syncModalBtn = (event) => {
        if (event.detail.recipeId === recipe._id) {
            favBtn.textContent = event.detail.status ? "Remove favorite" : "Add to favorite";
        }
    };
    window.addEventListener('favoritesUpdated', syncModalBtn);

    if (ratingBtn) {
        ratingBtn.onclick = () => {
            openRatingModal(recipe._id);
        };
    }

    const closeModal = () => {
        modalRoot.style.display = "none";
        modalRoot.innerHTML = "";
        document.body.style.overflow = "auto";
        window.removeEventListener('favoritesUpdated', syncModalBtn);
    };

    closeBtn.onclick = closeModal;
    overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
    
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            window.removeEventListener('keydown', escHandler);
        }
    };
    window.addEventListener('keydown', escHandler);
}