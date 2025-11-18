import React, { createContext, useContext, useState } from 'react';

// --- Datos Simulados con la nueva variedad de productos y URL de imágenes ---
const initialProducts = [
  // --- LACTEOS ---
  {
    id: 1,
    nombre: "Leche Entera Larga Vida 1L",
    categoria: "Lacteos",
    precio: 1.55,
    stock: 35,
    color: "Azul", // Color representativo del producto
    fecha: "2026-03-15",
    descuento: 0,
    descripcion: "Leche fresca, enriquecida con vitaminas A y D. Larga vida.",
    proveedor: "Láctea Sur",
    imagen: "https://www.fybeca.com/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_FybecaEcuador/default/dwb1123c0e/images/large/17040-LECHE-LA-LECHERA-ENTERA-1-L-UNIDAD.JPG?sw=1000&sh=1000"
  },
  {
    id: 2,
    nombre: "Queso Mozzarella Bloque 500g",
    categoria: "Lacteos",
    precio: 5.99,
    stock: 15,
    color: "Blanco",
    fecha: "2025-01-01",
    descuento: 0, // EN PROMOCIÓN
    descripcion: "Queso suave, ideal para pizzas y lasaña. 100% leche de vaca.",
    proveedor: "Quesería Alpina",
    imagen: "https://productosgonzalez.com.ec/wp-content/uploads/2021/06/maduro-rebanado-600x600.jpg"
  },
  {
    id: 3,
    nombre: "Yogurt Natural Bebible Pack x6",
    categoria: "Lacteos",
    precio: 3.40,
    stock: 10,
    color: "Blanco",
    fecha: "2024-12-31",
    descuento: 0,
    descripcion: "Alto en probióticos, sin azúcar añadido.",
    proveedor: "YoguFit",
    imagen: "https://scontent.fuio10-1.fna.fbcdn.net/v/t39.30808-6/497400143_1132708558883731_6556729632483094024_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eR5NSCxCkqgQ7kNvwF5MF0B&_nc_oc=Admu4OpH1Qa8Z5i3yFWhILhOuDKol2qBH40Bx-_GtqOsflB3DuEx8Nzf5_H1dY5tUXI&_nc_zt=23&_nc_ht=scontent.fuio10-1.fna&_nc_gid=x7ahgXTdfkc1SQsDWxUNPQ&oh=00_Afgvo03Ovxvrq-F-BHcgRfJ-o4B8zjfIO8rW4QYQ4jzKDQ&oe=6921D8E9"
  },
  {
    id: 20,
    nombre: "Helado de Vainilla Premium 1L",
    categoria: "Lacteos",
    precio: 7.50,
    stock: 4, // Stock bajo
    color: "Amarillo Pálido",
    fecha: "2026-08-01",
    descuento: 25, // EN PROMOCIÓN (Liquidación por stock bajo)
    descripcion: "Helado cremoso de vainilla de Madagascar.",
    proveedor: "FrozenDelights",
    imagen: "https://cdn1.totalcommerce.cloud/cremhelado/product-zoom/es/vaso-1-litro-crem-helado-gold-vainilla-selecta-2.webp"
  },

  // --- SNACKS ---
  {
    id: 4,
    nombre: "Papas Fritas con Sal Clásicas 150g",
    categoria: "Snacks",
    precio: 1.25,
    stock: 45,
    color: "Dorado",
    fecha: "2026-06-20",
    descuento: 5, // EN PROMOCIÓN
    descripcion: "Elaboradas con papas seleccionadas y sal marina.",
    proveedor: "CrispyFood",
    imagen: "https://plazavea.vteximg.com.br/arquivos/ids/32980043-418-418/20355479-3.jpg"
  },
  {
    id: 5,
    nombre: "Galletas de Chocolate Rellenas 250g",
    categoria: "Snacks",
    precio: 2.90,
    stock: 22,
    color: "Marrón",
    fecha: "2027-01-01",
    descuento: 0,
    descripcion: "Crujientes galletas con doble relleno de chocolate.",
    proveedor: "SweetBites",
    imagen: "https://www.supermaxi.com/wp-content/uploads/2024/08/8699141157005-1-5.jpg.webp"
  },
  // --- VERDURAS ---
  {
    id: 6,
    nombre: "Manzanas Rojas Gala (Kg)",
    categoria: "Verduras",
    precio: 2.10,
    stock: 50,
    color: "Rojo Brillante",
    fecha: "2026-05-10",
    descuento: 0,
    descripcion: "Dulces y crujientes, ideales para comer frescas.",
    proveedor: "Fruver Fresh",
    imagen: "https://i5.walmartimages.com/asr/32f1c549-9478-433e-8495-d0a8fe1fce66.0217bc15b93c9489ee50733614958a27.jpeg"
  },
  {
    id: 7,
    nombre: "Lechuga Romana Fresca (Unidad)",
    categoria: "Verduras",
    precio: 0.99,
    stock: 8, // Stock bajo
    color: "Verde Oscuro",
    fecha: "2024-11-20", // Fecha cercana
    descuento: 0,
    descripcion: "Cultivo hidropónico, hojas tiernas y frescas.",
    proveedor: "HortiGreen",
    imagen: "https://www.supermaxi.com/wp-content/uploads/2023/09/7862101901302-1-5.jpg"
  },
  {
    id: 8,
    nombre: "Tomates Paquete (Kg)",
    categoria: "Verduras",
    precio: 1.80,
    stock: 0, // Stock bajo
    color: "Rojo",
    fecha: "2025-01-15",
    descuento: 15, // EN PROMOCIÓN
    descripcion: "Perfectos para ensaladas y salsas.",
    proveedor: "HortiGreen",
    imagen: "https://organicoasucasa.com/image/cache/catalog/Subidos%20Alonso/Tomate%20tradicional%20PriceSmart-500x500.jpeg"
  },
  // --- DULCES ---
  {
    id: 9,
    nombre: "Gomas de Mascar Sabor Menta Pack",
    categoria: "Dulces",
    precio: 1.00,
    stock: 60,
    color: "Verde Menta",
    fecha: "2028-01-01",
    descuento: 0,
    descripcion: "Sin azúcar, para un aliento fresco.",
    proveedor: "ChicleCorp",
    imagen: "https://m.media-amazon.com/images/I/71t8j8Vk1GL._AC_UF894,1000_QL80_.jpg"
  },
  {
    id: 10,
    nombre: "Chocolatina Rellena de Caramelo",
    categoria: "Dulces",
    precio: 0.75,
    stock: 1, // ¡Stock crítico!
    color: "Marrón",
    fecha: "2026-12-01",
    descuento: 20, // EN PROMOCIÓN (Liquidación)
    descripcion: "Barra de chocolate con leche y centro de caramelo cremoso.",
    proveedor: "SweetBites",
    imagen: "https://www.turronesbeamut.com/2733-thickbox_default/caramelo-de-leche-relleno-de-chocolate-toffino.jpg"
  },
  // --- CARNES ---
  {
    id: 11,
    nombre: "Lomo de Res Fino (Kg)",
    categoria: "Carnes",
    precio: 15.99,
    stock: 5, // Stock bajo
    color: "Rojo Intenso",
    fecha: "2024-11-22", // Fecha muy cercana
    descuento: 0,
    descripcion: "Corte premium, ideal para parrilla.",
    proveedor: "Carnes Selectas",
    imagen: "https://lomaspronto.ec/231-large_default/lomo-fino-de-res.jpg"
  },
  {
    id: 12,
    nombre: "Pechuga de Pollo Deshuesada (Kg)",
    categoria: "Carnes",
    precio: 6.50,
    stock: 12,
    color: "Rosado",
    fecha: "2024-11-25", // Fecha cercana
    descuento: 0, // EN PROMOCIÓN
    descripcion: "Fuente de proteína magra. Producto fresco.",
    proveedor: "Avícola Norte",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvjuO0cfnjU3OtwkZti6-SqVCZ9qzdcPrG2g&s"
  },
  // --- EMBUTIDOS ---
  {
    id: 13,
    nombre: "Salchicha Frankfurt Pack x10",
    categoria: "Embutidos",
    precio: 4.10,
    stock: 18,
    color: "Marrón Claro",
    fecha: "2025-03-01",
    descuento: 0,
    descripcion: "Salchichas de cerdo y res para hot dogs.",
    proveedor: "EuroFoods",
    imagen: "https://embutidospiggis.com/wp-content/uploads/2023/09/Salchicha-Frankfurt-especial-de-250g.webp"
  },
  {
    id: 14,
    nombre: "Jamón de Pavo Bajo en Sal 200g",
    categoria: "Embutidos",
    precio: 3.20,
    stock: 9, // Stock bajo
    color: "Rosado Pálido",
    fecha: "2025-01-10",
    descuento: 0,
    descripcion: "Finas lonchas de jamón de pavo. Ideal para sándwiches.",
    proveedor: "DeliSlice",
    imagen: "https://i0.wp.com/sihai.ec/wp-content/uploads/2023/03/jamon-de-pavo.png?resize=230%2C293&ssl=1"
  },
  // --- BEBIDAS ---
  {
    id: 15,
    nombre: "Agua Mineral sin Gas 500ml Pack x12",
    categoria: "Bebidas",
    precio: 4.50,
    stock: 40,
    color: "Transparente",
    fecha: "2028-05-01",
    descuento: 0,
    descripcion: "Agua mineral natural de manantial.",
    proveedor: "Pura Vida",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKz1QeEZoKn0e9y18GbktTNmciOJ1Y_gysXQ&s"
  },
  {
    id: 16,
    nombre: "Refresco Sabor Cola Zero 2L",
    categoria: "Bebidas",
    precio: 2.15,
    stock: 14,
    color: "Negro",
    fecha: "2027-07-25",
    descuento: 10, // EN PROMOCIÓN
    descripcion: "Refresco sin calorías, sabor intenso a cola.",
    proveedor: "FizzCo",
    imagen: "https://images-cdn.ubuy.co.in/6889f84c85d83d87aa03fc66-coca-cola-zero-sugar-soda-pop-2-liter.jpg"
  },
  {
    id: 17,
    nombre: "Cerveza Artesanal IPA 330ml",
    categoria: "Bebidas",
    precio: 3.99,
    stock: 0, // ¡Agotado!
    color: "Ámbar",
    fecha: "2024-10-01",
    descuento: 0,
    descripcion: "Cerveza de alta fermentación, amargor medio.",
    proveedor: "BrewMaster",
    imagen: "https://metroio.vtexassets.com/arquivos/ids/347393/Cerveza-Barbarian-174-IPA-Pack-4-Botella-330-ml-Fourpack-Cerveza-Artesanal-Barbarian-174-IPA-Botella-330ml-1-149626568.jpg?v=638180577575570000"
  },
  // --- OTROS ---
  {
    id: 18,
    nombre: "Miel de Abejas Pura 500g",
    categoria: "Otros",
    precio: 8.50,
    stock: 7, // Stock bajo
    color: "Dorado",
    fecha: "2028-03-01",
    descuento: 0,
    descripcion: "Miel multifloral 100% natural. Sin aditivos.",
    proveedor: "Apiaria Dorada",
    imagen: "https://www.supermaxi.com/wp-content/uploads/2024/08/7861042539230-1-10.jpg"
  },
  {
    id: 19,
    nombre: "Pan Integral de Molde 500g",
    categoria: "Otros",
    precio: 1.99,
    stock: 16,
    color: "Marrón",
    fecha: "2024-11-21", // Fecha muy cercana
    descuento: 5, // EN PROMOCIÓN
    descripcion: "Rico en fibra, bajo en grasas.",
    proveedor: "Panadería La Espiga",
    imagen: "https://figueriperu.com/pe/wp-content/uploads/2020/04/7-Pan-pullman-integral-2-1.jpg"
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
  const [cart, setCart] = useState([]); // Estado para el carrito

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
            // 🚨 Alerta temporal: NOTA: Deberías reemplazar 'alert()' por un modal o notificación en el componente de UI
            console.error(`No se puede añadir más de ${product.nombre}. Stock máximo: ${product.stock}`);
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
    // Devuelve todos los productos con descuento > 0
    return products.filter(p => p.descuento > 0);
  };
  
  // FUNCIONES DE SEMÁFORO (Stock)
  const getStockColor = (stock) => {
    if (stock === 0) return "pink"; // Agotado (ROJO)
    if (stock <= 10) return "orange"; // Bajo (AMARILLO)
    return "cyan"; // Normal/Alto (VERDE)
  };
  
  const updateProductColor = (product) => {
    return { ...product, color: getStockColor(product.stock) };
  };
  
  const getLowStockProducts = () => products.filter(product => product.stock <= 10 && product.stock > 0);
  const getOutOfStockProducts = () => products.filter(product => product.stock === 0);
  
  // FUNCIONES DE SEMÁFORO (Vencimiento)
  const getExpiringProducts = () => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7); // Productos que vencen en 7 días o menos

    return products.filter(p => {
        const productDate = new Date(p.fecha);
        return productDate > today && productDate <= futureDate;
    });
  };

  const getExpiredProducts = () => {
    const today = new Date();
    return products.filter(p => new Date(p.fecha) <= today && p.stock > 0);
  };
  
  // Getters de Categorías
  const categories = [...new Set(products.map(p => p.categoria))].sort();

  const getProductsByCategory = (category) => products.filter(p => p.categoria === category);


  // Placeholder functions para mantener la compatibilidad (si existen en otros archivos)
  const addProduct = () => {};
  const updateProduct = () => {};
  const deleteProduct = () => {};
  const addCategory = () => {};
  const updateCategory = () => {};
  const deleteCategory = () => {};


  const value = {
    products,
    cart, 
    addToCart, 
    removeFromCart, 
    getProductsWithDiscount,
    // Funciones del semáforo
    getStockColor, updateProductColor, getLowStockProducts, getOutOfStockProducts, getExpiringProducts, getExpiredProducts,
    // Categorías y CRUD (placeholders)
    categories, addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory, getProductsByCategory
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};