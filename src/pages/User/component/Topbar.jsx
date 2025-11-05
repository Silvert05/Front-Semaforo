import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaSignOutAlt,
  FaBell,
  FaClipboardList,
  FaBoxOpen,
  FaChartPie,
  FaTh,
  FaCode,
  FaUserCircle,
  FaPercent,
  FaTrafficLight,
  FaInfoCircle,
  FaArrowRight
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Topbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [activeTab, setActiveTab] = useState("semaforo");
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
    } else if (path === "/promociones") {
      setActiveTab("promociones");
    } else if (path === "/detalle-producto") {
      setActiveTab("detalle");
    } else {
      setActiveTab("semaforo");
    }
  }, [location.pathname]);

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
      semaforo: "/semaforo",
      promociones: "/promociones",
      detalle: "/detalle-producto"
    };
    navigate(pathMap[tabId]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    {
      id: "semaforo",
      label: "Semáforo",
      icon: FaTrafficLight,
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
      textColor: "text-cyan-400",
      emoji: "🟢"
    },
    {
      id: "promociones",
      label: "Promociones",
      icon: FaPercent,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-400",
      emoji: "🟡"
    },
    {
      id: "detalle",
      label: "Detalle",
      icon: FaInfoCircle,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      emoji: "🔍"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-pink-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Bar - Minimal and Elegant */}
      <nav className="relative z-20 flex justify-between items-center p-6 backdrop-blur-sm bg-black/10 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SEMAFORO
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-500 transform hover:scale-105 flex items-center gap-3 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.bgColor} ${tab.textColor} shadow-2xl border-2 border-white/30`
                      : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-xl animate-pulse"></div>
                  )}
                  <div className={`p-2 rounded-lg ${isActive ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` : 'bg-white/10 text-white/60'}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-sm">{tab.emoji} {tab.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/30"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Notification Button */}
          <div className="relative" ref={notificationRef}>
            <button
              className="p-3 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-110 relative border border-white/20 hover:border-white/30 backdrop-blur-sm"
              onClick={toggleNotification}
            >
              <FaBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse border-2 border-indigo-900">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-3 w-96 bg-black/90 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-6 text-sm border border-white/20 z-50">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                  <h3 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Notificaciones
                  </h3>
                  <span className="text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded-full">
                    {unreadCount} nuevas
                  </span>
                </div>
                <ul className="space-y-3 max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        notif.read
                          ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                          : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:from-blue-500/20 hover:to-purple-500/20'
                      }`}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          notif.type === 'product' ? 'bg-blue-500/20 text-blue-400' :
                          notif.type === 'promo' ? 'bg-green-500/20 text-green-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {notif.type === 'product' && <FaBoxOpen size={16} />}
                          {notif.type === 'promo' && <FaPercent size={16} />}
                          {notif.type === 'alert' && <FaBell size={16} />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${notif.read ? 'text-gray-300' : 'text-white'}`}>
                            {notif.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {notif.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-2">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <a
                  href="/promociones"
                  className="block text-center mt-4 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-300"
                >
                  Ver todas las ofertas →
                </a>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl transition-all duration-300 hover:bg-white/10 group border border-white/20 hover:border-white/30"
              onClick={toggleDropdown}
            >
              <div className="w-10 h-10 rounded-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-300 font-bold shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                {user?.name || 'Usuario'}
              </span>
              <FaUserCircle
                size={20}
                className="text-blue-400 hidden md:block group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110"
              />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-black/90 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-5 text-base border border-white/20 z-50">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-300 font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white">
                      {user?.name || 'Usuario'}
                    </h5>
                    <p className="text-sm text-gray-400">Rol: {user?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 hover:bg-blue-500/10 p-3 rounded-xl transition-all duration-300 group cursor-pointer">
                    <FaUserCircle size={18} className="text-blue-400 group-hover:text-blue-300" />
                    <a
                      href="/perfil"
                      className="text-gray-300 hover:text-white font-medium w-full transition-colors duration-300"
                    >
                      Ver Perfil
                    </a>
                  </li>
                  <li className="flex items-center gap-3 hover:bg-red-500/10 p-3 rounded-xl transition-all duration-300 group cursor-pointer">
                    <FaSignOutAlt size={18} className="text-red-400 group-hover:text-red-300" />
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white w-full text-left font-medium transition-colors duration-300"
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
          <div className="absolute top-24 right-6 w-80 bg-black/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Navegación</h3>
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
                    className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${tab.bgColor} ${tab.textColor} border-2 border-white/30`
                        : 'text-white/80 hover:text-white hover:bg-white/10 border border-white/20'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${isActive ? `bg-gradient-to-r ${tab.color} text-white` : 'bg-white/10 text-white/60'}`}>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
          <div className="bg-black/90 p-8 rounded-3xl shadow-2xl text-center border border-white/20">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Cerrando Sesión...
            </div>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto animate-pulse shadow-lg"></div>
            <div className="mt-4 text-gray-400 text-sm">Redirigiendo al login</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;