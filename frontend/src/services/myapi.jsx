export const getTrendingMovies = async () => {
  const res = await fetch("http://localhost:8080/api/movies/trending", {
    credentials: "include",
  });
  return res.json();
};
