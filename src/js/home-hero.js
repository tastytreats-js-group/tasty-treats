
// Home Hero bölümündeki "Order Now" butonuna tıklandığında açılan modal ve form işlemlerini buraya yazdım.
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
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Name</label>
                                <input type="text" name="name" class="input-field" placeholder="Enter your name" required minlength="2">
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Phone number</label>
                                <input type="tel" name="phone" class="input-field" placeholder="+90 5XX XXX XX XX" 
                                       pattern="^\\+?\\d{10,13}$" title="Lütfen geçerli bir telefon numarası giriniz" required>
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Email address</label>
                                <input type="email" name="email" class="input-field" placeholder="example@mail.com" required>
                            </div>

                            <div class="input-wrapper">
                                <label class="input-label" style="display:block; margin-bottom:8px; font-size:14px; opacity:0.7;">Comment</label>
                                <textarea name="comment" class="input-field" style="min-height:100px; resize:none;" placeholder="Anything else you'd like to add?"></textarea>
                            </div>

                            <button type="submit" class="btn-submit" id="submitOrderBtn">Send</button>
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
            orderLayer.remove();
            modalRoot.style.display = "none";
            document.body.style.overflow = "auto";
        };

        closeBtn.onclick = closeOrderModal;
        orderLayer.onclick = (e) => { if (e.target === orderLayer) closeOrderModal(); };

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeOrderModal();
                window.removeEventListener('keydown', handleEsc);
            }
        };
        window.addEventListener('keydown', handleEsc);

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
                
                setTimeout(() => {
                    closeOrderModal();
                }, 1000);

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

    const slides = document.querySelectorAll('.home-slides');
    const dots = document.querySelectorAll('.home-dot');
    
    function showSlide(index) {
        slides.forEach(s => s.style.display = 'none');
        dots.forEach(d => d.classList.remove('active'));
        if(slides[index]) {
            slides[index].style.display = 'flex';
            dots[index].classList.add('active');
        }
    }
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    if(slides.length > 0) showSlide(0);
});