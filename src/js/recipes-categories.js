import { fetchCategories, fetchFilteredRecipes } from '../api/tastyTreats-api';
import { params, loadRecipes } from './recipes.js';

const container = document.querySelector('.CategoriesList');

async function loadCategories() {
  const data = await fetchCategories();

  container.innerHTML = data
    .map(
      category => `
      <li class="CategoryItem">
        <button 
          type="button"
          class="CategoryItemBtn"
          data-name="${category.name}">
          ${category.name}
        </button>
      </li>
    `
    )
    .join('');
}

loadCategories();

const categoriesSection = document.querySelector('.CategoriesSec');
categoriesSection.addEventListener('click', event => {
  const categoryBtn = event.target.closest('.CategoryItemBtn');
  const mainBtn = event.target.closest('.CategoriesBtn');

  if (!categoryBtn && !mainBtn) return;

  // Tüm selected classlarını kaldır
  document
    .querySelectorAll('.CategoryItemBtn, .CategoriesBtn')
    .forEach(btn => btn.classList.remove('Selected'));

  // Eğer ana buton tıklandıysa
  if (mainBtn) {
    mainBtn.classList.add('Selected');
    delete params.category;
    params.page = 1;
    loadRecipes();
    return;
  }

  // Eğer kategori butonu tıklandıysa
  if (categoryBtn) {
    categoryBtn.classList.add('Selected');
    params.category = categoryBtn.dataset.name;
    params.page = 1;
    loadRecipes();
  }
});
