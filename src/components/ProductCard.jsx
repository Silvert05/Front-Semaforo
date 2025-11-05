import React from "react";
const colorMap = {
  cyan: "bg-cyan-400",
  orange: "bg-orange-400",
  pink: "bg-pink-400",
  teal: "bg-teal-400",
  yellow: "bg-yellow-400",
};

const ProductCard = ({ nombre, stock, color, fecha, descuento }) => {
  return (
    <div className={`p-4 rounded-xl shadow-lg ${colorMap[color]} text-white`}>
      <h3 className="text-lg font-bold mb-2">{nombre}</h3>
      {fecha && <p className="text-sm mb-1">Caducidad: {fecha}</p>}
      <p className="text-sm mb-1">Stock: {stock}</p>
      {descuento && <p className="text-sm font-semibold">Descuento: {descuento}%</p>}
    </div>
  );
};

export default ProductCard;
