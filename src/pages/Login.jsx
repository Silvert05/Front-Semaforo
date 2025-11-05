// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Administrador: admin@admin.com / 1234  //

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Login useEffect - redirecting user:', user, 'to role-based path');
      const redirectPath = user.role === 'admin' ? '/dashboard' : '/home';
      navigate(redirectPath);
    }
  }, [isAuthenticated, user, navigate]);

  const validateForm = () => {
    if (!email.trim()) {
      setError("El correo electrónico es requerido");
      setShowErrorModal(true);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingresa un correo electrónico válido");
      setShowErrorModal(true);
      return false;
    }
    if (!password) {
      setError("La contraseña es requerida");
      setShowErrorModal(true);
      return false;
    }
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      setShowErrorModal(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowErrorModal(false);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        setShowSuccessModal(true);
        
        // Esperar un poco para que se actualice el contexto
        setTimeout(() => {
          const userData = result.user || user;
          const redirectPath = userData?.role === 'admin' ? '/dashboard' : '/home';
          console.log('Login success - redirecting to:', redirectPath, 'for user:', userData);
          navigate(redirectPath);
        }, 2000);
      } else {
        setError(result.error || "Credenciales incorrectas. Verifica tu email y contraseña.");
        setShowErrorModal(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("Error de conexión. Por favor inténtalo de nuevo.");
      setShowErrorModal(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0">
        {/* Bottom Left Wave - Red/Orange */}
        <svg className="absolute bottom-0 left-0 w-1/2 h-1/2" viewBox="0 0 500 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff0040', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#ff8800', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path d="M0,250 Q125,150 250,200 T500,250 L500,500 L0,500 Z" fill="url(#redGradient)">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,250 Q125,150 250,200 T500,250 L500,500 L0,500 Z;
                      M0,250 Q125,200 250,150 T500,250 L500,500 L0,500 Z;
                      M0,250 Q125,150 250,200 T500,250 L500,500 L0,500 Z" />
          </path>
        </svg>

        {/* Top Right Wave - Purple/Magenta */}
        <svg className="absolute top-0 right-0 w-1/2 h-1/2" viewBox="0 0 500 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b00ff', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#ff00ff', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path d="M0,0 L500,0 L500,250 Q375,200 250,250 T0,250 Z" fill="url(#purpleGradient)">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0,0 L500,0 L500,250 Q375,200 250,250 T0,250 Z;
                      M0,0 L500,0 L500,250 Q375,150 250,200 T0,250 Z;
                      M0,0 L500,0 L500,250 Q375,200 250,250 T0,250 Z" />
          </path>
        </svg>

        {/* Mesh Pattern Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #ff0040 10px, #ff0040 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #ff0040 10px, #ff0040 11px)'
            }}
          />
          <div className="absolute top-0 right-0 w-1/2 h-1/2"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #8b00ff 10px, #8b00ff 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #8b00ff 10px, #8b00ff 11px)'
            }}
          />
        </div>
      </div>

      {/* Login Container */}
      <div className="relative z-10">
        {/* Glassmorphism Circle Container */}
        <div className="w-[500px] h-[500px] relative">
          {/* Glass Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            {/* Title */}
            <h1 className="text-white text-4xl font-light tracking-widest mb-12">INICIAR SESIÓN</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-300"
                  disabled={isLoading}
                  autoComplete="email"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <FaUser className="text-white/60 text-xl" />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-300"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <FaLock className="text-white/60 text-xl" />
                </div>
              </div>

              {/* Login Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-16 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-light tracking-widest hover:bg-white/20 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      CARGANDO...
                    </div>
                  ) : (
                    "INGRESAR"
                  )}
                </button>
              </div>
            </form>

            {/* Footer Links */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-white/80 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/5 text-purple-500 focus:ring-0 focus:ring-offset-0"
                />
                <span>Recuérdame</span>
              </label>
            </div>

            {/* Register Link - Only for users */}
            <div className="mt-4 text-center">
              <p className="text-white/60 text-sm">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-white hover:text-purple-400 transition-colors font-medium"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8 max-w-md mx-4 shadow-2xl animate-scaleIn">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Inicio de sesión exitoso!</h3>
              <p className="text-green-200 mb-4">Redirigiendo...</p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 max-w-md mx-4 shadow-2xl animate-shake">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Error de autenticación</h3>
              <p className="text-red-200 mb-6">{error}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-8 py-3 bg-red-500/30 hover:bg-red-500/50 border border-red-400/50 rounded-full text-white font-medium transition-all duration-300"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;