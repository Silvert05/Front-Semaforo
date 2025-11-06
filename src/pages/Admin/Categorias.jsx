import React, { useState } from "react";
import { Plus, Edit2, Trash2, Package, Check, X, AlertTriangle } from "lucide-react";

const Categorias = () => {
  const [categories, setCategories] = useState([
    { id: 1, nombre: "Lácteos", color: "cyan" },
    { id: 2, nombre: "Cereales", color: "orange" },
    { id: 3, nombre: "Bebidas", color: "green" }
  ]);
  
  const [mockProducts] = useState([
    { id: 1, nombre: "Producto 1", categoria: "Lácteos" },
    { id: 2, nombre: "Producto 2", categoria: "Lácteos" },
    { id: 3, nombre: "Producto 3", categoria: "Cereales" }
  ]);

  const getProductsByCategory = (categoryName) => {
    return mockProducts.filter(p => p.categoria === categoryName);
  };

  const addCategory = (data) => {
    setCategories([...categories, { ...data, id: Date.now() }]);
  };

  const updateCategory = (id, data) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, ...data } : cat));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    nombre: "",
    color: "cyan"
  });
  const [errors, setErrors] = useState({});

  const colorOptions = [
    { name: "Azul", value: "blue", bg: "bg-blue-500", gradient: "from-blue-400 to-blue-600", glow: "#3b82f6" },
    { name: "Púrpura", value: "purple", bg: "bg-purple-500", gradient: "from-purple-400 to-purple-600", glow: "#a855f7" },
    { name: "Cian", value: "cyan", bg: "bg-cyan-500", gradient: "from-cyan-400 to-cyan-600", glow: "#06b6d4" },
    { name: "Verde", value: "green", bg: "bg-emerald-500", gradient: "from-emerald-400 to-emerald-600", glow: "#10b981" },
    { name: "Naranja", value: "orange", bg: "bg-amber-500", gradient: "from-amber-400 to-amber-600", glow: "#f59e0b" },
    { name: "Rosa", value: "pink", bg: "bg-pink-500", gradient: "from-pink-400 to-pink-600", glow: "#ec4899" },
    { name: "Rojo", value: "red", bg: "bg-rose-500", gradient: "from-rose-400 to-rose-600", glow: "#f43f5e" },
    { name: "Turquesa", value: "teal", bg: "bg-teal-500", gradient: "from-teal-400 to-teal-600", glow: "#14b8a6" }
  ];

  const showNotificationMessage = (type, message) => {
    setNotification({ type, message });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3500);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (formData.nombre.trim().length > 30) {
      newErrors.nombre = "El nombre no puede exceder 30 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras y espacios";
    }

    const isDuplicate = categories.some(cat => 
      cat.nombre.toLowerCase() === formData.nombre.trim().toLowerCase() && 
      (!editingCategory || cat.id !== editingCategory.id)
    );

    if (isDuplicate) {
      newErrors.nombre = "Ya existe una categoría con ese nombre";
    }

    if (!formData.color) {
      newErrors.color = "Debes seleccionar un color";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showNotificationMessage('error', 'Por favor corrige los errores del formulario');
      return;
    }

    try {
      const categoryData = {
        nombre: formData.nombre.trim(),
        color: formData.color
      };

      if (editingCategory) {
        updateCategory(editingCategory.id, categoryData);
        showNotificationMessage('success', `Categoría "${categoryData.nombre}" actualizada exitosamente`);
        setEditingCategory(null);
      } else {
        addCategory(categoryData);
        showNotificationMessage('success', `Categoría "${categoryData.nombre}" creada exitosamente`);
      }

      setFormData({ nombre: "", color: "cyan" });
      setShowAddModal(false);
      setErrors({});
    } catch (error) {
      showNotificationMessage('error', 'Ocurrió un error al guardar la categoría');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      nombre: category.nombre,
      color: category.color
    });
    setErrors({});
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    const category = categories.find(c => c.id === id);
    const productsInCategory = getProductsByCategory(category.nombre);

    if (productsInCategory.length > 0) {
      showNotificationMessage('warning', `No se puede eliminar "${category.nombre}" porque tiene ${productsInCategory.length} producto${productsInCategory.length !== 1 ? 's' : ''} asociado${productsInCategory.length !== 1 ? 's' : ''}`);
      return;
    }

    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${category.nombre}"?`)) {
      try {
        deleteCategory(id);
        showNotificationMessage('success', `Categoría "${category.nombre}" eliminada exitosamente`);
      } catch (error) {
        showNotificationMessage('error', 'No se pudo eliminar la categoría');
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({ nombre: "", color: "cyan" });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <style>{`
        @keyframes slideInFromTop {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-slide-in-top {
          animation: slideInFromTop 0.5s ease-out forwards;
        }

        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.5s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }

        .glass-effect {
          background: rgba(15, 15, 25, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {showNotification && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-top">
          <div className={`glass-effect rounded-2xl p-4 pr-12 shadow-2xl border-l-4 ${
            notification.type === 'success' ? 'border-emerald-500' :
            notification.type === 'error' ? 'border-rose-500' :
            'border-amber-500'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                notification.type === 'success' ? 'bg-emerald-500/20' :
                notification.type === 'error' ? 'bg-rose-500/20' :
                'bg-amber-500/20'
              }`}>
                {notification.type === 'success' && <Check className="text-emerald-400" size={18} />}
                {notification.type === 'error' && <X className="text-rose-400" size={18} />}
                {notification.type === 'warning' && <AlertTriangle className="text-amber-400" size={18} />}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${
                  notification.type === 'success' ? 'text-emerald-300' :
                  notification.type === 'error' ? 'text-rose-300' :
                  'text-amber-300'
                }`}>
                  {notification.type === 'success' ? '¡Éxito!' : 
                   notification.type === 'error' ? 'Error' : 'Advertencia'}
                </p>
                <p className="text-gray-300 text-xs mt-0.5">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 space-y-8">
        <div className="flex justify-between items-center animate-slide-in-top">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Gestión de Categorías
            </h1>
            <p className="text-gray-400 text-lg font-light">
              Organiza tus productos por categorías
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Agregar Categoría
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="glass-effect rounded-3xl p-16 text-center animate-scale-in">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="text-gray-500" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No hay categorías aún</h3>
            <p className="text-gray-400 mb-6">Comienza creando tu primera categoría para organizar tus productos</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Crear Primera Categoría
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const productsInCategory = getProductsByCategory(category.nombre);
              const colorOption = colorOptions.find(c => c.value === category.color) || colorOptions[0];

              return (
                <div
                  key={category.id}
                  className="glass-effect rounded-3xl p-6 hover:scale-105 transition-all duration-500 group cursor-pointer relative overflow-hidden animate-scale-in"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    boxShadow: `0 8px 32px ${colorOption.glow}20`
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorOption.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        style={{ boxShadow: `0 0 30px ${colorOption.glow}40` }}
                      >
                        <Package className="text-white" size={28} />
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 border border-blue-500/30"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/30 transition-all duration-300 hover:scale-110 border border-rose-500/30"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {category.nombre}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 font-medium">
                      {productsInCategory.length} producto{productsInCategory.length !== 1 ? 's' : ''}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <span className={`px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r ${colorOption.gradient} text-white shadow-lg`}
                            style={{ boxShadow: `0 0 15px ${colorOption.glow}40` }}>
                        {colorOption.name}
                      </span>
                    </div>
                  </div>

                  <div 
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: colorOption.glow }}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-slide-in-bottom">
          <div className="glass-effect rounded-3xl p-8 w-full max-w-2xl shadow-2xl border-2 border-blue-500/20 animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {editingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {editingCategory ? 'Modifica los datos de la categoría' : 'Completa los campos para crear una categoría'}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-xl bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-bold mb-3 flex items-center gap-2">
                  Nombre de la Categoría
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({...formData, nombre: e.target.value});
                    if (errors.nombre) setErrors({...errors, nombre: ''});
                  }}
                  className={`w-full p-4 bg-gray-800/50 border-2 rounded-2xl text-white focus:outline-none transition-all duration-300 input-glow font-medium ${
                    errors.nombre ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                  }`}
                  placeholder="Ej: Lácteos, Cereales..."
                  maxLength={30}
                />
                {errors.nombre && (
                  <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                    <AlertTriangle size={12} />
                    <span>{errors.nombre}</span>
                  </div>
                )}
                <p className="text-gray-500 text-xs mt-2">
                  {formData.nombre.length}/30 caracteres
                </p>
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-4 flex items-center gap-2">
                  Color
                  <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => {
                        setFormData({...formData, color: color.value});
                        if (errors.color) setErrors({...errors, color: ''});
                      }}
                      className={`relative h-16 rounded-2xl border-3 transition-all duration-300 group ${
                        formData.color === color.value
                          ? 'border-white scale-105 shadow-2xl'
                          : 'border-gray-600 hover:border-gray-500 hover:scale-105'
                      } bg-gradient-to-br ${color.gradient} flex items-center justify-center overflow-hidden`}
                      style={formData.color === color.value ? { boxShadow: `0 0 30px ${color.glow}60` } : {}}
                    >
                      {formData.color === color.value && (
                        <>
                          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                          <div className="w-4 h-4 bg-white rounded-full shadow-lg z-10"></div>
                        </>
                      )}
                      <span className="absolute bottom-1 text-[10px] font-bold text-white/80 uppercase tracking-wide">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.color && (
                  <div className="flex items-center gap-2 mt-3 text-rose-400 text-sm">
                    <AlertTriangle size={12} />
                    <span>{errors.color}</span>
                  </div>
                )}
                <p className="text-gray-500 text-xs mt-3 text-center">
                  Selecciona un color para identificar la categoría
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  {editingCategory ? 'Actualizar Categoría' : 'Agregar Categoría'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-8 py-4 bg-gray-700/50 text-white rounded-2xl font-bold hover:bg-gray-700 transition-all duration-300 border border-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;