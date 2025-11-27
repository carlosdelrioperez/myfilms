import { useEffect, useState } from "react";
import TrendingCarousel from "../components/TrendingCarrousel";
import BackgroundImage from "../components/BackgroundImage";
import { getTrendingMovies } from "../services/myapi";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrending();
  }, []);

  const activeMovie = trendingMovies[activeIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8">
      <BackgroundImage movie={activeMovie} />
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
        {trendingMovies.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          <>
            <p className="text-white text-xl font-bold ml-1 drop-shadow-lg">
              Trending Movies
            </p>
            <TrendingCarousel
              movies={trendingMovies}
              onActiveChange={setActiveIndex}
            />
          </>
        )}
      </div>
    </div>
  );
}
