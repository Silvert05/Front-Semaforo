import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaUsers,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaPercent,
  FaTrafficLight,
  FaInfoCircle,
  FaLeaf, // Icono para el branding
  FaHome, // Icono para Inicio
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Topbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio"); // Default a 'inicio'
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'product',
      title: 'Producto en oferta',
      message: '"Leche 1L" está en promoción especial.',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'promo',
      title: 'Nueva promoción',
      message: 'Descuento del 20% en productos de limpieza.',
      time: '5 min ago',
      read: false
    },
    {
      id: 3,
      type: 'alert',
      title: 'Producto agotado',
      message: 'El producto "Arroz Premium" se agotó.',
      time: '10 min ago',
      read: false
    }
  ]);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Detectar la ruta actual y cambiar el tab activo
  useEffect(() => {
    const path = location.pathname;
    if (path === "/semaforo") {
      setActiveTab("semaforo");
    } else if (path === "/promociones" || path === "/home" || path === "/") {
      setActiveTab("inicio");
    } else if (path === "/detalle-producto") {
      setActiveTab("detalle");
    } else {
      setActiveTab("inicio"); // Default a 'inicio'
    }
  }, [location.pathname]);

  // Manejar el menú móvil y redimensionamiento
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manejar clics fuera de los dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setDropdownOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target))
        setShowNotification(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setShowNotification(false);
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
    setDropdownOpen(false);
  };
  
  const handleLogout = () => {
    setShowLottie(true);
    // Limpiar datos de autenticación
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const pathMap = {
      inicio: "/promociones", // El id 'inicio' navega a la ruta '/promociones'
      semaforo: "/semaforo",
      detalle: "/detalle-producto"
    };
    navigate(pathMap[tabId]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // NUEVA DEFINICIÓN DE TABS (Orden: Inicio, Semáforo, Detalle)
  const tabs = [
    {
      id: "inicio",
      label: "Inicio",
      icon: FaHome,
      color: "from-amber-500 to-red-500", // Estilo visual de "promoción"
      bgColor: "from-amber-100 to-red-100",
      borderColor: "border-amber-300",
      textColor: "text-amber-700",
      emoji: "🏠"
    },
    {
      id: "semaforo",
      label: "Semáforo",
      icon: FaTrafficLight,
      color: "from-green-500 to-teal-500", // Acento verde/azul
      bgColor: "from-green-100 to-teal-100", // Fondo claro
      borderColor: "border-green-300",
      textColor: "text-green-700",
      emoji: "🟢"
    },
    {
      id: "detalle",
      label: "Detalle",
      icon: FaInfoCircle,
      color: "from-blue-500 to-purple-500", // Acento azul/morado
      bgColor: "from-blue-100 to-purple-100",
      borderColor: "border-blue-300",
      textColor: "text-blue-700",
      emoji: "🔍"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/5 to-white"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation Bar - Claro, Brillante y Elegante */}
      <nav className="relative z-20 flex justify-between items-center px-6 py-4 bg-white shadow-lg border-b border-gray-100">
        
        {/* 🌿 Logo Interactivo y Nombre (EcoStock) */}
        <div 
            onClick={() => navigate('/home')}
            className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-all duration-500">
            <FaLeaf size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
            Eco<span className="text-green-600">Stock</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          
          {/* Navigation Tabs (Estilo Blanco/Verde) */}
          <div className="hidden md:flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-4 py-2 rounded-xl font-bold transition-all duration-500 transform hover:scale-[1.03] flex items-center gap-2 text-sm ${
                    isActive
                      // ACTIVO: Fondo degradado claro, texto oscuro, borde y sombra
                      ? `bg-gradient-to-r ${tab.bgColor} ${tab.textColor} shadow-lg border-2 ${tab.borderColor}`
                      // INACTIVO: Fondo blanco, texto gris, hover sutil
                      : 'text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 hover:border-green-300'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-green-500/5 rounded-xl animate-pulse opacity-50"></div>
                  )}
                  <div className={`p-2 rounded-lg ${isActive ? `bg-gradient-to-r ${tab.color} text-white shadow-md` : 'bg-gray-200 text-gray-500'}`}>
                    <Icon size={16} />
                  </div>
                  <span>{tab.emoji} {tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all duration-300 border border-gray-300 hover:border-green-400"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Notification Button */}
          <div className="relative" ref={notificationRef}>
            <button
              className="p-3 rounded-xl bg-white text-gray-700 hover:bg-gray-100 focus:outline-none transition-all duration-300 transform hover:scale-110 relative border border-gray-300 hover:border-green-400 shadow-sm"
              onClick={toggleNotification}
            >
              <FaBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg animate-pulse border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotification && (
              // Dropdown de notificaciones en tema claro
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl p-6 text-sm border border-gray-200 z-50">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                  <h3 className="font-bold text-lg text-gray-900">
                    Notificaciones
                  </h3>
                  <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    {unreadCount} nuevas
                  </span>
                </div>
                <ul className="space-y-3 max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        notif.read
                          ? 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                          : 'bg-green-500/10 border-green-300 hover:bg-green-500/20'
                      }`}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          notif.type === 'product' ? 'bg-blue-500/20 text-blue-600' :
                          notif.type === 'promo' ? 'bg-green-500/20 text-green-600' :
                          'bg-red-500/20 text-red-600'
                        }`}>
                          {notif.type === 'product' && <FaInfoCircle size={16} />}
                          {notif.type === 'promo' && <FaPercent size={16} />}
                          {notif.type === 'alert' && <FaBell size={16} />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${notif.read ? 'text-gray-500' : 'text-gray-800'}`}>
                            {notif.title}
                          </p>
                          <p className="text-gray-600 text-xs mt-1">
                            {notif.message}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <a
                  href="/promociones" // Debería ser '/notificaciones' si tienes una página dedicada, si no, está bien
                  className="block text-center mt-4 text-green-600 hover:text-green-500 font-medium text-sm transition-colors duration-300"
                >
                  Ver todas las alertas →
                </a>
              </div>
            )}
          </div>

          {/* 👤 User Info - MOSTRAR SÓLO LA LETRA INICIAL */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-3 cursor-pointer p-2 rounded-full transition-all duration-300 bg-white hover:bg-gray-100 group border border-gray-300 shadow-sm"
              onClick={toggleDropdown}
            >
              <div className="w-10 h-10 rounded-full border-2 border-green-400/50 bg-gradient-to-r from-green-500/20 to-teal-500/20 flex items-center justify-center text-green-600 font-bold text-lg shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl p-5 text-base border border-gray-200 z-50">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full border-2 border-green-400/50 bg-gradient-to-r from-green-500/20 to-teal-500/20 flex items-center justify-center text-green-600 font-bold text-xl">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-gray-900">
                      {user?.name || 'Usuario'}
                    </h5>
                    <p className="text-sm text-gray-500">Rol: {user?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 hover:bg-green-500/10 p-3 rounded-xl transition-all duration-300 group cursor-pointer">
                    <FaUserCircle size={18} className="text-green-600 group-hover:text-green-500" />
                    <a
                      href="/perfil"
                      className="text-gray-700 hover:text-green-600 font-medium w-full transition-colors duration-300"
                    >
                      Ver Perfil
                    </a>
                  </li>
                  <li className="flex items-center gap-3 hover:bg-red-500/10 p-3 rounded-xl transition-all duration-300 group cursor-pointer">
                    <FaSignOutAlt size={18} className="text-red-600 group-hover:text-red-500" />
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-600 w-full text-left font-medium transition-colors duration-300"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="absolute top-20 right-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
            <h3 className="text-gray-900 font-bold text-lg mb-4 text-center">Navegación</h3>
            <div className="space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      handleTabChange(tab.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all duration-300 text-sm ${
                      isActive
                        ? `bg-gradient-to-r ${tab.bgColor} ${tab.textColor} border-2 ${tab.borderColor}`
                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${isActive ? `bg-gradient-to-r ${tab.color} text-white shadow-md` : 'bg-gray-200 text-gray-500'}`}>
                      <Icon size={20} />
                    </div>
                    <span>{tab.emoji} {tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="relative z-10 p-6 min-h-[calc(100vh-120px)]">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Logout Animation */}
      {showLottie && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center border border-gray-200">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-6">
              Cerrando Sesión...
            </div>
            <div className="w-24 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto animate-pulse shadow-lg"></div>
            <div className="mt-4 text-gray-600 text-sm">Redirigiendo al login</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;