import React, { useState } from "react";
import { FaSearch, FaFilter, FaInfoCircle, FaShoppingCart } from "react-icons/fa"; // Importar FaShoppingCart
import { useProducts } from "../../../context/ProductContext";
import ProductCard from "../../../components/ProductCard";

const Semaforo = () => {
  // OBTENER addToCart
  const { products, addToCart } = useProducts();
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
          return a.stock - b.stock; 
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
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🟢 Tablero de Semáforo
        </h1>
        <p className="text-gray-400 text-lg">
          Visualiza el estado de tu inventario con el sistema de semáforo inteligente
        </p>
      </div>

      {/* ... (Legend and Filters - No Cambios) ... */}

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
                  imagen={product.imagen} 
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
                  
                  {/* NUEVO: Botón Agregar al Carrito */}
                  <button
                    disabled={product.stock === 0}
                    onClick={() => {
                      addToCart(product, 1);
                      alert(`${product.nombre} añadido al carrito.`);
                    }}
                    className="w-full mt-3 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaShoppingCart size={14} />
                    {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ... (Summary - No Cambios) ... */}
    </div>
  );
};

export default Semaforo;