import React, { useState, useEffect } from "react";
import { Box, AlertTriangle, CheckCircle, TrendingUp, PieChart, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    expiringSoon: 0,
    categoryBreakdown: []
  });

  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Datos de ejemplo para demostración
    const mockProducts = [
      { id: 1, nombre: "Laptop Dell XPS 15", categoria: "Electrónica", stock: 25, fecha: "2025-12-15", color: "blue" },
      { id: 2, nombre: "Mouse Logitech MX", categoria: "Accesorios", stock: 8, fecha: "2025-11-20", color: "cyan" },
      { id: 3, nombre: "Teclado Mecánico", categoria: "Accesorios", stock: 0, fecha: "2025-11-10", color: "cyan" },
      { id: 4, nombre: "Monitor Samsung 27\"", categoria: "Electrónica", stock: 15, fecha: "2026-01-05", color: "blue" },
      { id: 5, nombre: "Webcam HD", categoria: "Accesorios", stock: 5, fecha: "2025-11-08", color: "cyan" },
      { id: 6, nombre: "Auriculares Sony", categoria: "Audio", stock: 30, fecha: "2026-02-20", color: "purple" },
    ];

    setProducts(mockProducts);

    const totalProducts = mockProducts.length;
    const lowStock = mockProducts.filter(p => p.stock > 0 && p.stock <= 10).length;
    const outOfStock = mockProducts.filter(p => p.stock === 0).length;
    const expiringSoon = mockProducts.filter(p => {
      const daysUntilExpiry = Math.floor((new Date(p.fecha) - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
    }).length;

    const categoryMap = {};
    mockProducts.forEach(product => {
      if (categoryMap[product.categoria]) {
        categoryMap[product.categoria].count++;
      } else {
        categoryMap[product.categoria] = {
          name: product.categoria,
          count: 1,
          color: product.color
        };
      }
    });

    const categoryBreakdown = Object.values(categoryMap);

    setStats({
      totalProducts,
      lowStock,
      outOfStock,
      expiringSoon,
      categoryBreakdown
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, glowColor, description, delay = 0 }) => (
    <div 
      className={`p-8 rounded-3xl glass-effect relative overflow-hidden group cursor-pointer
        transform transition-all duration-700 hover:scale-105
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${delay}ms`,
        '--glow-color': glowColor,
        '--glow-color-dim': `${glowColor}40`,
        boxShadow: `0 8px 32px ${glowColor}30, 0 0 0 1px ${glowColor}20, inset 0 1px 0 rgba(255,255,255,0.1)`
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
      <div className="absolute inset-0 rounded-3xl border-2 animate-border opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 
            backdrop-blur-xl border border-white/10 group-hover:scale-110 
            group-hover:rotate-6 transition-all duration-500 shadow-2xl"
            style={{ boxShadow: `0 0 30px ${glowColor}40` }}>
            <Icon className={`${color} neon-glow`} size={32} strokeWidth={2} />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{title}</p>
          <p className="text-5xl font-black text-white group-hover:scale-110 transition-transform duration-500 inline-block">
            {value}
          </p>
          <p className="text-gray-500 text-xs font-medium">{description}</p>
        </div>
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-3xl"
           style={{ background: glowColor }}></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 25px var(--glow-color), 0 0 50px var(--glow-color-dim); }
          50% { box-shadow: 0 0 40px var(--glow-color), 0 0 80px var(--glow-color-dim); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes border-flow {
          0%, 100% { border-color: rgba(59, 130, 246, 0.5); }
          33% { border-color: rgba(147, 51, 234, 0.5); }
          66% { border-color: rgba(236, 72, 153, 0.5); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-in { animation: slideIn 0.8s ease-out forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-border { animation: border-flow 3s ease infinite; }
        
        .glass-effect {
          background: rgba(15, 15, 25, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor);
        }
      `}</style>

      <div className="w-full space-y-8 relative z-10 px-6">
        <div className={`flex justify-between items-center transition-all duration-1000 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient mb-3 neon-glow">
              Dashboard 
            </h1>
            <p className="text-gray-400 text-lg font-light tracking-wide">
              Análisis inteligente del inventario en tiempo real
            </p>
          </div>
        </div>

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
            title="Stock Bajo"
            value={stats.lowStock}
            icon={AlertTriangle}
            color="text-amber-400"
            glowColor="#f59e0b"
            description="Requiere atención"
            delay={200}
          />
          <StatCard
            title="Agotados"
            value={stats.outOfStock}
            icon={AlertTriangle}
            color="text-rose-400"
            glowColor="#f43f5e"
            description="Reabastecer urgente"
            delay={300}
          />
          <StatCard
            title="Por Vencer"
            value={stats.expiringSoon}
            icon={CheckCircle}
            color="text-emerald-400"
            glowColor="#10b981"
            description="Próximos 7 días"
            delay={400}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-effect rounded-3xl p-8 relative overflow-hidden group animate-slide-in"
               style={{ animationDelay: '500ms', boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-3 relative z-10">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 shadow-lg neon-glow">
                <PieChart className="text-blue-400" size={24} />
              </div>
              Estado del Inventario
            </h3>
            
            <div className="flex items-center justify-center relative z-10 mb-8">
              <div className="relative w-64 h-64 transform hover:scale-105 transition-transform duration-500">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {(() => {
                    const total = stats.totalProducts;
                    const goodStock = total - stats.lowStock - stats.outOfStock;
                    const goodPercent = total > 0 ? (goodStock / total) * 100 : 0;
                    const lowPercent = total > 0 ? (stats.lowStock / total) * 100 : 0;
                    const outPercent = total > 0 ? (stats.outOfStock / total) * 100 : 0;

                    return (
                      <>
                        <circle
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke="url(#goodGradient)"
                          strokeWidth="20"
                          strokeDasharray={`${goodPercent * 2.51} 251`}
                          strokeDashoffset="0"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}
                        />
                        <circle
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke="url(#lowGradient)"
                          strokeWidth="20"
                          strokeDasharray={`${lowPercent * 2.51} 251`}
                          strokeDashoffset={`${-goodPercent * 2.51}`}
                          style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' }}
                        />
                        <circle
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke="url(#outGradient)"
                          strokeWidth="20"
                          strokeDasharray={`${outPercent * 2.51} 251`}
                          strokeDashoffset={`${-(goodPercent + lowPercent) * 2.51}`}
                          style={{ filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.6))' }}
                        />
                        
                        <defs>
                          <linearGradient id="goodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                          <linearGradient id="lowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#fb923c" />
                          </linearGradient>
                          <linearGradient id="outGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </>
                    );
                  })()}
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center glass-effect rounded-2xl p-6 border-2 border-blue-500/30 shadow-2xl">
                    <div className="text-4xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      {stats.totalProducts}
                    </div>
                    <div className="text-sm text-gray-400 font-semibold mt-1">TOTAL</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-8 relative z-10">
              {[
                { color: 'from-cyan-400 to-blue-500', label: 'Stock OK', shadow: 'shadow-cyan-500/50' },
                { color: 'from-amber-400 to-orange-500', label: 'Bajo', shadow: 'shadow-amber-500/50' },
                { color: 'from-rose-400 to-pink-500', label: 'Agotado', shadow: 'shadow-rose-500/50' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group cursor-pointer">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.color} shadow-lg ${item.shadow} 
                    group-hover:scale-125 transition-transform duration-300`}></div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 relative overflow-hidden group animate-slide-in"
               style={{ animationDelay: '700ms', boxShadow: '0 8px 32px rgba(147, 51, 234, 0.15)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-3 relative z-10">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 shadow-lg neon-glow">
                <BarChart3 className="text-purple-400" size={24} />
              </div>
              Distribución por Categoría
            </h3>
            
            <div className="space-y-6 relative z-10">
              {stats.categoryBreakdown.map((category, index) => {
                const percentage = stats.totalProducts > 0 ? (category.count / stats.totalProducts) * 100 : 0;
                const colorMap = {
                  cyan: { gradient: 'from-cyan-400 to-blue-500', glow: '#06b6d4' },
                  orange: { gradient: 'from-orange-400 to-red-500', glow: '#f97316' },
                  pink: { gradient: 'from-pink-400 to-rose-500', glow: '#ec4899' },
                  teal: { gradient: 'from-teal-400 to-emerald-500', glow: '#14b8a6' },
                  blue: { gradient: 'from-blue-400 to-indigo-500', glow: '#3b82f6' },
                  green: { gradient: 'from-green-400 to-emerald-500', glow: '#10b981' },
                  purple: { gradient: 'from-purple-400 to-violet-500', glow: '#a855f7' },
                  red: { gradient: 'from-red-400 to-pink-500', glow: '#ef4444' }
                };
                
                const colors = colorMap[category.color] || { gradient: 'from-gray-400 to-gray-600', glow: '#6b7280' };
                
                return (
                  <div 
                    key={index} 
                    className="group/item hover:transform hover:scale-102 transition-all duration-300"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-32 text-sm text-gray-300 truncate font-semibold group-hover/item:text-white transition-colors duration-300">
                        {category.name}
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-900/50 rounded-full h-3 shadow-inner overflow-hidden backdrop-blur-sm border border-white/5">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out relative overflow-hidden`}
                            style={{ 
                              width: `${percentage}%`,
                              boxShadow: `0 0 15px ${colors.glow}60`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-14 text-right">
                        <span className="text-base text-white font-bold">{category.count}</span>
                      </div>
                      <div className="w-16 text-right">
                        <span className="text-xs text-gray-400 font-semibold">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-8 relative overflow-hidden group animate-slide-in"
             style={{ animationDelay: '900ms', boxShadow: '0 8px 32px rgba(6, 182, 212, 0.15)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 shadow-lg neon-glow">
              <TrendingUp className="text-cyan-400" size={28} />
            </div>
            Productos Recientes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {products.slice(0, 6).map((product, index) => (
              <div 
                key={product.id} 
                className="glass-effect p-6 rounded-2xl border border-white/10
                  hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 
                  group/card relative overflow-hidden cursor-pointer"
                style={{ 
                  animationDelay: `${1000 + index * 100}ms`,
                  boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <h3 className="font-bold text-white text-lg group-hover/card:text-cyan-300 transition-colors duration-300">
                    {product.nombre}
                  </h3>
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border shadow-lg
                    ${product.stock === 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/30' :
                      product.stock <= 10 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/30'}`}>
                    {product.stock}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2 relative z-10 font-medium">{product.categoria}</p>
                <p className="text-gray-500 text-xs relative z-10">Vence: {product.fecha}</p>
                
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-cyan-500/10 blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;