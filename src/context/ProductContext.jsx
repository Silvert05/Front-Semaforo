import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
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

  const [categories, setCategories] = useState([
    { id: 1, nombre: "Lácteos", color: "cyan" },
    { id: 2, nombre: "Cereales", color: "orange" },
    { id: 3, nombre: "Carnes", color: "pink" },
    { id: 4, nombre: "Bebidas", color: "teal" },
    { id: 5, nombre: "Panadería", color: "yellow" }
  ]);

  // Función para determinar color según stock
  const getStockColor = (stock) => {
    if (stock === 0) return "pink";
    if (stock <= 10) return "orange";
    return "cyan";
  };

  // Actualizar color de producto según stock
  const updateProductColor = (product) => {
    return { ...product, color: getStockColor(product.stock) };
  };

  // CRUD Products
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      color: getStockColor(productData.stock)
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts(prev => prev.map(product =>
      product.id === id
        ? { ...product, ...productData, color: getStockColor(productData.stock) }
        : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // CRUD Categories
  const addCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      ...categoryData
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, categoryData) => {
    setCategories(prev => prev.map(category =>
      category.id === id ? { ...category, ...categoryData } : category
    ));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  // Getters útiles
  const getProductsByCategory = (categoryName) => {
    return products.filter(product => product.categoria === categoryName);
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.stock <= 10 && product.stock > 0);
  };

  const getOutOfStockProducts = () => {
    return products.filter(product => product.stock === 0);
  };

  const getExpiringProducts = (days = 7) => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return products.filter(product => {
      const expiryDate = new Date(product.fecha);
      return expiryDate <= futureDate && expiryDate >= today;
    });
  };

  const getExpiredProducts = () => {
    const today = new Date();
    return products.filter(product => new Date(product.fecha) < today);
  };

  const getProductsWithDiscount = () => {
    return products.filter(product => product.descuento > 0);
  };

  const value = {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    getProductsByCategory,
    getLowStockProducts,
    getOutOfStockProducts,
    getExpiringProducts,
    getExpiredProducts,
    getProductsWithDiscount,
    getStockColor,
    updateProductColor
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};