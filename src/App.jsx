import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <div className="cursor-custom bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;