import { useState, useEffect } from "react";
import { FaTrafficLight, FaPercent, FaInfoCircle, FaRedo } from "react-icons/fa";
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

  return (
    // CAMBIO: Fondo general más claro
    <div className="min-h-screen bg-gray-50"> 
        {/* Usamos el Topbar (asumiendo que tiene manejo de navegación) */}
        <Topbar activeTab={activeTab} setActiveTab={setActiveTab}>
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            {/* Título en color de acento y texto oscuro */}
            <h1 className="text-3xl font-extrabold text-gray-900">
              ECOSTOCK <span className="text-green-600">|</span> Inventario
            </h1>
            
            {/* BOTONES RÁPIDOS */}
            <div className="flex gap-4">
              <button
                onClick={() => alert("Datos actualizados (Simulado).")}
                // CAMBIO: Botón con fondo blanco/gris claro
                className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 border border-gray-300 shadow-sm"
              >
                <FaRedo className="text-green-600"/> Actualizar
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="transition-all duration-500 ease-in-out">
            {/* CAMBIO: Contenedor con fondo blanco, sombra y borde sutil */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="p-8">
                {renderContent()}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12">
            {/* CAMBIO: Footer con colores claros */}
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-green-500/10 rounded-full border border-green-300 text-gray-700 text-sm">
              <FaInfoCircle className="text-green-600" />
              ECOSTOCK - Sistema de gestión de inventario inteligente.
            </div>
          </div>
        </Topbar>
    </div>
  );
}