const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = "tu_api_key";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export const getPosterUrl = (posterPath) => {
  if (!posterPath) return "";
  return `${TMDB_IMAGE_BASE}${posterPath}`;
};
