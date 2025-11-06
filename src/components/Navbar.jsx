import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'product',
      title: 'Producto agregado',
      message: '"Leche 1L" ha sido agregado al inventario.',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'entry',
      title: 'Nueva entrada registrada',
      message: 'Se registró una entrada de 50 unidades.',
      time: '5 min ago',
      read: false
    },
    {
      id: 3,
      type: 'alert',
      title: 'Alerta de stock bajo',
      message: 'El producto "Arroz" tiene stock bajo.',
      time: '10 min ago',
      read: false
    }
  ]);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

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
      navigate("/");
    }, 2000);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Clases de Tailwind v3 - Diseño moderno y colores consistentes
  const menuItemClass = "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden";
  const menuItemHoverClass = "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 hover:shadow-lg hover:shadow-blue-500/10 transform hover:scale-105 hover:border hover:border-blue-400/30";
  const menuItemIconClass = "transition-all duration-300 group-hover:text-blue-300 group-hover:scale-110 text-blue-400";
  const menuItemTextClass = "transition-all duration-300 group-hover:text-white font-medium text-gray-300";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-500 ease-in-out md:translate-x-0 shadow-2xl z-40 border-r border-blue-500/20`}>

        <div className="p-6 h-full flex flex-col relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-purple-600/5 pointer-events-none"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Logo */}
          <div className="relative text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-10 flex items-center justify-center border-b border-gray-700/50 pb-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg"></div>
            <div className="relative flex items-center">
              <FaCode className="mr-3 text-blue-400 animate-pulse" />
              <span className="tracking-wider font-bold">SEMAFORO</span>
            </div>
          </div>

          {/* Menu items */}
          <ul className="relative space-y-2 flex-1 z-10">
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaHome size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Dashboard</span>
              </button>
            </li>
            
             <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <button onClick={() => navigate('/categorias')} className="flex items-center gap-3 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaTh size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Categorías</span>
              </button>
            </li>


            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <button onClick={() => navigate('/productos')} className="flex items-center gap-3 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaBoxOpen size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Productos</span>
              </button>
            </li>


            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <button onClick={() => navigate('/alertas')} className="flex items-center gap-3 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaBell size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Alertas</span>
              </button>
            </li>

            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <button onClick={() => navigate('/reportes')} className="flex items-center gap-3 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaChartPie size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Reportes</span>
              </button>
            </li>

          </ul>

          {/* Información del usuario */}
          <div className="relative mt-auto pt-4 border-t border-gray-700/50 z-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 mb-4 backdrop-blur-sm border border-gray-600/30">
              <div className="w-12 h-12 rounded-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-300 font-bold shadow-lg">
                A
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Administrador</p>
                <p className="text-gray-400 text-sm">Rol: Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-600/20 transition-all duration-300 group border border-transparent hover:border-red-400/30"
            >
              <FaSignOutAlt size={22} className="text-red-400 group-hover:text-red-300 transition-colors duration-300" />
              <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal - CAMBIOS IMPORTANTES AQUÍ */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ${
        isOpen ? 'md:ml-64' : 'ml-0'
      } w-full`}>
        
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-2xl p-4 md:p-6 sticky top-0 z-30 border-b border-blue-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="p-3 rounded-xl text-blue-300 hover:bg-blue-500/20 hover:text-white focus:outline-none transition-all duration-300 md:hidden border border-blue-500/30 hover:border-blue-400"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Panel de Control</h1>
              <p className="text-xs text-gray-400">Sistema de Gestión de Inventario</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
              <button
                className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-110 relative border border-blue-500/30 hover:border-blue-400/50 backdrop-blur-sm"
                onClick={toggleNotification}
              >
                <FaBell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse border-2 border-gray-900">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotification && (
                <div className="absolute right-0 mt-3 w-96 bg-gray-900/95 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-6 text-sm border border-blue-500/20 z-50">
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
                            notif.type === 'entry' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {notif.type === 'product' && <FaBoxOpen size={16} />}
                            {notif.type === 'entry' && <FaClipboardList size={16} />}
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
                  <button
                    onClick={() => navigate('/alertas')}
                    className="block text-center mt-4 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-300"
                  >
                    Ver todas las notificaciones →
                  </button>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 group border border-blue-500/30 hover:border-blue-400/50"
                onClick={toggleDropdown}
              >
                <div className="w-10 h-10 rounded-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-300 font-bold shadow-lg">
                  A
                </div>
                <span className="hidden md:block text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                  Administrador
                </span>
                <FaUserCircle
                  size={20}
                  className="text-blue-400 hidden md:block group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110"
                />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-5 text-base border border-blue-500/20 z-50">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-300 font-bold">
                      A
                    </div>
                    <div>
                      <h5 className="font-bold text-lg text-white">
                        Administrador
                      </h5>
                      <p className="text-sm text-gray-400">Rol: Administrador</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 hover:bg-blue-500/10 p-3 rounded-xl transition-all duration-300 group cursor-pointer">
                      <FaUserCircle size={18} className="text-blue-400 group-hover:text-blue-300" />
                      <button
                        onClick={() => navigate('/perfil')}
                        className="text-gray-300 hover:text-white font-medium w-full text-left transition-colors duration-300"
                      >
                        Ver Perfil
                      </button>
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
        </div>

        {/* Page Content - CAMBIOS CRÍTICOS AQUÍ */}
        <main className="w-full overflow-auto">
          <div className="min-h-[calc(100vh-80px)]">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Animation */}
      {showLottie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
          <div className="bg-gray-900/90 p-8 rounded-3xl shadow-2xl text-center border border-blue-500/20">
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

export default Navbar;