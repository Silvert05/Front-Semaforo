import React, { createContext, useContext, useState } from 'react';

// --- Datos Simulados con 'imagen' Añadida y enriquecidos ---
const initialProducts = [
  {
    id: 1,
    nombre: "Camiseta Deportiva Ultraligera",
    categoria: "Ropa",
    precio: 35.00,
    stock: 25,
    color: "Azul Eléctrico",
    fecha: "2026-03-15",
    descuento: 10, // CON DESCUENTO
    descripcion: "Camiseta de alto rendimiento, ideal para running y entrenamiento. Tejido transpirable de secado rápido.",
    proveedor: "SportMax",
    imagen: "https://picsum.photos/seed/camiseta/400/400"
  },
  {
    id: 2,
    nombre: "Laptop Gaming Xtreme 3000",
    categoria: "Electrónica",
    precio: 1899.99,
    stock: 5,
    color: "Negro Mate",
    fecha: "2025-01-01",
    descuento: 0,
    descripcion: "Potente laptop para gaming con la última tarjeta gráfica y pantalla de 144Hz. Rendimiento sin igual.",
    proveedor: "TechWorld",
    imagen: "https://picsum.photos/seed/laptop/400/400"
  },
  {
    id: 3,
    nombre: "Libro: 'Aprende React'",
    categoria: "Libros",
    precio: 45.90,
    stock: 0,
    color: "N/A",
    fecha: "2024-12-31",
    descuento: 0,
    descripcion: "Guía completa para dominar React y el desarrollo frontend moderno. Incluye hooks y Redux.",
    proveedor: "BookHub",
    imagen: "https://picsum.photos/seed/libro/400/400"
  },
  {
    id: 4,
    nombre: "Audífonos Inalámbricos Pro",
    categoria: "Electrónica",
    precio: 120.00,
    stock: 12,
    color: "Blanco",
    fecha: "2026-06-20",
    descuento: 15, // CON DESCUENTO
    descripcion: "Cancelación de ruido activa, 30 horas de batería y sonido de alta fidelidad.",
    proveedor: "SoundGear",
    imagen: "https://picsum.photos/seed/audifonos/400/400"
  },
  {
    id: 5,
    nombre: "Silla Ergonómica Pro",
    categoria: "Hogar",
    precio: 350.50,
    stock: 8,
    color: "Gris Oscuro",
    fecha: "2027-01-01",
    descuento: 0,
    descripcion: "Silla de oficina con soporte lumbar ajustable y malla transpirable. Perfecta para largas jornadas.",
    proveedor: "OfficeGoods",
    imagen: "https://picsum.photos/seed/silla/400/400"
  },
  {
    id: 6,
    nombre: "Smartphone Ultrafino X10",
    categoria: "Electrónica",
    precio: 799.00,
    stock: 30, 
    color: "Plata",
    fecha: "2027-05-10",
    descuento: 0,
    descripcion: "Teléfono inteligente con cámara de 108MP y pantalla AMOLED. La mejor tecnología en tu mano.",
    proveedor: "MobileTech",
    imagen: "https://picsum.photos/seed/phone/400/400"
  },
  {
    id: 7,
    nombre: "Taza Térmica Acero Inox",
    categoria: "Hogar",
    precio: 18.99,
    stock: 7, 
    color: "Negro",
    fecha: "2028-01-01",
    descuento: 0,
    descripcion: "Mantiene el café caliente por 6 horas. Ideal para viajes o la oficina.",
    proveedor: "HomeComfort",
    imagen: "https://picsum.photos/seed/cup/400/400"
  },
  {
    id: 8,
    nombre: "Zapatillas Running Trail",
    categoria: "Ropa",
    precio: 89.95,
    stock: 0, 
    color: "Verde Neón",
    fecha: "2026-10-01",
    descuento: 0,
    descripcion: "Diseñadas para terrenos difíciles, máxima tracción y amortiguación.",
    proveedor: "SportMax",
    imagen: "https://picsum.photos/seed/shoes/400/400"
  },
  {
    id: 9,
    nombre: "Cafetera Espresso Semi-Auto",
    categoria: "Hogar",
    precio: 299.99,
    stock: 15,
    color: "Rojo Clásico",
    fecha: "2027-03-01",
    descuento: 25, // CON DESCUENTO
    descripcion: "Prepara espressos, capuccinos y lattes con calidad de barista en casa.",
    proveedor: "KitchenGadgets",
    imagen: "https://picsum.photos/seed/coffee/400/400"
  },
  {
    id: 10,
    nombre: "Mouse Inalámbrico Silencioso",
    categoria: "Electrónica",
    precio: 25.00,
    stock: 10,
    color: "Gris",
    fecha: "2026-12-01",
    descuento: 5, // CON DESCUENTO
    descripcion: "Diseño ergonómico con clics silenciosos. Perfecto para trabajar sin distracciones.",
    proveedor: "TechWorld",
    imagen: "https://picsum.photos/seed/mouse/400/400"
  },
  // --- NUEVOS PRODUCTOS PROMOCIONALES AÑADIDOS ---
  {
    id: 11,
    nombre: "Drone Plegable 4K",
    categoria: "Electrónica",
    precio: 450.00,
    stock: 18,
    color: "Negro Carbono",
    fecha: "2027-07-25",
    descuento: 20, // CON DESCUENTO
    descripcion: "Drone compacto con cámara 4K y GPS. Ideal para viajes y fotografía aérea.",
    proveedor: "FlyHigh Drones",
    imagen: "https://picsum.photos/seed/drone/400/400"
  },
  {
    id: 12,
    nombre: "Set de Mancuernas Ajustables",
    categoria: "Ropa",
    precio: 150.00,
    stock: 11,
    color: "Negro/Rojo",
    fecha: "2028-02-01",
    descuento: 10, // CON DESCUENTO
    descripcion: "Mancuernas ajustables de 2kg a 20kg. Ahorra espacio sin sacrificar tu entrenamiento.",
    proveedor: "FitnessPro",
    imagen: "https://picsum.photos/seed/weights/400/400"
  },
  {
    id: 13,
    nombre: "Lámpara de Escritorio LED",
    categoria: "Hogar",
    precio: 40.00,
    stock: 40,
    color: "Blanco",
    fecha: "2027-11-10",
    descuento: 15, // CON DESCUENTO
    descripcion: "Lámpara LED con 3 modos de luz y puerto USB de carga. Cuidado visual avanzado.",
    proveedor: "Lumina Home",
    imagen: "https://picsum.photos/seed/lamp/400/400"
  },
];
// ----------------------------------------------------

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]); // Nuevo estado para el carrito

  // Lógica para añadir/actualizar productos en el carrito
  const addToCart = (product, quantityChange = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Si ya existe, actualiza la cantidad
        const newCart = [...prevCart];
        const currentQuantity = newCart[existingItemIndex].quantity;
        const newQuantity = currentQuantity + quantityChange;
        
        // No permitir exceder el stock disponible
        if (newQuantity > product.stock) {
            alert(`No se puede añadir más. Stock máximo: ${product.stock}`);
            return prevCart;
        }

        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: Math.max(0, newQuantity)
        };
        // Filtra si la cantidad llega a 0
        return newCart.filter(item => item.quantity > 0);
      } else if (quantityChange > 0 && product.stock > 0) {
        // Si no existe, el cambio es positivo y hay stock, añádelo
        return [...prevCart, { ...product, quantity: Math.min(quantityChange, product.stock) }];
      }
      return prevCart; 
    });
  };

  // Lógica para eliminar completamente un producto del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Getters útiles
  const getProductsWithDiscount = () => {
    // Esta función es la clave para la vista de Promociones
    return products.filter(p => p.descuento > 0);
  };
  
  // Placeholder functions (optional, to maintain structure from your old context)
  const getStockColor = (stock) => {
    if (stock === 0) return "pink";
    if (stock <= 10) return "orange";
    return "cyan";
  };
  const updateProductColor = (product) => {
    return { ...product, color: getStockColor(product.stock) };
  };
  const getLowStockProducts = () => products.filter(product => product.stock <= 10 && product.stock > 0);
  const getOutOfStockProducts = () => products.filter(product => product.stock === 0);
  const addProduct = () => {};
  const updateProduct = () => {};
  const deleteProduct = () => {};
  const addCategory = () => {};
  const updateCategory = () => {};
  const deleteCategory = () => {};
  const getProductsByCategory = () => [];
  const getExpiringProducts = () => [];
  const getExpiredProducts = () => [];
  const categories = [];

  const value = {
    products,
    cart, 
    addToCart, 
    removeFromCart, 
    getProductsWithDiscount,
    // Otras props/funciones
    categories, addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory, getProductsByCategory, getLowStockProducts, getOutOfStockProducts, getExpiringProducts, getExpiredProducts, getStockColor, updateProductColor
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};