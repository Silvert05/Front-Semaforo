import { useState, useEffect } from "react";
import { FaTrafficLight, FaPercent, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Topbar from "../component/Topbar";
import Semaforo from "./Semaforo";
import Promociones from "./Promociones";
import DetalleProducto from "./DetalleProducto";

export default function Home() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("semaforo");

  // Detectar la ruta actual y cambiar el tab activo
  useEffect(() => {
    const path = location.pathname;
    if (path === "/semaforo" || path === "/home") {
      setActiveTab("semaforo");
    } else if (path === "/promociones") {
      setActiveTab("promociones");
    } else if (path === "/detalle-producto") {
      setActiveTab("detalle");
    } else {
      setActiveTab("semaforo");
    }
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case "semaforo":
        return <Semaforo />;
      case "promociones":
        return <Promociones />;
      case "detalle":
        return <DetalleProducto />;
      default:
        return <Semaforo />;
    }
  };

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
    <Topbar>
      {/* Welcome Section - More Extravagant */}
      <div className="text-center mb-12">
        <div className="inline-block p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-6">
          <div className="bg-black/50 backdrop-blur-lg rounded-3xl px-8 py-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
              SEMAFORO
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
        </div>

        <p className="text-white text-2xl max-w-4xl mx-auto leading-relaxed font-light">
          <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sistema Inteligente de Gestión de Inventario
          </span>
          <br />
          Visualiza el estado de tus productos con nuestro innovador sistema de semáforo y descubre ofertas exclusivas.
        </p>

        {/* Stats Overview */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-green-400">🟢</div>
            <div className="text-white font-semibold">Stock Bueno</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-yellow-400">🟡</div>
            <div className="text-white font-semibold">Stock Bajo</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-red-400">🔴</div>
            <div className="text-white font-semibold">Agotado</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
          >
            🔄 Actualizar Datos
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="transition-all duration-500 ease-in-out">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-sm">
            Sistema actualizado en tiempo real • Última sincronización: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </Topbar>
  );
}
