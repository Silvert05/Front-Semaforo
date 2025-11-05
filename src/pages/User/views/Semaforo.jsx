import React, { useState } from "react";
import { FaSearch, FaFilter, FaInfoCircle } from "react-icons/fa";
import { useProducts } from "../../../context/ProductContext";
import ProductCard from "../../../components/ProductCard";

const Semaforo = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("stock");

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stock":
          return a.stock - b.stock; // Menor stock primero
        case "name":
          return a.nombre.localeCompare(b.nombre);
        case "price":
          return a.precio - b.precio;
        default:
          return 0;
      }
    });

  const categories = [...new Set(products.map(p => p.categoria))];

  const getStatusInfo = (stock) => {
    if (stock === 0) return { status: "Agotado", color: "text-pink-400", bg: "bg-pink-500/10" };
    if (stock <= 10) return { status: "Stock Bajo", color: "text-orange-400", bg: "bg-orange-500/10" };
    return { status: "Buen Stock", color: "text-cyan-400", bg: "bg-cyan-500/10" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🟢 Tablero de Semáforo
        </h1>
        <p className="text-gray-400 text-lg">
          Visualiza el estado de tu inventario con el sistema de semáforo inteligente
        </p>
      </div>

      {/* Legend */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-400" />
          Leyenda del Semáforo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
            <div>
              <p className="text-cyan-400 font-medium">Verde (Buen Stock)</p>
              <p className="text-gray-400 text-sm">Más de 10 unidades</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
            <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
            <div>
              <p className="text-orange-400 font-medium">Amarillo (Stock Bajo)</p>
              <p className="text-gray-400 text-sm">1-10 unidades</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
            <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
            <div>
              <p className="text-pink-400 font-medium">Rojo (Agotado)</p>
              <p className="text-gray-400 text-sm">0 unidades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="stock">Ordenar por Stock</option>
            <option value="name">Ordenar por Nombre</option>
            <option value="price">Ordenar por Precio</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const statusInfo = getStatusInfo(product.stock);
          return (
            <div key={product.id} className="group relative">
              <div className={`absolute -inset-1 ${statusInfo.bg} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
              <div className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105">
                <ProductCard
                  nombre={product.nombre}
                  stock={product.stock}
                  color={product.color}
                  fecha={product.fecha}
                />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                      {statusInfo.status}
                    </span>
                    <span className="text-green-400 font-semibold text-sm">
                      ${product.precio.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{product.categoria}</p>
                  {product.descuento > 0 && (
                    <p className="text-orange-400 text-xs font-medium">
                      🔥 {product.descuento}% descuento
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-400 text-lg">No se encontraron productos</p>
          <p className="text-gray-500 text-sm mt-2">Intenta con otros filtros de búsqueda</p>
        </div>
      )}

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
        <h3 className="text-white font-semibold mb-4">Resumen del Inventario</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-cyan-400">{products.filter(p => p.stock > 10).length}</p>
            <p className="text-gray-400 text-sm">Buen Stock</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-400">{products.filter(p => p.stock > 0 && p.stock <= 10).length}</p>
            <p className="text-gray-400 text-sm">Stock Bajo</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-400">{products.filter(p => p.stock === 0).length}</p>
            <p className="text-gray-400 text-sm">Agotados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">{products.filter(p => p.descuento > 0).length}</p>
            <p className="text-gray-400 text-sm">En Oferta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Semaforo;
