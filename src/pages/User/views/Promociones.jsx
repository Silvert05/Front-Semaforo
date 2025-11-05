import React, { useState } from "react";
import { FaPercent, FaTag, FaFire, FaSearch, FaFilter } from "react-icons/fa";
import { useProducts } from "../../../context/ProductContext";
import ProductCard from "../../../components/ProductCard";

const Promociones = () => {
  const { getProductsWithDiscount } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("discount");

  const promotionalProducts = getProductsWithDiscount()
    .filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.categoria.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "discount":
          return b.descuento - a.descuento; // Mayor descuento primero
        case "price":
          return a.precio - b.precio; // Menor precio primero
        case "name":
          return a.nombre.localeCompare(b.nombre);
        default:
          return 0;
      }
    });

  const calculateDiscountedPrice = (originalPrice, discount) => {
    return originalPrice * (1 - discount / 100);
  };

  const getSavings = (originalPrice, discount) => {
    return originalPrice * (discount / 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
          🟡 Promociones Especiales
        </h1>
        <p className="text-gray-400 text-lg">
          Descubre ofertas increíbles y ahorra en tus productos favoritos
        </p>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-orange-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl">
            <FaFire className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">¡Ofertas Calientes!</h3>
            <p className="text-orange-200">Aprovecha estos descuentos limitados antes de que se acaben</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ofertas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
          >
            <option value="discount">Mayor descuento</option>
            <option value="price">Menor precio</option>
            <option value="name">Ordenar por nombre</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotionalProducts.map((product) => {
          const discountedPrice = calculateDiscountedPrice(product.precio, product.descuento);
          const savings = getSavings(product.precio, product.descuento);

          return (
            <div key={product.id} className="group relative">
              {/* Discount Badge */}
              <div className="absolute -top-3 -right-3 z-20">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <FaPercent size={12} />
                  {product.descuento}% OFF
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 transform hover:scale-105">
                <ProductCard
                  nombre={product.nombre}
                  stock={product.stock}
                  color={product.color}
                  fecha={product.fecha}
                  descuento={product.descuento}
                />

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaTag className="text-orange-400" size={14} />
                      <span className="text-gray-400 text-sm">{product.categoria}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs line-through">${product.precio.toFixed(2)}</p>
                      <p className="text-green-400 font-bold text-lg">${discountedPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 text-sm font-medium">Ahorras</span>
                      <span className="text-green-400 font-bold">${savings.toFixed(2)}</span>
                    </div>
                  </div>

                  {product.stock <= 10 && product.stock > 0 && (
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-2">
                      <p className="text-orange-400 text-xs text-center font-medium">
                        🔥 ¡Solo quedan {product.stock} unidades!
                      </p>
                    </div>
                  )}

                  {product.stock === 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2">
                      <p className="text-red-400 text-xs text-center font-medium">
                        ❌ Producto agotado
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {promotionalProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTag className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-400 text-lg">No hay promociones disponibles</p>
          <p className="text-gray-500 text-sm mt-2">Vuelve pronto para nuevas ofertas</p>
        </div>
      )}

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 border border-green-500/20">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <FaPercent className="text-green-400" />
          Resumen de Ahorros
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{promotionalProducts.length}</p>
            <p className="text-gray-400 text-sm">Productos en oferta</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">
              {promotionalProducts.reduce((sum, p) => sum + p.descuento, 0) / promotionalProducts.length || 0}%
            </p>
            <p className="text-gray-400 text-sm">Descuento promedio</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              ${promotionalProducts.reduce((sum, p) => sum + getSavings(p.precio, p.descuento), 0).toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm">Ahorro total posible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promociones;
