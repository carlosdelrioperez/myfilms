import { useRef, useState, useEffect } from "react";

export default function TrendingCarousel({ movies, onActiveChange }) {
  const carouselRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, movies]);

  // Scroll a la tarjeta indicada
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index];
    if (card) {
      const container = carouselRef.current;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = container.clientWidth;
      container.scrollTo({
        left: cardLeft - (containerWidth - cardWidth) / 2,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
    onActiveChange?.(index);
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + movies.length) % movies.length;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % movies.length;
    scrollToIndex(newIndex);
  };

  // Detectar scroll manual y actualizar activeIndex
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(container.children).forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
        onActiveChange?.(closestIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex, movies, onActiveChange]);

  return (
    <div className="relative w-full">
      {/* Flecha izquierda */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        &#10094;
      </button>

      {/* Carrusel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-8"
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`snap-center flex-shrink-0 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] transition-transform duration-300 cursor-pointer ${
              index === activeIndex ? "scale-90 shadow-2xl" : "scale-80"
            }`}
            onClick={() => scrollToIndex(index)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl w-full h-auto"
            />
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        &#10095;
      </button>
    </div>
  );
}
