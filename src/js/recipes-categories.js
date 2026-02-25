import { fetchCategories, fetchFilteredRecipes } from '../api/tastyTreats-api';
import { params, loadRecipes } from './recipes.js';
document.querySelector('.categories-btn').click();

const container = document.querySelector('.categories-list');
const categoriesSection = document.querySelector('.categories-sec');
const categoriesBtn = document.querySelector('.categories-btn');
const mobileTabletQuery = window.matchMedia('(max-width: 1279px)');

function syncCategoriesDropdownState() {
  if (!categoriesSection || !categoriesBtn) return;

  if (mobileTabletQuery.matches) {
    categoriesSection.classList.remove('is-open');
    categoriesBtn.setAttribute('aria-expanded', 'false');
  } else {
    categoriesSection.classList.add('is-open');
    categoriesBtn.setAttribute('aria-expanded', 'true');
  }
}

syncCategoriesDropdownState();
mobileTabletQuery.addEventListener('change', syncCategoriesDropdownState);

async function loadCategories() {
  const data = await fetchCategories();

  container.innerHTML = data
    .map(
      category => `
      <li class="category-item">
        <button 
          type="button"
          class="category-item-btn"
          data-name="${category.name}">
          ${category.name}
        </button>
      </li>
    `
    )
    .join('');
}

loadCategories();

categoriesSection.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') return;

  if (event.target.closest('.categories-btn')) {
    if (!mobileTabletQuery.matches) return;

    categoriesSection.classList.toggle('is-open');
    categoriesBtn.setAttribute(
      'aria-expanded',
      categoriesSection.classList.contains('is-open') ? 'true' : 'false'
    );
    return;
  }

  const btn = event.target.closest('button[type="button"]');
  if (!btn) {
    delete params.category;
    params.page = 1;
    loadRecipes();
    return;
  }

  const selectedCategory = btn.dataset.name;
  if (!selectedCategory) {
    delete params.category;
    params.page = 1;
    loadRecipes();
    return;
  }

  params.category = selectedCategory;
  params.page = 1;
  loadRecipes();

  if (mobileTabletQuery.matches) {
    categoriesSection.classList.remove('is-open');
    categoriesBtn.setAttribute('aria-expanded', 'false');
  }
});
