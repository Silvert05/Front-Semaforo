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
  FaCogs,
  FaCode,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

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
    setTimeout(() => window.location.href = "/", 2000); 
  };

  // Clases de Tailwind v3
  const menuItemClass = "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer group";
  const menuItemHoverClass = "hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg transform hover:scale-105";
  const menuItemIconClass = "transition-colors duration-300 group-hover:text-gray-900 text-blue-400";
  const menuItemTextClass = "transition-colors duration-300 group-hover:text-gray-900 font-medium text-gray-200";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-black text-white w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 shadow-2xl z-40`}>
        
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="text-4xl font-extrabold text-blue-400 mb-10 flex items-center justify-center border-b border-gray-700 pb-5">
            <FaCode className="mr-3 text-blue-500" />
            <span className="tracking-wide">SEMAFORO</span>
          </div>

          {/* Menu items */}
          <ul className="space-y-4 flex-1">
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/dashboard" className="flex items-center gap-3 w-full">
                <FaHome size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Dashboard</span>
              </a>
            </li>
            
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/productos" className="flex items-center gap-3 w-full">
                <FaBoxOpen size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Productos</span>
              </a>
            </li>

            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/entradas" className="flex items-center gap-3 w-full">
                <FaClipboardList size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Entradas</span>
              </a>
            </li>

            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/salidas" className="flex items-center gap-3 w-full">
                <FaClipboardList size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Salidas</span>
              </a>
            </li>

            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/alertas" className="flex items-center gap-3 w-full">
                <FaBell size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Alertas</span>
              </a>
            </li>

            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/reportes" className="flex items-center gap-3 w-full">
                <FaChartPie size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Reportes</span>
              </a>
            </li>

            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/configuracion" className="flex items-center gap-3 w-full">
                <FaCogs size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Configuración</span>
              </a>
            </li>
          </ul>

          {/* Información del usuario */}
          <div className="mt-auto pt-4 border-t border-gray-700">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-blue-400 bg-gray-700 flex items-center justify-center text-blue-400 font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Administrador</p>
                <p className="text-gray-400 text-sm">Rol: Admin</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 transition-all duration-300 group"
            >
              <FaSignOutAlt size={22} className="text-red-400 group-hover:text-gray-900" />
              <span className="text-gray-200 font-medium group-hover:text-gray-900">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal - CAMBIOS IMPORTANTES AQUÍ */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ${
        isOpen ? 'md:ml-64' : 'ml-0'
      } w-full`}>
        
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-black text-white shadow-lg p-4 md:p-6 sticky top-0 z-30 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200 md:hidden"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <h1 className="text-xl font-semibold">Panel de Control</h1>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
              <button
                className="p-3 rounded-full bg-gray-700 text-white hover:bg-blue-600 focus:outline-none transition-all duration-300 transform hover:scale-110 relative"
                onClick={toggleNotification}
              >
                <FaBell size={22} />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  3
                </span>
              </button>
              
              {showNotification && (
                <div className="absolute right-0 mt-3 w-80 bg-white text-gray-800 rounded-lg shadow-xl p-5 text-sm border border-gray-200 z-50">
                  <p className="font-bold text-lg mb-3 border-b pb-2 text-gray-900 flex justify-between items-center">
                    Notificaciones
                    <span className="text-gray-500 text-sm">Nuevas (3)</span>
                  </p>
                  <ul className="space-y-4">
                    <li className="bg-blue-50 p-3 rounded-md border border-blue-200 flex items-start gap-3 hover:bg-blue-100 transition-colors duration-200">
                      <FaBoxOpen className="text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Producto agregado
                        </p>
                        <p className="text-gray-600 text-xs">
                          "Leche 1L" ha sido agregado al inventario.
                        </p>
                      </div>
                    </li>
                    <li className="bg-green-50 p-3 rounded-md border border-green-200 flex items-start gap-3 hover:bg-green-100 transition-colors duration-200">
                      <FaClipboardList className="text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Nueva entrada registrada
                        </p>
                        <p className="text-gray-600 text-xs">
                          Se registró una entrada de 50 unidades.
                        </p>
                      </div>
                    </li>
                    <li className="bg-yellow-50 p-3 rounded-md border border-yellow-200 flex items-start gap-3 hover:bg-yellow-100 transition-colors duration-200">
                      <FaBell className="text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Alerta de stock bajo
                        </p>
                        <p className="text-gray-600 text-xs">
                          El producto "Arroz" tiene stock bajo.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <a
                    href="/alertas"
                    className="block text-center mt-4 text-blue-600 hover:underline font-medium text-sm"
                  >
                    Ver todas las notificaciones
                  </a>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-2 cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-gray-700 group"
                onClick={toggleDropdown}
              >
                <div className="w-10 h-10 rounded-full border-2 border-blue-400 bg-gray-700 flex items-center justify-center text-blue-400 font-bold">
                  A
                </div>
                <span className="hidden md:block text-gray-300 font-medium group-hover:text-white transition-colors duration-200">
                  Administrador
                </span>
                <FaUserCircle
                  size={24}
                  className="text-blue-400 hidden md:block group-hover:text-blue-300 transition-colors duration-200"
                />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-lg shadow-xl p-4 text-base border border-gray-200 z-50">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <FaUserCircle size={30} className="text-blue-500" />
                    <div>
                      <h5 className="font-bold text-lg text-gray-900">
                        Administrador
                      </h5>
                      <p className="text-sm text-gray-600">Admin</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition-colors duration-200">
                      <FaUserCircle size={20} className="text-gray-600" />
                      <a
                        href="/perfil"
                        className="text-gray-800 hover:text-blue-600 font-medium w-full"
                      >
                        Ver Perfil
                      </a>
                    </li>
                    <li className="flex items-center gap-3 hover:bg-red-50 p-2 rounded-md transition-colors duration-200">
                      <FaSignOutAlt size={20} className="text-red-500" />
                      <button
                        onClick={handleLogout}
                        className="text-gray-800 hover:text-red-600 w-full text-left font-medium"
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
          <div className="p-4 md:p-6 min-h-[calc(100vh-80px)]">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Animation */}
      {showLottie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
            <div className="text-3xl font-bold text-gray-800 mb-4">Cerrando Sesión...</div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;