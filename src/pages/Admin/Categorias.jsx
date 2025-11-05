import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";

const Categorias = () => {
  const { categories, addCategory, updateCategory, deleteCategory, getProductsByCategory } = useProducts();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    color: "cyan"
  });

  const colorOptions = [
    { name: "Cyan", value: "cyan", bg: "bg-cyan-500" },
    { name: "Orange", value: "orange", bg: "bg-orange-500" },
    { name: "Pink", value: "pink", bg: "bg-pink-500" },
    { name: "Teal", value: "teal", bg: "bg-teal-500" },
    { name: "Blue", value: "blue", bg: "bg-blue-500" },
    { name: "Green", value: "green", bg: "bg-green-500" },
    { name: "Purple", value: "purple", bg: "bg-purple-500" },
    { name: "Red", value: "red", bg: "bg-red-500" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      setEditingCategory(null);
    } else {
      addCategory(formData);
    }

    setFormData({ nombre: "", color: "cyan" });
    setShowAddModal(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      nombre: category.nombre,
      color: category.color
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    const category = categories.find(c => c.id === id);
    const productsInCategory = getProductsByCategory(category.nombre);

    if (productsInCategory.length > 0) {
      alert(`No se puede eliminar la categoría "${category.nombre}" porque tiene ${productsInCategory.length} productos asociados.`);
      return;
    }

    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${category.nombre}"?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Gestión de Categorías
          </h1>
          <p className="text-gray-400 mt-2">Organiza tus productos por categorías</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <FaPlus size={16} />
          Agregar Categoría
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const productsInCategory = getProductsByCategory(category.nombre);
          const colorClass = colorOptions.find(c => c.value === category.color)?.bg || "bg-gray-500";

          return (
            <div key={category.id} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-3`}>
                  <FaBoxOpen className="text-white" size={20} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{category.nombre}</h3>
              <p className="text-gray-400 text-sm mb-3">
                {productsInCategory.length} producto{productsInCategory.length !== 1 ? 's' : ''} en esta categoría
              </p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                  category.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                  category.color === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                  category.color === 'teal' ? 'bg-teal-500/20 text-teal-400' :
                  category.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  category.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  category.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {category.color}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl p-8 w-full max-w-md border border-blue-500/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Nombre de la Categoría</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Lácteos, Cereales..."
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">Color</label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({...formData, color: color.value})}
                      className={`w-full h-12 rounded-xl border-2 transition-all duration-300 ${
                        formData.color === color.value
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-gray-600 hover:border-gray-500'
                      } ${color.bg} flex items-center justify-center`}
                    >
                      {formData.color === color.value && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-gray-400 text-xs mt-2 text-center">
                  Selecciona un color para identificar la categoría
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {editingCategory ? 'Actualizar Categoría' : 'Agregar Categoría'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setFormData({ nombre: "", color: "cyan" });
                  }}
                  className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
