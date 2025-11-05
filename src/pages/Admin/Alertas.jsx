import React, { useState } from "react";
import { FaExclamationTriangle, FaCalendarAlt, FaBoxOpen, FaFilter } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";

const Alertas = () => {
  const { getLowStockProducts, getOutOfStockProducts, getExpiringProducts, getExpiredProducts } = useProducts();
  const [activeTab, setActiveTab] = useState('expiring');

  const lowStockProducts = getLowStockProducts();
  const outOfStockProducts = getOutOfStockProducts();
  const expiringProducts = getExpiringProducts(7);
  const expiredProducts = getExpiredProducts();

  const tabs = [
    { id: 'expiring', label: 'Por Vencer', count: expiringProducts.length, color: 'orange' },
    { id: 'expired', label: 'Vencidos', count: expiredProducts.length, color: 'red' },
    { id: 'lowStock', label: 'Stock Bajo', count: lowStockProducts.length, color: 'yellow' },
    { id: 'outOfStock', label: 'Agotados', count: outOfStockProducts.length, color: 'pink' }
  ];

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'expiring': return expiringProducts;
      case 'expired': return expiredProducts;
      case 'lowStock': return lowStockProducts;
      case 'outOfStock': return outOfStockProducts;
      default: return [];
    }
  };

  const getAlertColor = (tab) => {
    switch (tab) {
      case 'expiring': return 'border-orange-500/30 bg-orange-500/10';
      case 'expired': return 'border-red-500/30 bg-red-500/10';
      case 'lowStock': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'outOfStock': return 'border-pink-500/30 bg-pink-500/10';
      default: return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const getAlertIcon = (tab) => {
    switch (tab) {
      case 'expiring':
      case 'expired': return <FaCalendarAlt className="text-orange-400" />;
      case 'lowStock':
      case 'outOfStock': return <FaBoxOpen className="text-yellow-400" />;
      default: return <FaExclamationTriangle className="text-gray-400" />;
    }
  };

  const getAlertMessage = (tab, product) => {
    const daysUntilExpiry = Math.ceil((new Date(product.fecha) - new Date()) / (1000 * 60 * 60 * 24));

    switch (tab) {
      case 'expiring':
        return `Vence en ${daysUntilExpiry} día${daysUntilExpiry !== 1 ? 's' : ''}`;
      case 'expired':
        return `Venció hace ${Math.abs(daysUntilExpiry)} día${Math.abs(daysUntilExpiry) !== 1 ? 's' : ''}`;
      case 'lowStock':
        return `Stock bajo: ${product.stock} unidades`;
      case 'outOfStock':
        return 'Producto agotado';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Sistema de Alertas
        </h1>
        <p className="text-gray-400 mt-2">Monitorea productos que requieren atención</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              activeTab === tab.id
                ? getAlertColor(tab.color)
                : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center justify-between mb-2">
              {getAlertIcon(tab.id)}
              <span className={`text-2xl font-bold ${
                tab.color === 'orange' ? 'text-orange-400' :
                tab.color === 'red' ? 'text-red-400' :
                tab.color === 'yellow' ? 'text-yellow-400' :
                'text-pink-400'
              }`}>
                {tab.count}
              </span>
            </div>
            <p className="text-white text-sm font-medium">{tab.label}</p>
          </div>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className={`rounded-2xl border p-6 ${getAlertColor(activeTab.split('Stock')[0].toLowerCase())}`}>
        <div className="flex items-center gap-3 mb-6">
          {getAlertIcon(activeTab)}
          <h2 className="text-xl font-bold text-white">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h2>
          <span className="bg-gray-900/50 text-gray-300 px-3 py-1 rounded-full text-sm">
            {getCurrentProducts().length} producto{getCurrentProducts().length !== 1 ? 's' : ''}
          </span>
        </div>

        {getCurrentProducts().length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-400 text-lg">No hay alertas en esta categoría</p>
            <p className="text-gray-500 text-sm mt-2">¡Todo está bajo control!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getCurrentProducts().map((product) => (
              <div key={product.id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{product.nombre}</h3>
                    <p className="text-gray-400 text-sm">{product.categoria}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activeTab === 'expiring' ? 'bg-orange-500/20 text-orange-400' :
                    activeTab === 'expired' ? 'bg-red-500/20 text-red-400' :
                    activeTab === 'lowStock' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-pink-500/20 text-pink-400'
                  }`}>
                    {activeTab === 'lowStock' || activeTab === 'outOfStock' ? product.stock : product.fecha}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    activeTab === 'expiring' ? 'text-orange-300' :
                    activeTab === 'expired' ? 'text-red-300' :
                    activeTab === 'lowStock' ? 'text-yellow-300' :
                    'text-pink-300'
                  }`}>
                    {getAlertMessage(activeTab, product)}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ${product.precio.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {(expiringProducts.length > 0 || expiredProducts.length > 0) && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-blue-400" />
            Acciones Recomendadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expiringProducts.length > 0 && (
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <h4 className="text-blue-300 font-medium mb-2">Productos por vencer</h4>
                <p className="text-gray-300 text-sm">
                  Considera aplicar descuentos o promociones para vender estos productos antes de que venzan.
                </p>
              </div>
            )}
            {expiredProducts.length > 0 && (
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <h4 className="text-red-300 font-medium mb-2">Productos vencidos</h4>
                <p className="text-gray-300 text-sm">
                  Retira estos productos del inventario y considera contactar a proveedores para reposición.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alertas;
