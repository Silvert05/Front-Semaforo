import React, { useState } from "react";
import { FaPercent, FaTag, FaFire, FaSearch, FaFilter, FaShoppingCart } from "react-icons/fa"; // Importar FaShoppingCart
import { useProducts } from "../../../context/ProductContext";
import ProductCard from "../../../components/ProductCard";

const Promociones = () => {
  // OBTENER addToCart
  const { getProductsWithDiscount, addToCart } = useProducts();
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
          return b.descuento - a.descuento;
        case "price":
          return a.precio - b.precio;
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
      {/* ... (Header, Banner, Filters - No Cambios) ... */}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotionalProducts.map((product) => {
          const discountedPrice = calculateDiscountedPrice(product.precio, product.descuento);
          const savings = getSavings(product.precio, product.descuento);

          return (
            <div key={product.id} className="group relative">
              {/* ... (Discount Badge and Glow Effect - No Cambios) ... */}
              <div className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 transform hover:scale-105">
                <ProductCard
                  nombre={product.nombre}
                  stock={product.stock}
                  color={product.color}
                  fecha={product.fecha}
                  descuento={product.descuento}
                  imagen={product.imagen} 
                />

                <div className="mt-4 space-y-3">
                  {/* ... (Price Info - No Cambios) ... */}
                  
                  {/* NUEVO: Botón Agregar al Carrito */}
                  <button
                    disabled={product.stock === 0}
                    onClick={() => {
                        addToCart(product, 1);
                        alert(`${product.nombre} añadido al carrito.`);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaShoppingCart size={16} />
                    {product.stock === 0 ? 'Agotado' : `Añadir (1) - Ahorra $${savings.toFixed(2)}`}
                  </button>
                  
                  {/* ... (Stock Messages - No Cambios) ... */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ... (Empty Message and Summary - No Cambios) ... */}
    </div>
  );
};

export default Promociones;