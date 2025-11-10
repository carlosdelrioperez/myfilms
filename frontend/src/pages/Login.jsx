import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    const data = response.json();
    console.log("Login exitoso", data);
    navigate("/");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Iniciar sesión
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <InputField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
