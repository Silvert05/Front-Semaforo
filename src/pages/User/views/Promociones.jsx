import React from 'react';
// Importamos más iconos para la nueva sección
import { 
  FaRocket, FaEye, FaUsers, FaLightbulb, FaHeart, FaHandsHelping, FaCogs, 
  FaCheckCircle, FaExclamationTriangle, FaTimesCircle 
} from 'react-icons/fa';

const Promociones = () => {
  return (
    // Contenedor principal con fondo gris claro
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-24"> {/* Más espacio entre secciones */}

        {/* --- 1. SECCIÓN DE BIENVENIDA (Hero Section) --- */}
        <section className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Columna de Texto */}
            <div className="animate-fade-in-right">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Bienvenido a
              </h1>
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-8">
                EcoStock
              </h2>
              <p className="text-2xl sm:text-3xl text-gray-600 leading-relaxed font-light">
                Transformando tu gestión de inventario con inteligencia y eficiencia.
              </p>
            </div>
            
            {/* Columna de Imagen (Simulando la App) */}
            <div className="animate-fade-in-left">
              <div className="bg-gray-200 rounded-2xl p-4 shadow-lg border-4 border-gray-300 transform transition-transform duration-500 hover:scale-105">
                <img 
                  src="https://picsum.photos/seed/app_mockup/800/600" 
                  alt="Vista previa de la app EcoStock" 
                  className="rounded-lg object-cover w-full h-auto shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. CÓMO FUNCIONA (La Idea del Semáforo) --- ¡NUEVA SECCIÓN! --- */}
        <section className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            La Simpleza del <span className="text-green-500">Semáforo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Nuestra idea central es simplificar tu inventario en un sistema visual que todos entienden.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card Verde */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-green-500 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Verde</h3>
              <p className="text-lg text-gray-600">
                Todo en Orden. Productos con buen stock y fechas de vencimiento lejanas. No requieren acción.
              </p>
            </div>
            {/* Card Amarillo */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-yellow-500 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <FaExclamationTriangle className="text-yellow-500 text-7xl mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Amarillo</h3>
              <p className="text-lg text-gray-600">
                Atención Requerida. Productos con bajo stock o próximos a vencer. Ideal para crear promociones.
              </p>
            </div>
            {/* Card Rojo */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-red-500 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <FaTimesCircle className="text-red-500 text-7xl mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Rojo</h3>
              <p className="text-lg text-gray-600">
                Acción Urgente. Productos agotados o ya caducados. Representan pérdidas o ventas perdidas.
              </p>
            </div>
          </div>
        </section>

        {/* --- 3. NUESTRA HISTORIA --- */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl overflow-hidden group">
          <div className="md:flex md:items-center md:space-x-12">
            {/* Contenido de la historia */}
            <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4 flex items-center gap-4">
                <FaLightbulb className="text-green-500" />
                Nuestra Historia
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                Todo comenzó con una simple, pero poderosa observación: el desperdicio silencioso en los negocios. Productos que caducaban, stocks olvidados, un impacto directo en la rentabilidad y el medio ambiente.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                Imaginamos un sistema que no solo informara, sino que alertara inteligentemente, transformando la gestión en una estrategia. Así nació la visión del "Semáforo de Inventario", permitiendo acciones rápidas y decisivas.
              </p>
              <p className="text-xl font-semibold text-green-600">
                EcoStock es la materialización de esa visión, un compromiso con la eficiencia, la sostenibilidad y el éxito de cada cliente.
              </p>
            </div>
            {/* Imagen de la historia */}
            <div className="md:w-1/2">
              <img 
                src="https://picsum.photos/seed/light_story/800/600" 
                alt="Origen de la idea" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* --- 4. MISIÓN Y VISIÓN (Efecto Vidrio) --- */}
        <section className="relative p-8 sm:p-16 rounded-3xl overflow-hidden min-h-[500px] flex items-center">
          {/* Fondo de Imagen */}
          <img 
            src="https://picsum.photos/seed/mission_vision_bg/1600/900" 
            alt="Fondo de Misión y Visión" 
            className="absolute inset-0 w-full h-full object-cover z-0 filter"
          />
          <div className="absolute inset-0 bg-black opacity-20 z-10"></div> {/* Overlay sutil */}

          {/* Contenedor de Cards */}
          <div className="relative z-20 grid md:grid-cols-2 gap-10 w-full">
            
            {/* Misión */}
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-t-4 border-green-500/50 transform transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <FaRocket className="text-green-600 text-7xl mx-auto mb-6" />
                <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Nuestra Misión
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  Empoderar a empresas de todos los tamaños con tecnología intuitiva que optimiza la gestión de inventario, minimiza el desperdicio y maximiza la rentabilidad, fomentando operaciones sostenibles y eficientes.
                </p>
              </div>
            </div>

            {/* Visión */}
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-t-4 border-blue-500/50 transform transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <FaEye className="text-blue-600 text-7xl mx-auto mb-6" />
                <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Nuestra Visión
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  Ser el referente global en soluciones de gestión proactiva de inventarios, liderando la transformación hacia un futuro sin desperdicio, donde cada producto encuentra su propósito antes de perder su valor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. QUIÉNES SOMOS --- */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl overflow-hidden group">
          <div className="md:flex md:flex-row-reverse md:items-center md:space-x-reverse md:space-x-12">
            {/* Imagen de equipo */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://picsum.photos/seed/light_team/800/600" 
                alt="Equipo de EcoStock" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Contenido Quiénes Somos */}
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4 flex items-center gap-4">
                <FaUsers className="text-emerald-500" />
                Quiénes Somos
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                Somos un equipo multidisciplinario de innovadores: desarrolladores, diseñadores UX/UI y expertos en cadena de suministro, unidos por una pasión común: crear soluciones que realmente importan.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 text-xl text-gray-700">
                  <FaHeart className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Pasión por el detalle: Cada línea de código y cada pixel están pensados para la mejor experiencia.
                  </span>
                </div>
                <div className="flex items-start gap-4 text-xl text-gray-700">
                  <FaHandsHelping className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Colaboración es clave: Trabajamos codo a codo con nuestros clientes para entender y superar sus expectativas.
                  </span>
                </div>
                <div className="flex items-start gap-4 text-xl text-gray-700">
                  <FaCogs className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Innovación constante: Nos mantenemos a la vanguardia para ofrecerte siempre lo último en tecnología.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      {/* Estilos para animaciones (opcional) */}
      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; }
        .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Promociones;