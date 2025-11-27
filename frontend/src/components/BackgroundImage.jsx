import { getPosterUrl } from "../services/tmdb";

export default function BackgroundImage({ movie }) {
  const backgroundUrl = movie ? getPosterUrl(movie.poster_path) : "";

  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
