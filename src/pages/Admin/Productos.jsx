import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, Filter, X, Check, AlertCircle, Calendar, Package, DollarSign, Tag, FileText } from "lucide-react";

const useProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      nombre: "Leche 1L",
      stock: 20,
      color: "cyan",
      fecha: "2025-11-20",
      descripcion: "Leche entera pasteurizada, ideal para consumo diario.",
      categoria: "Lácteos",
      precio: 1.50,
      descuento: 0
    },
    {
      id: 2,
      nombre: "Arroz 1kg",
      stock: 5,
      color: "orange",
      fecha: "2025-10-25",
      descripcion: "Arroz blanco de grano largo.",
      categoria: "Cereales",
      precio: 2.00,
      descuento: 20
    },
    {
      id: 3,
      nombre: "Queso",
      stock: 0,
      color: "pink",
      fecha: "2025-10-01",
      descripcion: "Queso fresco tipo mozzarella.",
      categoria: "Lácteos",
      precio: 3.50,
      descuento: 0
    }
  ]);

  const categories = [
    { id: 1, nombre: "Lácteos", color: "cyan" },
    { id: 2, nombre: "Cereales", color: "orange" },
    { id: 3, nombre: "Carnes", color: "pink" },
    { id: 4, nombre: "Bebidas", color: "teal" },
    { id: 5, nombre: "Panadería", color: "yellow" }
  ];

  const addProduct = (productData) => {
    const getStockColor = (stock) => {
      if (stock === 0) return "pink";
      if (stock <= 10) return "orange";
      return "cyan";
    };

    const newProduct = {
      id: Date.now(),
      ...productData,
      color: getStockColor(productData.stock)
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    const getStockColor = (stock) => {
      if (stock === 0) return "pink";
      if (stock <= 10) return "orange";
      return "cyan";
    };

    setProducts(prev => prev.map(product =>
      product.id === id
        ? { ...product, ...productData, color: getStockColor(productData.stock) }
        : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct
  };
};

const Productos = () => {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    nombre: "",
    stock: "",
    categoria: "",
    precio: "",
    fecha: "",
    descripcion: "",
    descuento: ""
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      newErrors.nombre = "Mínimo 3 caracteres";
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock inválido";
    }

    if (!formData.categoria) {
      newErrors.categoria = "Selecciona una categoría";
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      newErrors.precio = "Precio inválido";
    }

    if (!formData.fecha) {
      newErrors.fecha = "Fecha requerida";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "Descripción requerida";
    }

    if (formData.descuento && (parseInt(formData.descuento) < 0 || parseInt(formData.descuento) > 100)) {
      newErrors.descuento = "Descuento entre 0-100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showNotificationMessage('error', 'Corrige los errores del formulario');
      return;
    }

    const productData = {
      nombre: formData.nombre.trim(),
      stock: parseInt(formData.stock),
      precio: parseFloat(formData.precio),
      descuento: parseInt(formData.descuento) || 0,
      categoria: formData.categoria,
      fecha: formData.fecha,
      descripcion: formData.descripcion.trim()
    };

    try {
      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
        showNotificationMessage('success', `"${productData.nombre}" actualizado exitosamente`);
        setEditingProduct(null);
      } else {
        addProduct(productData);
        showNotificationMessage('success', `"${productData.nombre}" agregado exitosamente`);
      }

      setFormData({
        nombre: "",
        stock: "",
        categoria: "",
        precio: "",
        fecha: "",
        descripcion: "",
        descuento: ""
      });
      setShowAddModal(false);
      setErrors({});
    } catch (error) {
      showNotificationMessage('error', 'Error al guardar el producto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      stock: product.stock.toString(),
      categoria: product.categoria,
      precio: product.precio.toString(),
      fecha: product.fecha,
      descripcion: product.descripcion,
      descuento: product.descuento.toString()
    });
    setErrors({});
    setShowAddModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteProduct(productToDelete.id);
    showNotificationMessage('success', `"${productToDelete.nombre}" eliminado exitosamente`);
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    setFormData({
      nombre: "",
      stock: "",
      categoria: "",
      precio: "",
      fecha: "",
      descripcion: "",
      descuento: ""
    });
    setErrors({});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calculateFinalPrice = (precio, descuento) => {
    if (descuento > 0) {
      return precio - (precio * descuento / 100);
    }
    return precio;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-slide-in { animation: slideIn 0.6s ease-out forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out; }
        
        .glass-effect {
          background: rgba(15, 15, 25, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {showNotification && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
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
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${
                  notification.type === 'success' ? 'text-emerald-300' :
                  notification.type === 'error' ? 'text-rose-300' :
                  'text-amber-300'
                }`}>
                  {notification.type === 'success' ? '¡Éxito!' : 'Error'}
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

      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center animate-slide-in">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Gestión de Productos
            </h1>
            <p className="text-gray-400 text-lg font-light">Administra el inventario completo</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            Agregar Producto
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-8 py-4 glass-effect rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all duration-300 min-w-[200px]"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.nombre}>{category.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="glass-effect rounded-3xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden animate-slide-in"
              style={{ 
                animationDelay: `${200 + index * 100}ms`,
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-black text-white text-2xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {product.nombre}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      <Tag size={12} />
                      {product.categoria}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm border shadow-lg flex items-center gap-1.5 ${
                      product.stock === 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                      product.stock <= 10 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      <Package size={14} />
                      {product.stock}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40 transition-all duration-300 border border-blue-500/30 hover:scale-110"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-all duration-300 border border-red-500/30 hover:scale-110"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-emerald-400" />
                    <span className="text-gray-400">Precio:</span>
                    {product.descuento > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 line-through">${product.precio.toFixed(2)}</span>
                        <span className="text-emerald-400 font-bold">${calculateFinalPrice(product.precio, product.descuento).toFixed(2)}</span>
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-lg text-xs font-bold">-{product.descuento}%</span>
                      </div>
                    ) : (
                      <span className="text-white font-bold">${product.precio.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-purple-400" />
                    <span className="text-gray-400">Vence:</span>
                    <span className="text-white font-medium">{formatDate(product.fecha)}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm pt-2">
                    <FileText size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 block mb-1">Descripción:</span>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        {product.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-effect rounded-3xl p-8 w-full max-w-3xl border-2 border-blue-500/30 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {editingProduct ? 'Modifica la información del producto' : 'Completa todos los campos'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-xl bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white text-sm font-bold mb-2 flex items-center gap-2">
                    Nombre del Producto
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => {
                      setFormData({...formData, nombre: e.target.value});
                      if (errors.nombre) setErrors({...errors, nombre: ''});
                    }}
                    className={`w-full p-3 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none transition-all duration-300 ${
                      errors.nombre ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                    }`}
                    placeholder="Ej: Leche 1L"
                  />
                  {errors.nombre && <p className="text-rose-400 text-xs mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2 flex items-center gap-2">
                    Stock Disponible
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => {
                      setFormData({...formData, stock: e.target.value});
                      if (errors.stock) setErrors({...errors, stock: ''});
                    }}
                    className={`w-full p-3 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none transition-all duration-300 ${
                      errors.stock ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-rose-400 text-xs mt-1">{errors.stock}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2 flex items-center gap-2">
                    Categoría
                    <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => {
                      setFormData({...formData, categoria: e.target.value});
                      if (errors.categoria) setErrors({...errors, categoria: ''});
                    }}
                    className={`w-full p-3 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none transition-all duration-300 ${
                      errors.categoria ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Seleccionar...</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.nombre}>{category.nombre}</option>
                    ))}
                  </select>
                  {errors.categoria && <p className="text-rose-400 text-xs mt-1">{errors.categoria}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2 flex items-center gap-2">
                    Precio Unitario
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precio}
                    onChange={(e) => {
                      setFormData({...formData, precio: e.target.value});
                      if (errors.precio) setErrors({...errors, precio: ''});
                    }}
                    className={`w-full p-3 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none transition-all duration-300 ${
                      errors.precio ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.precio && <p className="text-rose-400 text-xs mt-1">{errors.precio}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2 flex items-center gap-2">
                    Fecha de Vencimiento
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => {
                      setFormData({...formData, fecha: e.target.value});
                      if (errors.fecha) setErrors({...errors, fecha: ''});
                    }}
                    className={`w-full p-3 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none transition-all duration-300 ${
                      errors.fecha ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                    }`}
                  />
                  {errors.fecha && <p className="text-rose-400 text-xs mt-1">{errors.fecha}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Descuento (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.descuento}
                    onChange={(e) => {
                      setFormData({...formData, descuento: e.target.value});
                      if (errors.descuento) setErrors({...errors, descuento: ''});
                    }}
                    className={`w-full p-3 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none transition-all duration-300 ${
                      errors.descuento ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                    }`}
                    placeholder="0"
                  />
                  {errors.descuento && <p className="text-rose-400 text-xs mt-1">{errors.descuento}</p>}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-2 flex items-center gap-2">
                  Descripción del Producto
                  <span className="text-rose-400">*</span>
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => {
                    setFormData({...formData, descripcion: e.target.value});
                    if (errors.descripcion) setErrors({...errors, descripcion: ''});
                  }}
                  className={`w-full p-3 bg-gray-800/50 border-2 rounded-xl text-white focus:outline-none transition-all duration-300 h-24 resize-none ${
                    errors.descripcion ? 'border-rose-500' : 'border-gray-700 focus:border-blue-500'
                  }`}
                  placeholder="Describe las características del producto..."
                />
                {errors.descripcion && <p className="text-rose-400 text-xs mt-1">{errors.descripcion}</p>}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-8 py-4 bg-gray-700/50 text-white rounded-2xl font-bold hover:bg-gray-700 transition-all duration-300 border border-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-effect rounded-3xl p-10 w-full max-w-lg border-2 border-rose-500/30 shadow-2xl animate-scale-in">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={40} className="text-rose-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">¿Eliminar Producto?</h3>
              <p className="text-gray-300 text-lg mb-2 font-semibold">
                Estás a punto de eliminar:
              </p>
              <p className="text-cyan-400 text-xl font-black mb-6">
                {productToDelete.nombre}
              </p>
              <p className="text-gray-400 text-base mb-8">
                Esta acción no se puede deshacer
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setProductToDelete(null);
                  }}
                  className="flex-1 px-6 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-rose-500/50 transition-all duration-500 transform hover:scale-105"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;