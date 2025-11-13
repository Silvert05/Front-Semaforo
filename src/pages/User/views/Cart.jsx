import React, { useState } from 'react';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaMoneyBillWave } from 'react-icons/fa';
// RUTA CORREGIDA: Necesitas subir tres niveles (../../../) desde views/User/pages/ para llegar a src/context
import { useProducts } from '../../../context/ProductContext'; 
// Asegúrate de que esta ruta sea correcta para tu proyecto
import CheckoutModal from '../component/CheckoutModal'; 

const Cart = () => {
  // Obtener estado y funciones del carrito
  const { cart, removeFromCart, addToCart } = useProducts(); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Calcula el total de la compra con descuentos
  const total = cart.reduce((sum, item) => {
    const discountedPrice = item.precio * (1 - item.descuento / 100);
    return sum + (discountedPrice * item.quantity);
  }, 0);

  // Calcula el ahorro total
  const totalSavings = cart.reduce((sum, item) => {
    const savingsPerUnit = item.precio * (item.descuento / 100);
    return sum + (savingsPerUnit * item.quantity);
  }, 0);

  const handleOpenCheckout = () => {
      if (cart.length > 0) {
          setIsModalOpen(true);
      } else {
          alert("Tu carrito está vacío. Agrega productos para finalizar la compra.");
      }
  };

  const handleCloseCheckout = () => {
      setIsModalOpen(false);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <FaShoppingCart className="text-gray-500 text-5xl mx-auto" />
        <h2 className="text-2xl text-white font-bold">Tu Carrito Está Vacío</h2>
        <p className="text-gray-400">¡Explora el semáforo o promociones y agrega productos!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
        <FaShoppingCart className="text-blue-500" />
        Carrito de Compras
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna de Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 shadow-md transition-all duration-300 hover:border-blue-500/50"
            >
              <img 
                src={item.imageUrl || 'default-product.png'} 
                alt={item.nombre} 
                className="w-16 h-16 object-cover rounded-lg mr-4 border border-gray-700" 
              />
              <div className="flex-grow">
                <p className="text-white font-semibold">{item.nombre}</p>
                <p className="text-sm text-gray-400">{item.color} | {item.categoria}</p>
                {item.descuento > 0 ? (
                    <div className='flex items-center gap-2'>
                        <span className="text-sm text-gray-500 line-through">${item.precio.toFixed(2)}</span>
                        <span className="text-lg font-bold text-green-400">${(item.precio * (1 - item.descuento / 100)).toFixed(2)}</span>
                    </div>
                ) : (
                    <span className="text-lg font-bold text-white">${item.precio.toFixed(2)}</span>
                )}
              </div>
              
              {/* Controles de Cantidad */}
              <div className="flex items-center mx-4 p-1 bg-gray-700 rounded-full">
                <button
                  onClick={() => item.quantity > 1 ? addToCart(item, -1) : removeFromCart(item.id)}
                  className="text-gray-400 hover:text-white p-2"
                  aria-label="Disminuir cantidad"
                >
                  {item.quantity === 1 ? <FaTrash size={14} /> : <FaMinus size={14} />}
                </button>
                <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="text-gray-400 hover:text-white p-2"
                  aria-label="Aumentar cantidad"
                >
                  <FaPlus size={14} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-600 ml-4 p-2 transition-colors"
                aria-label="Eliminar producto"
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Columna de Resumen */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-blue-500/30 shadow-lg h-fit">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700/50 pb-3">Detalle de la Orden</h2>
          <div className="space-y-3 pb-4">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal (Sin descuentos)</span>
              <span>${cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-400 font-medium p-2 bg-green-500/10 rounded-lg">
              <span className="flex items-center gap-2">
                 <FaMoneyBillWave size={16} /> Ahorro (Descuentos)
              </span>
              <span>-${totalSavings.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between text-3xl font-bold text-white pt-4 border-t border-gray-700/50">
            <span>TOTAL:</span>
            <span className="text-blue-400"> ${total.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleOpenCheckout} // Abrir el modal
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold mt-6 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            Finalizar Compra
          </button>
          
          <button 
            onClick={() => { /* Lógica para vaciar carrito */ alert("Carrito Vaciado (Simulado)"); }}
            className="w-full text-red-400 border border-red-400 py-2 rounded-xl font-semibold mt-3 hover:bg-red-400 hover:text-white transition-colors"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
      
      {/* ZONA DE RENDERIZADO DEL MODAL: Esto es lo que lo pone encima de todo */}
      {isModalOpen && (
          <CheckoutModal 
              total={total} 
              onClose={handleCloseCheckout} 
          />
      )}
    </div>
  );
};

export default Cart;