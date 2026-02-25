import { createOrder } from '../api/tastyTreats-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const orderBtn = document.querySelector('.home-hero-btn');
  const modalRoot = document.getElementById('modal-root');

  if (orderBtn && modalRoot) {
    orderBtn.addEventListener('click', () => openOrderModal(modalRoot));
  }

  initHeroSlider();
});

function openOrderModal(modalRoot) {
  if (document.getElementById('orderLayer')) {
    return;
  }

  const previousOverflow = document.body.style.overflow;

  const orderModalHtml = `
    <div class="modal-overlay" id="orderLayer">
      <div class="modal-content rating-modal order-modal">
        <button type="button" class="close-btn" id="closeOrder" aria-label="Close order modal">&times;</button>

        <h2 class="form-title">Order Now</h2>

        <form id="orderForm" class="modal-form">
          <div class="input-wrapper">
            <label class="input-label" for="orderName">Name</label>
            <input id="orderName" type="text" name="name" class="input-field" placeholder="Enter your name" required minlength="2" />
          </div>

          <div class="input-wrapper">
            <label class="input-label" for="orderPhone">Phone number</label>
            <input
              id="orderPhone"
              type="tel"
              name="phone"
              class="input-field"
              placeholder="+1 555 123 4567"
              pattern="^\\+?[0-9\s()-]{10,20}$"
              title="Please enter a valid phone number"
              required
            />
          </div>

          <div class="input-wrapper">
            <label class="input-label" for="orderEmail">Email address</label>
            <input id="orderEmail" type="email" name="email" class="input-field" placeholder="example@mail.com" required />
          </div>

          <div class="input-wrapper">
            <label class="input-label" for="orderComment">Comment</label>
            <textarea id="orderComment" name="comment" class="input-field order-comment" placeholder="Anything else you'd like to add?"></textarea>
          </div>

          <button type="submit" class="btn-submit" id="submitOrderBtn">Send</button>
        </form>
      </div>
    </div>
  `;

  modalRoot.insertAdjacentHTML('beforeend', orderModalHtml);
  modalRoot.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  bindOrderEvents(modalRoot, previousOverflow);
}

function bindOrderEvents(modalRoot, previousOverflow) {
  const orderLayer = document.getElementById('orderLayer');
  const orderForm = document.getElementById('orderForm');
  const closeBtn = document.getElementById('closeOrder');

  if (!orderLayer || !orderForm || !closeBtn) {
    return;
  }

  const closeOrderModal = () => {
    window.removeEventListener('keydown', handleEsc);
    orderLayer.remove();

    if (!modalRoot.querySelector('.modal-overlay')) {
      modalRoot.style.display = 'none';
      modalRoot.innerHTML = '';
    }

    document.body.style.overflow = previousOverflow || '';
  };

  const handleEsc = e => {
    if (e.key === 'Escape') {
      closeOrderModal();
    }
  };

  closeBtn.addEventListener('click', closeOrderModal);
  orderLayer.addEventListener('click', e => {
    if (e.target === orderLayer) {
      closeOrderModal();
    }
  });
  window.addEventListener('keydown', handleEsc);

  orderForm.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitOrderBtn');
    if (!submitBtn) {
      return;
    }

    const orderData = {
      name: orderForm.name.value.trim(),
      phone: orderForm.phone.value.trim(),
      email: orderForm.email.value.trim(),
      comment: orderForm.comment.value.trim() || '',
    };

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
      await createOrder(orderData);
      showNotification('Order successfully placed!');

      setTimeout(() => {
        closeOrderModal();
      }, 700);
    } catch (error) {
      showNotification(`Error: ${error.message}`, 'error');
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
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

  setTimeout(() => {
    toast.remove();

    if (container && !container.childNodes.length) {
      container.remove();
    }
  }, 3000);
}

function initHeroSlider() {
  const slider = document.querySelector('.home-slider');
  const slides = Array.from(document.querySelectorAll('.home-slides'));
  const dots = Array.from(document.querySelectorAll('.home-dot'));

  if (!slider || !slides.length) {
    return;
  }

  let activeIndex = 0;
  let autoPlayId;
  let touchStartX = 0;
  const autoPlayDelay = 5000;

  const setActiveSlide = index => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const nextSlide = () => setActiveSlide(activeIndex + 1);

  const stopAutoPlay = () => {
    if (autoPlayId) {
      clearInterval(autoPlayId);
      autoPlayId = undefined;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayId = window.setInterval(nextSlide, autoPlayDelay);
  };

  dots.forEach((dot, index) => {
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      setActiveSlide(index);
      startAutoPlay();
    });
  });

  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
  slider.addEventListener('focusin', stopAutoPlay);
  slider.addEventListener('focusout', e => {
    if (!slider.contains(e.relatedTarget)) {
      startAutoPlay();
    }
  });

  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  });

  slider.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) < 45) {
      return;
    }

    if (deltaX < 0) {
      nextSlide();
    } else {
      setActiveSlide(activeIndex - 1);
    }

    startAutoPlay();
  });

  setActiveSlide(0);
  startAutoPlay();
}
