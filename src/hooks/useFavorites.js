import { useEffect, useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) ?? []
  );

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (val) => {
    setFavorites((favorites) => [...favorites, val]);
  };

  const removeFromFavorites = (val) => {
    setFavorites((favorites) =>
      [...favorites].filter((f) => f.imdbID !== val.imdbID)
    );
  };

  const onMovieAddToFavorites = (movie) => {
    if (favorites.find((f) => f.imdbID === movie.imdbID)) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  const isInFavorites = (id) => !!favorites.find((f) => f.imdbID === id);

  return { favorites, onMovieAddToFavorites, isInFavorites };
};
