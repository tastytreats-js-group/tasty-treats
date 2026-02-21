import { rateRecipe } from '../api/tastyTreats-api.js';

export function openRatingModal(recipeId) {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return;

     const ratingHtml = `
        <div class="modal-overlay rating-layer" id="ratingLayer">
            <div class="modal-content rating-modal">
                <button type="button" class="close-btn" id="closeRating">&times;</button>
                
                <h2 class="form-title">Rating</h2>
                <p class="rating-subtitle">How do you rate the recipe?</p>

                <form id="ratingForm" class="modal-form">
                    <div class="star-rating-container">
                        <span class="rating-value" id="ratingValue">0.0</span>
                        <div class="star-rating">
                            <input type="radio" id="star5" name="rate" value="5"><label for="star5">★</label>
                            <input type="radio" id="star4" name="rate" value="4"><label for="star4">★</label>
                            <input type="radio" id="star3" name="rate" value="3"><label for="star3">★</label>
                            <input type="radio" id="star2" name="rate" value="2"><label for="star2">★</label>
                            <input type="radio" id="star1" name="rate" value="1"><label for="star1">★</label>
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <input type="email" name="email" class="input-field" placeholder="Enter your email" required>
                    </div>
                    
                    <button type="submit" class="btn-submit">Send</button>
                </form>
            </div>
        </div>
    `;

    modalRoot.insertAdjacentHTML('beforeend', ratingHtml);

    const ratingLayer = document.getElementById("ratingLayer");
    const form = ratingLayer.querySelector("#ratingForm");
    const closeBtn = ratingLayer.querySelector("#closeRating");
    const ratingValueText = ratingLayer.querySelector("#ratingValue");
    const stars = form.querySelectorAll('input[name="rate"]');

    stars.forEach(star => {
        star.addEventListener('change', (e) => {
            ratingValueText.textContent = `${parseFloat(e.target.value).toFixed(1)}`;
        });
    });

    const closeRatingOnly = () => {
        ratingLayer.remove(); 
    };

    closeBtn.onclick = closeRatingOnly;
    ratingLayer.onclick = (e) => { if (e.target === ratingLayer) closeRatingOnly(); };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const rating = form.rate.value;
        const email = form.email.value;

        if (!rating) {
            alert("Please select a star rating!");
            return;
        }

        try {
            await rateRecipe(recipeId, { rate: Number(rating), email: email });
            alert("Rating sent successfully!");
            closeRatingOnly();
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}