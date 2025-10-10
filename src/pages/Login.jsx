// src/pages/Login.jsx
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!email || !password) {
      setError("Por favor ingresa todos los campos.");
      return;
    }

    // Aquí podrías hacer fetch a tu backend para autenticar
    if (email === "admin@admin.com" && password === "1234") {
      // Simula login exitoso
      navigate("/dashboard"); // Redirige al Dashboard
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-500 mb-6">
          Inventario+ Login
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-400">
            <FaUser className="text-gray-400" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-400">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4 text-sm">
          ¿Olvidaste tu contraseña?{" "}
          <a href="register" className="text-green-500 hover:underline">
            Recuperar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
