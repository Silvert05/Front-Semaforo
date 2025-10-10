import React from "react";

const Configuracion = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ⚙️ Configuración
          </h1>
          <p className="text-gray-600">
            Este es el área de contenido de Configuración. 
            Aquí puedes agregar los ajustes y preferencias del sistema.
          </p>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Nota:</strong> El contenido se renderiza correctamente dentro del layout del Navbar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;