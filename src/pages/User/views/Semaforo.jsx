import React, { useState, useMemo } from "react";
// 1. Importación corregida (asumiendo que ProductContext está en src/context)
import { useProducts } from "../../../context/ProductContext";
import { FaSearch, FaFilter, FaInfoCircle, FaCalendarTimes, FaBoxOpen, FaClock, FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

// 2. Todos los datos de simulación (DUMMY_IMAGES, PRODUCTS_DATA)
// y el useProducts simulado han sido eliminados.


// =========================================================
// Componente Modal de Producto
// =========================================================
const ProductModal = ({ product, statusInfo, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div
            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex justify-between items-start border-b pb-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{product.nombre}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
                    <FaTimes size={20} />
                </button>
            </div>

            <div className={`p-3 rounded-xl mb-4 text-center font-bold text-sm ${statusInfo.bg} ${statusInfo.color} border ${statusInfo.border}`}>
                <div className="flex items-center justify-center gap-2">
                    {statusInfo.icon} ESTADO: {statusInfo.status.toUpperCase()}
                </div>
            </div>

            {/* Imagen del producto (Ahora usa la URL de picsum.photos) */}
            <div className="mb-4">
                {product.imagen ? (
                    <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-full h-48 object-cover rounded-xl border border-gray-300"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    className="w-full h-48 rounded-xl flex items-center justify-center border border-gray-300 bg-green-50"
                    style={{ display: product.imagen ? 'none' : 'flex' }}
                >
                    <FaCheckCircle size={60} className="text-green-600/60" />
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-xl font-bold text-green-600">Precio: ${product.precio.toFixed(2)}</p>
                {product.descuento > 0 && (
                    <p className="text-orange-500 font-semibold">Descuento: {product.descuento}%</p>
                )}
                <p className="text-gray-700">Categoría: {product.categoria}</p>
                <p className="text-gray-700">Stock: {product.stock} unidades</p>
                <p className="text-gray-700">Vencimiento: {product.fecha}</p>
                <p className="text-gray-700">Proveedor: {product.proveedor}</p>
                <p className="text-gray-600 mt-4 text-sm">{product.descripcion}</p>
            </div>
        </div>
    </div>
);

// ===============================
// Componente Toast (Alerta lateral)
// ===============================
const ToastNotification = ({ message, type, onClose }) => {
    const iconMap = {
        green: <FaCheckCircle className="text-green-500" size={20} />,
        yellow: <FaExclamationTriangle className="text-amber-500" size={20} />,
        red: <FaCalendarTimes className="text-red-500" size={20} />,
    };
    const bgMap = {
        green: "bg-green-50 border-green-300",
        yellow: "bg-amber-50 border-amber-300",
        red: "bg-red-50 border-red-300",
    };
    return (
        <div className={`fixed top-4 right-4 z-[9999] p-4 rounded-xl shadow-2xl border-2 ${bgMap[type]} flex items-center gap-3 animate-slide-in min-w-[320px]`}>
            {iconMap[type]}
            <span className="font-semibold text-gray-800 flex-1">{message}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={16} />
            </button>
        </div>
    );
};

// Configuración de umbrales
const EXPIRY_THRESHOLD_DAYS = 30;

// =========================================================
// Componente Semaforo
// =========================================================
const Semaforo = () => {
    // ¡ESTA LÍNEA AHORA OBTIENE LOS DATOS REALES!
    const { products } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("default"); // "default" para prioridad
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toast, setToast] = useState(null);

    // =========================================================
    // LÓGICA UNIFICADA DEL SEMÁFORO (Tu lógica original)
    // =========================================================
    const getStatusInfo = (product) => {
        const { stock, fecha } = product;
        const today = new Date(); // Asumimos que "today" es la fecha actual del sistema
        today.setHours(0, 0, 0, 0);
        const expiryDate = new Date(fecha);
        expiryDate.setHours(0, 0, 0, 0);
        const caducado = expiryDate.getTime() < today.getTime() && !isNaN(expiryDate.getTime());
        const daysToExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // 🔴 ROJO: Caducado o Agotado
        if (caducado || stock === 0)
            return {
                status: caducado ? "CADUCADO - NO CONSUMIBLE" : "AGOTADO",
                color: "text-red-700",
                bg: "bg-red-200",
                border: "border-red-400/70",
                key: "red",
                icon: <FaCalendarTimes />
            };
            
        // 🟡 AMARILLO: Productos con estado de precaución
        if (daysToExpiry <= EXPIRY_THRESHOLD_DAYS && daysToExpiry >= 0)
            return {
                status: `PRÓX. VENCER (${daysToExpiry} DÍAS)`,
                color: "text-amber-700",
                bg: "bg-amber-200",
                border: "border-amber-400/70",
                key: "yellow",
                icon: <FaClock />
            };
        
        if (stock <= 10 && stock > 0)
            return {
                status: "BAJO STOCK",
                color: "text-amber-700",
                bg: "bg-amber-200",
                border: "border-amber-400/70",
                key: "yellow",
                icon: <FaBoxOpen />
            };
            
        // 🟢 VERDE: Buen Estado
        return {
            status: "BUEN ESTADO",
            color: "text-green-700",
            bg: "bg-green-200",
            border: "border-green-500/70",
            key: "green",
            icon: <FaCheckCircle />
        };
    };

    // Manejadores de Interacción
    const handleProductClick = (product) => {
        const status = getStatusInfo(product);
        setSelectedProduct({...product, statusInfo: status});
        setToast({
            message: `Estado: ${status.status}`,
            type: status.key,
        });
        setTimeout(() => setToast(null), 4000);
    };

    // =========================================================
    // Lógica de Filtrado y Ordenamiento (¡ACTUALIZADA!)
    // =========================================================
    const filteredProducts = useMemo(() => {
        return products
            .filter(product => {
                // 1. Obtenemos el estado del producto PRIMERO
                const statusInfo = getStatusInfo(product);
                const statusText = statusInfo.status.toLowerCase(); // ej: "caducado - no consumible"
                
                // 2. Preparamos el término de búsqueda
                const term = searchTerm.toLowerCase();

                // 3. Comprobamos si el término coincide con el NOMBRE o el ESTADO
                const matchesName = product.nombre.toLowerCase().includes(term);
                const matchesStatus = statusText.includes(term);
                const matchesSearch = matchesName || matchesStatus; // <-- ¡AQUÍ ESTÁ LA MAGIA!

                const matchesCategory = !selectedCategory || product.categoria === selectedCategory;
                
                // 4. Devolvemos el resultado
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case "stock":
                        return a.stock - b.stock;
                    case "name":
                        return a.nombre.localeCompare(b.nombre);
                    case "price":
                        return a.precio - b.precio;
                    default:
                        // Ordenamiento por Prioridad de Semáforo
                        const statusA = getStatusInfo(a).key;
                        const statusB = getStatusInfo(b).key;
                        const order = { red: 1, yellow: 2, green: 3 };
                        return order[statusA] - order[statusB];
                }
            });
    }, [products, searchTerm, selectedCategory, sortBy]);

    // Las categorías ahora se toman de los productos reales
    const categories = useMemo(() => [...new Set(products.map(p => p.categoria))].sort(), [products]);

    return (
        <div className="space-y-8 p-4">
            
            {/* Título */}
            <div className="text-center">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                    ✅ Control de Inventario - Semáforo
                </h1>
                <p className="text-gray-700 text-lg">
                    Monitoreo inteligente del estado de tus productos.
                </p>
            </div>

            {/* Controles de Búsqueda y Filtro */}
            <div className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-xl shadow-inner border border-gray-200">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o estado (Ej: 'Queso', 'Caducado')"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                    />
                </div>

                <div className="relative w-full md:w-auto">
                    <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                    >
                        <option value="">Todas las Categorías</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                
                <div className="relative w-full md:w-auto">
                    <FaInfoCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                    >
                        <option value="default">Prioridad de Semáforo</option>
                        <option value="stock">Stock (Bajo a Alto)</option>
                        <option value="name">Nombre (A-Z)</option>
                        <option value="price">Precio (Bajo a Alto)</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                    const statusInfo = getStatusInfo(product);

                    return (
                        <div
                            key={product.id}
                            className="group relative cursor-pointer"
                            onClick={() => handleProductClick(product)}
                        >
                            {/* Badge de Estado */}
                            <div className="absolute top-0 right-0 z-20">
                                <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${
                                    statusInfo.key === 'green' ? 'from-green-600 to-emerald-600 shadow-green-500/50' :
                                    statusInfo.key === 'yellow' ? 'from-amber-600 to-orange-600 shadow-amber-500/50' :
                                    'from-red-600 to-rose-600 shadow-red-500/50'
                                } rounded-full transform -translate-y-4 translate-x-4 shadow-2xl`}>
                                    <span className="text-white text-xs font-extrabold text-center px-2">
                                        {statusInfo.icon}
                                    </span>
                                </div>
                            </div>

                            {/* Contenedor Principal de la Tarjeta */}
                            <div className={`relative bg-white rounded-2xl p-6 border-2 ${
                                statusInfo.key === 'green' ? 'border-green-500/30 hover:border-emerald-500/50 hover:shadow-green-500/30' :
                                statusInfo.key === 'yellow' ? 'border-amber-500/30 hover:border-orange-500/50 hover:shadow-amber-500/30' :
                                'border-red-500/30 hover:border-rose-500/50 hover:shadow-red-500/30'
                            } transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-2xl`}>
                                
                                {/* Imagen del Producto */}
                                <div className="w-full h-32 rounded-lg mb-4 overflow-hidden border border-gray-300 relative">
                                    {product.imagen ? (
                                        <>
                                            <img
                                                src={product.imagen}
                                                alt={product.nombre}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div
                                                className={`w-full h-full flex items-center justify-center ${
                                                    statusInfo.key === 'green' ? 'bg-green-50' :
                                                    statusInfo.key === 'yellow' ? 'bg-amber-50' :
                                                    'bg-red-50'
                                                }`}
                                                style={{ display: 'none' }}
                                            >
                                                {/* --- CAMBIO AQUÍ --- */}
                                                {statusInfo.icon && React.cloneElement(statusInfo.icon, {
                                                    size: 80, // <-- Aumentado de 40 a 60
                                                    className: `${
                                                        statusInfo.key === 'green' ? 'text-green-600/60' :
                                                        statusInfo.key === 'yellow' ? 'text-amber-600/60' :
                                                        'text-red-600/60'
                                                    }`
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            className={`w-full h-full flex items-center justify-center ${
                                                statusInfo.key === 'green' ? 'bg-green-50' :
                                                statusInfo.key === 'yellow' ? 'bg-amber-50' :
                                                'bg-red-50'
                                            }`}
                                        >
                                            {/* --- CAMBIO AQUÍ --- */}
                                            {statusInfo.icon && React.cloneElement(statusInfo.icon, {
                                                size: 80, // <-- Aumentado de 40 a 60
                                                className: `${
                                                    statusInfo.key === 'green' ? 'text-green-600/60' :
                                                    statusInfo.key === 'yellow' ? 'text-amber-600/60' :
                                                    'text-red-600/60'
                                                }`
                                            })}
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{product.nombre}</h3>
                                <p className="text-gray-500 text-sm mb-3">Categoría: {product.categoria}</p>

                                <div className="mt-4 space-y-3">
                                    {/* Información de Precio */}
                                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-100 border border-gray-300">
                                        <div className="flex items-baseline gap-2">
                                            <FaCheckCircle className="text-green-600" size={18} />
                                            <span className="text-3xl font-extrabold text-green-600">
                                                ${product.precio.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Mensaje de Stock */}
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className={`text-center text-sm font-semibold ${
                                            product.stock <= 5 ? 'text-red-600' : 'text-green-600'
                                        }`}>
                                            Stock disponible: {product.stock} unidades
                                        </p>
                                    </div>

                                    {/* Botón Ver Detalles */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProductClick(product);
                                        }}
                                        className={`w-full mt-3 flex items-center justify-center gap-2 ${
                                            statusInfo.key === 'green' ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' :
                                            statusInfo.key === 'yellow' ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700' :
                                            'bg-gradient-to-r from-red-600 to-rose-600'
                                        } text-white py-2 rounded-xl font-semibold transition-colors`}
                                    >
                                        <FaInfoCircle size={14} />
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal de Detalle */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    statusInfo={selectedProduct.statusInfo}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
            
            {/* Toast de Estado */}
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Estilos para el Toast (Tu código original) */}
            <style>{`
                /* Simple CSS for slide-in animation */
                @keyframes slide-in {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in {
                    animation: slide-in 0.5s forwards;
                }
            `}</style>
        </div>
    );
};

// =========================================================
// Componente de Simulación (Ahora se exporta para usarse en App.js)
// =========================================================
export default function AppSimulation() {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Semaforo />
        </div>
    );
};