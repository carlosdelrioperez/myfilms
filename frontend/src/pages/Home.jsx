import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/movies/search?query=${query}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data.results);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-semibold mb-6">Buscar película</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe para buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="hidden">
          Buscar
        </button>
      </form>
    </div>
  );
}
