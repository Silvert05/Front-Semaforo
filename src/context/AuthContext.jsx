import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión persistente al cargar la aplicación
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Verificar admin predefinido
      if (email === 'admin@admin.com' && password === '1234') {
        const userData = {
          id: 1,
          email: 'admin@admin.com',
          name: 'Administrador',
          role: 'admin'
        };

        localStorage.setItem('token', 'fake-jwt-token-admin');
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      }

      // Verificar usuarios registrados
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role || 'user'
        };

        localStorage.setItem('token', `fake-jwt-token-${foundUser.id}`);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      }

      return { success: false, error: 'Credenciales incorrectas' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error en el servidor' };
    }
  };

  const register = async (userData) => {
    try {
      // Obtener usuarios registrados existentes
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Verificar si el email ya existe
      const emailExists = registeredUsers.some(u => u.email === userData.email);
      if (emailExists) {
        return { success: false, error: 'Este correo electrónico ya está registrado' };
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // En producción esto debería estar hasheado
        role: userData.role || 'user',
        createdAt: new Date().toISOString()
      };

      // Agregar nuevo usuario al array
      registeredUsers.push(newUser);

      // Guardar en localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      console.log('Usuario registrado exitosamente:', newUser);

      // SOLO retornar éxito, NO autenticar
      return { 
        success: true, 
        message: 'Usuario registrado exitosamente. Por favor inicia sesión.',
        email: newUser.email // Retornar email para mostrarlo en el modal
      };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error en el registro' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};