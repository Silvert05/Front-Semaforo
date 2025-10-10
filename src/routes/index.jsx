import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

// El componente Navbar (Ahora Layout)
import Navbar from "../components/Navbar"; 

// Páginas de Admin
import Dashboard from "../pages/Admin/Dashboard";
import Productos from "../pages/Admin/Productos";
import Entradas from "../pages/Admin/Entradas";
import Salidas from "../pages/Admin/Salidas";
import Reportes from "../pages/Admin/Reportes";
import Alertas from "../pages/Admin/Alertas";
import Configuracion from "../pages/Admin/Configuracion";

// *** Ojo: No tienes la carpeta User en pages/User, sino Login/Register. Lo corregimos.
// Si deseas usar rutas para usuarios, deberás crear esos archivos/rutas. 

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas de autenticación (Sin Layout/Navbar) */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas del Administrador (Usando Navbar como Layout) */}
      <Route
        path="/dashboard"
        element={<Navbar><Dashboard /></Navbar>} // <--- CORREGIDO
      />
      <Route
        path="/productos"
        element={<Navbar><Productos /></Navbar>} // <--- CORREGIDO
      />
      <Route
        path="/entradas"
        element={<Navbar><Entradas /></Navbar>} // <--- CORREGIDO
      />
      <Route
        path="/salidas"
        element={<Navbar><Salidas /></Navbar>} // <--- CORREGIDO
      />
      <Route
        path="/alertas"
        element={<Navbar><Alertas /></Navbar>} // <--- CORREGIDO
      />
      <Route
        path="/reportes"
        element={<Navbar><Reportes /></Navbar>} // <--- CORREGIDO
      />
      <Route
        path="/configuracion"
        element={<Navbar><Configuracion /></Navbar>} // <--- CORREGIDO
      />
      
      {/* Rutas que no has definido pero que están en el Navbar (Opcional, debes crear las páginas si las quieres) */}
      <Route
        path="/perfil"
        element={<Navbar><div>Perfil de Usuario (Debes crear esta página)</div></Navbar>}
      />

    </Routes>
  );
};

export default AppRoutes;