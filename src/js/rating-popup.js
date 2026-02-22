import { rateRecipe } from '../api/tastyTreats-api.js';

export function openRatingModal(recipeId) {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return;

     const ratingHtml = `
        <div class="modal-overlay rating-layer" id="ratingLayer">
            <div class="modal-content rating-modal">
                <button type="button" class="close-btn" id="closeRating">&times;</button>
                
                <h2 class="form-title">Rating</h2>

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

    function showNotification(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        if (container.childNodes.length === 0) container.remove();
    }, 3000);
    }
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rating = form.rate.value;
    const email = form.email.value;
    const submitBtn = form.querySelector('.btn-submit');

    if (!rating) {
        showNotification("Please select a star rating!", "error");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    try {
        await rateRecipe(recipeId, { rate: Number(rating), email: email });
        
        showNotification("Rating sent successfully!");
        
        setTimeout(() => {
            closeRatingOnly();
        }, 500);

    } catch (error) {
        showNotification("Error: " + (error.response?.data?.message || error.message), "error");
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    }
});
    let selectedRating = "0.0"; 

    stars.forEach(star => {
        const label = form.querySelector(`label[for="${star.id}"]`);

        star.addEventListener('change', (e) => {
            selectedRating = parseFloat(e.target.value).toFixed(1);
            ratingValueText.textContent = selectedRating;
        });

        label.addEventListener('mouseenter', () => {
            label.classList.add('is-hovering');
            ratingValueText.textContent = parseFloat(star.value).toFixed(1);
        });

        label.addEventListener('mouseleave', () => {
            label.classList.remove('is-hovering');
            ratingValueText.textContent = selectedRating;
        });
    });
}