import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // íconos para el menú hamburguesa

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { title: "Home", label: "home", url: "#" },
    { title: "Perfil", label: "perfil", url: "#perfil" },
    { title: "Listas", label: "listas", url: "#listas" },
    { title: "Log", label: "log", url: "#log" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/movies/search?query=${query}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data.results);
  };

  const handleClick = (e, url) => {
    if (url.startsWith("#")) {
      e.preventDefault();
      const targetId = url.slice(1);
      if (targetId === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMenuOpen(false); // cerrar menú al hacer click
    } else {
      window.location.href = url;
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-2 rounded-full transition-all duration-500
        ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Logo o nombre */}
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          MyFilms
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((link) => (
            <a
              key={link.label}
              className="relative px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 
                         hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              href={link.url}
              onClick={(e) => handleClick(e, link.url)}
            >
              {link.title}
            </a>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-1 text-sm rounded-full border border-gray-300 
                         bg-white/80 dark:bg-black/30 backdrop-blur-md placeholder-white/90 text-white
                         focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
            />
          </form>
        </div>

        {/* Botón menu mobile */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="absolute top-full right-6 mt-2 w-48 bg-white dark:bg-black/80 backdrop-blur-md rounded-lg shadow-lg flex flex-col py-2 z-50">
            {navItems.map((link) => (
              <a
                key={link.label}
                className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                href={link.url}
                onClick={(e) => handleClick(e, link.url)}
              >
                {link.title}
              </a>
            ))}
            <form
              onSubmit={handleSubmit}
              className="flex items-center px-4 py-2"
            >
              <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-1 text-sm rounded-full border border-gray-300 
                           bg-white/80 dark:bg-black/30 backdrop-blur-md placeholder-white/90 text-white
                           focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
              />
            </form>
          </div>
        )}
      </nav>
    </header>
  );
}
