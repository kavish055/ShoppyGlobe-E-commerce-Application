import { Home, Package, ShoppingCart } from "lucide-react";
import { useRouter } from "../context/router";
import { useStore } from "../context/store";

const Header = () => {
    const { state } = useStore();
    const { navigate } = useRouter();
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
    return (
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8" />
              <h1 className="text-2xl font-bold">ShoppyGlobe</h1>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-1 hover:text-blue-200 transition"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-1 hover:text-blue-200 transition relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>
    );
  };

  export default Header