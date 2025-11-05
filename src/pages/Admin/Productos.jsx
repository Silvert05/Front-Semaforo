import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, Filter, X, Check, AlertCircle } from "lucide-react";

// Simulación del hook useProducts (reemplazar con tu import real)
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
      proveedor: "Distribuidora ABC",
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
      proveedor: "Granos del Valle",
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
      proveedor: "Lácteos Premium",
      descuento: 0
    },
    {
      id: 4,
      nombre: "Pan",
      stock: 15,
      color: "teal",
      fecha: "2025-11-05",
      descripcion: "Pan blanco integral.",
      categoria: "Panadería",
      precio: 1.20,
      proveedor: "Panadería Central",
      descuento: 0
    },
    {
      id: 5,
      nombre: "Jugo Naranja",
      stock: 8,
      color: "yellow",
      fecha: "2025-10-28",
      descripcion: "Jugo de naranja natural 100%.",
      categoria: "Bebidas",
      precio: 2.50,
      proveedor: "Frutas Frescas",
      descuento: 15
    },
    {
      id: 6,
      nombre: "Yogur",
      stock: 0,
      color: "pink",
      fecha: "2025-09-30",
      descripcion: "Yogur natural sin azúcar.",
      categoria: "Lácteos",
      precio: 1.80,
      proveedor: "Lácteos Premium",
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: "",
    stock: "",
    categoria: "",
    precio: "",
    proveedor: "",
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

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      stock: parseInt(formData.stock),
      precio: parseFloat(formData.precio),
      descuento: parseInt(formData.descuento) || 0
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      showSuccess("✓ Producto actualizado exitosamente");
      setEditingProduct(null);
    } else {
      addProduct(productData);
      showSuccess("✓ Producto agregado exitosamente");
    }

    setFormData({
      nombre: "",
      stock: "",
      categoria: "",
      precio: "",
      proveedor: "",
      fecha: "",
      descripcion: "",
      descuento: ""
    });
    setShowAddModal(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      stock: product.stock.toString(),
      categoria: product.categoria,
      precio: product.precio.toString(),
      proveedor: product.proveedor,
      fecha: product.fecha,
      descripcion: product.descripcion,
      descuento: product.descuento.toString()
    });
    setShowAddModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteProduct(productToDelete.id);
    showSuccess("✓ Producto eliminado exitosamente");
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
      proveedor: "",
      fecha: "",
      descripcion: "",
      descuento: ""
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-slide-in { animation: slideIn 0.8s ease-out forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out; }
        
        .glass-effect {
          background: rgba(15, 15, 25, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor);
        }
      `}</style>

      <div className="space-y-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center animate-slide-in">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient mb-3 neon-glow">
              Gestión de Productos
            </h1>
            <p className="text-gray-400 text-lg font-light tracking-wide">Administra el inventario de productos</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 flex items-center gap-3 overflow-hidden animate-gradient"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer"></div>
            <Plus size={20} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" />
            <span className="relative z-10">Agregar Producto</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-8 py-4 glass-effect rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-300"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.nombre}>{category.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="glass-effect rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden animate-slide-in"
              style={{ 
                animationDelay: `${200 + index * 100}ms`,
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex-1">
                  <h3 className="font-bold text-white text-xl mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {product.nombre}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    {product.categoria}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm border shadow-lg ${product.stock === 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/30' : product.stock <= 10 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/30'}`}>
                    {product.stock}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              
              <div className="space-y-2 text-sm relative z-10">
                <p className="text-gray-400"><span className="text-gray-300 font-semibold">Categoría:</span> {product.categoria}</p>
                <p className="text-gray-400"><span className="text-gray-300 font-semibold">Precio:</span> ${product.precio.toFixed(2)}</p>
                <p className="text-gray-400"><span className="text-gray-300 font-semibold">Proveedor:</span> {product.proveedor}</p>
                {product.descuento > 0 && (
                  <p className="text-green-400"><span className="text-green-300 font-semibold">Descuento:</span> {product.descuento}%</p>
                )}
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-effect rounded-3xl p-8 w-full max-w-2xl border-2 border-blue-500/30 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto" style={{ boxShadow: '0 0 80px rgba(59, 130, 246, 0.3)' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-all duration-300 hover:rotate-90"
              >
                <X size={24} className="text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.nombre}>{category.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Proveedor</label>
                  <input
                    type="text"
                    value={formData.proveedor}
                    onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white text-sm font-medium mb-2">Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Descuento (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.descuento}
                    onChange={(e) => setFormData({...formData, descuento: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-fade-in">
          <div className="glass-effect rounded-3xl p-8 border-2 border-green-500/50 shadow-2xl animate-scale-in pointer-events-auto" style={{ boxShadow: '0 0 60px rgba(16, 185, 129, 0.4)' }}>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-500/20 rounded-2xl">
                <Check size={32} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-1">¡Éxito!</h3>
                <p className="text-green-300 text-lg font-semibold">{successMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-effect rounded-3xl p-10 w-full max-w-lg border-2 border-rose-500/30 shadow-2xl animate-scale-in" style={{ boxShadow: '0 0 80px rgba(244, 63, 94, 0.3)' }}>
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