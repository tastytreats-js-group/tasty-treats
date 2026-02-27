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
  const categoryBtn = event.target.closest('.category-item-btn');
  const mainBtn = event.target.closest('.categories-btn');

  if (!categoryBtn && !mainBtn) return;

  // Tüm selected classlarını kaldır
  document
    .querySelectorAll('.category-item-btn, .categories-btn')
    .forEach(btn => btn.classList.remove('selected'));

  // Eğer ana buton tıklandıysa
  if (mainBtn) {
    mainBtn.classList.add('selected');
    delete params.category;
    params.page = 1;
    loadRecipes();
    return;
  }

  // Eğer kategori butonu tıklandıysa
  if (categoryBtn) {
    categoryBtn.classList.add('selected');
    params.category = categoryBtn.dataset.name;
    params.page = 1;
    loadRecipes();
  }
});
