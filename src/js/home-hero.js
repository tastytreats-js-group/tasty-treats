import { createOrder } from '../api/tastyTreats-api.js';

document.addEventListener('DOMContentLoaded', () => {
    const orderBtn = document.querySelector('.home-hero-btn');
    const modalRoot = document.getElementById('modal-root');

    if (orderBtn && modalRoot) {

        orderBtn.addEventListener('click', () => {

            const orderModalHtml = `
                <div class="modal-overlay" id="orderLayer">
                    <div class="modal-content rating-modal">
                        <button type="button" class="close-btn" id="closeOrder">&times;</button>
                        
                        <h2 class="form-title">Order Now</h2>

                        <form id="orderForm" class="modal-form">
                            <div class="input-wrapper">
                                <label class="input-label">Name</label>
                                <input type="text" name="name" class="input-field" placeholder="Enter your name" required minlength="2">
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label">Phone number</label>
                                <input type="tel" name="phone" class="input-field"
                                       pattern="^\\+?\\d{10,13}$"
                                       placeholder="+90 5XX XXX XX XX" required>
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label">Email address</label>
                                <input type="email" name="email" class="input-field" placeholder="example@mail.com" required>
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label">Comment</label>
                                <textarea name="comment" class="input-field"
                                          style="min-height:100px; resize:none;"
                                          placeholder="Anything else you'd like to add?"></textarea>
                            </div>

                            <button type="submit" class="btn-submit" id="submitOrderBtn">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            `;

            modalRoot.insertAdjacentHTML('beforeend', orderModalHtml);
            modalRoot.style.display = "block";
            document.body.style.overflow = "hidden";

            bindOrderEvents();
        });
    }

    function bindOrderEvents() {

        const orderLayer = document.getElementById('orderLayer');
        const orderForm = document.getElementById('orderForm');
        const closeBtn = document.getElementById('closeOrder');

        const closeOrderModal = () => {
            orderLayer?.remove();
            modalRoot.style.display = "none";
            document.body.style.overflow = "auto";
        };

        closeBtn.onclick = closeOrderModal;
        orderLayer.onclick = (e) => {
            if (e.target === orderLayer) closeOrderModal();
        };

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeOrderModal();
                window.removeEventListener('keydown', handleEsc);
            }
        };

        window.addEventListener('keydown', handleEsc);

        /* Submit Order */

        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitOrderBtn');

            const orderData = {
                name: orderForm.name.value.trim(),
                phone: orderForm.phone.value.trim(),
                email: orderForm.email.value.trim(),
                comment: orderForm.comment.value.trim() || ""
            };

            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            try {
                await createOrder(orderData);

                showNotification("Order successfully placed!");

                setTimeout(closeOrderModal, 1000);

            } catch (error) {
                showNotification("Error: " + error.message, "error");

                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            }
        });
    }
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
        setTimeout(() => toast.remove(), 3000);
    }

    const homeslides = document.querySelectorAll('.home-slides');
    const homedots = document.querySelectorAll('.home-dot');

    const slidePartials = document.querySelectorAll(".home-slide-partial");
    const slideSmalls = document.querySelectorAll(".home-slide.small");

    let currentPage = 0;

    function showPage(page) {

        homeslides.forEach((slide, i) => {
            slide.classList.toggle("active", i === page);
        });

        homedots.forEach((dot, i) => {
            dot.classList.toggle("active", i === page);
        });
    }

    /* Dot click */

    homedots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentPage = i;
            showPage(currentPage);
        });
    });

    /* Next slide thumb */

   /* Next slide */
slidePartials.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        currentPage = (currentPage + 1) % homeslides.length;
        showPage(currentPage);
    });
});

/* Previous slide */
slideSmalls.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        currentPage = (currentPage - 1 + homeslides.length) % homeslides.length;
        showPage(currentPage);
    });
});

    if (homeslides.length > 0) showPage(currentPage);

});