import React, { useState } from "react";
import { AlertTriangle, Calendar, CheckCircle, XCircle, Clock, Package, Search, Filter, ChevronDown, Eye } from "lucide-react";

const Alertas = () => {
  const [activeTab, setActiveTab] = useState('verde');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const mockProducts = [
    { id: 1, nombre: "Leche Entera 1L", categoria: "Lácteos", stock: 25, fecha: "2025-11-08", precio: 2.50, proveedor: "Lácteos SA", descripcion: "Leche entera pasteurizada 1 litro", ubicacion: "Estante A1" },
    { id: 2, nombre: "Pan Blanco", categoria: "Panadería", stock: 8, fecha: "2025-11-06", precio: 1.20, proveedor: "Panadería El Sol", descripcion: "Pan blanco recién horneado", ubicacion: "Estante B2" },
    { id: 3, nombre: "Yogur Natural", categoria: "Lácteos", stock: 12, fecha: "2025-11-10", precio: 1.80, proveedor: "Lácteos SA", descripcion: "Yogur natural sin azúcar", ubicacion: "Estante A3" },
    { id: 4, nombre: "Queso Fresco", categoria: "Lácteos", stock: 5, fecha: "2025-11-07", precio: 3.50, proveedor: "Lácteos SA", descripcion: "Queso fresco 200g", ubicacion: "Estante A2" },
    { id: 5, nombre: "Cereal de Maíz", categoria: "Cereales", stock: 18, fecha: "2025-12-20", precio: 4.20, proveedor: "Cereales Corp", descripcion: "Cereal de maíz 500g", ubicacion: "Estante C1" },
    { id: 6, nombre: "Galletas Saladas", categoria: "Snacks", stock: 7, fecha: "2025-11-09", precio: 2.80, proveedor: "Snacks Plus", descripcion: "Galletas saladas 200g", ubicacion: "Estante D3" },
    { id: 7, nombre: "Mantequilla", categoria: "Lácteos", stock: 3, fecha: "2025-11-05", precio: 3.00, proveedor: "Lácteos SA", descripcion: "Mantequilla 250g", ubicacion: "Estante A4" },
    { id: 8, nombre: "Jugo Natural", categoria: "Bebidas", stock: 12, fecha: "2025-11-06", precio: 2.20, proveedor: "Bebidas Fresh", descripcion: "Jugo natural 1 litro", ubicacion: "Estante E2" },
    { id: 9, nombre: "Crema de Leche", categoria: "Lácteos", stock: 9, fecha: "2025-11-04", precio: 2.90, proveedor: "Lácteos SA", descripcion: "Crema de leche 200ml", ubicacion: "Estante A5" },
    { id: 10, nombre: "Pastel Chocolate", categoria: "Panadería", stock: 4, fecha: "2025-11-05", precio: 5.50, proveedor: "Panadería El Sol", descripcion: "Pastel de chocolate 500g", ubicacion: "Estante B1" },
    { id: 11, nombre: "Arroz Integral 1kg", categoria: "Cereales", stock: 30, fecha: "2026-03-15", precio: 3.80, proveedor: "Cereales Corp", descripcion: "Arroz integral 1kg", ubicacion: "Estante C2" },
    { id: 12, nombre: "Aceite de Oliva", categoria: "Aceites", stock: 15, fecha: "2026-05-20", precio: 8.50, proveedor: "Aceites Premium", descripcion: "Aceite de oliva extra virgen 500ml", ubicacion: "Estante F1" },
    { id: 13, nombre: "Agua Mineral 2L", categoria: "Bebidas", stock: 45, fecha: "2026-08-30", precio: 1.50, proveedor: "Bebidas Fresh", descripcion: "Agua mineral 2 litros", ubicacion: "Estante E3" },
    { id: 14, nombre: "Atún Enlatado", categoria: "Conservas", stock: 22, fecha: "2026-01-10", precio: 2.90, proveedor: "Conservas Mar", descripcion: "Atún enlatado en agua 150g", ubicacion: "Estante G2" },
  ];

  const getSemaforoStatus = (fecha) => {
    const daysUntilExpiry = Math.ceil((new Date(fecha) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return 'rojo';
    if (daysUntilExpiry <= 7) return 'amarillo';
    return 'verde';
  };

  const getProductsBySemaforo = (color) => {
    return mockProducts.filter(p => getSemaforoStatus(p.fecha) === color);
  };

  const productosVerdes = getProductsBySemaforo('verde');
  const productosAmarillos = getProductsBySemaforo('amarillo');
  const productosRojos = getProductsBySemaforo('rojo');

  const tabs = [
    { 
      id: 'verde', 
      label: 'Productos Vigentes', 
      emoji: '🟢',
      count: productosVerdes.length, 
      icon: CheckCircle,
      color: 'green',
      gradient: 'from-green-400 to-emerald-500',
      glow: '#10b981',
      bgGlow: 'from-green-500/10 to-emerald-500/10',
      priority: 'NORMAL',
      description: 'Sin riesgo de caducidad'
    },
    { 
      id: 'amarillo', 
      label: 'Próximos a Vencer', 
      emoji: '🟡',
      count: productosAmarillos.length, 
      icon: AlertTriangle,
      color: 'yellow',
      gradient: 'from-yellow-400 to-amber-500',
      glow: '#eab308',
      bgGlow: 'from-yellow-500/10 to-amber-500/10',
      priority: 'URGENTE',
      description: 'Vencen en los próximos 7 días'
    },
    { 
      id: 'rojo', 
      label: 'Productos Vencidos', 
      emoji: '🔴',
      count: productosRojos.length, 
      icon: XCircle,
      color: 'red',
      gradient: 'from-red-400 to-rose-500',
      glow: '#ef4444',
      bgGlow: 'from-red-500/10 to-rose-500/10',
      priority: 'CRÍTICO',
      description: 'Requieren retiro inmediato'
    }
  ];

  const getCurrentProducts = () => {
    let products = [];
    if (activeTab === 'verde') products = productosVerdes;
    else if (activeTab === 'amarillo') products = productosAmarillos;
    else if (activeTab === 'rojo') products = productosRojos;

    if (searchTerm) {
      products = products.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.categoria === selectedCategory);
    }

    return products;
  };

  const getDetailedStatus = (product) => {
    const daysUntilExpiry = Math.ceil((new Date(product.fecha) - new Date()) / (1000 * 60 * 60 * 24));
    const semaforo = getSemaforoStatus(product.fecha);
    
    if (semaforo === 'rojo') {
      return {
        status: 'VENCIDO',
        message: `Venció hace ${Math.abs(daysUntilExpiry)} día${Math.abs(daysUntilExpiry) !== 1 ? 's' : ''}`,
        action: 'Retirar del inventario inmediatamente'
      };
    }
    
    if (semaforo === 'amarillo') {
      return {
        status: daysUntilExpiry === 0 ? 'VENCE HOY' : 'POR VENCER',
        message: daysUntilExpiry === 0 ? 'Vence hoy' : `Vence en ${daysUntilExpiry} día${daysUntilExpiry !== 1 ? 's' : ''}`,
        action: daysUntilExpiry <= 2 ? 'Aplicar descuento urgente 30-50%' : 'Aplicar promoción 2x1 o descuento 20%'
      };
    }
    
    return {
      status: 'VIGENTE',
      message: `Vence en ${daysUntilExpiry} días`,
      action: 'Rotación normal de inventario'
    };
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const categories = ['all', ...new Set(mockProducts.map(p => p.categoria))];
  const currentTab = tabs.find(t => t.id === activeTab);
  const stockBajoProducts = mockProducts.filter(p => p.stock > 0 && p.stock <= 10);
  const stockAgotadoProducts = mockProducts.filter(p => p.stock === 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <style>{`
        .glass-effect {
          background: rgba(15, 15, 25, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor);
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>

      {/* Modal de Detalles */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-cyan-500/30">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">Detalles del Producto</h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Nombre del Producto</h4>
                    <p className="text-white font-semibold text-lg">{selectedProduct.nombre}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Categoría</h4>
                    <p className="text-white font-semibold">{selectedProduct.categoria}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Stock Actual</h4>
                    <p className="text-white font-semibold text-xl">{selectedProduct.stock} unidades</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Fecha de Vencimiento</h4>
                    <p className="text-white font-semibold text-lg">{selectedProduct.fecha}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Precio Unitario</h4>
                    <p className="text-white font-semibold text-xl">${selectedProduct.precio.toFixed(2)}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Ubicación</h4>
                    <p className="text-white font-semibold">{selectedProduct.ubicacion}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <h4 className="text-gray-400 text-sm mb-2">Descripción</h4>
                <p className="text-white">{selectedProduct.descripcion}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <h4 className="text-gray-400 text-sm mb-2">Proveedor</h4>
                <p className="text-white font-semibold text-lg">{selectedProduct.proveedor}</p>
              </div>
              
              <div className={`p-4 rounded-xl border-2 ${
                getSemaforoStatus(selectedProduct.fecha) === 'verde' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30' :
                getSemaforoStatus(selectedProduct.fecha) === 'amarillo' ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30' :
                'bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30'
              }`}>
                <h4 className="text-gray-400 text-sm mb-2">Estado Actual</h4>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${
                    getSemaforoStatus(selectedProduct.fecha) === 'verde' ? 'bg-green-500' :
                    getSemaforoStatus(selectedProduct.fecha) === 'amarillo' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-white font-semibold text-lg">
                    {getDetailedStatus(selectedProduct).status}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {getDetailedStatus(selectedProduct).message}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-300 text-sm">
                    {getDetailedStatus(selectedProduct).action}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="transition-all duration-1000">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 via-yellow-500/20 to-red-500/20 border border-green-500/30 shadow-lg">
              <AlertTriangle className="text-green-400 neon-glow" size={32} />
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent animate-gradient neon-glow">
                Sistema de Alertas SEMÁFORO
              </h1>
              <p className="text-gray-400 text-lg font-light tracking-wide">
                Monitoreo de caducidad • Productos que requieren atención inmediata
              </p>
            </div>
          </div>
        </div>

        {/* Barra de Búsqueda y Filtros Mejorada */}
        <div className="glass-effect rounded-3xl p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Barra de Búsqueda */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre, categoría o proveedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-2xl text-white 
                  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 
                  transition-all duration-300 text-lg"
              />
            </div>

            {/* Botón Filtros */}
            <div className="flex gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 border text-lg
                  ${showFilters 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-cyan-400' 
                    : 'bg-gray-900/50 border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600/50'}`}
              >
                <Filter size={24} />
                Filtros
                <ChevronDown className={`transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} size={20} />
              </button>
            </div>
          </div>

          {/* Panel de Filtros Desplegable */}
          {showFilters && (
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-700/50 animate-fade-in">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filtrar por Categoría
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm border text-center
                      ${selectedCategory === cat
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-500/50 text-cyan-300 shadow-lg'
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                  >
                    {cat === 'all' ? 'Todas' : cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tarjetas de Estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-8 rounded-3xl glass-effect relative overflow-hidden group cursor-pointer
                  transform transition-all duration-500 hover:scale-105
                  ${isActive ? 'ring-4 ring-offset-4 ring-offset-[#0a0a0f]' : ''}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: isActive 
                    ? `0 8px 32px ${tab.glow}60, 0 0 0 1px ${tab.glow}50`
                    : `0 8px 32px ${tab.glow}30, 0 0 0 1px ${tab.glow}20`,
                  ringColor: isActive ? tab.glow : 'transparent'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tab.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      {tab.emoji}
                    </div>
                    <Icon className={`text-${tab.color}-400`} size={32} />
                  </div>
                  
                  <div className={`text-5xl font-black bg-gradient-to-r ${tab.gradient} bg-clip-text text-transparent mb-3`}>
                    {tab.count}
                  </div>
                  
                  <h3 className="text-white text-xl font-bold mb-2">
                    {tab.label}
                  </h3>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${tab.gradient} text-white font-bold text-xs mb-3 shadow-lg`}>
                    {tab.priority}
                  </div>
                  
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">
                    {tab.description}
                  </p>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-3xl"
                     style={{ background: tab.glow }}></div>
              </div>
            );
          })}
        </div>

        {/* Encabezado de Sección Actual */}
        <div className={`glass-effect rounded-3xl p-6 bg-gradient-to-br ${currentTab?.bgGlow} border-2`}
             style={{ 
               boxShadow: `0 8px 32px ${currentTab?.glow}40`,
               borderColor: `${currentTab?.glow}40`
             }}>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{currentTab?.emoji}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-2">
                {currentTab?.label}
                <span className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${currentTab?.gradient} text-white font-bold text-sm shadow-lg`}>
                  {currentTab?.priority}
                </span>
              </h2>
              <p className="text-gray-400 text-base">
                {getCurrentProducts().length} producto{getCurrentProducts().length !== 1 ? 's' : ''} 
                {searchTerm && ` encontrado${getCurrentProducts().length !== 1 ? 's' : ''} para "${searchTerm}"`}
                {selectedCategory !== 'all' && ` en ${selectedCategory}`}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Productos */}
        {getCurrentProducts().length === 0 ? (
          <div className="glass-effect rounded-3xl p-12 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-3xl font-bold text-white mb-2">¡Todo bajo control!</h3>
            <p className="text-gray-400 text-lg">
              No hay productos en esta categoría
              {searchTerm && ` para "${searchTerm}"`}
              {selectedCategory !== 'all' && ` en ${selectedCategory}`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {getCurrentProducts().map((product, index) => {
              const status = getDetailedStatus(product);
              
              return (
                <div
                  key={product.id}
                  className="glass-effect rounded-2xl p-6 border-2 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
                  style={{ 
                    boxShadow: `0 4px 20px ${currentTab?.glow}30`,
                    borderColor: `${currentTab?.glow}40`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentTab?.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl mt-1">{currentTab?.emoji}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-1 leading-tight">
                            {product.nombre}
                          </h3>
                          <p className="text-gray-400 text-sm font-medium">{product.categoria}</p>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${currentTab?.gradient} text-white`}>
                        {status.status}
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl mb-4 border-2 bg-gradient-to-r ${currentTab?.bgGlow}`}
                         style={{ borderColor: `${currentTab?.glow}60` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-gray-300" />
                        <span className="text-base font-bold text-white">
                          {status.message}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-gray-300 font-medium">
                          {status.action}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                        <p className="text-gray-500 text-xs mb-1">Stock Actual</p>
                        <p className="text-white font-bold text-lg">{product.stock}</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                        <p className="text-gray-500 text-xs mb-1">Precio</p>
                        <p className="text-white font-bold text-lg">${product.precio.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30 mb-4">
                      <p className="text-gray-500 text-xs mb-1">Proveedor</p>
                      <p className="text-white font-semibold text-sm">{product.proveedor}</p>
                    </div>

                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                        border border-cyan-500/50 text-cyan-400 font-semibold text-sm
                        hover:from-cyan-500/30 hover:to-blue-500/30 hover:text-white
                        transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      Ver Detalles Completos
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Alertas de Stock */}
        {(stockBajoProducts.length > 0 || stockAgotadoProducts.length > 0) && (
          <div className="glass-effect rounded-3xl p-8 relative overflow-hidden border border-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <Package className="text-cyan-400 neon-glow" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Alertas de Stock</h3>
                  <p className="text-gray-400 text-sm">Reposición requerida</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stockBajoProducts.length > 0 && (
                  <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                      <h4 className="text-amber-300 font-bold text-lg">Stock Bajo ({stockBajoProducts.length})</h4>
                    </div>
                    <div className="space-y-3">
                      {stockBajoProducts.slice(0, 4).map(p => (
                        <div key={p.id} className="flex justify-between items-center p-2 bg-amber-500/5 rounded-lg">
                          <span className="text-gray-300 text-sm">{p.nombre}</span>
                          <span className="font-bold text-amber-400 text-lg">{p.stock}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {stockAgotadoProducts.length > 0 && (
                  <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/30">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      <h4 className="text-pink-300 font-bold text-lg">Agotados ({stockAgotadoProducts.length})</h4>
                    </div>
                    <div className="space-y-3">
                      {stockAgotadoProducts.slice(0, 4).map(p => (
                        <div key={p.id} className="p-2 bg-pink-500/5 rounded-lg">
                          <span className="text-gray-300 text-sm">{p.nombre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alertas;