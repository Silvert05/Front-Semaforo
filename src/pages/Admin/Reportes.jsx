import React, { useState, useEffect } from "react";
import { FaChartBar, FaCalendarAlt, FaBoxOpen, FaDollarSign, FaDownload, FaFilter } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";

const Reportes = () => {
  const { products, categories, getExpiredProducts, getProductsByCategory } = useProducts();
  const [reportType, setReportType] = useState('general');
  const [dateRange, setDateRange] = useState('month');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    expiredProducts: 0,
    lowStockProducts: 0,
    categoryBreakdown: []
  });

  useEffect(() => {
    calculateStats();
  }, [products, categories]);

  const calculateStats = () => {
    const totalValue = products.reduce((sum, product) => sum + (product.precio * product.stock), 0);
    const expiredProducts = getExpiredProducts();
    const lowStockProducts = products.filter(p => p.stock <= 10 && p.stock > 0);

    const categoryBreakdown = categories.map(category => {
      const categoryProducts = getProductsByCategory(category.nombre);
      const categoryValue = categoryProducts.reduce((sum, product) => sum + (product.precio * product.stock), 0);
      return {
        name: category.nombre,
        count: categoryProducts.length,
        value: categoryValue,
        color: category.color
      };
    });

    setStats({
      totalProducts: products.length,
      totalValue,
      expiredProducts: expiredProducts.length,
      lowStockProducts: lowStockProducts.length,
      categoryBreakdown
    });
  };

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      stats,
      products: products.map(p => ({
        nombre: p.nombre,
        categoria: p.categoria,
        stock: p.stock,
        precio: p.precio,
        valorTotal: p.precio * p.stock,
        fechaVencimiento: p.fecha,
        proveedor: p.proveedor
      }))
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `reporte-inventario-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const StatCard = ({ title, value, icon: Icon, color, formatter = (v) => v }) => (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{formatter(value)}</p>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={color} size={20} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Reportes y Estadísticas
          </h1>
          <p className="text-gray-400 mt-2">Análisis completo del inventario</p>
        </div>
        <button
          onClick={exportReport}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <FaDownload size={16} />
          Exportar Reporte
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-2">Tipo de Reporte</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General</option>
            <option value="inventory">Inventario</option>
            <option value="categories">Por Categorías</option>
            <option value="alerts">Alertas</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-2">Período</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
            <option value="year">Este año</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Productos"
          value={stats.totalProducts}
          icon={FaBoxOpen}
          color="text-blue-400"
        />
        <StatCard
          title="Valor Total Inventario"
          value={stats.totalValue}
          icon={FaDollarSign}
          color="text-green-400"
          formatter={(v) => `$${v.toFixed(2)}`}
        />
        <StatCard
          title="Productos Vencidos"
          value={stats.expiredProducts}
          icon={FaCalendarAlt}
          color="text-red-400"
        />
        <StatCard
          title="Stock Bajo"
          value={stats.lowStockProducts}
          icon={FaChartBar}
          color="text-yellow-400"
        />
      </div>

      {/* Category Breakdown */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FaChartBar className="text-blue-400" />
          Desglose por Categorías
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.categoryBreakdown.map((category, index) => (
            <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">{category.name}</h3>
                <div className={`w-4 h-4 rounded-full ${
                  category.color === 'cyan' ? 'bg-cyan-400' :
                  category.color === 'orange' ? 'bg-orange-400' :
                  category.color === 'pink' ? 'bg-pink-400' :
                  category.color === 'teal' ? 'bg-teal-400' :
                  category.color === 'blue' ? 'bg-blue-400' :
                  category.color === 'green' ? 'bg-green-400' :
                  category.color === 'purple' ? 'bg-purple-400' :
                  'bg-red-400'
                }`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Productos:</span>
                  <span className="text-white">{category.count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Valor:</span>
                  <span className="text-green-400">${category.value.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FaBoxOpen className="text-purple-400" />
          Productos con Mayor Valor
        </h2>
        <div className="space-y-4">
          {products
            .sort((a, b) => (b.precio * b.stock) - (a.precio * a.stock))
            .slice(0, 5)
            .map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700/30">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{product.nombre}</h3>
                    <p className="text-gray-400 text-sm">{product.categoria}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">${(product.precio * product.stock).toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">{product.stock} unidades</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reportes;
