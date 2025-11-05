import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Layout Components
import Navbar from "../components/Navbar";

// Páginas de Admin
import Dashboard from "../pages/Admin/Dashboard";
import Productos from "../pages/Admin/Productos";
import Reportes from "../pages/Admin/Reportes";
import Alertas from "../pages/Admin/Alertas";
import Categorias from "../pages/Admin/Categorias";

// Páginas de Usuario
import Home from "../pages/User/views/Home";

// Componente de protección de rutas
const ProtectedRoute = ({ children, requireAuth = true, allowedRoles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();

  console.log('ProtectedRoute Debug:', {
    isAuthenticated,
    loading,
    user,
    requireAuth,
    allowedRoles,
    currentPath: window.location.pathname
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    console.log('Redirecting to login - not authenticated');
    return <Navigate to="/" replace />;
  }

  if (!requireAuth && isAuthenticated && user) {
    const redirectPath = user.role === 'admin' ? '/dashboard' : '/home';
    console.log('Redirecting authenticated user to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  // Verificar roles si se especifican
  if (requireAuth && isAuthenticated && user && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // Redirigir al dashboard/home según el rol del usuario
      const redirectPath = user.role === 'admin' ? '/dashboard' : '/home';
      console.log('Role not allowed, redirecting to:', redirectPath);
      return <Navigate to={redirectPath} replace />;
    }
  }

  console.log('Access granted to route');
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas - Sin autenticación */}
      <Route
        path="/"
        element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas - Requieren autenticación y rol admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Navbar><Dashboard /></Navbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/productos"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Navbar><Productos /></Navbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/alertas"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Navbar><Alertas /></Navbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Navbar><Reportes /></Navbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categorias"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Navbar><Categorias /></Navbar>
          </ProtectedRoute>
        }
      />

      {/* Rutas de usuario - Vistas dedicadas sin navbar para experiencia más inmersiva */}
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/semaforo"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/promociones"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/detalle-producto"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Ruta adicional para perfil - temporal */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Navbar>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-white mb-6">Perfil de Usuario</h1>
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                  <p className="text-gray-400">Funcionalidad de perfil próximamente...</p>
                </div>
              </div>
            </Navbar>
          </ProtectedRoute>
        }
      />

      {/* Ruta por defecto - Redirige al login si no está autenticado, al dashboard si lo está */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;