import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaMapMarkerAlt, FaCreditCard, FaLock, FaCalendarAlt } from 'react-icons/fa';

const CheckoutModal = ({ total, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    tarjeta: '',
    expiracion: '',
    cvv: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de validación y proceso de compra
    setTimeout(() => {
        setIsSubmitting(false);
        alert(`✅ ¡Compra exitosa!\nTotal pagado: $${total.toFixed(2)}\nSe enviará una confirmación a ${formData.email}.\n(Simulación completada)`);
        onClose(); // Cerrar el modal
    }, 2000);
  };

  return (
    // Fondo 100% opaco para aislar el carrito.
    <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-30 p-4" onClick={onClose}>
      <div 
        // Contenedor principal del modal: Altura máxima y padding general
        // Quitamos el 'overflow-y-auto' de aquí
        className="bg-gray-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl shadow-blue-500/50 border border-blue-500/50 relative transform transition-all duration-300 scale-85 max-h-[55vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-red-600 rounded-full p-2 transition-colors flex items-center justify-center z-10"
          aria-label="Cerrar"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
            Finalizar Compra
        </h2>
        
        <p className="text-xl text-white font-bold mb-4 border-b border-gray-700/50 pb-4">Total a Pagar: <span className='text-green-400'>${total.toFixed(2)}</span></p>

        {/* 🚨 ZONA CRÍTICA: Contenedor Scrollable para los campos de formulario */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto space-y-4 pr-1"> 
          <h3 className="text-white font-semibold border-b border-gray-700 pb-2">Datos Personales</h3>
          
          {/* Nombre */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre Completo"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Dirección */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección de Envío"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h3 className="text-white font-semibold border-b border-gray-700 pt-4 pb-2">Datos de la Tarjeta</h3>
          {/* Número de Tarjeta */}
          <div className="relative">
            <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="tarjeta"
              placeholder="Número de Tarjeta (Simulado)"
              value={formData.tarjeta}
              onChange={handleChange}
              required
              maxLength="16"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Expiración y CVV */}
          <div className="flex gap-4">
            <div className="relative flex-1">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    name="expiracion"
                    placeholder="MM/AA"
                    value={formData.expiracion}
                    onChange={handleChange}
                    required
                    maxLength="5"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="relative w-24">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    maxLength="4"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
          </div>
        
          <p className='text-xs text-gray-500 text-center mt-4'>* Este es un formulario de pago simulado. No introduzcas datos reales.</p>
        </form>
        {/* FIN DE LA ZONA SCROLLABLE */}

        {/* 🚨 El botón de confirmación queda FUERA del scroll para estar siempre visible */}
        <div className="mt-6 pt-4 border-t border-gray-700/50">
            <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando Pago...
                </>
                ) : (
                'Confirmar Pago Seguro'
                )}
            </button>
        </div>
        
      </div>
    </div>
  );
};

export default CheckoutModal;