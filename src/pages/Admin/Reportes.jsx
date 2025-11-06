import React, { useState, useEffect } from "react";
import { Box, AlertTriangle, TrendingUp, Download, DollarSign, FileText, Activity, Shield } from "lucide-react";

const Reportes = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    expiredProducts: 0,
    lowStockProducts: 0,
    expiringSoon: 0,
    categoryBreakdown: [],
    monthlyTrend: [],
    profitability: 0
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Datos de ejemplo para tienda de barrio
  useEffect(() => {
    setIsVisible(true);
    
    const mockProducts = [
      { 
        id: 1, 
        nombre: "Queso Cheddar 500g", 
        categoria: "Lácteos", 
        stock: 15, 
        precio: 8.50, 
        costo: 6.50,
        fechaVencimiento: "2025-03-15", 
        proveedor: "Lácteos Don Carlos",
        color: "yellow",
        fechaIngreso: "2024-01-15"
      },
      { 
        id: 2, 
        nombre: "Yogurt Natural 1L", 
        categoria: "Lácteos", 
        stock: 12, 
        precio: 3.20, 
        costo: 2.40,
        fechaVencimiento: "2025-02-10", 
        proveedor: "Lácteos Frescos",
        color: "yellow",
        fechaIngreso: "2024-01-10"
      },
      { 
        id: 3, 
        nombre: "Papas Margaritas", 
        categoria: "Snacks", 
        stock: 0, 
        precio: 2.50, 
        costo: 1.80,
        fechaVencimiento: "2025-06-20", 
        proveedor: "Snacks SA",
        color: "orange",
        fechaIngreso: "2024-01-08"
      },
      { 
        id: 4, 
        nombre: "Arroz Diana 1kg", 
        categoria: "Granos", 
        stock: 25, 
        precio: 2.80, 
        costo: 2.10,
        fechaVencimiento: "2026-01-05", 
        proveedor: "Distribuidora La Economía",
        color: "blue",
        fechaIngreso: "2024-01-05"
      },
      { 
        id: 5, 
        nombre: "Gelatina Royal Fresa", 
        categoria: "Gelatinas", 
        stock: 8, 
        precio: 1.20, 
        costo: 0.85,
        fechaVencimiento: "2025-04-08", 
        proveedor: "Postres Dulces",
        color: "pink",
        fechaIngreso: "2024-01-12"
      },
      { 
        id: 6, 
        nombre: "Leche Entera 1L", 
        categoria: "Lácteos", 
        stock: 18, 
        precio: 3.80, 
        costo: 2.90,
        fechaVencimiento: "2025-02-28", 
        proveedor: "Lácteos Don Carlos",
        color: "yellow",
        fechaIngreso: "2024-01-18"
      }
    ];

    const mockCategories = [
      { nombre: "Lácteos", color: "yellow" },
      { nombre: "Snacks", color: "orange" },
      { nombre: "Granos", color: "blue" },
      { nombre: "Gelatinas", color: "pink" }
    ];

    setProducts(mockProducts);
    setCategories(mockCategories);
    calculateStats(mockProducts, mockCategories);
  }, []);

  const getProductStatus = (product) => {
    const today = new Date();
    const expirationDate = new Date(product.fechaVencimiento);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'expired';
    if (diffDays <= 30) return 'expiring';
    return 'good';
  };

  const calculateStats = (productsData, categoriesData) => {
    const totalValue = productsData.reduce((sum, product) => sum + (product.precio * product.stock), 0);
    const totalCost = productsData.reduce((sum, product) => sum + (product.costo * product.stock), 0);
    const profitability = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
    
    const expiredProducts = productsData.filter(product => getProductStatus(product) === 'expired');
    const lowStockProducts = productsData.filter(p => p.stock <= 5 && p.stock > 0);
    const expiringSoon = productsData.filter(p => {
      const daysUntilExpiry = Math.floor((new Date(p.fechaVencimiento) - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
    });

    const categoryBreakdown = categoriesData.map(category => {
      const categoryProducts = productsData.filter(p => p.categoria === category.nombre);
      const categoryValue = categoryProducts.reduce((sum, product) => sum + (product.precio * product.stock), 0);
      const categoryCost = categoryProducts.reduce((sum, product) => sum + (product.costo * product.stock), 0);
      const categoryProfit = categoryValue - categoryCost;
      const categoryProfitMargin = categoryCost > 0 ? (categoryProfit / categoryCost) * 100 : 0;
      
      return {
        name: category.nombre,
        count: categoryProducts.length,
        value: categoryValue,
        cost: categoryCost,
        profit: categoryProfit,
        profitMargin: categoryProfitMargin,
        color: category.color
      };
    });

    // Simular tendencia mensual
    const monthlyTrend = [
      { month: 'Ene', value: 45000, profit: 12000 },
      { month: 'Feb', value: 52000, profit: 15000 },
      { month: 'Mar', value: 48000, profit: 13000 },
      { month: 'Abr', value: 61000, profit: 18000 },
      { month: 'May', value: 55000, profit: 16000 },
      { month: 'Jun', value: 59000, profit: 17000 },
    ];

    setStats({
      totalProducts: productsData.length,
      totalValue,
      totalCost,
      profitability,
      expiredProducts: expiredProducts.length,
      lowStockProducts: lowStockProducts.length,
      expiringSoon: expiringSoon.length,
      categoryBreakdown,
      monthlyTrend
    });
  };

  const getProductsByStatus = () => {
    return products.reduce((acc, product) => {
      const status = getProductStatus(product);
      acc[status].push(product);
      return acc;
    }, { expired: [], expiring: [], good: [] });
  };

  const exportReport = async () => {
    setExportLoading(true);
    
    // Simular proceso de exportación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const reportData = {
      metadata: {
        generatedAt: new Date().toISOString(),
        version: "1.0"
      },
      summary: {
        totalProducts: stats.totalProducts,
        totalInventoryValue: stats.totalValue,
        totalCost: stats.totalCost,
        grossProfit: stats.totalValue - stats.totalCost,
        profitability: stats.profitability,
        expiredProducts: stats.expiredProducts,
        lowStockProducts: stats.lowStockProducts,
        expiringSoon: stats.expiringSoon
      },
      categories: stats.categoryBreakdown.map(cat => ({
        name: cat.name,
        productCount: cat.count,
        inventoryValue: cat.value,
        cost: cat.cost,
        profit: cat.profit,
        profitMargin: cat.profitMargin
      })),
      products: products.map(p => ({
        nombre: p.nombre,
        categoria: p.categoria,
        stock: p.stock,
        precio: p.precio,
        costo: p.costo,
        margen: ((p.precio - p.costo) / p.costo * 100),
        valorTotal: p.precio * p.stock,
        fechaVencimiento: p.fechaVencimiento,
        proveedor: p.proveedor,
        estado: getProductStatus(p),
        criticidad: p.stock <= 5 ? 'ALTA' : p.stock <= 10 ? 'MEDIA' : 'BAJA'
      })),
      analysis: {
        topProducts: products
          .sort((a, b) => (b.precio * b.stock) - (a.precio * a.stock))
          .slice(0, 5)
          .map(p => ({
            nombre: p.nombre,
            valorTotal: p.precio * p.stock,
            margen: ((p.precio - p.costo) / p.costo * 100)
          })),
        riskProducts: products.filter(p => getProductStatus(p) === 'expired' || getProductStatus(p) === 'expiring'),
        monthlyTrend: stats.monthlyTrend
      }
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `reporte-analitico-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    setExportLoading(false);
  };

  const exportToCSV = () => {
    const headers = ['Producto', 'Categoría', 'Stock', 'Precio', 'Costo', 'Margen%', 'Valor Total', 'Vencimiento', 'Estado', 'Proveedor'];
    const csvData = products.map(p => [
      p.nombre,
      p.categoria,
      p.stock,
      p.precio,
      p.costo || 'N/A',
      p.costo ? (((p.precio - p.costo) / p.costo) * 100).toFixed(2) : 'N/A',
      (p.precio * p.stock).toFixed(2),
      p.fechaVencimiento,
      getProductStatus(p),
      p.proveedor
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte-productos-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const StatCard = ({ title, value, icon: Icon, color, glowColor, description, formatter = (v) => v, trend, delay = 0 }) => (
    <div 
      className={`p-6 rounded-3xl glass-effect relative overflow-hidden group cursor-pointer
        transform transition-all duration-700 hover:scale-105
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${delay}ms`,
        boxShadow: `0 8px 32px ${glowColor}30, 0 0 0 1px ${glowColor}20, inset 0 1px 0 rgba(255,255,255,0.1)`
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-black text-white group-hover:scale-110 transition-transform duration-500 inline-block">
              {formatter(value)}
            </p>
            {trend && (
              <p className={`text-xs font-semibold mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/10 
            backdrop-blur-xl border border-white/10 group-hover:scale-110 
            group-hover:rotate-6 transition-all duration-500 shadow-2xl`}
            style={{ boxShadow: `0 0 30px ${glowColor}40` }}>
            <Icon className={`${color} neon-glow`} size={24} strokeWidth={2} />
          </div>
        </div>
        <p className="text-gray-500 text-xs font-medium">{description}</p>
      </div>
      
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-3xl"
           style={{ background: glowColor }}></div>
    </div>
  );

  const ProductStatusBadge = ({ product }) => {
    const status = getProductStatus(product);
    
    const statusConfig = {
      expired: { color: 'bg-rose-500/20 text-rose-300 border-rose-500/40', text: 'Caducado', icon: '🔴' },
      expiring: { color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', text: 'Por caducar', icon: '🟡' },
      good: { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', text: 'Buen estado', icon: '🟢' }
    };

    const config = statusConfig[status];

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color} backdrop-blur-sm border shadow-lg`}>
        <span>{config.icon}</span>
        {config.text}
      </span>
    );
  };

  const FinancialAnalysis = () => {
    const totalCost = products.reduce((sum, product) => sum + ((product.costo || 0) * product.stock), 0);
    const totalValue = products.reduce((sum, product) => sum + (product.precio * product.stock), 0);
    const grossProfit = totalValue - totalCost;
    const profitMargin = totalCost > 0 ? (grossProfit / totalCost) * 100 : 0;

    return (
      <div className="glass-effect rounded-3xl p-8 relative overflow-hidden group"
           style={{ boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 shadow-lg neon-glow">
            <Activity className="text-emerald-400" size={24} />
          </div>
          Análisis Financiero
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <p className="text-gray-400 text-sm mb-2">Valor de Inventario</p>
            <p className="text-3xl font-black text-emerald-400">${totalValue.toLocaleString()}</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
            <p className="text-gray-400 text-sm mb-2">Costo Total</p>
            <p className="text-3xl font-black text-blue-400">${totalCost.toLocaleString()}</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
            <p className="text-gray-400 text-sm mb-2">Margen Bruto</p>
            <p className="text-3xl font-black text-green-400">{profitMargin.toFixed(1)}%</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Tendencia Mensual</h3>
            <div className="space-y-3">
              {stats.monthlyTrend.map((month, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-gray-800/50">
                  <span className="text-white font-medium">{month.month}</span>
                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold">${month.value.toLocaleString()}</p>
                    <p className="text-green-400 text-sm">+${month.profit.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Rentabilidad por Categoría</h3>
            <div className="space-y-3">
              {stats.categoryBreakdown.map((category, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-gray-800/50">
                  <span className="text-white font-medium">{category.name}</span>
                  <div className="text-right">
                    <p className="text-cyan-400 font-semibold">{category.profitMargin.toFixed(1)}%</p>
                    <p className="text-emerald-400 text-sm">+${category.profit.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .glass-effect {
          background: rgba(15, 15, 25, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor);
        }
      `}</style>

      <div className="w-full space-y-8 relative z-10 px-6 py-8">
        {/* Header */}
        <div className={`flex justify-between items-center transition-all duration-1000 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient mb-3 neon-glow">
              Reportes Analíticos
            </h1>
            <p className="text-gray-400 text-lg font-light tracking-wide">
              Análisis detallado y exportación de datos del inventario
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="glass-effect px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border border-green-500/30 text-white bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20"
            >
              <FileText size={16} />
              Exportar CSV
            </button>
            <button
              onClick={exportReport}
              disabled={exportLoading}
              className="glass-effect px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border border-cyan-500/30 text-white bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 disabled:opacity-50"
            >
              <Download size={16} />
              {exportLoading ? 'Exportando...' : 'Exportar JSON'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Productos"
            value={stats.totalProducts}
            icon={Box}
            color="text-blue-400"
            glowColor="#3b82f6"
            description="En inventario activo"
            delay={100}
          />
          <StatCard
            title="Valor Inventario"
            value={stats.totalValue}
            icon={DollarSign}
            color="text-emerald-400"
            glowColor="#10b981"
            description="Valor total en tienda"
            formatter={(v) => `$${v.toLocaleString()}`}
            trend={8.2}
            delay={200}
          />
          <StatCard
            title="Productos Vencidos"
            value={stats.expiredProducts}
            icon={AlertTriangle}
            color="text-rose-400"
            glowColor="#f43f5e"
            description="Requieren atención inmediata"
            delay={300}
          />
          <StatCard
            title="Stock Crítico"
            value={stats.lowStockProducts}
            icon={TrendingUp}
            color="text-amber-400"
            glowColor="#f59e0b"
            description="Reabastecimiento urgente"
            delay={400}
          />
        </div>

        {/* Financial Analysis */}
        <FinancialAnalysis />

        {/* Top Products */}
        <div className="glass-effect rounded-3xl p-8 relative overflow-hidden group"
             style={{ boxShadow: '0 8px 32px rgba(6, 182, 212, 0.15)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 shadow-lg neon-glow">
              <TrendingUp className="text-cyan-400" size={24} />
            </div>
            Top 5 - Productos con Mayor Venta
          </h2>
          
          <div className="space-y-4 relative z-10">
            {products
              .sort((a, b) => (b.precio * b.stock) - (a.precio * a.stock))
              .slice(0, 5)
              .map((product, index) => {
                const margin = product.costo ? ((product.precio - product.costo) / product.costo * 100) : 0;
                return (
                  <div key={product.id} className="flex items-center justify-between p-4 glass-effect rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group/item">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold group-hover/item:text-cyan-300 transition-colors duration-300">
                          {product.nombre}
                        </h3>
                        <p className="text-gray-400 text-sm">{product.categoria}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-semibold text-lg">${(product.precio * product.stock).toLocaleString()}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-gray-400 text-sm">{product.stock} unidades</p>
                        {product.costo && (
                          <span className="text-cyan-400 text-sm font-semibold bg-cyan-500/20 px-2 py-1 rounded">
                            {margin.toFixed(1)}% margen
                          </span>
                        )}
                        <ProductStatusBadge product={product} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;