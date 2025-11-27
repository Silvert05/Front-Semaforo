# SEMAFORO - Sistema de Gestión de Inventario

Un sistema moderno de gestión de inventario desarrollado con React y Vite, diseñado para facilitar el control de productos, categorías, alertas de stock y reportes en tiempo real.

## 🚀 Características Principales

- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS y animaciones fluidas
- **Sistema de Roles**: Diferentes vistas para administradores y usuarios finales
- **Gestión Completa**: Productos, categorías, alertas y reportes
- **Autenticación Segura**: Sistema de login y registro con persistencia de sesión
- **Dashboard Interactivo**: Panel de control con métricas en tiempo real
- **Experiencia de Usuario**: Navegación intuitiva y feedback visual

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 con Vite
- **Estilos**: Tailwind CSS
- **Iconos**: React Icons (FontAwesome)
- **Rutas**: React Router DOM
- **Estado**: Context API para autenticación
- **Almacenamiento**: LocalStorage para persistencia de datos

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Front-Semaforo
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 4. Construir para producción
```bash
npm run build
```

### 5. Vista previa de producción
```bash
npm run preview
```

### 6. Ejecutar linter
```bash
npm run lint
```

## 👥 Usuarios y Credenciales

### Administrador
- **Email**: admin@admin.com
- **Contraseña**: 1234
- **Acceso**: Panel completo de administración

### Usuario Regular
Los usuarios pueden registrarse desde la página de registro y luego iniciar sesión con sus credenciales.

## 📱 Vistas Disponibles

### Panel de Administración (Admin)
- **Dashboard**: Vista general con métricas y estadísticas
- **Productos**: Gestión completa de inventario (agregar, editar, eliminar)
- **Categorías**: Organización de productos por categorías
- **Alertas**: Notificaciones de stock bajo y eventos importantes
- **Reportes**: Análisis y reportes del inventario

### Vistas de Usuario
- **Home**: Página principal con productos destacados
- **Semáforo**: Vista especial del sistema de semáforo de inventario
- **Promociones**: Productos en oferta y promociones
- **Detalle de Producto**: Información detallada de productos individuales


## 🏗️ Estructura del Proyecto

```
src/
├── api/                 # Configuración de API
├── assets/              # Recursos estáticos
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx       # Barra de navegación principal
│   └── ProductCard.jsx  # Tarjeta de producto
├── context/             # Contextos de React
│   ├── AuthContext.jsx  # Gestión de autenticación
│   └── ProductContext.jsx # Gestión de productos
├── pages/               # Páginas de la aplicación
│   ├── Admin/           # Vistas de administrador
│   │   ├── Dashboard.jsx
│   │   ├── Productos.jsx
│   │   ├── Alertas.jsx
│   │   ├── Reportes.jsx
│   │   └── Categorias.jsx
│   └── User/            # Vistas de usuario
│       ├── views/       # Páginas principales
│       └── component/   # Componentes específicos
├── routes/              # Configuración de rutas
│   └── index.jsx        # Definición de rutas
└── styles/              # Estilos globales
```

## 🔐 Sistema de Autenticación

- **Login**: `/` - Página de inicio de sesión
- **Registro**: `/register` - Registro de nuevos usuarios
- **Protección de Rutas**: Las rutas protegidas requieren autenticación
- **Roles**: Diferentes permisos según el rol (admin/user)

## 🎨 Diseño y UX

- **Tema Oscuro**: Interfaz moderna con gradientes y efectos visuales
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves y efectos hover
- **Feedback Visual**: Indicadores de carga y notificaciones

## 📊 Funcionalidades Clave

### Para Administradores
- Gestión completa del inventario
- Creación y edición de productos
- Configuración de categorías
- Monitoreo de alertas de stock
- Generación de reportes

### Para Usuarios
- Exploración de productos
- Sistema de carrito de compras
- Vista de promociones
- Detalle de productos
- Proceso de checkout

## 🔧 Configuración

El proyecto utiliza configuración estándar de Vite. Los archivos de configuración principales son:

- `vite.config.js`: Configuración de Vite
- `tailwind.config.js`: Configuración de Tailwind CSS
- `postcss.config.js`: Configuración de PostCSS
- `eslint.config.js`: Reglas de ESLint

## 📝 Notas de Desarrollo

- Los datos se almacenan localmente usando LocalStorage
- El sistema incluye usuarios predefinidos y permite registro
- Las rutas están protegidas según roles
- El diseño es completamente responsive

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando React y Vite**
