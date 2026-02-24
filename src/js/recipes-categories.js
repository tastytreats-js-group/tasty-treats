import { fetchCategories, fetchFilteredRecipes } from '../api/tastyTreats-api';

const container = document.querySelector('.categories-list');

async function loadCategories() {
  const data = await fetchCategories();

  container.innerHTML = data
    .map(
      category =>
        `<li class="category-item" data-name="${category.name}">
        ${category.name}
      </li>`
    )
    .join('');
}

loadCategories();

container.addEventListener('click', async event => {
  if (!event.target.classList.contains('category-item')) return;

  const selectedCategory = event.target.dataset.name;

  await fetchFilteredRecipes({
    category: selectedCategory,
  });
});
