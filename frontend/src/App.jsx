import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
