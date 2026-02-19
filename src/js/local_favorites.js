const KEY = 'favorites';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveFavorites(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function toggleFavorite(recipe) {
  const favorites = getFavorites();

  const exists = favorites.find(item => item._id === recipe._id);

  if (exists) {
    const updated = favorites.filter(item => item._id !== recipe._id);
    saveFavorites(updated);
  } else {
    favorites.push(recipe);
    saveFavorites(favorites);
  }
}

export function isFavorite(id) {
  return getFavorites().some(item => item._id === id);
}
