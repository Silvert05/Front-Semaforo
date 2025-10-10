import React from "react";
import { 
  FaBell, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaCheckCircle,
  FaTimes // ✅ AÑADÍ ESTA IMPORTACIÓN QUE FALTABA
} from "react-icons/fa";

const Alertas = () => {
  // Datos de ejemplo para las alertas
  const alertas = [
    {
      id: 1,
      tipo: "urgente",
      titulo: "Stock bajo en productos",
      descripcion: "El producto 'Leche Entera 1L' tiene menos de 10 unidades en stock",
      fecha: "Hace 5 minutos",
      leido: false
    },
    {
      id: 2,
      tipo: "informacion",
      titulo: "Nueva entrada registrada",
      descripcion: "Se registró una entrada de 50 unidades de 'Arroz Integral'",
      fecha: "Hace 2 horas",
      leido: true
    },
    {
      id: 3,
      tipo: "advertencia",
      titulo: "Producto próximo a vencer",
      descripcion: "El producto 'Yogurt Natural' vence en 3 días",
      fecha: "Hace 1 día",
      leido: false
    },
    {
      id: 4,
      tipo: "exito",
      titulo: "Inventario actualizado",
      descripcion: "El inventario se sincronizó correctamente con el sistema",
      fecha: "Hace 2 días",
      leido: true
    }
  ];

  // Función para obtener los estilos según el tipo de alerta
  const getEstilosAlerta = (tipo) => {
    switch (tipo) {
      case "urgente":
        return {
          bg: "bg-red-50 border-red-200",
          icon: "text-red-600",
          text: "text-red-800",
          badge: "bg-red-100 text-red-800"
        };
      case "advertencia":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: "text-yellow-600",
          text: "text-yellow-800",
          badge: "bg-yellow-100 text-yellow-800"
        };
      case "informacion":
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: "text-blue-600",
          text: "text-blue-800",
          badge: "bg-blue-100 text-blue-800"
        };
      case "exito":
        return {
          bg: "bg-green-50 border-green-200",
          icon: "text-green-600",
          text: "text-green-800",
          badge: "bg-green-100 text-green-800"
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          icon: "text-gray-600",
          text: "text-gray-800",
          badge: "bg-gray-100 text-gray-800"
        };
    }
  };

  // Función para obtener el icono según el tipo
  const getIcono = (tipo) => {
    switch (tipo) {
      case "urgente":
        return <FaExclamationTriangle className="text-red-600" />;
      case "advertencia":
        return <FaExclamationTriangle className="text-yellow-600" />;
      case "informacion":
        return <FaInfoCircle className="text-blue-600" />;
      case "exito":
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaBell className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full pt-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBell className="text-blue-600" />
            Sistema de Alertas
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona y revisa todas las notificaciones del sistema
          </p>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alertas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaBell className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-600 mt-1">5</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No Leídas</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">8</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaInfoCircle className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resueltas</p>
                <p className="text-2xl font-bold text-green-600 mt-1">16</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y Acciones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Todas
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                No Leídas
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                Urgentes
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Marcar Todas como Leídas
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Limpiar Todas
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Alertas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Alertas Recientes</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {alertas.map((alerta) => {
              const estilos = getEstilosAlerta(alerta.tipo);
              return (
                <div
                  key={alerta.id}
                  className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${estilos.bg} border-l-4 ${
                    alerta.tipo === "urgente" ? "border-l-red-500" :
                    alerta.tipo === "advertencia" ? "border-l-yellow-500" :
                    alerta.tipo === "informacion" ? "border-l-blue-500" :
                    "border-l-green-500"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${estilos.bg}`}>
                      {getIcono(alerta.tipo)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`font-semibold ${estilos.text} truncate`}>
                          {alerta.titulo}
                        </h3>
                        {!alerta.leido && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Nuevo
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {alerta.descripcion}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span>{alerta.fecha}</span>
                        <span className={`px-2 py-1 rounded-full ${estilos.badge} font-medium`}>
                          {alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <FaCheckCircle size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <FaTimes size={16} /> {/* ✅ AHORA ESTÁ DEFINIDO */}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mensaje cuando no hay alertas */}
        {alertas.length === 0 && (
          <div className="text-center py-12">
            <FaBell className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay alertas
            </h3>
            <p className="text-gray-500">
              No tienes alertas pendientes en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alertas;