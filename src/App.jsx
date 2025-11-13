import { Suspense } from "react";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Header from "./components/header";
import NotFound from "./components/not-fount";
import ProductDetail from "./components/product-detail";
import ProductList from "./components/product-list";
import { useRouter } from "./context/router";

const App = () => {
  const { currentPath } = useRouter();

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      }>
        {renderRoute()}
      </Suspense>
    </div>
  );
};

export default App;