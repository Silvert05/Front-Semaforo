// src/pages/Register.jsx
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  // REMOVIDO: El useEffect que redirigía si ya estaba autenticado

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      setError("El nombre es requerido");
      setShowErrorModal(true);
      return false;
    }

    if (name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      setShowErrorModal(true);
      return false;
    }

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

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
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
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user'
      };

      const result = await register(userData);

      if (result.success) {
        setRegisteredEmail(result.email);
        setShowSuccessModal(true);
        // Redirigir al Login después de 3 segundos
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(result.error || "Error al crear la cuenta. El correo ya podría estar registrado.");
        setShowErrorModal(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Register error:', err);
      setError("Error de conexión. Por favor inténtalo de nuevo.");
      setShowErrorModal(true);
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Débil";
    if (passwordStrength <= 3) return "Media";
    return "Fuerte";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated Wave Background - Different colors for Register */}
      <div className="absolute inset-0">
        {/* Bottom Right Wave - Cyan/Blue */}
        <svg className="absolute bottom-0 right-0 w-1/2 h-1/2" viewBox="0 0 500 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#0088ff', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path d="M500,250 Q375,200 250,250 T0,250 L0,500 L500,500 Z" fill="url(#cyanGradient)">
            <animate attributeName="d" dur="9s" repeatCount="indefinite"
              values="M500,250 Q375,200 250,250 T0,250 L0,500 L500,500 Z;
                      M500,250 Q375,150 250,200 T0,250 L0,500 L500,500 Z;
                      M500,250 Q375,200 250,250 T0,250 L0,500 L500,500 Z" />
          </path>
        </svg>

        {/* Top Left Wave - Green/Teal */}
        <svg className="absolute top-0 left-0 w-1/2 h-1/2" viewBox="0 0 500 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00ff88', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#00ccaa', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path d="M0,0 L500,0 L500,250 Q375,150 250,200 T0,250 Z" fill="url(#greenGradient)">
            <animate attributeName="d" dur="11s" repeatCount="indefinite"
              values="M0,0 L500,0 L500,250 Q375,150 250,200 T0,250 Z;
                      M0,0 L500,0 L500,250 Q375,200 250,150 T0,250 Z;
                      M0,0 L500,0 L500,250 Q375,150 250,200 T0,250 Z" />
          </path>
        </svg>

        {/* Mesh Pattern Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #00d4ff 10px, #00d4ff 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #00d4ff 10px, #00d4ff 11px)'
            }}
          />
          <div className="absolute top-0 left-0 w-1/2 h-1/2"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #00ff88 10px, #00ff88 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #00ff88 10px, #00ff88 11px)'
            }}
          />
        </div>
      </div>

      {/* Register Container */}
      <div className="relative z-10">
        <div className="w-[600px] h-[700px] relative">
          {/* Glass Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 overflow-y-auto scrollbar-hide">
            {/* Title */}
            <h1 className="text-white text-4xl font-light tracking-widest mb-8">REGISTRO</h1>
            <p className="text-white/60 text-sm mb-8">Crea tu cuenta de usuario</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre Completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-300"
                  disabled={isLoading}
                  autoComplete="name"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <FaUser className="text-white/60 text-lg" />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-300"
                  disabled={isLoading}
                  autoComplete="email"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <FaEnvelope className="text-white/60 text-lg" />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-300"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <div className="absolute right-14 top-1/2 -translate-y-1/2">
                  <FaLock className="text-white/60 text-lg" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="flex items-center space-x-3 px-2">
                  <div className="flex-1 bg-white/20 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-white/80 min-w-[50px]">{getPasswordStrengthText()}</span>
                </div>
              )}

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-300"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <div className="absolute right-14 top-1/2 -translate-y-1/2">
                  <FaLock className="text-white/60 text-lg" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Register Button */}
              <div className="flex justify-center pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-16 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-light tracking-widest hover:bg-white/20 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      CREANDO...
                    </div>
                  ) : (
                    "CREAR CUENTA"
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/"
                  className="text-white hover:text-cyan-400 transition-colors font-medium"
                >
                  Inicia sesión aquí
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
              <div className="mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Registro exitoso!</h3>
              <p className="text-green-200 mb-3">Tu cuenta ha sido creada correctamente</p>
              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <p className="text-green-300/80 text-sm">
                  <span className="font-semibold">Email:</span> {registeredEmail}
                </p>
                <p className="text-green-300/80 text-sm mt-1">
                  <span className="font-semibold">Rol:</span> Usuario
                </p>
              </div>
              <p className="text-green-200 text-sm mb-2">Ahora puedes iniciar sesión</p>
              <p className="text-green-300/70 text-xs mb-4">Redirigiendo al login...</p>
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
              <h3 className="text-2xl font-bold text-white mb-2">Error en el registro</h3>
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Register;