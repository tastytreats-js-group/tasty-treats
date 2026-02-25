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
  const exists = favorites.some(item => item._id === recipe._id);
  if (exists) return;
  favorites.push(recipe);
  saveFavorites(favorites);
  
  // Bildirim gönder
  window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: { recipeId: recipe._id, status: true } }));
}

// Favori sil
export function removeFavorite(recipeId) {
  const favorites = getFavorites();
  const updated = favorites.filter(item => item._id !== recipeId);
  saveFavorites(updated);
  
  // Bildirim gönder
  window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: { recipeId, status: false } }));
}

// Favori kontrol
export function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some(item => item._id === recipeId);
}