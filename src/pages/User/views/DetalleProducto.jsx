import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShare, FaStar, FaCalendarAlt, FaBoxOpen, FaTruck, FaShieldAlt } from "react-icons/fa";
// Importar addToCart
import { useProducts } from "../../../context/ProductContext"; 
import ProductCard from "../../../components/ProductCard";

const DetalleProducto = () => {
  // Obtener products y addToCart
  const { products, addToCart } = useProducts(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Seleccionar un producto de ejemplo (el primero disponible)
    if (products.length > 0) {
      // Usamos el primer producto para la demostración
      const product = products[0]; 
      setSelectedProduct(product);

      // Productos relacionados de la misma categoría
      const related = products
        .filter(p => p.id !== product.id && p.categoria === product.categoria)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [products]);

  if (!selectedProduct) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando producto...</p>
        </div>
      </div>
    );
  }

  const discountedPrice = selectedProduct.descuento > 0
    ? selectedProduct.precio * (1 - selectedProduct.descuento / 100)
    : selectedProduct.precio;

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Agotado", color: "text-red-400", bg: "bg-red-500/10" };
    if (stock <= 10) return { text: "Pocas unidades", color: "text-orange-400", bg: "bg-orange-500/10" };
    return { text: "Disponible", color: "text-green-400", bg: "bg-green-500/10" };
  };

  const stockStatus = getStockStatus(selectedProduct.stock);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
      >
        <FaArrowLeft />
        Volver
      </button>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Card */}
        <div className="flex justify-center">
          <div className="relative group">
            {selectedProduct.descuento > 0 && (
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <FaStar size={12} />
                  {selectedProduct.descuento}% OFF
                </div>
              </div>
            )}
            <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105">
              <ProductCard
                nombre={selectedProduct.nombre}
                stock={selectedProduct.stock}
                color={selectedProduct.color}
                fecha={selectedProduct.fecha}
                descuento={selectedProduct.descuento}
                // Se añade la prop imagen
                imagen={selectedProduct.imagen}
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{selectedProduct.nombre}</h1>
            <p className="text-gray-400 text-lg">{selectedProduct.categoria}</p>
          </div>

          {/* Price Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-4">
              {selectedProduct.descuento > 0 ? (
                <>
                  <span className="text-3xl font-bold text-green-400">${discountedPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-400 line-through">${selectedProduct.precio.toFixed(2)}</span>
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                    -{selectedProduct.descuento}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-green-400">${selectedProduct.precio.toFixed(2)}</span>
              )}
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${stockStatus.bg} ${stockStatus.color}`}>
              <FaBoxOpen size={14} />
              {stockStatus.text}: {selectedProduct.stock} unidades
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-white font-semibold mb-3">Descripción</h3>
            <p className="text-gray-300 leading-relaxed">{selectedProduct.descripcion}</p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <FaCalendarAlt size={14} />
                <span className="text-sm">Vencimiento</span>
              </div>
              <p className="text-white font-medium">{selectedProduct.fecha}</p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <FaTruck size={14} />
                <span className="text-sm">Proveedor</span>
              </div>
              <p className="text-white font-medium">{selectedProduct.proveedor}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              disabled={selectedProduct.stock === 0}
              // Lógica de agregar al carrito actualizada
              onClick={() => {
                if (selectedProduct.stock > 0) {
                    addToCart(selectedProduct);
                    alert(`Producto "${selectedProduct.nombre}" agregado al carrito.`);
                } else {
                    alert('Producto agotado');
                }
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              <FaShoppingCart size={16} />
              {selectedProduct.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
            </button>

            <button
              onClick={() => {
                setIsFavorite(!isFavorite);
                alert(isFavorite ? 'Producto removido de favoritos' : 'Producto agregado a favoritos');
              }}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                isFavorite
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-red-500/50 hover:text-red-400'
              }`}
            >
              <FaHeart size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>

            <button
              onClick={() => alert('Enlace de compartir copiado al portapapeles (simulado)')}
              className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
            >
              <FaShare size={16} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
              <FaShieldAlt className="text-green-400" size={16} />
              <span className="text-green-400 text-sm font-medium">Producto Original</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <FaTruck className="text-blue-400" size={16} />
              <span className="text-blue-400 text-sm font-medium">Envío Gratis</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <FaCalendarAlt className="text-purple-400" size={16} />
              <span className="text-purple-400 text-sm font-medium">Garantía</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
                <ProductCard
                  nombre={product.nombre}
                  stock={product.stock}
                  color={product.color}
                  fecha={product.fecha}
                  descuento={product.descuento}
                  // Se añade la prop imagen
                  imagen={product.imagen} 
                />
                <div className="mt-3 text-center">
                  <p className="text-green-400 font-semibold">${product.precio.toFixed(2)}</p>
                  {product.descuento > 0 && (
                    <p className="text-orange-400 text-sm">-{product.descuento}% OFF</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleProducto;