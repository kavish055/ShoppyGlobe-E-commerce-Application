import { Home, Package, ShoppingCart } from "lucide-react";
import { useRouter } from "../context/router";
import { useStore } from "../context/store";

const Header = () => {
  const { state } = useStore();
  const { navigate } = useRouter();
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-purple-800 via-fuchsia-600 to-pink-500 text-white shadow-2xl sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          {/* Branding with subtle bounce-in animation */}
          <div className="flex items-center space-x-2 animate-[bounce_1.2s_ease]">
            <Package className="w-9 h-9 drop-shadow-lg text-yellow-300 animate-spin-slow" />
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-rose-200">ShoppyGlobe</h1>
          </div>
          {/* Navigation with interactive hover and ripple effect */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/10 focus:outline-none transition relative"
            >
              <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium group-hover:text-yellow-200 transition">Home</span>
              <span className="absolute left-0 top-0 w-full h-full rounded-lg pointer-events-none group-active:animate-[ripple_0.5s_linear]"></span>
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="group flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/10 focus:outline-none transition relative"
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium group-hover:text-yellow-200 transition">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 animate-pulse bg-fuchsia-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-xl">
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

export default Header;
