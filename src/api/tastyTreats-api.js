
import axios from 'axios';

// Projedeki tüm HTTP istekleri bu dosya üzerinden yapılır.
// Diğer JavaScript dosyalarında (recipes.js, categories.js, modal.js vb.) doğrudan axios veya fetch kullanılmaz.

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

// Axios instance
// - baseURL merkezi olarak burada tanımlanır.
// - URL değişirse sadece bu dosya güncellenir.


const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Boş/undefined/null parametreleri query'e eklememek için
function cleanParams(params = {}) {
  const cleaned = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    cleaned[key] = value;
  });
  return cleaned;
}

// Ortak hata yönetimi (çağıran yerde try/catch ile yakalanmalı)
function handleError(error) {
  if (error?.response) {
    const message =
      error.response.data?.message ||
      error.response.data?.error ||
      `HTTP ${error.response.status}`;
    throw new Error(message);
  }

  if (error?.request) {
    throw new Error('Network error. Please try again.');
  }

  throw new Error(error?.message || 'Unknown error');
}


// Atölye çalışmaları listesi
export async function fetchEvents() {
  try {
    const { data } = await api.get('/events');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Tüm kategori listesini getirir
export async function fetchCategories() {
  try {
    const { data } = await api.get('/categories');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Filtreli tarif listesi (opsiyonel parametreler: category, page, limit, time, area, ingredient, keyword/q vb.)
export async function fetchFilteredRecipes(params = {}) {
  try {
    const { data } = await api.get('/recipes', { params: cleanParams(params) });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Popüler tarifler
export async function fetchPopularRecipes() {
  try {
    const { data } = await api.get('/recipes/popular');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Belirli bir tarifin detay bilgisi
export async function fetchRecipeDetails(recipeId) {
  try {
    const { data } = await api.get(`/recipes/${recipeId}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}


   //FEATURE ENDPOINTS (Ek görevler)


// Malzeme listesi
export async function fetchIngredients() {
  try {
    const { data } = await api.get('/ingredients');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Bölge listesi
export async function fetchAreas() {
  try {
    const { data } = await api.get('/areas');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Tarif puanlama
// ratingData örneği: { rate: 4, email: 'example@mail.com', comment: '...' }
export async function rateRecipe(recipeId, ratingData) {
  try {
    const { data } = await api.patch(`/recipes/${recipeId}/rating`, ratingData);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Sipariş oluşturma
export async function createOrder(orderData) {
  try {
    const { data } = await api.post('/orders/add', orderData);
    return data;
  } catch (error) {
    return handleError(error);
  }
}
