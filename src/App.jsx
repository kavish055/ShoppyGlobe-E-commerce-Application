import { Suspense } from "react";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Header from "./components/header";
import NotFound from "./components/not-fount";
import ProductDetail from "./components/product-detail";
import ProductList from "./components/product-list";
import { useRouter } from "./context/router";

// The main App component manages the overall structure and routing of the application.
const App = () => {
  const { currentPath } = useRouter();

  // Route rendering logic for dynamic routing
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return <ProductList />;
    }
    if (currentPath === '/cart') {
      return <Cart />;
    }
    if (currentPath === '/checkout') {
      return <Checkout />;
    }
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.split('/')[2];
      return <ProductDetail productId={productId} />;
    }
    return <NotFound />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-rose-100 to-red-200 transition-all duration-700 dark:from-gray-900 dark:to-blue-950 font-sans">
      <Header />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[60vh]">
            {/* Animated loader using a modern color */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute"></div>
              <div className="w-8 h-8 border-4 border-fuchsia-400 border-t-transparent rounded-full animate-spin" style={{animationDuration: "1.2s"}}></div>
            </div>
            <span className="ml-4 text-lg text-purple-600 font-semibold animate-pulse">Loading...</span>
          </div>
        }
      >
        <main className="p-4 md:p-8">
          {renderRoute()}
        </main>
      </Suspense>
    </div>
  );
};

export default App;
