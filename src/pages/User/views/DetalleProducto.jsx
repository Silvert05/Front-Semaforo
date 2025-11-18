import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShare, FaStar, FaCalendarAlt, FaBoxOpen, FaTruck, FaShieldAlt, FaCalendarTimes, FaCheckCircle, FaTag, FaClock } from "react-icons/fa";
import { useProducts } from "../../../context/ProductContext"; 
import ProductCard from "../../../components/ProductCard";

// Configuración de umbrales
const EXPIRY_THRESHOLD_DAYS = 30; // 30 días para pasar a semáforo Amarillo

const DetalleProducto = () => {
  // Obtener products y addToCart
  const { products, addToCart } = useProducts(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // =========================================================
  // LÓGICA UNIFICADA DEL SEMÁFORO (Reemplaza la lógica eliminada)
  // =========================================================
  const getStatusInfo = (product) => {
    const { stock, descuento, fecha } = product;
    const today = new Date();
    const expiryDate = new Date(fecha);
    const caducado = expiryDate < today && !isNaN(expiryDate.getTime());
    const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    // 🔴 ROJO: Caducado o Agotado (prioridad alta)
    if (caducado || stock === 0) 
        return { 
            status: caducado ? "¡CADUCADO! NO CONSUMIBLE" : "AGOTADO", 
            color: "text-red-700",
            bg: "bg-red-200",
            border: "border-red-400/70",
            key: "red",
            icon: <FaCalendarTimes size={16} />
        };
        
    // 🟡 AMARILLO/NARANJA: Casi Caducado o Bajo Stock o con Promoción
    if (daysToExpiry <= EXPIRY_THRESHOLD_DAYS || descuento > 0 || stock <= 10) 
        return { 
            status: descuento > 0 ? "OFERTA ACTIVA" : (stock <= 10 ? "BAJO STOCK" : "PRÓXIMO A VENCER"), 
            color: "text-amber-700",
            bg: "bg-amber-200",
            border: "border-amber-400/70",
            key: "yellow",
            icon: descuento > 0 ? <FaTag size={16} /> : (stock <= 10 ? <FaBoxOpen size={16} /> : <FaClock size={16} />)
        };
        
    // 🟢 VERDE: Buen Estado (Sin riesgo de caducidad ni bajo stock)
    return { 
        status: "BUEN ESTADO", 
        color: "text-green-700",
        bg: "bg-green-200",
        border: "border-green-500/70",
        key: "green",
        icon: <FaCheckCircle size={16} />
    };
  };

  useEffect(() => {
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
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando producto...</p>
        </div>
      </div>
    );
  }

  const discountedPrice = selectedProduct.descuento > 0
    ? selectedProduct.precio * (1 - selectedProduct.descuento / 100)
    : selectedProduct.precio;

  const statusInfo = getStatusInfo(selectedProduct);

  const isUnavailable = statusInfo.key === "red"; // Caducado o Agotado

  return (
    <div className="space-y-8 p-4">
      
      {/* 🚨 ALERTA DE CADUCIDAD (Solo si es Rojo) */}
      {statusInfo.status.includes("¡CADUCADO!") && (
        <div className="bg-red-500/10 border-l-4 border-red-600 p-4 rounded-xl shadow-md flex items-center gap-3">
          <FaCalendarTimes size={24} className="text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-red-700">¡Advertencia Crítica!</h3>
            <p className="text-red-600">
              Este producto está **CADUCADO** y no es apto para el consumo. Por favor, retírelo del stock.
            </p>
          </div>
        </div>
      )}
      
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium"
      >
        <FaArrowLeft />
        Volver al Semáforo
      </button>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Product Card */}
        <div className="flex justify-center">
          <div className="relative group">
            {selectedProduct.descuento > 0 && (
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-1">
                  <FaStar size={12} />
                  {selectedProduct.descuento}% OFF
                </div>
              </div>
            )}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:border-green-300 transition-all duration-300 transform hover:scale-[1.03]">
              <ProductCard
                nombre={selectedProduct.nombre}
                stock={selectedProduct.stock}
                color={selectedProduct.color}
                fecha={selectedProduct.fecha}
                descuento={selectedProduct.descuento}
                imagen={selectedProduct.imagen}
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{selectedProduct.nombre}</h1>
            <p className="text-gray-500 text-lg font-medium">{selectedProduct.categoria}</p>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              {selectedProduct.descuento > 0 ? (
                <>
                  <span className="text-4xl font-bold text-green-600">${discountedPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-400 line-through">${selectedProduct.precio.toFixed(2)}</span>
                  <span className="bg-orange-500/20 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                    -{selectedProduct.descuento}%
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-green-600">${selectedProduct.precio.toFixed(2)}</span>
              )}
            </div>

            {/* ESTADO DEL SEMÁFORO (Stock y Caducidad) */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}>
              {statusInfo.icon}
              {statusInfo.status} 
              {!statusInfo.status.includes("¡CADUCADO!") && `: ${selectedProduct.stock} unidades`}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 font-semibold mb-3">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">{selectedProduct.descripcion}</p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <FaCalendarAlt size={14} className="text-green-500" />
                <span className="text-sm">Vencimiento</span>
              </div>
              <p className={`font-bold ${statusInfo.key === 'red' ? 'text-red-600' : 'text-gray-800'}`}>
                {selectedProduct.fecha}
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <FaTruck size={14} className="text-blue-500" />
                <span className="text-sm">Proveedor</span>
              </div>
              <p className="text-gray-800 font-bold">{selectedProduct.proveedor}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              disabled={isUnavailable}
              onClick={() => {
                if (!isUnavailable) {
                    addToCart(selectedProduct);
                    alert(`✅ Producto "${selectedProduct.nombre}" agregado al carrito.`);
                }
              }}
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              <FaShoppingCart size={18} />
              {isUnavailable ? statusInfo.status.toUpperCase() : 'AÑADIR AL CARRITO'}
            </button>

            {/* Botones Secundarios */}
            <button
              onClick={() => {
                setIsFavorite(!isFavorite);
                alert(isFavorite ? 'Producto removido de favoritos' : 'Producto agregado a favoritos');
              }}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 shadow-sm ${
                isFavorite
                  ? 'bg-red-500/20 border-red-500/50 text-red-600 hover:bg-red-500/30'
                  : 'bg-white border-gray-300 text-gray-500 hover:border-red-500/50 hover:text-red-500'
              }`}
            >
              <FaHeart size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>

            <button
              onClick={() => alert('Enlace de compartir copiado al portapapeles (simulado)')}
              className="p-4 bg-white border border-gray-300 rounded-2xl text-gray-500 hover:border-blue-500/50 hover:text-blue-500 transition-all duration-300 shadow-sm"
            >
              <FaShare size={16} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20 shadow-inner">
              <FaShieldAlt className="text-green-600" size={16} />
              <span className="text-green-700 text-sm font-medium">Producto Original</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner">
              <FaTruck className="text-blue-600" size={16} />
              <span className="text-blue-700 text-sm font-medium">Envío Rápido</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-inner">
              <FaCalendarAlt className="text-purple-600" size={16} />
              <span className="text-purple-700 text-sm font-medium">Garantía 30 Días</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3 border-gray-200">Productos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-400 transition-all duration-300 cursor-pointer shadow-md"
              >
                <ProductCard
                  nombre={product.nombre}
                  stock={product.stock}
                  color={product.color}
                  fecha={product.fecha}
                  descuento={product.descuento}
                  imagen={product.imagen} 
                />
                <div className="mt-3 text-center">
                  <p className="text-green-600 font-bold text-lg">${product.precio.toFixed(2)}</p>
                  {product.descuento > 0 && (
                    <p className="text-orange-600 text-sm font-medium">-{product.descuento}% OFF</p>
                  )}
                  <span className={`mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {product.stock > 0 ? 'En Stock' : 'Agotado'}
                  </span>
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