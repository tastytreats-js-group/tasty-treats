import { fetchCategories, fetchFilteredRecipes } from '../api/tastyTreats-api';
import { params, loadRecipes } from './recipes.js';

const container = document.querySelector('.categories-list');

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

const categoriesSection = document.querySelector('.categories-sec');

categoriesSection.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') return;
  document.querySelector('.categories-btn')?.classList.remove('beginning');
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
});
