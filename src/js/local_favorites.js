const STORAGE_KEY = 'favorite-recipes';

// Tüm favorileri getir
export function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Storage parse error:', error);
    return [];
  }
}

// Favorileri kaydet
function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

// Favori ekle
export function addFavorite(recipe) {
  const favorites = getFavorites();

  const exists = favorites.some(item => item.id === recipe.id);
  if (exists) return;

  favorites.push(recipe);
  saveFavorites(favorites);
}

// Favori sil
export function removeFavorite(recipeId) {
  const favorites = getFavorites();
  const updated = favorites.filter(item => item.id !== recipeId);
  saveFavorites(updated);
}

// Favori kontrol
export function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some(item => item.id === recipeId);
}
