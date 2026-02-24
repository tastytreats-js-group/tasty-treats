console.log('RECIPES FILTER IS RUNNING');

import { fetchIngredients, fetchAreas } from '../api/tastyTreats-api.js';
import { params, loadRecipes } from './recipes.js';

// Get filter form elements
const filterForm = document.getElementById('filterForm');
const searchInput = document.getElementById('searchInput');
const timeSelect = document.getElementById('timeSelect');
const areaSelect = document.getElementById('areaSelect');
const ingredientSelect = document.getElementById('ingredientSelect');

// Custom Dropdown Class
class CustomSelect {
  constructor(selectElement) {
    this.select = selectElement;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'custom-select-wrapper';

    // Insert wrapper before select
    selectElement.parentNode.insertBefore(this.wrapper, selectElement);

    // Create custom button
    this.button = document.createElement('button');
    this.button.className = 'custom-select-button';
    this.button.type = 'button';
    this.button.textContent = selectElement.options[0].text;

    // Create dropdown menu
    this.menu = document.createElement('div');
    this.menu.className = 'custom-select-menu';

    // Populate menu
    Array.from(selectElement.options).forEach((option, idx) => {
      const item = document.createElement('div');
      item.className = 'custom-select-item';
      item.textContent = option.text;

      // Hide disabled options (placeholders)
      if (option.disabled) {
        item.style.display = 'none';
      }

      item.addEventListener('click', () => {
        this.select.value = option.value;
        this.button.textContent = option.text;
        this.menu.classList.remove('active');
        this.select.dispatchEvent(new Event('change', { bubbles: true }));
      });

      this.menu.appendChild(item);
    });

    this.wrapper.appendChild(this.button);
    this.wrapper.appendChild(selectElement);
    this.wrapper.appendChild(this.menu);

    this.button.addEventListener('click', e => {
      e.preventDefault();
      this.menu.classList.toggle('active');
    });

    document.addEventListener('click', e => {
      if (!this.wrapper.contains(e.target)) {
        this.menu.classList.remove('active');
      }
    });

    selectElement.style.display = 'none';
  }

  reset(text) {
    this.button.textContent = text;
    this.select.value = '';
  }
}

// Initialize filters when page loads
async function initializeFilters() {
  await loadIngredients();
  await loadAreas();

  const timeDropdown = new CustomSelect(timeSelect);
  const areaDropdown = new CustomSelect(areaSelect);
  const ingredientDropdown = new CustomSelect(ingredientSelect);

  window.dropdownInstances = {
    time: timeDropdown,
    area: areaDropdown,
    ingredient: ingredientDropdown,
  };

  // Reset all selects to show placeholders
  timeSelect.value = '';
  areaSelect.value = '';
  ingredientSelect.value = '';
  timeDropdown.reset('40 min');
  areaDropdown.reset('Italian');
  ingredientDropdown.reset('Tomato');

  attachEventListeners();
}

// Fetch and populate ingredients dropdown
async function loadIngredients() {
  try {
    const ingredients = await fetchIngredients();
    console.log('Ingredients loaded:', ingredients);

    // Clear existing options (except the default one)
    ingredientSelect.innerHTML = '<option value="" disabled>Tomato</option>';

    // Populate ingredient options
    ingredients.forEach(ingredient => {
      const option = document.createElement('option');
      option.value = ingredient._id || ingredient.name;
      option.textContent = ingredient.name;
      ingredientSelect.appendChild(option);
    });

    // Reset to placeholder
    ingredientSelect.value = '';
  } catch (error) {
    console.error('Failed to load ingredients:', error);
  }
}

// Fetch and populate areas dropdown
async function loadAreas() {
  try {
    const areas = await fetchAreas();
    console.log('All Areas from API:', JSON.stringify(areas, null, 2));

    // Clear existing options (except the default one)
    areaSelect.innerHTML = '<option value="" disabled>Italian</option>';

    // Populate area options
    areas.forEach((area, index) => {
      const option = document.createElement('option');

      option.value = area.name;
      option.textContent = area.name;
      option.dataset.areaId = area._id;
      option.dataset.areaName = area.name;
      areaSelect.appendChild(option);
      console.log(
        `Area ${index}: value="${area.name}", name="${area.name}", _id="${area._id}"`
      );
    });

    // Reset to placeholder
    areaSelect.value = '';
  } catch (error) {
    console.error('Failed to load areas:', error);
  }
}

// Attach event listeners to filter inputs
function attachEventListeners() {
  filterForm.addEventListener('submit', e => {
    e.preventDefault();
  });

  let searchTimeout;
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    const searchValue = e.target.value.trim();

    if (searchValue) {
      searchInput.classList.add('has-value');
    } else {
      searchInput.classList.remove('has-value');
    }

    searchTimeout = setTimeout(() => {
      if (searchValue) {
        params.title = searchValue;
      } else {
        delete params.title;
        delete params.q;
        delete params.keyword;
        delete params.search;
      }
      params.page = 1;
      console.log(
        'Search triggered with title:',
        searchValue,
        'Full params:',
        params
      );
      loadRecipes();
    }, 300);
  });

  // Time select
  timeSelect.addEventListener('change', e => {
    const timeValue = e.target.value;
    if (timeValue) {
      params.time = parseInt(timeValue, 10);
    } else {
      delete params.time;
    }
    params.page = 1;
    console.log('Time filter applied:', timeValue, 'Full params:', params);
    loadRecipes();
  });

  // Area select
  areaSelect.addEventListener('change', e => {
    const areaValue = e.target.value;
    if (areaValue) {
      params.area = areaValue;
    } else {
      delete params.area;
    }
    params.page = 1;
    console.log('Area filter applied:', areaValue, 'Full params:', params);
    loadRecipes();
  });

  // Ingredient select
  ingredientSelect.addEventListener('change', e => {
    const ingredientValue = e.target.value;
    if (ingredientValue) {
      params.ingredient = ingredientValue;
    } else {
      delete params.ingredient;
    }
    params.page = 1;
    console.log(
      'Ingredient filter applied:',
      ingredientValue,
      'Full params:',
      params
    );
    loadRecipes();
  });

  // Reset button
  filterForm.addEventListener('reset', e => {
    e.preventDefault();

    // Clear all filter params
    delete params.title;
    delete params.q;
    delete params.keyword;
    delete params.search;
    delete params.time;
    delete params.area;
    delete params.ingredient;
    params.page = 1;

    // Clear inputs
    searchInput.value = '';
    timeSelect.value = '';
    areaSelect.value = '';
    ingredientSelect.value = '';

    // Reset custom dropdowns
    if (window.dropdownInstances) {
      window.dropdownInstances.time.reset('40 min');
      window.dropdownInstances.area.reset('Italian');
      window.dropdownInstances.ingredient.reset('Tomato');
    }

    console.log('Filters reset. Full params:', params);

    // Reload recipes
    setTimeout(() => loadRecipes(), 0);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFilters);
} else {
  initializeFilters();
}
